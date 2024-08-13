import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../../../types/ui/product.interface';

@Component({
  selector: 'am-product-list-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
  ],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
})
export class ProductListItemComponent {
  @Input() product!: Product;
}
