import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Notifications } from '../state/notifications/notifications.actions';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private store: Store) {
  }

  handleError(error: Error | HttpErrorResponse) {
    this.store.dispatch(new Notifications.DisplayError(error));
  }
}
