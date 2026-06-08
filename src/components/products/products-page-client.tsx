"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useProductSearch } from "@/hooks/use-product-search";
import { useSavedProducts } from "@/hooks/use-saved-products";
import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";
import { ProductSearchBar } from "./product-search-bar";
import { AiGeneratorDrawer } from "@/components/generator/ai-generator-drawer";

export function ProductsPageClient() {
  const search = useProductSearch();
  const saved = useSavedProducts();
  const [selected, setSelected] = useState<Product | null>(null);
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row"><ProductSearchBar value={search.query} onChange={search.setQuery} /><select value={search.sort} onChange={(e) => search.setSort(e.target.value)} className="focus-ring h-12 rounded-xl border border-[#e7e1dc] bg-white px-4 text-sm"><option value="viral">Sort: Viral score</option><option value="commission">Sort: Commission</option><option value="price">Sort: Lowest price</option></select></div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]"><ProductFilters category={search.category} setCategory={search.setCategory} minCommission={search.minCommission} setMinCommission={search.setMinCommission} /><div><div className="mb-4 flex items-center justify-between"><p className="text-sm text-[#777b8a]"><b className="text-[#181d32]">{search.loading ? "..." : search.totalCount}</b> products found</p>{search.loading && <span className="text-xs font-semibold text-[#e64b2a]">Searching API...</span>}</div>{search.error && <div className="mb-4 rounded-xl border border-[#ffd7ca] bg-[#fff3ee] px-4 py-3 text-xs font-medium text-[#a9432c]">{search.error} Showing the last available products.</div>}<ProductGrid products={search.products} savedIds={saved.savedIds} onSave={saved.toggleSaved} onGenerate={setSelected} /></div></div>
      <AiGeneratorDrawer product={selected} open={Boolean(selected)} onClose={() => setSelected(null)} />
    </>
  );
}
