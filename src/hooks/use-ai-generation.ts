"use client";

import { useEffect, useState } from "react";
import { defaultGenerationSettings, generationSteps } from "@/lib/constants";
import { buildStoryboard } from "@/lib/storyboard";
import { GenerationResult, GenerationSettings } from "@/types/generator";
import { Product } from "@/types/product";

export function useAiGeneration(product?: Product) {
  const [settings, setSettings] = useState<GenerationSettings>(defaultGenerationSettings);
  const [status, setStatus] = useState<"idle" | "loading" | "complete">("idle");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<GenerationResult | null>(null);

  useEffect(() => {
    if (status !== "loading") return;
    if (step >= generationSteps.length - 1) {
      const timer = window.setTimeout(() => {
        const name = product?.name ?? "this product";
        setResult({
          hook: `Wait - why is everyone adding ${name} to their cart?`,
          script: `I kept seeing ${name} everywhere, so I tested it. The first thing I noticed was how simple it is to use. It solves a small but genuinely annoying everyday problem, and the result is instantly visible on camera. If you love smart finds that make life easier, this one is worth a look.${settings.includeCta ? " Tap the link to check today's price before it changes." : ""}`,
          storyboard: buildStoryboard(settings, name),
          caption:
            "This little find earns the hype. A simple upgrade that makes everyday life easier.",
          hashtags: [
            "#TikTokMadeMeBuyIt",
            "#AffiliateFinds",
            "#ViralProducts",
            "#CreatorTips",
          ],
          affiliateLink:
            product?.affiliateLink ??
            "https://clipcart.ai/go/product?sub_id=cc_generator_01",
        });
        setStatus("complete");
      }, 850);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(
      () => setStep((current) => current + 1),
      850,
    );
    return () => window.clearTimeout(timer);
  }, [status, step, product, settings]);

  const generate = () => {
    setStep(0);
    setResult(null);
    setStatus("loading");
  };

  const reset = () => {
    setStatus("idle");
    setStep(0);
    setResult(null);
  };

  return {
    settings,
    setSettings,
    status,
    step,
    result,
    generate,
    reset,
    steps: generationSteps,
  };
}
