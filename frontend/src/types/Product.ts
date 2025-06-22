export interface Product {
  id?: string;
  name: string;
  category: string[];     //String of categories
  price: number;
  stock: number;
  expirationDate: string | null; //could be null
}