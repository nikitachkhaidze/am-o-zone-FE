import { Product } from '../ui/product.interface';

export type CartItem = Product & { quantity: number };
