import { Routes } from '@angular/router';
import { RootRoutes } from './types/ui/routes.type';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RootRoutes.store,
    pathMatch: 'full',
  },
  {
    path: RootRoutes.store,
    loadChildren: () => import('./store/store.routes').then((module) => module.storeRoutes),
  },
  {
    path: RootRoutes.admin,
    loadComponent: () => import('./page-not-found/page-not-found.component').then((module) => module.PageNotFoundComponent),
    canActivate: [authGuard],
  },
  {
    path: RootRoutes.login,
    loadComponent: () => import('./authorization/authorization/authorization.component').then((module) => module.AuthorizationComponent),
  },
  {
    path: RootRoutes.register,
    loadComponent: () => import('./authorization/registration/registration.component').then((module) => module.RegistrationComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then((module) => module.PageNotFoundComponent),
  },
];
