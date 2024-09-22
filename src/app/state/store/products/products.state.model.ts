import { Product } from '../../../types/ui/product.interface';
import { Category } from '../../../types/ui/category.interface';
import { Sort } from '../../../types/ui/sort.enum';

export interface ProductsStateModel {
  products: Product[];
  paginationSettings: PaginationSettings,
  categories: Category[],
  productSelection: ProductSelection;
}

export interface PaginationSettings {
  totalItems?: number,
  currentPageIndex?: number,
}

export interface ProductSelection {
  category?: Category,
  sort?: Sort,
}
