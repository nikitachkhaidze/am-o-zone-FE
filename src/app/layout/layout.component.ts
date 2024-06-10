import { Component } from '@angular/core';
import { ThemeButtonComponent } from '../shared/theme-button/theme-button.component';

@Component({
  selector: 'am-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    ThemeButtonComponent,
  ],
})
export class LayoutComponent {}
