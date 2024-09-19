import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgLetModule } from 'ng-let';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductsState } from '../../state/store/products/products.state';
import { Products } from '../../state/store/products/products.actions';

@Component({
  selector: 'am-product-gallery',
  standalone: true,
  imports: [
    MatPaginatorModule,
    ProductListItemComponent,
    AsyncPipe,
    NgIf,
    NgLetModule,
    MatProgressSpinnerModule,
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

  onPageChange({ pageIndex, pageSize }: PageEvent) {
    this.store.dispatch(new Products.NavigateToProductSelection({ page: pageIndex + 1, pageSize }));
  }
}
