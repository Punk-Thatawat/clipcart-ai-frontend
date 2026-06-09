export type VideoStyle = "Review" | "Problem-Solution" | "Funny" | "Storytelling" | "Hard Sell" | "Soft Sell";
export type VideoDuration = "15s" | "30s" | "60s";
export type Tone = "Friendly" | "Funny" | "Professional" | "Excited";
export type Platform = "TikTok" | "Reels" | "Shorts";
export type VoiceId = string;

export interface GenerationSettings {
  style: VideoStyle;
  targetAudience: string;
  duration: VideoDuration;
  tone: Tone;
  platform: Platform;
  includeCta: boolean;
  includeStoryboard: boolean;
  voiceId: VoiceId;
  voiceModel: "Eleven v3";
  voiceSpeed: number;
  voiceTone: number;
  voicePacing: number;
  voiceStyle: number;
}

export interface StoryboardScene {
  scene: number;
  time: string;
  visual: string;
  voiceover: string;
  shot?: string;
  onScreenText?: string;
  transition?: string;
}

export interface GenerationResult {
  hook: string;
  script: string;
  storyboard: StoryboardScene[];
  caption: string;
  hashtags: string[];
  affiliateLink: string;
}
