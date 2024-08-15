import { DestroyRef, Inject, Injectable } from '@angular/core';
import {
  State, Selector, NgxsOnInit, StateContext, Action,
} from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../../../types/ui/product.interface';
import { ENVIRONMENT_CONFIG } from '../../../const/injection-tokens.const';
import { Environment } from '../../../../environments/environment.interface';
import { Products } from './products.actions';

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
    private httpClient: HttpClient,
    private destroyRef: DestroyRef,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) {
  }

  ngxsOnInit(context: StateContext<ProductsStateModel>) {
    this.httpClient.get<Product[]>(`${this.environment.apiUrl}/products`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => context.dispatch(new Products.Set(products)));
  }

  @Action(Products.Set)
  set(context: StateContext<ProductsStateModel>, { products }: Products.Set) {
    context.patchState({ products });
  }
}
