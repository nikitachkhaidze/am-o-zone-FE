import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { AppState } from './app.state';
import { Theme } from '../../types/types';

describe('App state', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([AppState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an empty state', () => {
    expect(store.selectSnapshot(AppState.theme)).toEqual(Theme.Light);
  });
});
