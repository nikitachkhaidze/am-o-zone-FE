import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ThemeButtonComponent } from '../shared/theme-button/theme-button.component';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { AppState } from '../state/app/app.state';

@Component({
  selector: 'am-header',
  standalone: true,
  imports: [
    ThemeButtonComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  appName$: Observable<string> = this.store.select(AppState.appName);

  constructor(private store: Store) {
  }

  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(console.log);
  }
}
