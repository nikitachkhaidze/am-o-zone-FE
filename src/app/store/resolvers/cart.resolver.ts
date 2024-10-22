import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs';
import { CartService } from '../../shared/services/cart.service';
import { Notifications } from '../../state/notifications/notifications.actions';
import { CartItem } from '../../types/api/cart-item.interface';

export const cartResolver: ResolveFn<CartItem[] | void> = () => {
  const cartService = inject(CartService);
  const store = inject(Store);

  return cartService.getItems()
    .pipe(
      catchError(() => store.dispatch(new Notifications.DisplayError(new Error('Could not resolve cart')))),
    );
};
