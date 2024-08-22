import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductsState } from '../../state/store/products/products.state';
import { Products } from '../../state/store/products/products.actions';
import { PaginationSettings } from '../../state/store/products/products.state.model';

@Component({
  selector: 'am-product-gallery',
  standalone: true,
  imports: [
    MatPaginatorModule,
    ProductListItemComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent {
  products$ = this.store.select(ProductsState.products);
  paginationSettings$ = this.store.select(ProductsState.paginationSettings);

  constructor(private store: Store) {
  }

  onPageChange({ length, pageIndex, pageSize }: PageEvent) {
    const paginationSettings: PaginationSettings = {
      amount: length,
      currentPage: pageIndex,
      pageSize,
    };

    this.store.dispatch(new Products.SetPaginationSettings(paginationSettings));
  }
}
