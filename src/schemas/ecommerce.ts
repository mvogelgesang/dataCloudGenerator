import { Product } from "./";
export type Ecommerce = {
  userId: string;
  sessionId: string;
  page: string;
  product?: Product["id"];
  collection?: string;
  action:
    | "Add to Cart"
    | "Checkout Complete"
    | "Checkout Start"
    | "Click"
    | "Remove from Cart"
    | "View";
  createdAt: Date;
};
