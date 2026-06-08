"use client";

import Image from "next/image";
import { X, MagicWand } from "@phosphor-icons/react";
import { Product } from "@/types/product";
import { useAiGeneration } from "@/hooks/use-ai-generation";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { GenerationSettings } from "./generation-settings";
import { GenerationProgress } from "./generation-progress";
import { GeneratedResult } from "./generated-result";

export function AiGeneratorDrawer({ product, open, onClose }: { product: Product | null; open: boolean; onClose: () => void }) {
  const generation = useAiGeneration(product ?? undefined);
  if (!open || !product) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#11162e]/35 backdrop-blur-[2px] animate-fade-in" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="h-full w-full max-w-[720px] overflow-y-auto bg-[#fffaf6] shadow-2xl animate-slide-in">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#ede6e1] bg-white/95 px-5 py-4 backdrop-blur"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#e64b2a]">AI campaign studio</p><h2 className="mt-1 text-xl font-extrabold">Generate affiliate video</h2></div><Button variant="ghost" size="icon" onClick={onClose} aria-label="Close drawer"><X size={21} /></Button></div>
        <div className="space-y-6 p-5 md:p-7">
          <div className="flex gap-4 rounded-2xl border border-[#ede7e2] bg-white p-4"><Image src={product.image} alt={product.name} width={96} height={96} unoptimized={product.image.startsWith("http")} className="size-24 rounded-xl object-cover" /><div><p className="text-xs font-semibold text-[#e64b2a]">{product.category}</p><h3 className="mt-1 font-bold">{product.name}</h3><p className="mt-2 text-sm text-[#747887]">{formatCurrency(product.price)} · {product.commissionRate}% commission</p><p className="mt-1 text-xs font-semibold text-[#15954f]">Earn about {formatCurrency(product.estimatedCommission)} per sale</p></div></div>
          {generation.status === "idle" && <><section><h3 className="mb-4 font-bold">Generation settings</h3><GenerationSettings settings={generation.settings} onChange={generation.setSettings} /></section><Button size="lg" className="w-full" onClick={generation.generate}><MagicWand size={20} weight="fill" /> Generate Now</Button></>}
          {generation.status === "loading" && <GenerationProgress steps={generation.steps} activeStep={generation.step} />}
          {generation.status === "complete" && generation.result && <GeneratedResult result={generation.result} onRegenerate={generation.generate} />}
        </div>
      </aside>
    </div>
  );
}
