import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RootRoutes } from '../../../types/ui/routes.type';
import { ProductsState } from '../../../state/store/products/products.state';
import { Sort } from '../../../types/ui/sort.enum';
import { Products } from '../../../state/store/products/products.actions';

@Component({
  selector: 'am-product-settings',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './product-settings.component.html',
  styleUrl: './product-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSettingsComponent implements OnInit {
  routes = RootRoutes;
  filtersForm = this.nonNullableFormBuilder.group({
    sort: this.store.selectSnapshot(ProductsState.userFilters).sort,
  });
  sortOptions = Sort;

  constructor(
    private store: Store,
    private nonNullableFormBuilder: NonNullableFormBuilder,
    private destroyRef: DestroyRef,
  ) {
  }

  ngOnInit() {
    this.filtersForm.valueChanges.pipe(
      map(() => this.filtersForm.getRawValue()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(({ sort }) => {
      this.store.dispatch([
        new Products.SetUserFilters({ sort }),
        new Products.NavigateToProductSelection({ page: 1 }),
      ]);
    });
  }
}
