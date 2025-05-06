import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { cartResolver } from './cart.resolver';
import { CartItem } from '../../../types/api/cart-item.interface';

describe('cartResolver', () => {
  const executeResolver: ResolveFn<CartItem[] | void> = (...resolverParameters) => TestBed.runInInjectionContext(() => cartResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
