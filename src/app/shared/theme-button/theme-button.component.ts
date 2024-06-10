import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

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

}
