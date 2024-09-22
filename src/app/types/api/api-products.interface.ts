import { Product } from '../ui/product.interface';
import { Sort } from '../ui/sort.enum';
import { PaginationSettings } from '../../state/store/products/products.state.model';

export interface GetProductsRequestParams {
  page?: number,
  pageSize?: number,
  category?: string,
  sort?: Sort,
}

export interface GetProductsResponse {
  products: Product[],
  pagination: PaginationSettings,
}
