import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeButtonComponent } from '../../shared/theme-button/theme-button.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'am-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    ThemeButtonComponent,
    RouterOutlet,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}