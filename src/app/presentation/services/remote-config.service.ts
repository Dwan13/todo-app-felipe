// Importaciones necesarias de Angular para inyección de dependencias y contexto de ejecución.
import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
// Importaciones específicas de Firebase Remote Config.
import {
  RemoteConfig,
  fetchAndActivate,
  getBoolean,
  getValue,
} from '@angular/fire/remote-config';

// Decorador @Injectable que marca la clase como un servicio que puede ser inyectado.
@Injectable({
  providedIn: 'root', // Indica que el servicio se proporciona en el inyector raíz, haciéndolo disponible en toda la aplicación.
})
export class RemoteConfigService {
  // Constructor del servicio, inyecta RemoteConfig y EnvironmentInjector.
  constructor(
    private remoteConfig: RemoteConfig, // Instancia del servicio Remote Config de Firebase.
    private injector: EnvironmentInjector // Inyector de entorno para ejecutar código en un contexto de inyección específico.
  ) {}

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

  

  /**
   * Gets a boolean value for a given key from Remote Config.
   * @param key The key of the parameter.
   * @returns The boolean value of the parameter.
   */
  getBoolean(key: string): boolean {
    return getBoolean(this.remoteConfig, key);
  }

  /**
   * Gets a string value for a given key from Remote Config.
   * @param key The key of the parameter.
   * @returns The string value of the parameter.
   */
  getString(key: string): string {
    return getValue(this.remoteConfig, key).asString();
  }

  /**
   * Gets a number value for a given key from Remote Config.
   * @param key The key of the parameter.
   * @returns The number value of the parameter.
   */
  getNumber(key: string): number {
    return getValue(this.remoteConfig, key).asNumber();
  }

  /**
   * Gets a JSON value for a given key from Remote Config.
   * @param key The key of the parameter.
   * @returns The JSON value of the parameter.
   */
  getJson(key: string): any {
    try {
      return JSON.parse(getValue(this.remoteConfig, key).asString()); // Intenta parsear el valor como JSON.
    } catch (err) {
      console.error('Error parsing JSON from Remote Config:', err); // Registra un error si el parseo falla.
      return null; // Retorna null en caso de error de parseo.
    }
  }
}
