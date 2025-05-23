import { Route } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { LayoutComponent } from './layout/layout.component';
import { StoreRoutes } from '../types/ui/routes.type';
import { ProductsState } from '../state/store/products/products.state';
import { productResolver } from './shared/resolvers/product.resolver';
import { productGalleryResolver } from './shared/resolvers/product-gallery.resolver';
import { cartResolver } from './shared/resolvers/cart.resolver';

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
        path: StoreRoutes.products,
        resolve: {
          products: productGalleryResolver,
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        loadComponent: () => import('./product-gallery/product-gallery.component').then((module) => module.ProductGalleryComponent),
      },
      {
        path: `${StoreRoutes.product}/:id`,
        resolve: {
          product: productResolver,
        },
        loadComponent: () => import('./product-gallery/product-details/product-details.component').then((module) => module.ProductDetailsComponent),
      },
      {
        path: 'cart',
        resolve: {
          cart: cartResolver,
        },
        loadComponent: () => import('./cart/cart.component').then((module) => module.CartComponent),
      },
      {
        path: '',
        redirectTo: StoreRoutes.products,
        pathMatch: 'full',
      },
    ],
  },
];
