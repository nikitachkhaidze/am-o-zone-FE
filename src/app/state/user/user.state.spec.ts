import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { UserState, UserStateModel } from './user.state';

describe('User state', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([UserState])],

    });

    store = TestBed.inject(Store);
  });

  it('should create an empty state', () => {
    const actual = store.selectSnapshot(UserState.getState);
    const expected: UserStateModel = {
      items: [],
    };
    expect(actual).toEqual(expected);
  });
});
