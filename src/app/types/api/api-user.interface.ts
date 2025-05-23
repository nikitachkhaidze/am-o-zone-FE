export interface UserLoginRequestData {
  username: string,
  password: string,
}

export interface UserLoginResponseData {
  id: string,
  username: string,
  email: string,
  isAdmin: boolean,
  accessToken: string,
}

export interface UserRegistrationRequestData {
  username: string,
  email: string,
  password: string,
}
