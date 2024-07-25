import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AppState } from '../../state/app/app.state';
import { User } from '../../state/user/user.actions';
import { Routes } from '../../types/ui/routes.type';
import { ValidationErrorComponent } from '../../shared/validation-error/validation-error.component';
import { getLengthValidators } from '../../shared/utils/validators';

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
    ValidationErrorComponent,
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent {
  appName$: Observable<string> = this.store.select(AppState.appName);
  authorizationForm = this.formBuilder.group({
    username: ['', [
      Validators.required,
      ...getLengthValidators(3, 20),
    ]],
    password: ['', [
      Validators.required,
      ...getLengthValidators(12, 30),
    ]],
  });
  routes = Routes;

  constructor(private store: Store, private formBuilder: NonNullableFormBuilder) {
  }

  onSubmit() {
    this.store.dispatch(new User.Login(this.authorizationForm.getRawValue()));
  }
}
