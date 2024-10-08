import { Injectable } from '@angular/core';
import {
  State, Selector, Action, StateContext,
} from '@ngxs/store';
import { Product } from '../../../types/ui/product.interface';
import { Cart } from './cart.actions';

export interface CartStateModel {
  items: Product[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
  },
})
@Injectable()
export class CartState {
  @Selector()
  static getItems(state: CartStateModel) {
    return state.items;
  }

  @Action(Cart.AddItem)
  addItem(context: StateContext<CartStateModel>, { item }: Cart.AddItem) {
    context.patchState({
      items: [...context.getState().items, item],
    });
  }
}
