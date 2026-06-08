"use client";

import Image from "next/image";
import Link from "next/link";
import { Fire, Heart, MagicWand, Star } from "@phosphor-icons/react";
import { Product } from "@/types/product";
import { formatCurrency, formatNumber } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProductCard({ product, saved, onSave, onGenerate }: { product: Product; saved: boolean; onSave: (id: string) => void; onGenerate: (product: Product) => void }) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f8f3ef]">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 30vw" unoptimized={product.image.startsWith("http")} className="object-cover transition duration-500 group-hover:scale-[1.04]" />
        <button
          type="button"
          onClick={() => onSave(product.id)}
          className="focus-ring absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 hover:bg-white"
          aria-label={saved ? "Remove from saved products" : "Save product"}
          aria-pressed={saved}
          title={saved ? "Remove from saved" : "Save product"}
        >
          <Heart
            size={18}
            weight={saved ? "fill" : "regular"}
            className={saved ? "text-[#ff5a36]" : "text-[#394056]"}
          />
        </button>
        <Badge className="absolute left-3 top-3 bg-white/95 text-[#e94725]"><Fire weight="fill" /> {product.viralScore} viral</Badge>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-[#898c98]"><span>{product.category}</span><span className="flex items-center gap-1"><Star weight="fill" className="text-[#f5a623]" /> {product.rating} · {formatNumber(product.sold)} sold</span></div>
        <h3 className="mt-2 min-h-12 text-base font-bold leading-6">{product.name}</h3>
        <p className="mt-1 text-xs text-[#898c98]">{product.shopName}</p>
        <div className="mt-4 flex items-end justify-between"><div><p className="text-xl font-extrabold">{formatCurrency(product.price)}</p><p className="mt-1 text-xs font-semibold text-[#15934e]">{product.commissionRate}% · earn {formatCurrency(product.estimatedCommission)}</p></div><Link href={`/products/${product.id}`} className="text-xs font-bold text-[#e84b2a] hover:underline">View detail</Link></div>
        <Button onClick={() => onGenerate(product)} className="mt-4 w-full"><MagicWand size={18} weight="fill" /> Generate Video</Button>
      </div>
    </Card>
  );
}
