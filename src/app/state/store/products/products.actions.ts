import { UserFilters } from './products.state.model';
import { Category } from '../../../types/ui/category.interface';

export namespace Products {
  const SCOPE = '[Products]';

  export class SetCategories {
    static readonly type = `${SCOPE} Set Categories`;

    constructor(public categories: Category[]) {
    }
  }

  export class GetCategories {
    static readonly type = `${SCOPE} Get Categories`;
  }

  export class SetUserFilters {
    static readonly type = `${SCOPE} Set User Filters`;

    constructor(public userFilters: UserFilters) {
    }
  }

  export class NavigateToProductSelection {
    constructor(public productSelection: { category?: string, sort?: string, page?: number }) {
    }

    static readonly type = `${SCOPE} Navigate To Product Selection`;
  }
}
