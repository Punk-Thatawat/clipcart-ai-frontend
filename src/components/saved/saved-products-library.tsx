"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowsLeftRight,
  Fire,
  Heart,
  MagicWand,
  MagnifyingGlass,
  Star,
  Trash,
} from "@phosphor-icons/react";
import { mockProducts } from "@/data/mock-products";
import { useSavedProducts } from "@/hooks/use-saved-products";
import { Product } from "@/types/product";
import { AiGeneratorDrawer } from "@/components/generator/ai-generator-drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/lib/format";

export function SavedProductsLibrary() {
  const { savedIds, removeSaved } = useSavedProducts();
  const savedProducts = useMemo(
    () => mockProducts.filter((product) => savedIds.includes(product.id)),
    [savedIds],
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("viral");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  const categories = ["All", ...Array.from(new Set(savedProducts.map((product) => product.category)))];

  const products = useMemo(() => {
    const filtered = savedProducts.filter(
      (product) =>
        `${product.name} ${product.shopName} ${product.category}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (category === "All" || product.category === category),
    );
    return [...filtered].sort((a, b) =>
      sort === "commission"
        ? b.commissionRate - a.commissionRate
        : sort === "price"
          ? a.price - b.price
          : b.viralScore - a.viralScore,
    );
  }, [category, query, savedProducts, sort]);

  const toggleCompare = (id: string) => {
    setCompareIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length < 3
          ? [...current, id]
          : current,
    );
  };

  const removeProduct = (id: string) => {
    removeSaved(id);
    setCompareIds((current) => current.filter((item) => item !== id));
  };

  const compared = compareIds
    .map((id) => savedProducts.find((product) => product.id === id))
    .filter(Boolean) as Product[];

  return (
    <>
      <div className="space-y-6">
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#f0ddd5] bg-[#fff0ea] p-6 md:flex-row md:items-center">
          <div>
            <Badge className="bg-white/80">
              <Heart size={13} weight="fill" />
              {savedProducts.length} saved products
            </Badge>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-.04em]">
              Your shortlist of campaign-ready products.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#746e77]">
              Compare commission potential, viral scores, and prices before
              generating your next affiliate video.
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="bg-white/80">
              <MagnifyingGlass size={17} />
              Find more products
            </Button>
          </Link>
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-[#eae5e1] bg-white p-4 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9295a0]" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search saved products..."
              className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] pl-11 pr-4 text-sm"
            />
          </div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="focus-ring h-11 rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm">
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="focus-ring h-11 rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm">
            <option value="viral">Highest viral score</option>
            <option value="commission">Highest commission</option>
            <option value="price">Lowest price</option>
          </select>
        </section>

        {compared.length > 0 && (
          <section className="rounded-2xl border border-[#e3dcff] bg-[#f7f5ff] p-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="flex items-center gap-2 font-bold"><ArrowsLeftRight size={18} className="text-[#6852d5]" /> Compare products</h3>
                <p className="mt-1 text-xs text-[#777b89]">Select up to 3 products. {compared.length}/3 selected.</p>
              </div>
              <button onClick={() => setCompareIds([])} className="text-xs font-semibold text-[#6852d5] hover:underline">Clear comparison</button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {compared.map((product) => (
                <div key={product.id} className="flex items-center gap-3 rounded-xl bg-white p-3">
                  <Image src={product.image} alt="" width={52} height={52} className="size-13 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{product.name}</p><p className="mt-1 text-[10px] text-[#16894a]">{product.commissionRate}% commission · Score {product.viralScore}</p></div>
                  <button onClick={() => toggleCompare(product.id)} className="text-[#9a9ca6] hover:text-[#e64b2a]">×</button>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
          {products.map((product) => {
            const comparing = compareIds.includes(product.id);
            return (
              <article key={product.id} className="group overflow-hidden rounded-2xl border border-[#eae5e1] bg-white shadow-[0_10px_32px_rgba(32,24,20,.04)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f2ee]">
                  <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                  <Badge className="absolute left-3 top-3 bg-white/90 text-[#e64b2a]"><Fire size={13} weight="fill" /> {product.viralScore}</Badge>
                  <button onClick={() => removeProduct(product.id)} className="focus-ring absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-[#ff5a36] shadow-sm hover:bg-[#fff0ea]" aria-label="Remove from saved">
                    <Heart size={18} weight="fill" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 text-xs text-[#858896]">
                    <span>{product.category}</span>
                    <span className="flex items-center gap-1"><Star size={13} weight="fill" className="text-[#f0a126]" /> {product.rating} · {formatNumber(product.sold)} sold</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold leading-6">{product.name}</h3>
                  <p className="mt-1 text-xs text-[#858896]">{product.shopName}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-[#faf7f4] p-3">
                    <div><p className="text-[10px] text-[#92949f]">Price</p><p className="mt-1 text-sm font-bold">{formatCurrency(product.price)}</p></div>
                    <div><p className="text-[10px] text-[#92949f]">Commission</p><p className="mt-1 text-sm font-bold text-[#16894a]">{product.commissionRate}%</p></div>
                    <div><p className="text-[10px] text-[#92949f]">Earn / sale</p><p className="mt-1 text-sm font-bold text-[#16894a]">{formatCurrency(product.estimatedCommission)}</p></div>
                  </div>
                  <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                    <Button onClick={() => setSelected(product)}><MagicWand size={17} weight="fill" /> Generate Video</Button>
                    <Button variant={comparing ? "soft" : "outline"} size="icon" onClick={() => toggleCompare(product.id)} aria-label="Compare product"><ArrowsLeftRight size={17} /></Button>
                  </div>
                  <button onClick={() => removeProduct(product.id)} className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs font-medium text-[#8b8e9b] hover:text-[#c3402a]"><Trash size={14} /> Remove from saved</button>
                </div>
              </article>
            );
          })}
        </div>

        {!products.length && (
          <div className="rounded-2xl border border-dashed border-[#ddd5cf] bg-white p-12 text-center">
            <Heart size={34} className="mx-auto text-[#bbb8b4]" />
            <p className="mt-3 font-bold">No saved products found</p>
            <p className="mt-1 text-sm text-[#858896]">Try clearing the search or save products from Product Finder.</p>
          </div>
        )}
      </div>

      <AiGeneratorDrawer product={selected} open={Boolean(selected)} onClose={() => setSelected(null)} />
    </>
  );
}
