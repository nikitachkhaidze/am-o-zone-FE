import { Product } from '../../../types/ui/product.interface';

export interface ProductsStateModel {
  products: Product[];
  paginationSettings: PaginationSettings,
  categories: string[],
}

export interface PaginationSettings {
  total?: number,
  pageSize?: number,
  currentPage?: number,
}
