import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { AsyncPipe } from '@angular/common';
import { ProductsState } from '../../../state/store/products/products.state';
import { Products } from '../../../state/store/products/products.actions';
import { Category } from '../../../types/ui/category.interface';

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
  @Output() categorySelect = new EventEmitter<void>();

  constructor(private store: Store) {
  }

  onCategoryClick(category: Category) {
    this.store.dispatch(new Products.NavigateToProductSelection({ page: 1, category: category.id }));
    this.categorySelect.emit();
  }
}
