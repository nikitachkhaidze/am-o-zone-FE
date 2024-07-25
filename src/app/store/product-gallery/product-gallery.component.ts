import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'am-product-gallery',
  standalone: true,
  imports: [],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent {
}
