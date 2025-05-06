import {
  ChangeDetectionStrategy, Component, Injector, Input, OnInit,
} from '@angular/core';
import { AbstractControl, FormGroupDirective, ValidationErrors } from '@angular/forms';
import {
  filter,
  map, merge, Observable, of,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LogService } from '../../services/log.service';
import { ValidationErrorMessagePipe } from '../../pipes/validation-error.pipe';

@Component({
  selector: '[am-validation-error]',
  standalone: true,
  imports: [
    ValidationErrorMessagePipe,
    AsyncPipe,
  ],
  templateUrl: './validation-error.component.html',
  styleUrl: './validation-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorComponent implements OnInit {
  @Input() control?: AbstractControl;
  @Input() controlName?: string;
  @Input() prefix = 'Value';

  formControlErrors$?: Observable<ValidationErrors | null | undefined>;
  private formControl!: AbstractControl | null;

  constructor(private injector: Injector, private logService: LogService) {
  }

  ngOnInit() {
    if (!this.controlName && !this.control) {
      this.logService.error(new Error('[ValidationErrorComponent] FormControl or FormControlName is not provided'));
    }

    if (this.control) {
      this.formControl = this.control;
    } else if (this.controlName) {
      this.formControl = this.injector.get(FormGroupDirective).form.get(this.controlName);
    }

    if (!this.formControl) {
      return;
    }

    this.formControlErrors$ = merge(
      this.formControl.valueChanges,
      of(this.formControl.errors).pipe(filter((errors) => !!errors)),
    ).pipe(
      map(() => this.formControl?.errors),
    );
  }
}
