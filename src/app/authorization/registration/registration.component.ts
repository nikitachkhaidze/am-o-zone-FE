import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppState } from '../../state/app/app.state';
import { User } from '../../state/user/user.actions';
import { Routes } from '../../types/ui/routes.type';

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
  ],
  templateUrl: './registration.component.html',
  styleUrl: '../authorization/authorization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  appName$: Observable<string> = this.store.select(AppState.appName);
  registrationForm = this.formBuilder.group({
    username: '',
    email: '',
    password: '',
    reenterPassword: '',
  });
  routes = Routes;

  constructor(private store: Store, private formBuilder: NonNullableFormBuilder) {
  }

  onSubmit() {
    this.store.dispatch(new User.Register(this.registrationForm.getRawValue()));
  }
}
