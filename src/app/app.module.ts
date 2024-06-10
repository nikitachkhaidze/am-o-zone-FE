import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutComponent } from '../layout/layout.component';
import { AppComponent } from './app.component';
import { ThemeButtonComponent } from './shared/theme-button/theme-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ThemeButtonComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    provideAnimationsAsync(),
  ],
})
export class AppModule { }
