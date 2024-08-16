import { Injectable } from '@angular/core';
import {
  Action, Selector, State, StateContext,
} from '@ngxs/store';
import { mergeMap, tap } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { User } from './user.actions';
import { RootRoutes } from '../../types/ui/routes.type';
import { UserService } from '../../shared/services/user.service';

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
    private userService: UserService,
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
    return this.userService.postLogin(loginRequestData)
      .pipe(
        tap(({ accessToken, username }) => {
          context.patchState({ accessToken, username });
        }),
        mergeMap(() => context.dispatch(new Navigate([RootRoutes.home]))),
      );
  }

  @Action(User.Logout)
  logout(context: StateContext<UserStateModel>) {
    return context.dispatch(new Navigate([RootRoutes.login]))
      .pipe(
        tap(() => {
          context.patchState({
            accessToken: null,
            username: null,
          });
        }),
      );
  }

  @Action(User.Register)
  register(context: StateContext<UserStateModel>, { registrationRequestData }: User.Register) {
    return this.userService.postRegister(registrationRequestData)
      .pipe(
        mergeMap(() => context.dispatch(new Navigate([RootRoutes.login]))),
      );
  }
}
