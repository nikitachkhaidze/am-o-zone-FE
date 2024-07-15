import {
  ChangeDetectionStrategy,
  Component, DestroyRef, HostBinding, OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Theme } from './types/types';
import { LayoutComponent } from './layout/layout.component';
import { AppState } from './state/app/app.state';

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @HostBinding('attr.data-theme') theme = Theme.Light;

  constructor(private store: Store, private destroyRef: DestroyRef) {
  }

  ngOnInit() {
    this.store.select(AppState.theme)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme) => this.theme = theme);
  }
}
