import { Product } from '../ui/product.interface';

export type CartItem = Product & { quantity: number };
export type CartItemUpdate = Pick<Product, 'id'> & Pick<CartItem, 'quantity'>;
