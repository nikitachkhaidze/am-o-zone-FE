import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from '../../state/user/user.state';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  if (store.selectSnapshot(UserState.isAuthenticated)) {
    return true;
  }

  return router.parseUrl('login');
};
