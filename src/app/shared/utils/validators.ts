import { Validators } from '@angular/forms';

export const getLengthValidators = (minLength: number, maxLength: number) => [
  Validators.minLength(minLength),
  Validators.maxLength(maxLength),
];
