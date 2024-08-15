import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../types/ui/product.interface';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductsState } from '../../state/store/products/products.state';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'am-product-gallery',
  standalone: true,
  imports: [
    MatPaginatorModule,
    ProductListItemComponent,
    AsyncPipe,
    SearchBarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent {
  products: Observable<Product[]> = this.store.select(ProductsState.products);
  searchControl = new FormControl('');

  constructor(private store: Store) {
  }
}
