import { Inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { User } from './user.actions';
import { ENVIRONMENT_CONFIG } from '../../const/injection-tokens.const';
import { Environment } from '../../../environments/environment.interface';

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
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) {
  }

  @Action(User.Login)
  login(context: StateContext<UserStateModel>, { loginRequestData }: User.Login) {
    return this.httpClient.post(`${this.environment.apiUrl}/auth/login`, loginRequestData);
  }
}
