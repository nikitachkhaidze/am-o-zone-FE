import {
  Component, Input, OnChanges,
} from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CartItem } from '../../types/api/cart-item.interface';
import { ValidationErrorComponent } from '../../shared/components/validation-error/validation-error.component';
import { onlyIntegerRegExp } from '../../shared/const/regexp.const';
import { TypedSimpleChanges } from '../../types/ui/typed-simple-changes.type';
import {
  SetToNearestValidValueOnBlurDirective,
} from '../../shared/directives/set-to-nearest-valid-value-on-blur.directive';

@Component({
  selector: 'am-cart-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    ValidationErrorComponent,
    SetToNearestValidValueOnBlurDirective,
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent implements OnChanges {
  @Input() cartItem!: CartItem;

  quantityControl = new FormControl(1, {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(onlyIntegerRegExp)],
  });

  ngOnChanges(changes: TypedSimpleChanges<CartItemComponent>) {
    const currentCartItem = changes.cartItem.currentValue;

    if (currentCartItem) {
      this.quantityControl.setValue(currentCartItem.quantity);
    }
  }
}
