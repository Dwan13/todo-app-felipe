import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [

      {
        path: 'tab1',
        loadComponent: () => import('../presentation/pages/todo/todo.page').then(m => m.TodoPage)
      },
      {
        path: 'tab2',
        loadComponent: () => import('../presentation/pages/search/search.page').then( m => m.SearchPage)
      },
      {
        path: 'tab3',
        loadComponent: () => import('../presentation/pages/accesibility/accesibility.page').then( m => m.AccesibilityPage)

      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
