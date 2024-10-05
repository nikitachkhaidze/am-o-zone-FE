import {
  ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgLetModule } from 'ng-let';
import { Navigate } from '@ngxs/router-plugin';
import { ThemeButtonComponent } from '../../shared/theme-button/theme-button.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { AppState } from '../../state/app/app.state';
import { RootRoutes, StoreRoutes } from '../../types/ui/routes.type';
import { UserState } from '../../state/user/user.state';
import { User } from '../../state/user/user.actions';

@Component({
  selector: 'am-header',
  standalone: true,
  imports: [
    ThemeButtonComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    NgLetModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  appName$: Observable<string> = this.store.select(AppState.appName);
  isAuthenticated$ = this.store.select(UserState.isAuthenticated);
  @Output() sidePanelToggled = new EventEmitter<void>();

  routes = RootRoutes;

  constructor(private store: Store) {
  }

  searchControl = new FormControl('');

  onLogoutClick(isAuthenticated: boolean) {
    if (isAuthenticated) {
      this.store.dispatch(new User.Logout());
    } else {
      this.store.dispatch(new Navigate([RootRoutes.login]));
    }
  }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(console.log);
  }

  onCartClick() {
    this.store.dispatch(new Navigate([RootRoutes.store, StoreRoutes.cart]));
  }
}
