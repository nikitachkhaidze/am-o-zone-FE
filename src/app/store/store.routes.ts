import { Route } from '@angular/router';

export const storeRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then((module) => module.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        loadComponent: () => import('./product-gallery/product-gallery.component').then((module) => module.ProductGalleryComponent),
      },
    ],
  },
];
