import { Routes } from '@angular/router';
import { ProductGalleryComponent } from './product-gallery/product-gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductGalleryComponent,
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
