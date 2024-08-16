import { DestroyRef, Injectable } from '@angular/core';
import {
  State, Selector, NgxsOnInit, StateContext, Action,
} from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../../../types/ui/product.interface';
import { Products } from './products.actions';
import { ProductsService } from '../../../shared/services/products.service';

export interface ProductsStateModel {
  products: Product[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductsState implements NgxsOnInit {
  @Selector()
  static products(state: ProductsStateModel) {
    return state.products;
  }

  constructor(
    private destroyRef: DestroyRef,
    private productsService: ProductsService,
  ) {
  }

  ngxsOnInit(context: StateContext<ProductsStateModel>) {
    this.productsService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => context.dispatch(new Products.Set(products)));
  }

  @Action(Products.Set)
  set(context: StateContext<ProductsStateModel>, { products }: Products.Set) {
    context.patchState({ products });
  }
}
