import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [

      {
        path: 'home',
        loadComponent: () => import('../presentation/pages/todo/todo.page').then(m => m.TodoPage)
      },
      {
        path: 'search',
        loadComponent: () => import('../presentation/pages/search/search.page').then( m => m.SearchPage)
      },
      {
        path: 'accesibility',
        loadComponent: () => import('../presentation/pages/accesibility/accesibility.page').then( m => m.AccesibilityPage)

      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
