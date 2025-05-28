import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { TodoRepository } from './app/domain/repositories/todo.repository';
import { TodoRepositoryImpl } from './app/data/repositories/todo.repository.impl';
import { AddTodoUseCase } from './app/domain/usecases/add-todo.usecase';
import { DeleteTodoUseCase } from './app/domain/usecases/delete-todo.usecase';
import { GetAllTodosUseCase } from './app/domain/usecases/get-all-todos.usecase';
import { UpdateTodoUseCase } from './app/domain/usecases/update-todo.usecase';
import { TodoService } from './app/presentation/services/todo.service';
import { TodoDataSource } from './app/data/datasources/todo.datasource';
import { LocalTodoDataSource } from './app/data/datasources/local-todo.datasource';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    provideIonicAngular(),
    provideRouter(routes),
    // Provide the concrete implementation for TodoRepository
    {
      provide: TodoRepository,
      useClass: TodoRepositoryImpl
    },
    // Provide the data source
    {
      provide: TodoDataSource,
      useClass: LocalTodoDataSource
    },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
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
    // Provide the use cases
    AddTodoUseCase,
    DeleteTodoUseCase,
    GetAllTodosUseCase,
    UpdateTodoUseCase,
    // Provide the presentation service
    TodoService
  ],
});
