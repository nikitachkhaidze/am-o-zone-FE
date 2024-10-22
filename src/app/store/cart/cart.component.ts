import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../types/ui/product.interface';

type CartItem = Product & { quantity: number };

@Component({
  selector: 'am-cart',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems$: Observable<CartItem[]> = this.activatedRoute.data.pipe(map((data) => data.cart));

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
  }
}
