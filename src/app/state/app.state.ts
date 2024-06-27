import { Injectable } from '@angular/core';
import {
  Action, Selector, State, StateContext,
} from '@ngxs/store';
import { Theme } from '../types/types';
import { App } from './app.actions';

export interface AppStateModel {
  appName: string,
  theme: Theme
}

const defaults = {
  appName: 'Am-o-zone',
  theme: Theme.Light,
};

@State<AppStateModel>({
  name: 'app',
  defaults,
})
@Injectable()
export class AppState {
  @Selector()
  static appName(state: AppStateModel) {
    return state.appName;
  }

  @Selector()
  static theme(state: AppStateModel) {
    return state.theme;
  }

  @Action(App.ToggleTheme)
  toggleTheme(context: StateContext<AppStateModel>) {
    const { theme } = context.getState();

    context.patchState({ theme: theme === Theme.Light ? Theme.Dark : Theme.Light });
  }
}
