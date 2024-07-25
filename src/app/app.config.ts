import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { AppState } from './state/app/app.state';
import { UserState } from './state/user/user.state';
import { ENVIRONMENT_CONFIG } from './const/injection-tokens.const';
import { environment } from '../environments/environment';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import { NotificationsState } from './state/notifications/notifications.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
    provideStore(
      [
        AppState,
        UserState,
        NotificationsState,
      ],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      withNgxsRouterPlugin(),
      withNgxsStoragePlugin({
        keys: ['user.accessToken'],
      }),
    ),
    {
      provide: ENVIRONMENT_CONFIG,
      useValue: environment,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
