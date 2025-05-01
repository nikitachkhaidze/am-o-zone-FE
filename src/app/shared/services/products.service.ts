import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT_CONFIG } from '../const/injection-tokens.const';
import { Environment } from '../../../environments/environment.interface';
import {
  GetProductsRequestParams,
  GetProductsResponse,
} from '../../types/api/api-products.interface';
import { Product } from '../../types/ui/product.interface';
import { Category } from '../../types/ui/category.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private environment: Environment,
  ) { }

  getProducts(params: GetProductsRequestParams) {
    let queryParams = new HttpParams()
      .set('page', params.page ?? 1)
      .set('pageSize', params.pageSize ?? 10);

    if (params.sort) {
      queryParams = queryParams.set('sort', params.sort);
    }

    if (params.category) {
      queryParams = queryParams.set('category', params.category);
    }

    const options = {
      params: queryParams,
    };

    return this.httpClient.get<GetProductsResponse>(`${this.environment.apiUrl}/products`, options);
  }

  getProductById(id: string) {
    return this.httpClient.get<Product>(`${this.environment.apiUrl}/products/${id}`);
  }

  getCategories() {
    return this.httpClient.get<Category[]>(`${this.environment.apiUrl}/products/categories`);
  }
}
