import { EnvironmentInjector, Injectable, runInInjectionContext } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  constructor(private remoteConfig: RemoteConfig,
    private injector: EnvironmentInjector // Inyector de entorno para ejecutar código en un contexto de inyección específico.
  ) {
    // Opcional: Configurar un tiempo mínimo de fetch para desarrollo
    // this.remoteConfig.minimumFetchIntervalMillis = 3600000; // 1 hora
    // this.remoteConfig.fetchTimeMillis = 0; // Para forzar el fetch en desarrollo
  }
  /**
     * Fetches and activates the latest Remote Config values within the Angular injection context.
     * @returns A promise that resolves to a boolean indicating the status of 'show_new_feature'.
     */
  async fetchAndActivateConfig(): Promise<boolean> {
    try {
      // Espera un breve período para asegurar que el contexto de inyección esté completamente establecido (opcional).
      await new Promise(res => setTimeout(res, 500));

      // Ejecuta la función fetchAndActivate de Remote Config dentro del contexto de inyección de Angular.
      await runInInjectionContext(this.injector, () =>
        fetchAndActivate(this.remoteConfig)
      );

      // Obtiene el valor booleano de la característica 'show_new_feature' del Remote Config.
      const showFeature = runInInjectionContext(this.injector, () =>
        getValue(this.remoteConfig, 'show_new_feature').asBoolean()
      );

      return showFeature; // Retorna el valor de la característica.

    } catch (err) {
      console.error('🔥 Error fetching and activating Remote Config:', err); // Registra un error si la operación falla.
      return false; // En caso de error, retorna false para la característica.
    }
  }

  fetchAndActivate(): Observable<boolean> {
    return from(fetchAndActivate(this.remoteConfig)).pipe(
      catchError(error => {
        console.error('Error fetching remote config:', error);
        return of(false);
      })
    );
  }

  getString(key: string): string {
    return getValue(this.remoteConfig, key).asString();
  }

  getNumber(key: string): number {
    return getValue(this.remoteConfig, key).asNumber();
  }

  getBoolean(key: string): boolean {
    return getValue(this.remoteConfig, key).asBoolean();
  }

  getAll(): { [key: string]: any } {
    const allValues: { [key: string]: any } = {};
    const keys = Object.keys(this.remoteConfig);
    for (const key in keys) {
      if (keys.hasOwnProperty(key)) {
        allValues[key] = getValue(this.remoteConfig, key).asString(); // O el tipo que esperes
      }
    }
    return allValues;
  }
}