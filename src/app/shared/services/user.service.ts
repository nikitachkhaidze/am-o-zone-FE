import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT_CONFIG } from '../const/injection-tokens.const';
import { Environment } from '../../../environments/environment.interface';
import {
  UserLoginRequestData,
  UserLoginResponseData,
  UserRegistrationRequestData,
} from '../../types/api/api-user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) { }

  postLogin(loginRequestData: UserLoginRequestData) {
    return this.httpClient.post<UserLoginResponseData>(`${this.environment.apiUrl}/auth/login`, loginRequestData);
  }

  postRegister(registrationRequestData: UserRegistrationRequestData) {
    return this.httpClient.post<UserLoginResponseData>(`${this.environment.apiUrl}/auth/register`, registrationRequestData);
  }
}
