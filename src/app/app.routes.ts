import { Routes } from '@angular/router';
import { Routes as RootRoutes } from './types/ui/routes.type';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RootRoutes.store,
    pathMatch: 'full',
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.routes').then((module) => module.storeRoutes),
  },
  {
    path: 'admin',
    loadComponent: () => import('./page-not-found/page-not-found.component').then((module) => module.PageNotFoundComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./authorization/authorization/authorization.component').then((module) => module.AuthorizationComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./authorization/registration/registration.component').then((module) => module.RegistrationComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then((module) => module.PageNotFoundComponent),
  },
];
