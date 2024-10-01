import { Category } from '../../../types/ui/category.interface';
import { Sort } from '../../../types/ui/sort.enum';

export interface ProductsStateModel {
  categories: Category[],
  userFilters: UserFilters;
}

export interface PaginationSettings {
  totalItems?: number,
  currentPageIndex?: number,
}

export interface UserFilters {
  sort: Sort,
}
