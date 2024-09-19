import { DestroyRef, Injectable } from '@angular/core';
import {
  State, Selector, StateContext, Action, Store, NgxsOnInit, Actions,
} from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { mergeMap } from 'rxjs';
import {
  Navigate, RouterState,
} from '@ngxs/router-plugin';
import { RouterStateSnapshot } from '@angular/router';
import { Products } from './products.actions';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductsStateModel } from './products.state.model';
import { GetProductsRequestParams } from '../../../types/api/api-products.interface';
import { RootRoutes, StoreRoutes } from '../../../types/ui/routes.type';

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    paginationSettings: {
      total: 100,
      currentPage: 0,
      pageSize: 10,
    },
    categories: [],
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

  @Selector()
  static categories(state: ProductsStateModel) {
    return state.categories;
  }

  constructor(
    private destroyRef: DestroyRef,
    private productsService: ProductsService,
    private store: Store,
    private actions$: Actions,
  ) {
  }

  ngxsOnInit() {
    this.store.dispatch(new Products.GetCategories());
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

  @Action(Products.SetCategories)
  setCategories(context: StateContext<ProductsStateModel>, { categories }: Products.SetCategories) {
    context.patchState({ categories });
  }

  @Action(Products.GetPage)
  getPage(context: StateContext<ProductsStateModel>, { queryParams }: Products.GetPage) {
    const { currentPage = 1, pageSize = 10 } = context.getState().paginationSettings;
    const routerStateSnapshot = this.store.selectSnapshot<RouterStateSnapshot | undefined>(RouterState.state);

    const getProductsRequestParams: GetProductsRequestParams = {
      page: currentPage + 1,
      pageSize,
      ...queryParams ?? routerStateSnapshot?.root.queryParams,
    };

    return this.productsService.getProducts(getProductsRequestParams)
      .pipe(
        mergeMap(({ products, total }) => context.dispatch([
          new Products.Set(products),
          new Products.SetPaginationSettings({ total }),
        ])),
        takeUntilDestroyed(this.destroyRef),
      );
  }

  @Action(Products.GetCategories)
  getCategories(context: StateContext<ProductsStateModel>) {
    return this.productsService.getCategories()
      .pipe(
        mergeMap((categories) => context.dispatch(new Products.SetCategories(categories))),
        takeUntilDestroyed(this.destroyRef),
      );
  }

  @Action(Products.NavigateToProductSelection)
  navigateToProductSelection(context: StateContext<ProductsStateModel>, { queryParams }: Products.NavigateToProductSelection) {
    return context.dispatch(new Navigate([`${RootRoutes.store}/${StoreRoutes.products}`], queryParams));
  }
}
