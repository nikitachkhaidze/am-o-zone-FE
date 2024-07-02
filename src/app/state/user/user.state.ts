import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { User } from './user.actions';

export interface UserStateModel {
  items: string[];
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    items: [],
  },
})
@Injectable()
export class UserState {
  constructor(private httpClient: HttpClient) {
  }

  @Action(User.Login)
  login() {
  }
}
