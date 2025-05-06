import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { catchError } from 'rxjs';
import { Product } from '../../../types/ui/product.interface';
import { Notifications } from '../../../state/notifications/notifications.actions';
import { RootRoutes, StoreRoutes } from '../../../types/ui/routes.type';
import { ProductsService } from '../../../shared/services/products.service';

export const productResolver: ResolveFn<Product | void> = (route) => {
  const productsService = inject(ProductsService);
  const store = inject(Store);

  return productsService.getProductById(route.params.id)
    .pipe(
      catchError(() => {
        return store.dispatch([
          new Notifications.DisplayError(new Error('Could not resolve product')),
          new Navigate([RootRoutes.store, StoreRoutes.products]),
        ]);
      }),
    );
};
