export interface AffiliateLink {
  id: number;
  productId: string;
  productName: string;
  productImage: string;
  shortLink: string;
  subId: string;
  campaign: string;
  clicks: number;
  conversions: number;
  revenue: number;
  active: boolean;
  createdAt: string;
}
