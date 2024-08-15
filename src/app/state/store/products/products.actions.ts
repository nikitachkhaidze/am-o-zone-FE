import { Product } from '../../../types/ui/product.interface';

export namespace Products {
  const SCOPE = '[Products]';

  export class Set {
    static readonly type = `${SCOPE} Set`;

    constructor(public products: Product[]) {
    }
  }
}
