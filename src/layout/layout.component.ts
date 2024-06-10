import { Component, HostBinding } from '@angular/core';
import { ThemeButtonComponent } from '../app/shared/theme-button/theme-button.component';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Component({
  selector: 'am-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    ThemeButtonComponent,
  ],
})
export class LayoutComponent {
  @HostBinding('attr.data-theme') theme = Theme.Light;

  toggleTheme() {
    this.theme = this.theme === Theme.Light ? Theme.Dark : Theme.Light;
  }
}
