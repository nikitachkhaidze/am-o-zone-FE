import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Product } from '../../types/ui/product.interface';
import { ENVIRONMENT_CONFIG } from '../../const/injection-tokens.const';
import { Notifications } from '../../state/notifications/notifications.actions';
import { RootRoutes, StoreRoutes } from '../../types/ui/routes.type';

export const productResolver: ResolveFn<Product | void> = (route) => {
  const httpClient = inject(HttpClient);
  const environment = inject(ENVIRONMENT_CONFIG);
  const store = inject(Store);

  return httpClient.get<Product>(`${environment.apiUrl}/products/${route.params.id}`)
    .pipe(
      catchError(() => {
        return store.dispatch([
          new Notifications.DisplayError(new Error('Could not resolve product')),
          new Navigate([RootRoutes.store, StoreRoutes.products]),
        ]);
      }),
    );
};
