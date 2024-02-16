export interface Product {
  id: string;
  name: string;
  colors: string[];
  sizes: string[];
  department: string;
  description: string;
  price: number;
  createdAt: Date;
  modifiedAt: Date;
}