export interface Ad {
  adId: string;
  userId: string;
  timestamp: Date;
  location: string;
  device: keyof ["Mobile","Desktop","Tablet"]
}
