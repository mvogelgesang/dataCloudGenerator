export interface Customer {
  id: string;
  loyaltyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  modifiedAt: Date;
}