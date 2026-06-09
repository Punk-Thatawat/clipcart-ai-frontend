export type SocialAccountStatus = "Connected" | "Action required" | "Expired";
export type SocialPlatform = "TikTok" | "Facebook" | "X" | "YouTube";

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  handle: string;
  displayName: string;
  avatar: string;
  group: string;
  followers: number;
  lastPost: string;
  status: SocialAccountStatus;
  autoPublish: boolean;
}
