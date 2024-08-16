import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT_CONFIG } from '../../const/injection-tokens.const';
import { Environment } from '../../../environments/environment.interface';
import { Product } from '../../types/ui/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) { }

  getProducts() {
    return this.httpClient.get<Product[]>(`${this.environment.apiUrl}/products`);
  }
}
