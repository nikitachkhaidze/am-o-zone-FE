import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then((module) => module.LayoutComponent),
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./authorization/authorization.component').then((module) => module.AuthorizationComponent),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then((module) => module.PageNotFoundComponent),
  },
];
