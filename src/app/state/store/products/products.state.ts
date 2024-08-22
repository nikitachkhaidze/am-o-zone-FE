import { DestroyRef, Injectable } from '@angular/core';
import {
  State, Selector, NgxsOnInit, StateContext, Action,
} from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Products } from './products.actions';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductsStateModel } from './products.state.model';

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    paginationSettings: {
      amount: 100,
      currentPage: 1,
      pageSize: 10,
    },
  },
})
@Injectable()
export class ProductsState implements NgxsOnInit {
  @Selector()
  static products(state: ProductsStateModel) {
    return state.products;
  }

  @Selector()
  static paginationSettings(state: ProductsStateModel) {
    return state.paginationSettings;
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

  @Action(Products.SetPaginationSettings)
  setPaginationSettings(
    context: StateContext<ProductsStateModel>,
    { paginationSettings }: Products.SetPaginationSettings,
  ) {
    context.patchState({ paginationSettings });
  }

  @Action(Products.GetPage)
  getPage(context: StateContext<ProductsStateModel>, { page, limit }: Products.GetPage) {
    return this.productsService.getProducts({ page, limit })
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
