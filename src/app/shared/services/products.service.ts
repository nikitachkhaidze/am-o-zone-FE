import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT_CONFIG } from '../../const/injection-tokens.const';
import { Environment } from '../../../environments/environment.interface';
import {
  GetProductsRequestParams,
  GetProductsResponse,
} from '../../types/api/api-products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) { }

  getProducts(params: GetProductsRequestParams) {
    const options = {
      params: new HttpParams()
        .set('page', params.page)
        .set('pageSize', params.pageSize),
    };

    return this.httpClient.get<GetProductsResponse>(`${this.environment.apiUrl}/products`, options);
  }

  getCategories() {
    return this.httpClient.get<string[]>(`${this.environment.apiUrl}/products/categories`);
  }
}
