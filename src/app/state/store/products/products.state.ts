import { DestroyRef, Injectable } from '@angular/core';
import {
  State, Selector, StateContext, Action,
} from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { mergeMap } from 'rxjs';
import { Products } from './products.actions';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductsStateModel } from './products.state.model';

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    paginationSettings: {
      total: 100,
      currentPage: 0,
      pageSize: 10,
    },
  },
})
@Injectable()
export class ProductsState {
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

  @Action(Products.Set)
  set(context: StateContext<ProductsStateModel>, { products }: Products.Set) {
    context.patchState({ products });
  }

  @Action(Products.SetPaginationSettings)
  setPaginationSettings(
    context: StateContext<ProductsStateModel>,
    { paginationSettings }: Products.SetPaginationSettings,
  ) {
    const oldSettings = context.getState().paginationSettings;

    context.patchState({
      paginationSettings: {
        ...oldSettings,
        ...paginationSettings,
      },
    });
  }

  @Action(Products.GetPage)
  getPage(context: StateContext<ProductsStateModel>) {
    const { currentPage = 1, pageSize = 10 } = context.getState().paginationSettings;

    return this.productsService.getProducts({ page: currentPage + 1, pageSize })
      .pipe(
        mergeMap(({ products, total }) => context.dispatch([
          new Products.Set(products),
          new Products.SetPaginationSettings({ total }),
        ])),
        takeUntilDestroyed(this.destroyRef),
      );
  }
}
