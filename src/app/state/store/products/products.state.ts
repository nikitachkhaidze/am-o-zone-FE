import { DestroyRef, Injectable } from '@angular/core';
import {
  Action, NgxsOnInit, Selector, State, StateContext, Store,
} from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { mergeMap } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { Products } from './products.actions';
import { ProductsService } from '../../../shared/services/products.service';
import { UserFilters, ProductsStateModel } from './products.state.model';
import { RootRoutes, StoreRoutes } from '../../../types/ui/routes.type';
import { Sort } from '../../../types/ui/sort.enum';

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    userFilters: {
      sort: Sort.PriceASC,
    },
    categories: [],
  },
})
@Injectable()
export class ProductsState implements NgxsOnInit {
  @Selector()
  static categories(state: ProductsStateModel) {
    return state.categories;
  }

  @Selector()
  static userFilters(state: ProductsStateModel) {
    return state.userFilters;
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

  @Action(Products.SetCategories)
  setCategories(context: StateContext<ProductsStateModel>, { categories }: Products.SetCategories) {
    context.patchState({ categories });
  }

  @Action(Products.GetCategories)
  getCategories(context: StateContext<ProductsStateModel>) {
    return this.productsService.getCategories()
      .pipe(
        mergeMap((categories) => context.dispatch(new Products.SetCategories(categories))),
        takeUntilDestroyed(this.destroyRef),
      );
  }

  @Action(Products.SetUserFilters)
  setUserFilters(context: StateContext<ProductsStateModel>, { userFilters }: Products.SetUserFilters) {
    const newUserFilters: UserFilters = {
      ...context.getState().userFilters,
      ...userFilters,
    };

    context.patchState({ userFilters: newUserFilters });
  }

  @Action(Products.NavigateToProductSelection)
  navigateToProductSelection(context: StateContext<ProductsStateModel>, { productSelection }: Products.NavigateToProductSelection) {
    const queryParams = {
      sort: context.getState().userFilters.sort,
      ...productSelection,
    };

    return context.dispatch(new Navigate([`${RootRoutes.store}/${StoreRoutes.products}`], queryParams, { queryParamsHandling: 'merge' }));
  }
}
