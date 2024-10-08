import { Product } from '../../../types/ui/product.interface';

export namespace Cart {
  const SCOPE = '[Cart]';

  export class AddItem {
    static readonly type = `${SCOPE} Add Item`;

    constructor(public item: Product) {
    }
  }
}
