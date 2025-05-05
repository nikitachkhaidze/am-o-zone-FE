import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT_CONFIG } from '../const/injection-tokens.const';
import { Environment } from '../../../environments/environment.interface';
import { CartItem, CartItemUpdate } from '../../types/api/cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) {}

  getItems() {
    return this.httpClient.get<CartItem[]>(`${this.environment.apiUrl}/cart`);
  }

  updateItem(update: CartItemUpdate) {
    return this.httpClient.put<CartItem[]>(`${this.environment.apiUrl}/cart`, update);
  }
}
