import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppState } from '../../state/app/app.state';
import { User } from '../../state/user/user.actions';
import { RootRoutes } from '../../types/ui/routes.type';
import { ValidationErrorComponent } from '../../shared/validation-error/validation-error.component';
import { emailRegexp } from '../../const/regexp.const';
import { getLengthValidators } from '../../shared/utils/validators';

@Component({
  selector: 'am-registration',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatError,
    ValidationErrorComponent,
  ],
  templateUrl: './registration.component.html',
  styleUrl: '../authorization/authorization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  appName$: Observable<string> = this.store.select(AppState.appName);
  registrationForm = this.formBuilder.group({
    username: ['', [
      Validators.required,
      ...getLengthValidators(3, 20),
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern(emailRegexp),
      ...getLengthValidators(3, 50),
    ]],
    password: ['', [
      Validators.required,
      ...getLengthValidators(12, 30),
    ]],
    reenterPassword: ['', [
      Validators.required,
      ...getLengthValidators(12, 30),
    ]],
  });
  routes = RootRoutes;

  constructor(private store: Store, private formBuilder: NonNullableFormBuilder) {
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(new User.Register(this.registrationForm.getRawValue()));
  }
}
