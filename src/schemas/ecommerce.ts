import { Product } from "./";
export type Ecommerce<P extends keyof PageActionMapType = keyof PageActionMapType> = {
  customerId: string;
  sessionId: string;
  page: P;
  product?: Product["id"];
  action: string;
  createdAt: Date;
};

export type PageActionMapType = {
  Home: ["View"],
  Product: ["View", "Add to Cart"],
  Cart: ["View", "Remove from Cart"],
  Checkout: ["Checkout Start", "Checkout Complete"],
};

export const pageActionMap: PageActionMapType = {
  Home: ["View"],
  Product: ["View", "Add to Cart"],
  Cart: ["View", "Remove from Cart"],
  Checkout: ["Checkout Start", "Checkout Complete"],
};
