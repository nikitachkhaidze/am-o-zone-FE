import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-theme-button',
  standalone: true,
  imports: [],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeButtonComponent {

}
