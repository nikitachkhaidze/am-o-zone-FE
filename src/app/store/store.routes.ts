import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { StoreRoutes } from '../types/ui/routes.type';

export const storeRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: StoreRoutes.products,
        pathMatch: 'full',
      },
      {
        path: StoreRoutes.products,
        loadComponent: () => import('./product-gallery/product-gallery.component').then((module) => module.ProductGalleryComponent),
      },
    ],
  },
];
