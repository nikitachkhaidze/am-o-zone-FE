import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { AsyncPipe } from '@angular/common';
import { ProductsState } from '../../../state/store/products/products.state';

@Component({
  selector: 'am-product-catalog',
  standalone: true,
  imports: [
    MatIcon,
    MatListItem,
    MatNavList,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss',
})
export class ProductCatalogComponent {
  categories$ = this.store.select(ProductsState.categories);

  constructor(private store: Store) {
  }
}
