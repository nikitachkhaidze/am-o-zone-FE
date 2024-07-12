import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'amValidationErrorMessage',
  standalone: true,
})
export class ValidationErrorMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors | null | undefined, prefix: string): string {
    console.log(errors);
    return prefix;
  }
}
