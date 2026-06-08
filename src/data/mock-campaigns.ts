import { Campaign } from "@/types/campaign";
import { mockProducts } from "./mock-products";

export const mockCampaigns: Campaign[] = [
  { id: "c1", productId: mockProducts[1].id, productName: mockProducts[1].name, productImage: mockProducts[1].image, scriptTitle: "Hydration your cat will love", platform: "TikTok", subId: "catflow_may", createdAt: "2026-06-07", status: "Published", views: 18400, estimatedCommission: 387.42 },
  { id: "c2", productId: mockProducts[2].id, productName: mockProducts[2].name, productImage: mockProducts[2].image, scriptTitle: "Tiny vacuum, big clean", platform: "Shorts", subId: "deskclean_02", createdAt: "2026-06-06", status: "Published", views: 15700, estimatedCommission: 299.18 },
  { id: "c3", productId: mockProducts[3].id, productName: mockProducts[3].name, productImage: mockProducts[3].image, scriptTitle: "Glow on the go", platform: "Reels", subId: "glowroller", createdAt: "2026-06-05", status: "Processing", views: 12900, estimatedCommission: 261.76 },
  { id: "c4", productId: mockProducts[4].id, productName: mockProducts[4].name, productImage: mockProducts[4].image, scriptTitle: "Goodbye lint, hello clean", platform: "TikTok", subId: "freshfold_a", createdAt: "2026-06-03", status: "Draft", views: 8600, estimatedCommission: 142.81 },
];
