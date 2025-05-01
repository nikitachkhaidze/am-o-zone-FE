import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { ENVIRONMENT_CONFIG } from '../const/injection-tokens.const';
import { Environment } from '../../../environments/environment.interface';
import { CartItem } from '../../types/api/cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) {}

  getItems() {
    return this.httpClient.get<CartItem[]>(`${this.environment.apiUrl}/cart`);
  }
}
