import { Product } from '../ui/product.interface';
import { Sort } from '../ui/sort.enum';

export interface GetProductsRequestParams {
  page?: number,
  pageSize?: number,
  category?: string,
  sort?: Sort,
}

export interface GetProductsResponse {
  total: number,
  products: Product[],
}
