import { Route } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { LayoutComponent } from './layout/layout.component';
import { StoreRoutes } from '../types/ui/routes.type';
import { ProductsState } from '../state/store/products/products.state';

export const storeRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    providers: [
      provideStates([
        ProductsState,
      ]),
    ],
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
