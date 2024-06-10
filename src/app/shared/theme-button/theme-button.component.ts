import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { App } from '../../state/app.actions';

@Component({
  selector: 'am-theme-button',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeButtonComponent {
  constructor(private store: Store) {}

  toggleTheme() {
    this.store.dispatch(new App.ToggleTheme());
  }
}
