import { Product } from '../ui/product.interface';

export interface GetProductsRequestParams {
  page: number,
  pageSize: number,
}

export interface GetProductsResponse {
  total: number,
  products: Product[],
}
