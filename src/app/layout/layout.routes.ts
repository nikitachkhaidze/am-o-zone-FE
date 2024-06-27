import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('../product-gallery/product-gallery.component').then((module) => module.ProductGalleryComponent),
  },
];
