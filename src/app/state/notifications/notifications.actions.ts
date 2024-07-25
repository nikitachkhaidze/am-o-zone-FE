import { HttpErrorResponse } from '@angular/common/http';

export namespace Notifications {
  const SCOPE = '[Notifications]';

  export class DisplayError {
    static readonly type = `${SCOPE} Display Error`;

    constructor(public error: Error | HttpErrorResponse) {
    }
  }
}
