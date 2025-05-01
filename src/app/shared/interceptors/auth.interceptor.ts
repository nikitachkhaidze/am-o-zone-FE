import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserState } from '../../state/user/user.state';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  const token = store.selectSnapshot(UserState.accessToken);

  if (token) {
    const requestClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(requestClone);
  }

  return next(req);
};
