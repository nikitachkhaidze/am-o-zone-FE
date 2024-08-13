import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../types/ui/product.interface';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { mockProducts } from '../../shared/mocks/product.mock';

@Component({
  selector: 'am-product-gallery',
  standalone: true,
  imports: [
    MatPaginatorModule,
    ProductListItemComponent,
  ],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent {
  products: Product[] = mockProducts;
}
