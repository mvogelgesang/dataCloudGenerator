import { Product } from "./product";
export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  modifiedAt: Date;
}
