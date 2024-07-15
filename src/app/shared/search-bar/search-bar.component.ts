import {
  ChangeDetectionStrategy,
  Component, DestroyRef, forwardRef, Input, OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'am-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBarComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Search Items';
  private onChange!: (value: string | null) => void;
  private onTouched!: () => void;

  constructor(private destroyRef: DestroyRef) {
  }

  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        filter(() => !!this.onChange),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => this.onChange(value));
  }

  writeValue(value: string) {
    this.searchControl.setValue(value);
  }

  onClearSearchClicked() {
    this.searchControl.setValue('');
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
