import { UserLoginRequestData, UserRegistrationRequestData } from '../../types/api/api-user.interface';

export namespace User {
  const SCOPE = '[User]';

  export class Login {
    static readonly type = `${SCOPE} Login`;

    constructor(public loginRequestData: UserLoginRequestData) {
    }
  }

  export class Logout {
    static readonly type = `${SCOPE} Logout`;
  }

  export class Register {
    static readonly type = `${SCOPE} Register`;

    constructor(public registrationRequestData: UserRegistrationRequestData) {
    }
  }
}
