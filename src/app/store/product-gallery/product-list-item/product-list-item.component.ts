import { Component, HostListener, Input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Product } from '../../../types/ui/product.interface';
import { RootRoutes, StoreRoutes } from '../../../types/ui/routes.type';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'am-product-list-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    AddToCartComponent,
  ],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
})
export class ProductListItemComponent {
  @Input() product!: Product;

  constructor(private store: Store) {
  }

  @HostListener('click')
  navigateToProductDetails() {
    this.store.dispatch(new Navigate([RootRoutes.store, StoreRoutes.product, this.product.id]));
  }
}
