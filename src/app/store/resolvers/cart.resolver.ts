import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, first, switchMap } from 'rxjs';
import { Notifications } from '../../state/notifications/notifications.actions';
import { CartItem } from '../../types/api/cart-item.interface';
import { Cart } from '../../state/store/cart/cart.actions';
import { CartState } from '../../state/store/cart/cart.state';

export const cartResolver: ResolveFn<CartItem[] | void> = () => {
  const store = inject(Store);

  return store.dispatch(new Cart.GetItems())
    .pipe(
      switchMap(() => store.select(CartState.items).pipe(first())),
      catchError(() => store.dispatch(new Notifications.DisplayError(new Error('Could not resolve cart')))),
    );
};
