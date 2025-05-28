import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',    
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'add-task',
    loadComponent: () => import('./presentation/pages/add-task/add-task.page').then( m => m.AddTaskPage)
  }
];
