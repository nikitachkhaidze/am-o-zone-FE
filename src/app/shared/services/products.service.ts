import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT_CONFIG } from '../../const/injection-tokens.const';
import { Environment } from '../../../environments/environment.interface';
import { Product } from '../../types/ui/product.interface';
import { GetProductsRequestParams } from '../../types/api/api-products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) { }

  getProducts(params?: GetProductsRequestParams) {
    const options = params ? {
      params: new HttpParams()
        .set('page', params.page)
        .set('limit', params.limit),
    } : {};

    return this.httpClient.get<Product[]>(`${this.environment.apiUrl}/products`, options);
  }
}
