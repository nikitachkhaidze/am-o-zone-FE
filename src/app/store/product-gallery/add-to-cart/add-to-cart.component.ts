import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { Product } from '../../../types/ui/product.interface';
import { Cart } from '../../../state/store/cart/cart.actions';

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

  constructor(private store: Store) {
  }

  onAddToCartClick(event: MouseEvent) {
    event.stopPropagation();
    this.isAdded = true;

    this.store.dispatch(new Cart.UpdateItem({ id: this.product.id, quantity: 1 }));
  }
}
