import { Product } from '../../../types/ui/product.interface';
import { PaginationSettings } from './products.state.model';
import { GetProductsRequestParams } from '../../../types/api/api-products.interface';

export namespace Products {
  const SCOPE = '[Products]';

  export class Set {
    static readonly type = `${SCOPE} Set`;

    constructor(public products: Product[]) {
    }
  }

  export class SetPaginationSettings {
    static readonly type = `${SCOPE} Set Pagination Settings`;

    constructor(public paginationSettings: PaginationSettings) {
    }
  }

  export class SetCategories {
    static readonly type = `${SCOPE} Set Categories`;

    constructor(public categories: string[]) {
    }
  }

  export class GetPage {
    static readonly type = `${SCOPE} Get Page`;

    constructor(public queryParams?: GetProductsRequestParams) {
    }
  }

  export class GetCategories {
    static readonly type = `${SCOPE} Get Categories`;
  }

  export class NavigateToProductSelection {
    static readonly type = `${SCOPE} Navigate To Product Selection`;

    constructor(public queryParams?: GetProductsRequestParams) {
    }
  }
}
