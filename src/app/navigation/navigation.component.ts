import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListItem, MatNavList } from '@angular/material/list';

@Component({
  selector: 'am-navigation',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    MatNavList,
    MatListItem,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {

}
