export interface Product {
  _id: string,
  name: string,
  description: string,
  image: string,
  price: number,
  categories?: string[],
  size?: string,
  color?: string,
}
