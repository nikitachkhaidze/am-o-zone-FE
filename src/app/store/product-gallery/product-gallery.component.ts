import {
  ChangeDetectionStrategy, Component,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgLetModule } from 'ng-let';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { Products } from '../../state/store/products/products.actions';
import { GetProductsResponse } from '../../types/api/api-products.interface';
import { ProductSettingsComponent } from './product-settings/product-settings.component';

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
    ProductSettingsComponent,
  ],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent {
  productsData$: Observable<GetProductsResponse> = this.activatedRoute.data.pipe(map((data) => data.products));

  products$ = this.productsData$.pipe(map((data) => data.products));
  paginationSettings$ = this.productsData$.pipe(map((data) => data.pagination));
  readonly pageSize = 10;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  onPageChange({ pageIndex }: PageEvent) {
    this.store.dispatch(new Products.NavigateToProductSelection({ page: pageIndex + 1 }));
  }
}
