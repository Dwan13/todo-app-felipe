// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * @constant environment
 * @description Objeto de configuración para el entorno de desarrollo de la aplicación.
 *              Contiene ajustes específicos para el modo de desarrollo, como la configuración de Firebase.
 */
export const environment = {
  /**
   * @property {boolean} production
   * @description Indica si la aplicación está en modo de producción. En este archivo, siempre es `false`
   *              para el entorno de desarrollo.
   */
  production: false,
  /**
   * @property {object} firebaseConfig
   * @description Configuración para la integración con Firebase en el entorno de desarrollo.
   *              Contiene las credenciales y detalles del proyecto Firebase.
   */
  firebaseConfig: {
    /**
     * @property {string} apiKey
     * @description Clave de API para autenticarse con los servicios de Firebase.
     */
    apiKey: "AIzaSyBa8oDWC6kwT9bDQ9yD9Zy7WMJUoATQAJ4",
    /**
     * @property {string} authDomain
     * @description Dominio de autenticación para el proyecto de Firebase.
     */
    authDomain: "todolist-95fb2.firebaseapp.com",
    /**
     * @property {string} projectId
     * @description ID del proyecto de Firebase.
     */
    projectId: "todolist-95fb2",
    /**
     * @property {string} storageBucket
     * @description Bucket de almacenamiento para el proyecto de Firebase.
     */
    storageBucket: "todolist-95fb2.firebasestorage.app",
    /**
     * @property {string} messagingSenderId
     * @description ID del remitente de mensajería para Firebase Cloud Messaging.
     */
    messagingSenderId: "1021424250061",
    /**
     * @property {string} appId
     * @description ID de la aplicación Firebase.
     */
    appId: "1:1021424250061:web:65fc84885112c0f208cd84",
    /**
     * @property {string} measurementId
     * @description ID de medición para Google Analytics en Firebase.
     */
    measurementId: "G-381157RNR8"
  }
};

/*
 * Para facilitar la depuración en modo de desarrollo, puedes importar el siguiente archivo
 * para ignorar los marcos de pila de errores relacionados con la zona, como `zone.run`, `zoneDelegate.invokeTask`.
 *
 * Esta importación debe comentarse en modo de producción porque tendrá un impacto negativo
 * en el rendimiento si se lanza un error.
 */
// import 'zone.js/plugins/zone-error';  // Incluido con Angular CLI.
