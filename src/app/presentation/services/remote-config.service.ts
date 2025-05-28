import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  RemoteConfig,
  fetchAndActivate,
  getBoolean,
  getValue,
} from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  constructor(
    private remoteConfig: RemoteConfig,
    private injector: EnvironmentInjector
  ) {}

  /**
   * Fetches and activates the latest Remote Config values within the Angular injection context.
   * @returns A promise that resolves when the operation is complete.
   */
  async fetchAndActivateConfig(): Promise<boolean> {
    try {
      // Esperar un poco para asegurar contexto (opcional)
      await new Promise(res => setTimeout(res, 500));

      // Ejecutar fetchAndActivate en el contexto de inyección Angular
      await runInInjectionContext(this.injector, () =>
        fetchAndActivate(this.remoteConfig)
      );

      const showFeature = runInInjectionContext(this.injector, () =>
        getValue(this.remoteConfig, 'show_new_feature').asBoolean()
      );

      return showFeature;

    } catch (err) {
      console.error('🔥 Error fetching and activating Remote Config:', err);
      return false; // En caso de error retorna false para feature flag
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
      return JSON.parse(getValue(this.remoteConfig, key).asString());
    } catch (err) {
      console.error('Error parsing JSON from Remote Config:', err);
      return null;
    }
  }
}
