"use client";

import Image from "next/image";
import { MagicWand, Sparkle } from "@phosphor-icons/react";
import { Product } from "@/types/product";
import { useAiGeneration } from "@/hooks/use-ai-generation";
import { mockProducts } from "@/data/mock-products";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { GenerationSettings } from "./generation-settings";
import { GenerationProgress } from "./generation-progress";
import { GeneratedResult } from "./generated-result";

export function GeneratorWorkspace() {
  const product: Product = mockProducts[0];
  const generation = useAiGeneration(product);
  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="h-fit space-y-5 rounded-2xl border border-[#ede7e2] bg-white p-5">
        <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#e54a29]">Selected product</p><div className="mt-3 flex gap-3"><Image src={product.image} alt={product.name} width={76} height={76} className="size-[76px] rounded-xl object-cover" /><div><p className="font-bold leading-5">{product.name}</p><p className="mt-2 text-xs text-[#7b7f8e]">{formatCurrency(product.price)} · {product.commissionRate}% commission</p></div></div></div>
        <div className="border-t border-[#eee8e3] pt-5"><h2 className="mb-4 font-bold">Video settings</h2><GenerationSettings settings={generation.settings} onChange={generation.setSettings} /></div>
        <Button className="w-full" size="lg" onClick={generation.generate} disabled={generation.status === "loading"}><MagicWand size={19} weight="fill" /> {generation.status === "complete" ? "Generate Again" : "Generate Now"}</Button>
      </aside>
      <section>
        {generation.status === "idle" && <div className="flex min-h-[620px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#dfd5cf] bg-white/65 p-8 text-center"><span className="flex size-20 items-center justify-center rounded-3xl bg-[#fff0ea] text-[#ff5a36]"><Sparkle size={38} weight="fill" /></span><h2 className="mt-6 text-2xl font-extrabold tracking-[-.04em]">One click from campaign-ready</h2><p className="mt-3 max-w-md text-sm leading-6 text-[#727687]">Choose your style and audience, then ClipCart will create the hook, script, storyboard, caption, hashtags, affiliate link, and video preview.</p></div>}
        {generation.status === "loading" && <div className="mx-auto max-w-xl pt-12"><GenerationProgress steps={generation.steps} activeStep={generation.step} /></div>}
        {generation.status === "complete" && generation.result && <GeneratedResult result={generation.result} onRegenerate={generation.generate} />}
      </section>
    </div>
  );
}
