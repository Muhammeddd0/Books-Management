import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./Features/components/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./core/layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),


  },
];
