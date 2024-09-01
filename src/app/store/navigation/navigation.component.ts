import {
  ChangeDetectionStrategy, Component, EventEmitter, Output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RootRoutes } from '../../types/ui/routes.type';

@Component({
  selector: 'am-navigation',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    MatNavList,
    MatListItem,
    MatIcon,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Output() sidePanelToggled = new EventEmitter<void>();

  routes = RootRoutes;
}
