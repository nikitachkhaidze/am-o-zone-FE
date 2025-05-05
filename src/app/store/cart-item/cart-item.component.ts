import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartItem } from '../../types/api/cart-item.interface';

@Component({
  selector: 'am-cart-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
}
