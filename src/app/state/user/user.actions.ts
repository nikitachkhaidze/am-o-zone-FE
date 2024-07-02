import { UserLoginRequestData } from '../../types/api/api-user.interface';

export namespace User {
  const SCOPE = '[User]';

  export class Login {
    static readonly type = `${SCOPE} Login`;

    constructor(public loginRequestData: UserLoginRequestData) {
    }
  }
}
