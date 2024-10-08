import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { CartState, CartStateModel } from './cart.state';

// describe('Cart state', () => {
//   let store: Store;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [provideStore([CartState])],
//
//     });
//
//     store = TestBed.inject(Store);
//   });
//
//   it('should create an empty state', () => {
//     const actual = store.selectSnapshot(CartState);
//     const expected: CartStateModel = {
//       items: [],
//     };
//     expect(actual).toEqual(expected);
//   });
// });
