import { CartItem, CartItemUpdate } from '../../../types/api/cart-item.interface';

export namespace Cart {
  const SCOPE = '[Cart]';

  export class Set {
    static readonly type = `${SCOPE} Set`;

    constructor(public items: CartItem[]) {
    }
  }

  export class GetItems {
    static readonly type = `${SCOPE} Get Items`;
  }

  export class UpdateItem {
    static readonly type = `${SCOPE} Update Item`;

    constructor(public update: CartItemUpdate) {
    }
  }
}
