import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  catchError,
} from 'rxjs';
import { Notifications } from '../../../state/notifications/notifications.actions';
import { Products } from '../../../state/store/products/products.actions';
import { ProductsService } from '../../../shared/services/products.service';
import { isSort } from '../../../types/type-guards';
import { ProductsState } from '../../../state/store/products/products.state';
import { GetProductsResponse } from '../../../types/api/api-products.interface';

export const productGalleryResolver: ResolveFn<GetProductsResponse | void> = (route) => {
  const store = inject(Store);
  const productsService = inject(ProductsService);

  const { page, category, sort } = route.queryParams;

  if (isSort(sort) && sort !== store.selectSnapshot(ProductsState.userFilters).sort) {
    store.dispatch(new Products.SetUserFilters({ sort }));
  }

  return productsService.getProducts(
    { page, category, sort: store.selectSnapshot(ProductsState.userFilters).sort },
  )
    .pipe(
      catchError(() => {
        return store.dispatch(new Notifications.DisplayError(new Error('Could not resolve product selection')));
      }),
    );
};
