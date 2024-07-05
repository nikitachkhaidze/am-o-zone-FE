import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then((module) => module.LayoutComponent),
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadComponent: () => import('./layout/layout.component').then((module) => module.LayoutComponent),
    canActivate: [authGuard],
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./authorization/authorization/authorization.component').then((module) => module.AuthorizationComponent),
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./authorization/registration/registration.component').then((module) => module.RegistrationComponent),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then((module) => module.PageNotFoundComponent),
  },
];
