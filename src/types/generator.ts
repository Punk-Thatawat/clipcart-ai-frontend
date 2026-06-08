export type VideoStyle = "Review" | "Problem-Solution" | "Funny" | "Storytelling" | "Hard Sell" | "Soft Sell";
export type VideoDuration = "15s" | "30s" | "60s";
export type Tone = "Friendly" | "Funny" | "Professional" | "Excited";
export type Platform = "TikTok" | "Reels" | "Shorts";

export interface GenerationSettings {
  style: VideoStyle;
  targetAudience: string;
  duration: VideoDuration;
  tone: Tone;
  platform: Platform;
  includeCta: boolean;
}

export interface StoryboardScene {
  scene: number;
  time: string;
  visual: string;
  voiceover: string;
}

export interface GenerationResult {
  hook: string;
  script: string;
  storyboard: StoryboardScene[];
  caption: string;
  hashtags: string[];
  affiliateLink: string;
}
