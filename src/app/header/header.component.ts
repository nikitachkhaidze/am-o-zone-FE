import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeButtonComponent } from '../shared/theme-button/theme-button.component';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';

@Component({
  selector: 'am-header',
  standalone: true,
  imports: [
    ThemeButtonComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(console.log);
  }
}
