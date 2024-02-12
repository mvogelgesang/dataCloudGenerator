export interface StorePurchase {
  id: string;
  storeId: string;
  loyaltyId: string;
  total: number;
  createdAt: Date;
  modifiedAt: Date;
}