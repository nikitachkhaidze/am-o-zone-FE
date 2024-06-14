import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./product-gallery/product-gallery.component').then((module) => module.ProductGalleryComponent),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then((module) => module.PageNotFoundComponent),
  },
];
