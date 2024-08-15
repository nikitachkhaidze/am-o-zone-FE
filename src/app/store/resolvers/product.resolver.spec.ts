import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productResolver } from './product.resolver';
import { Product } from '../../types/ui/product.interface';

describe('productResolver', () => {
  const executeResolver: ResolveFn<Product | void> = (...resolverParameters) => {
    return TestBed.runInInjectionContext(() => productResolver(...resolverParameters));
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
