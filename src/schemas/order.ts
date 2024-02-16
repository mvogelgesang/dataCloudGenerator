export interface Order {
  id: string;
  customerId: string;
  totalPrice: number;
  createdAt: Date;
  modifiedAt: Date;
  billing_street: string;
  billing_street2: string;
  billing_city: string;
  billing_state: string;
  billing_postalCode: string;
  billing_country: string;
  shipping_street: string;
  shipping_street2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postalCode: string;
  shipping_country: string;
  
}


