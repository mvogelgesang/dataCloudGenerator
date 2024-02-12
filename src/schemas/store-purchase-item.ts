export interface StorePurchaseItem {
  id: string;
  storePurchaseId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  modifiedAt: Date;
}