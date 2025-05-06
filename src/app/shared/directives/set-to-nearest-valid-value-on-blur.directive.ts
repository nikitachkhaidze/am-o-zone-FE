import {
  Directive, HostListener, Injector, Input, OnInit,
} from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  NgModel,
} from '@angular/forms';
import { onlyIntegerRegExp } from '../const/regexp.const';
import { findNearestToStepValue, isNumberMultipleOf } from '../utils/number';

@Directive({
  selector: '[amSetToNearestValidValueOnBlur]',
  standalone: true,
})
export class SetToNearestValidValueOnBlurDirective implements OnInit {
  @Input('amSetToNearestValidValueOnBlur') params!: Partial<{
    min: number | null;
    max: number | null;
    default: number | null;
  }>;

  formControl!: FormControl<number>;

  constructor(
    private injector: Injector,
  ) {
  }

  ngOnInit() {
    const ngControl = this.injector.get(NgControl, null);

    if (ngControl instanceof FormControlName) {
      this.formControl = this.injector.get(FormGroupDirective).getControl(ngControl);
    } else if (ngControl instanceof FormControlDirective) {
      this.formControl = ngControl.form;
    } else if (ngControl instanceof NgModel) {
      this.formControl = ngControl.control;
    } else {
      this.formControl = new FormControl();
    }
  }

  @HostListener('blur', ['$event.target'])
  onBlur(input: HTMLInputElement) {
    if (this.formControl.valid) {
      return;
    }

    const value = this.formControl.value;

    if (this.formControl.hasError('required') && value === null) {
      this.formControl.setValue(this.params.default ?? 0);
      return;
    }

    let newValue = value;
    let step = Number(input.step);

    if (!step && this.formControl.hasError('pattern')) {
      const patternRegExp: string = this.formControl.errors?.pattern.requiredPattern;

      switch (patternRegExp) {
        case onlyIntegerRegExp: {
          step = 1;
          break;
        }
        default: {
          step = 1;
          break;
        }
      }
    }

    if (step && !isNumberMultipleOf(value, step)) {
      newValue = findNearestToStepValue(value, step);
    }

    if (this.params.min !== undefined && this.params.min !== null && newValue < this.params.min) {
      if (step && !isNumberMultipleOf(this.params.min, step)) {
        const nearestMinValue = findNearestToStepValue(this.params.min, step);
        newValue = nearestMinValue < this.params.min ? nearestMinValue + step : nearestMinValue;
      } else {
        newValue = this.params.min;
      }
    }

    if (this.params.max !== undefined && this.params.max !== null && newValue > this.params.max) {
      if (step && !isNumberMultipleOf(this.params.max, step)) {
        const nearestMaxValue = findNearestToStepValue(this.params.max, step);
        newValue = nearestMaxValue > this.params.max ? nearestMaxValue - step : nearestMaxValue;
      } else {
        newValue = this.params.max;
      }
    }

    if (newValue !== value) {
      this.formControl.setValue(newValue);
    }
  }
}
