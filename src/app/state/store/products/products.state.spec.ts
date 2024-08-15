import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { ProductsState, ProductsStateModel } from './products.state';

describe('Products state', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ProductsState])],

    });

    store = TestBed.inject(Store);
  });

  it('should create an empty state', () => {
    const actual = store.selectSnapshot(ProductsState.products);
    const expected: ProductsStateModel = {
      products: [],
    };
    expect(actual).toEqual(expected);
  });
});