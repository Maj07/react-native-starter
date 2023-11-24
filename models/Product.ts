export interface Product {
  id: number;
  brand: string;
  model: string;
  imageUrl: string;
  price: number;
  description: string;
  color: {
    name: string;
    hex: string;
  }[];
}
