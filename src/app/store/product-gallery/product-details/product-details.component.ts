import { Component } from '@angular/core';
import {
  AsyncPipe, CurrencyPipe, NgIf, NgOptimizedImage,
} from '@angular/common';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../types/ui/product.interface';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'am-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    AsyncPipe,
    NgIf,
    AddToCartComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product$: Observable<Product> = this.activatedRoute.data.pipe(
    map((data) => data.product),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
  }
}
