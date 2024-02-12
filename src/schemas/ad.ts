export interface Ad {
  adId: string;
  userId: string;
  createdAt: Date;
  location: string;
  device: "Mobile" | "Desktop" | "Tablet";
}
