export interface Ad {
  adId: string;
  userId: string;
  createdAt: Date;
  location: string;
  device: keyof ["Mobile","Desktop","Tablet"]
}
