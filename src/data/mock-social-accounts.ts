import { SocialAccount, SocialPlatform } from "@/types/social-account";

const featuredAccounts: SocialAccount[] = [
  { id: "tt-01", platform: "TikTok", handle: "@catfinds.daily", displayName: "Cat Finds Daily", avatar: "/assets/mock-cozy-cat-bed.jpg", group: "Cat Products", followers: 184200, lastPost: "2 hours ago", status: "Connected", autoPublish: true },
  { id: "tt-02", platform: "TikTok", handle: "@meowmusthaves", displayName: "Meow Must Haves", avatar: "/assets/mock-cat-fountain.jpg", group: "Cat Products", followers: 92800, lastPost: "Yesterday", status: "Connected", autoPublish: true },
  { id: "tt-03", platform: "TikTok", handle: "@glowwithmali", displayName: "Glow with Mali", avatar: "/assets/mock-serum.jpg", group: "Beauty Creators", followers: 341500, lastPost: "4 hours ago", status: "Connected", autoPublish: false },
  { id: "tt-04", platform: "TikTok", handle: "@beautyminute.th", displayName: "Beauty Minute TH", avatar: "/assets/mock-jade-roller.jpg", group: "Beauty Creators", followers: 76800, lastPost: "3 days ago", status: "Action required", autoPublish: false },
  { id: "tt-05", platform: "TikTok", handle: "@homehackclub", displayName: "Home Hack Club", avatar: "/assets/mock-mini-vacuum.jpg", group: "Home Gadgets", followers: 267400, lastPost: "6 hours ago", status: "Connected", autoPublish: true },
  { id: "tt-06", platform: "TikTok", handle: "@tinyhomewins", displayName: "Tiny Home Wins", avatar: "/assets/mock-fabric-shaver.jpg", group: "Home Gadgets", followers: 129600, lastPost: "Yesterday", status: "Connected", autoPublish: true },
  { id: "tt-07", platform: "TikTok", handle: "@viralunder10", displayName: "Viral Under $10", avatar: "/assets/product-tool.jpg", group: "Viral Finds", followers: 511900, lastPost: "30 min ago", status: "Connected", autoPublish: true },
  { id: "tt-08", platform: "TikTok", handle: "@ninafindsit", displayName: "Nina Finds It", avatar: "/assets/mock-phone-stand.jpg", group: "Viral Finds", followers: 88300, lastPost: "5 days ago", status: "Expired", autoPublish: false },
  { id: "tt-09", platform: "TikTok", handle: "@thaideals.today", displayName: "Thai Deals Today", avatar: "/assets/mock-sunset-lamp.jpg", group: "Thailand Team", followers: 203700, lastPost: "8 hours ago", status: "Connected", autoPublish: false },
  { id: "tt-10", platform: "TikTok", handle: "@cleanwithploy", displayName: "Clean with Ploy", avatar: "/assets/campaign-cleaning.jpg", group: "Thailand Team", followers: 146500, lastPost: "2 days ago", status: "Connected", autoPublish: true },
  { id: "fb-01", platform: "Facebook", handle: "Cat Finds Community", displayName: "Cat Finds Community", avatar: "/assets/product-cat.jpg", group: "Cat Products", followers: 68400, lastPost: "Yesterday", status: "Connected", autoPublish: true },
  { id: "fb-02", platform: "Facebook", handle: "Home Hacks Thailand", displayName: "Home Hacks Thailand", avatar: "/assets/campaign-cleaning.jpg", group: "Thailand Team", followers: 112300, lastPost: "4 days ago", status: "Action required", autoPublish: false },
  { id: "yt-01", platform: "YouTube", handle: "@ViralFindsStudio", displayName: "Viral Finds Studio", avatar: "/assets/campaign-projector.jpg", group: "Viral Finds", followers: 236000, lastPost: "3 hours ago", status: "Connected", autoPublish: true },
  { id: "x-01", platform: "X", handle: "@dealradar", displayName: "Deal Radar", avatar: "/assets/product-tool.jpg", group: "Viral Finds", followers: 41900, lastPost: "50 min ago", status: "Connected", autoPublish: false },
];

const creatorNames = [
  "Daily Deal Lab",
  "Creator Picks",
  "Smart Home Finds",
  "Glow Review",
  "Pet Parent Club",
  "Trending Cart",
  "Budget Finds TH",
  "Everyday Upgrade",
  "Viral Review Room",
  "Shop with May",
];
const platforms: SocialPlatform[] = ["TikTok", "TikTok", "TikTok", "Facebook", "YouTube", "X"];
const groups = ["Cat Products", "Beauty Creators", "Home Gadgets", "Viral Finds", "Thailand Team"];
const avatars = [
  "/assets/mock-cozy-cat-bed.jpg",
  "/assets/mock-cat-fountain.jpg",
  "/assets/mock-serum.jpg",
  "/assets/mock-jade-roller.jpg",
  "/assets/mock-mini-vacuum.jpg",
  "/assets/mock-fabric-shaver.jpg",
  "/assets/product-tool.jpg",
  "/assets/mock-phone-stand.jpg",
  "/assets/mock-sunset-lamp.jpg",
  "/assets/campaign-projector.jpg",
];

const additionalAccounts: SocialAccount[] = Array.from(
  { length: 35 },
  (_, index) => {
    const platform = platforms[index % platforms.length];
    const number = index + 15;
    const name = `${creatorNames[index % creatorNames.length]} ${number}`;

    return {
      id: `social-${number}`,
      platform,
      handle:
        platform === "Facebook"
          ? name
          : `@${name.toLowerCase().replaceAll(" ", "")}`,
      displayName: name,
      avatar: avatars[index % avatars.length],
      group: groups[index % groups.length],
      followers: 18500 + index * 12700,
      lastPost: index % 3 === 0 ? "Today" : `${(index % 6) + 1} days ago`,
      status:
        index % 13 === 0
          ? "Expired"
          : index % 9 === 0
            ? "Action required"
            : "Connected",
      autoPublish: index % 3 !== 1,
    };
  },
);

export const mockSocialAccounts: SocialAccount[] = [
  ...featuredAccounts,
  ...additionalAccounts,
];
