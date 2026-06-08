export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  commissionRate: number;
  estimatedCommission: number;
  category: string;
  shopName: string;
  viralScore: number;
  rating: number;
  sold: number;
  description: string;
  affiliateLink: string;
  saved?: boolean;
}
