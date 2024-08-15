import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { map } from 'rxjs';
import { NgLetModule } from 'ng-let';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'am-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    NgLetModule,
    AsyncPipe,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product$ = this.activatedRoute.data.pipe(
    map((data) => data.product),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
  }
}
