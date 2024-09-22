import { DestroyRef, Injectable } from '@angular/core';
import {
  State, Selector, StateContext, Action, Store, NgxsOnInit,
} from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { mergeMap } from 'rxjs';
import {
  Navigate,
} from '@ngxs/router-plugin';
import { Products } from './products.actions';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductSelection, ProductsStateModel } from './products.state.model';
import { GetProductsRequestParams } from '../../../types/api/api-products.interface';
import { RootRoutes, StoreRoutes } from '../../../types/ui/routes.type';

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    paginationSettings: {
      totalItems: 100,
      currentPageIndex: 0,
    },
    productSelection: {},
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
    const { currentPageIndex = 0 } = context.getState().paginationSettings;

    const getProductsRequestParams: GetProductsRequestParams = {
      page: currentPageIndex + 1,
      ...queryParams,
    };

    return this.productsService.getProducts(getProductsRequestParams)
      .pipe(
        mergeMap(({ products, pagination }) => context.dispatch([
          new Products.Set(products),
          new Products.SetPaginationSettings(pagination),
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

  @Action(Products.SetProductSelection)
  setProductSelection(context: StateContext<ProductsStateModel>, { productSelection }: Products.SetProductSelection) {
    const newProductSelection: ProductSelection = {
      ...context.getState().productSelection,
      ...productSelection,
    };

    context.patchState({ productSelection: newProductSelection });
  }

  @Action(Products.NavigateToProductSelection)
  navigateToProductSelection(context: StateContext<ProductsStateModel>) {
    const productSelection = context.getState().productSelection;
    const { currentPageIndex = 0 } = context.getState().paginationSettings;

    const queryParams: GetProductsRequestParams = {
      category: productSelection.category?.id,
      sort: productSelection.sort,
      page: currentPageIndex + 1,
    };

    return context.dispatch(new Navigate([`${RootRoutes.store}/${StoreRoutes.products}`], queryParams));
  }
}
