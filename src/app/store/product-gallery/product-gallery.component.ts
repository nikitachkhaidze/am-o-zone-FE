import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgLetModule } from 'ng-let';
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
    NgLetModule,
  ],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent implements OnInit {
  products$ = this.store.select(ProductsState.products);
  paginationSettings$ = this.store.select(ProductsState.paginationSettings);

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new Products.GetPage());
  }

  onPageChange({ pageIndex, pageSize }: PageEvent) {
    const paginationSettings: PaginationSettings = {
      currentPage: pageIndex,
      pageSize,
    };

    this.store.dispatch([
      new Products.SetPaginationSettings(paginationSettings),
      new Products.GetPage(),
    ]);
  }
}
