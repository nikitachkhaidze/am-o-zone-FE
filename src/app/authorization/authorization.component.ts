import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AppState } from '../state/app/app.state';
import { User } from '../state/user/user.actions';

@Component({
  selector: 'am-authorization',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent {
  appName$: Observable<string> = this.store.select(AppState.appName);
  authorizationForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  constructor(private store: Store, private formBuilder: NonNullableFormBuilder) {
  }

  onSubmit() {
    this.store.dispatch(new User.Login(this.authorizationForm.getRawValue()));
  }
}
