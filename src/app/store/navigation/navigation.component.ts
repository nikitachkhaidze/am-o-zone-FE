import {
  ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, OnInit, Output,
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
import { RootRoutes } from '../../types/ui/routes.type';
import { Sort } from '../../types/ui/sort.enum';
import { Products } from '../../state/store/products/products.actions';

@Component({
  selector: 'am-navigation',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  @Output() sidePanelToggled = new EventEmitter<void>();
  routes = RootRoutes;
  filtersForm = this.nonNullableFormBuilder.group({
    sort: Sort.PriceASC,
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
