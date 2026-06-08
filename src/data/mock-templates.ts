import { Platform, VideoDuration, VideoStyle } from "@/types/generator";

export interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  style: VideoStyle;
  platform: Platform;
  duration: VideoDuration;
  hook: string;
  scenes: number;
  color: string;
  accent: string;
  popular?: boolean;
}

export const mockTemplates: VideoTemplate[] = [
  {
    id: "problem-solution-winner",
    name: "Problem → Solution Winner",
    description: "Open with a relatable frustration, reveal the product, then show the satisfying result.",
    style: "Problem-Solution",
    platform: "TikTok",
    duration: "30s",
    hook: "Still dealing with this every single day?",
    scenes: 4,
    color: "bg-[#fff0ea]",
    accent: "text-[#e64b2a]",
    popular: true,
  },
  {
    id: "honest-product-review",
    name: "Honest Product Review",
    description: "Build trust with first impressions, practical details, one honest drawback, and a verdict.",
    style: "Review",
    platform: "Reels",
    duration: "60s",
    hook: "I tested the viral product so you don’t have to.",
    scenes: 5,
    color: "bg-[#eaf8ef]",
    accent: "text-[#16894a]",
    popular: true,
  },
  {
    id: "three-reasons",
    name: "3 Reasons You Need This",
    description: "A fast listicle format built for retention, punchy captions, and clear benefits.",
    style: "Hard Sell",
    platform: "Shorts",
    duration: "30s",
    hook: "Three reasons this belongs in your cart.",
    scenes: 5,
    color: "bg-[#efedff]",
    accent: "text-[#6655c5]",
  },
  {
    id: "creator-story",
    name: "Creator Storytime",
    description: "Turn a personal before-and-after moment into a natural product recommendation.",
    style: "Storytelling",
    platform: "TikTok",
    duration: "60s",
    hook: "I wish I had found this six months ago.",
    scenes: 6,
    color: "bg-[#fff5dd]",
    accent: "text-[#a46a00]",
  },
  {
    id: "soft-sell-routine",
    name: "Soft-Sell Daily Routine",
    description: "Place the product naturally inside a calm routine without sounding like an advertisement.",
    style: "Soft Sell",
    platform: "Reels",
    duration: "30s",
    hook: "One small thing that makes my mornings easier.",
    scenes: 4,
    color: "bg-[#eaf3ff]",
    accent: "text-[#3478d4]",
  },
  {
    id: "funny-expectation-reality",
    name: "Expectation vs Reality",
    description: "Use a playful contrast and quick reaction shots to create an entertaining product demo.",
    style: "Funny",
    platform: "TikTok",
    duration: "15s",
    hook: "What I expected versus what actually happened.",
    scenes: 3,
    color: "bg-[#ffeef3]",
    accent: "text-[#c34870]",
  },
];
