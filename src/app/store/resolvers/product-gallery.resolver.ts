import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs';
import { Notifications } from '../../state/notifications/notifications.actions';
import { GetProductsResponse } from '../../types/api/api-products.interface';
import { Products } from '../../state/store/products/products.actions';

export const productGalleryResolver: ResolveFn<GetProductsResponse | void> = (route) => {
  const store = inject(Store);

  return store.dispatch(new Products.GetPage(route.queryParams))
    .pipe(
      catchError(() => {
        return store.dispatch(new Notifications.DisplayError(new Error('Could not resolve product selection')));
      }),
    );
};
