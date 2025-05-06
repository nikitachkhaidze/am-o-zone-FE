import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import {
  animate, style, transition, trigger,
} from '@angular/animations';
import { ThemeButtonComponent } from '../../shared/components/theme-button/theme-button.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductCatalogComponent } from '../product-gallery/product-catalog/product-catalog.component';

@Component({
  selector: 'am-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ProductCatalogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('sidePanelAnimation', [
      transition(
        ':enter',
        [
          style({ transform: 'translate(-100%)' }),
          animate('0.2s ease-out', style({ transform: 'none' })),
        ],
      ),
      transition(
        ':leave',
        [
          style({ transform: 'none' }),
          animate('0.2s ease-out', style({ transform: 'translate(-100%)' })),
        ],
      ),
    ]),
    trigger('sidePanelBackdropAnimation', [
      transition(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('0.2s ease-out', style({ opacity: 0.5 })),
        ],
      ),
      transition(
        ':leave',
        [
          style({ opacity: 0.5 }),
          animate('0.2s ease-out', style({ opacity: 0 })),
        ],
      ),
    ]),
  ],
})
export class LayoutComponent {
  showSidePanel = false;

  onSidePanelToggled() {
    this.showSidePanel = !this.showSidePanel;
  }

  onSidePanelClosed() {
    this.showSidePanel = false;
  }
}
