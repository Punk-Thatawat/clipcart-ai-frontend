export type CampaignStatus = "Published" | "Processing" | "Draft";

export interface Campaign {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  scriptTitle: string;
  platform: "TikTok" | "Reels" | "Shorts";
  subId: string;
  createdAt: string;
  status: CampaignStatus;
  views: number;
  estimatedCommission: number;
}
