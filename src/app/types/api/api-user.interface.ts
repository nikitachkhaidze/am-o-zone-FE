export interface UserLoginRequestData {
  username: string,
  password: string,
}

export interface UserLoginResponseData {
  username: string,
  email: string,
  isAdmin: boolean,
  accessToken: string,
}
