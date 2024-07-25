import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { NotificationsState } from './notifications.state';

describe('Notifications state', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([NotificationsState])],

    });

    store = TestBed.inject(Store);
  });
});
