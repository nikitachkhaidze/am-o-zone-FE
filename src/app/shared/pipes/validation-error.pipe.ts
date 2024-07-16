import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { emailRegexp } from '../../const/regexp.const';

@Pipe({
  name: 'amValidationErrorMessage',
  standalone: true,
})
export class ValidationErrorMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors | null | undefined, prefix: string): string {
    if (!errors) {
      return '';
    }

    return Object
      .entries(errors)
      .map(([validator, options]) => `${prefix} ${this.mapValidatorToMessage(validator, options)}`)
      .join('; ');
  }

  private mapValidatorToMessage(validator: string, options: Record<string, unknown>) {
    switch (validator) {
      case 'required':
        return 'is required';
      case 'pattern':
        return this.mapPatternValidatorToMessage(options.requiredPattern);
      case 'min':
        return `should be greater than or equal to ${options.min}`;
      case 'max':
        return `should be less than or equal to ${options.max}`;
      case 'minlength':
        return `length should be greater than or equal to ${options.requiredLength}`;
      case 'maxLength':
        return `length should be less than or equal to ${options.requiredLength}`;
      default:
        return 'is not valid';
    }
  }

  private mapPatternValidatorToMessage(pattern: unknown) {
    switch (pattern) {
      case emailRegexp:
        return 'should be an email';
      default:
        return 'is not valid';
    }
  }
}
