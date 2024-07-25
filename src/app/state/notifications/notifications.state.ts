import { Injectable } from '@angular/core';
import {
  State, Action, StateContext,
} from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Notifications } from './notifications.actions';

export type NotificationsStateModel = [];

@State<NotificationsStateModel>({
  name: 'notifications',
  defaults: [],
})
@Injectable()
export class NotificationsState {
  constructor(private toastrService: ToastrService) {
  }

  @Action(Notifications.DisplayError)
  displayError(context: StateContext<NotificationsStateModel>, { error }: Notifications.DisplayError) {
    this.toastrService.error(error.message, error.name, { onActivateTick: true });
  }
}
