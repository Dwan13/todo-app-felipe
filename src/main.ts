/**
 * @file main.ts
 * @description Este es el punto de entrada principal de la aplicación Angular.
 *              Configura el entorno de producción, inicializa la aplicación con `AppComponent`,
 *              y provee las dependencias necesarias para la inyección de dependencias de Angular,
 *              incluyendo estrategias de enrutamiento, servicios, casos de uso y configuración de Firebase.
 */

// Importaciones de Angular Core y Platform Browser
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';

// Importaciones de rutas y componentes de la aplicación
import { routes } from './app/app.routes';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// Importaciones de la capa de Dominio (Repositorios y Casos de Uso)
import { TodoRepository } from './app/domain/repositories/todo.repository';
import { AddTodoUseCase } from './app/domain/usecases/add-todo.usecase';
import { DeleteTodoUseCase } from './app/domain/usecases/delete-todo.usecase';
import { GetAllTodosUseCase } from './app/domain/usecases/get-all-todos.usecase';
import { UpdateTodoUseCase } from './app/domain/usecases/update-todo.usecase';

// Importaciones de la capa de Datos (Implementaciones de Repositorios y Data Sources)
import { TodoRepositoryImpl } from './app/data/repositories/todo.repository.impl';
import { TodoDataSource } from './app/data/datasources/todo.datasource';
import { LocalTodoDataSource } from './app/data/datasources/local-todo.datasource';

// Importaciones de la capa de Presentación (Servicios)
import { TodoService } from './app/presentation/services/todo.service';

// Importaciones y configuración de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

// Importación del componente raíz de la aplicación y la configuración del entorno
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

/**
 * @description Habilita el modo de producción de Angular si la aplicación se ejecuta en un entorno de producción.
 *              Esto deshabilita las comprobaciones de desarrollo y optimiza la aplicación para el rendimiento.
 */
if (environment.production) {
  enableProdMode();
}

/**
 * @function bootstrapApplication
 * @description Función principal que arranca la aplicación Angular.
 *              Define el componente raíz (`AppComponent`) y configura los proveedores de servicios globales.
 */
bootstrapApplication(AppComponent, {
  providers: [
    /**
     * @description Provee la estrategia de reutilización de rutas para Ionic.
     *              Asegura que el estado de la vista se mantenga al navegar entre pestañas.
     */
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    /**
     * @description Provee las configuraciones y servicios necesarios para Ionic Angular.
     */
    provideIonicAngular(),
    /**
     * @description Provee las rutas definidas para la aplicación.
     */
    provideRouter(routes),
    /**
     * @description Provee la implementación concreta de `TodoRepository`.
     *              Esto permite que los casos de uso dependan de la abstracción `TodoRepository`
     *              sin conocer los detalles de la implementación subyacente.
     */
    {
      provide: TodoRepository,
      useClass: TodoRepositoryImpl
    },
    /**
     * @description Provee la implementación concreta de `TodoDataSource`.
     *              En este caso, se utiliza `LocalTodoDataSource` para la gestión de datos local.
     */
    {
      provide: TodoDataSource,
      useClass: LocalTodoDataSource
    },
    /**
     * @description Inicializa la aplicación Firebase con la configuración definida en `environment.ts`.
     */
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    /**
     * @description Configura y provee el servicio de Firebase Remote Config.
     *              Define el intervalo mínimo de recuperación y el tiempo de espera para las configuraciones remotas,
     *              y establece una configuración predeterminada para la característica `show_new_feature`.
     */
    provideRemoteConfig(() => {
      const remoteConfig = getRemoteConfig();
      remoteConfig.settings = {
        minimumFetchIntervalMillis: 3600000, // 1 hora
        fetchTimeoutMillis: 60000,           // 60 segundos (valor común)
      };
      //remoteConfig.defaultConfig = rcDefaults;
      remoteConfig.defaultConfig = {
        show_new_feature: false,
      };
      return remoteConfig;
    }),
    /**
     * @description Provee los casos de uso de la aplicación para la gestión de tareas.
     *              Estos casos de uso encapsulan la lógica de negocio y orquestan las operaciones del repositorio.
     */
    AddTodoUseCase,
    DeleteTodoUseCase,
    GetAllTodosUseCase,
    UpdateTodoUseCase,
    /**
     * @description Provee el servicio de presentación `TodoService`.
     *              Este servicio interactúa con los casos de uso y expone los datos y operaciones a los componentes de la UI.
     */
    TodoService
  ],
});
