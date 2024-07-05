import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListItem, MatNavList } from '@angular/material/list';
import { Routes } from '../types/ui/routes.type';

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
  routes = Routes;
}
