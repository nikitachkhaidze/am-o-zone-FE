export interface Product {
  id: string,
  name: string,
  description: string,
  imgUrl: string,
  price: number,
  quantityInStock: number,
  size?: string,
  color?: string,
}
