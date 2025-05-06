import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Notifications } from '../state/notifications/notifications.actions';
import { LogService } from '../shared/services/log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private logService: LogService,
    private store: Store,
  ) {
  }

  handleError(error: Error | HttpErrorResponse) {
    this.logService.error(error);
    this.store.dispatch(new Notifications.DisplayError(error));
  }
}
