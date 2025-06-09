import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { TaskRepository } from './app/domain/repositories/task.repository';
import { TaskLocalStorageRepository } from './app/data/repositories/task-local-storage.repository';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { environment } from './environments/environment'; // Importa tu configuración de entorno

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    { provide: TaskRepository, useClass: TaskLocalStorageRepository },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideRemoteConfig(() => getRemoteConfig())
  ],
});
