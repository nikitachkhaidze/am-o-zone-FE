import { Injectable } from '@angular/core';
import {
  State, Selector, Action, StateContext, NgxsOnInit,
} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Cart } from './cart.actions';
import { CartService } from '../../../shared/services/cart.service';
import { CartItem } from '../../../types/api/cart-item.interface';

export interface CartStateModel {
  items: CartItem[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
  },
})
@Injectable()
export class CartState implements NgxsOnInit {
  @Selector()
  static items(state: CartStateModel) {
    return state.items;
  }

  @Action(Cart.Set)
  set(context: StateContext<CartStateModel>, { items }: Cart.Set) {
    context.patchState({
      items,
    });
  }

  @Action(Cart.GetItems)
  getItems(context: StateContext<CartStateModel>) {
    return this.cartService.getItems().pipe(
      tap((items: CartItem[]) => {
        context.dispatch(new Cart.Set(items));
      }),
    );
  }

  @Action(Cart.UpdateItem)
  updateItem(context: StateContext<CartStateModel>, { update }: Cart.UpdateItem) {
    return this.cartService.updateItem(update).pipe(
      tap((items: CartItem[]) => {
        context.dispatch(new Cart.Set(items));
      }),
    );
  }

  constructor(private cartService: CartService) {
  }

  ngxsOnInit(context: StateContext<CartStateModel>) {
    context.dispatch(new Cart.GetItems());
  }
}
