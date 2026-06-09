import { GenerationSettings } from "@/types/generator";

export const defaultGenerationSettings: GenerationSettings = {
  style: "Problem-Solution",
  targetAudience: "Busy creators aged 18–34",
  duration: "30s",
  tone: "Friendly",
  platform: "TikTok",
  includeCta: true,
  includeStoryboard: false,
  voiceId: "rachel",
  voiceModel: "Eleven v3",
  voiceSpeed: 50,
  voiceTone: 50,
  voicePacing: 65,
  voiceStyle: 35,
};

export const generationSteps = [
  "Analyzing product",
  "Creating hook",
  "Writing script",
  "Creating caption",
  "Generating video preview",
];
