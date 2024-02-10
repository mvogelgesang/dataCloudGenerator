export type Ecommerce = {
  userId: string;
  sessionId: string;
  page: string;
  action: keyof ["View", "Click", "Add to Cart", "Purchase"];
  timestamp: Date;
};
