"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle, Copy, Fire, MagicWand, Star } from "@phosphor-icons/react";
import { Product } from "@/types/product";
import { formatCurrency, formatNumber } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AiGeneratorDrawer } from "@/components/generator/ai-generator-drawer";

export function ProductDetailPanel({ product }: { product: Product }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyLink = async () => { await navigator.clipboard.writeText(product.affiliateLink); setCopied(true); setTimeout(() => setCopied(false), 1400); };
  return (
    <>
      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_minmax(420px,.85fr)]">
        <div className="relative min-h-[440px] overflow-hidden rounded-3xl bg-[#f5ece7]"><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1280px) 100vw, 55vw" className="object-cover" /></div>
        <div className="rounded-3xl border border-[#ede7e2] bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2"><Badge>{product.category}</Badge><Badge className="bg-[#eaf8ef] text-[#148b4a]"><Fire weight="fill" /> Viral score {product.viralScore}</Badge></div>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-.045em]">{product.name}</h2>
          <p className="mt-3 text-sm leading-7 text-[#6f7484]">{product.description}</p>
          <div className="mt-4 flex items-center gap-3 text-sm"><span className="flex items-center gap-1 font-bold"><Star weight="fill" className="text-[#f3a221]" /> {product.rating}</span><span className="text-[#8b8e9a]">{formatNumber(product.sold)} sold</span><span className="text-[#8b8e9a]">by {product.shopName}</span></div>
          <div className="mt-7 grid grid-cols-3 gap-3 rounded-2xl bg-[#fff7f2] p-4"><div><p className="text-xs text-[#898c98]">Price</p><p className="mt-1 text-lg font-extrabold">{formatCurrency(product.price)}</p></div><div><p className="text-xs text-[#898c98]">Commission</p><p className="mt-1 text-lg font-extrabold text-[#15944f]">{product.commissionRate}%</p></div><div><p className="text-xs text-[#898c98]">Est. per sale</p><p className="mt-1 text-lg font-extrabold text-[#15944f]">{formatCurrency(product.estimatedCommission)}</p></div></div>
          <div className="mt-6"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#888b98]">Affiliate link with sub_id</p><div className="mt-2 flex gap-2"><input readOnly value={product.affiliateLink} className="min-w-0 flex-1 rounded-xl border border-[#e9e2dc] bg-[#faf7f5] px-3 text-xs text-[#656a78]" /><Button variant="outline" size="icon" onClick={copyLink}>{copied ? <CheckCircle className="text-[#15944f]" /> : <Copy />}</Button></div></div>
          <Button size="lg" className="mt-7 w-full" onClick={() => setDrawerOpen(true)}><MagicWand size={20} weight="fill" /> Generate Video</Button>
        </div>
      </div>
      <AiGeneratorDrawer product={product} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
