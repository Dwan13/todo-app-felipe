import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

/**
 * @constant routes
 * @description Define las rutas de navegación para la aplicación de pestañas.
 *              Cada ruta principal (`/tabs`) carga el componente `TabsPage` y define rutas hijas
 *              para cada una de las pestañas (Home, Search, Accesibility).
 */
export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      /**
       * @route /tabs/home
       * @description Ruta para la pestaña 'Home'. Carga dinámicamente el componente `TodoPage`.
       */
      {
        path: 'home',
        loadComponent: () => import('../presentation/pages/todo/todo.page').then(m => m.TodoPage)
      },
      /**
       * @route /tabs/search
       * @description Ruta para la pestaña 'Search'. Carga dinámicamente el componente `SearchPage`.
       */
      {
        path: 'search',
        loadComponent: () => import('../presentation/pages/search/search.page').then( m => m.SearchPage)
      },
      /**
       * @route /tabs/accesibility
       * @description Ruta para la pestaña 'Accesibility'. Carga dinámicamente el componente `AccesibilityPage`.
       */
      {
        path: 'accesibility',
        loadComponent: () => import('../presentation/pages/accesibility/accesibility.page').then( m => m.AccesibilityPage)

      },
      {
        path: 'add',
        loadComponent: () => import('../presentation/pages/add-task/add-task.page').then( m => m.AddTaskPage)

      },
      /**
       * @route /tabs/
       * @description Redirección por defecto cuando se accede a `/tabs` sin una ruta hija específica.
       *              Redirige a `/tabs/home`.
       */
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  /**
   * @route /
   * @description Redirección global por defecto cuando se accede a la raíz de la aplicación.
   *              Redirige a `/tabs/home`.
   */
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
