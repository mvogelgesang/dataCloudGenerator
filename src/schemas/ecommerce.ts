import { Product } from "./";
export type Ecommerce = {
  userId: string;
  sessionId: string;
  page: string;
  product?: Product["id"];
  collection?: string;
  action: keyof ["View", "Click", "Add to Cart", "Checkout Complete", "Checkout Start", "Remove from Cart"];
  timestamp: Date;
};
