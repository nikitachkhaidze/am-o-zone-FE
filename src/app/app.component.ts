import {
  Component, DestroyRef, HostBinding, inject, OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Theme } from './types/types';
import { LayoutComponent } from './layout/layout.component';
import { AppState } from './state/app.state';

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [LayoutComponent],
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  @HostBinding('attr.data-theme') theme = Theme.Light;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(AppState.getTheme)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme) => this.theme = theme);
  }
}
