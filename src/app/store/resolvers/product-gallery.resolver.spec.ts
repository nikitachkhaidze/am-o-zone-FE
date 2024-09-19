import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productGalleryResolver } from './product-gallery.resolver';

describe('productGalleryResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productGalleryResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
