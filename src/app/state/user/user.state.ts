import { Inject, Injectable } from '@angular/core';
import {
  Action, Selector, State, StateContext,
} from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { User } from './user.actions';
import { ENVIRONMENT_CONFIG } from '../../const/injection-tokens.const';
import { Environment } from '../../../environments/environment.interface';
import { UserLoginResponseData } from '../../types/api/api-user.interface';

interface UserStateModel {
  accessToken: string | null;
  username: string | null;
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    accessToken: null,
    username: null,
  },
})
@Injectable()
export class UserState {
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) {
  }

  @Selector([UserState])
  static accessToken(state: UserStateModel) {
    return state.accessToken;
  }

  @Selector([UserState.accessToken])
  static isAuthenticated(accessToken: string | null) {
    return !!accessToken;
  }

  @Action(User.Login)
  login(context: StateContext<UserStateModel>, { loginRequestData }: User.Login) {
    return this.httpClient.post<UserLoginResponseData>(`${this.environment.apiUrl}/auth/login`, loginRequestData)
      .pipe(
        tap(({ accessToken, username }) => {
          context.patchState({ accessToken, username });
        }),
      );
  }

  @Action(User.Logout)
  logout(context: StateContext<UserStateModel>) {
    context.patchState({
      accessToken: null,
      username: null,
    });
  }
}
