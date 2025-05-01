import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../../types/ui/product.interface';

@Component({
  selector: 'am-add-to-cart',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
  ],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent {
  @Input() product!: Product;
  isAdded = false;

  onAddToCartClick(event: MouseEvent) {
    event.stopPropagation();
    this.isAdded = true;
  }
}
