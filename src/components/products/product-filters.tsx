"use client";

import { SlidersHorizontal } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";

const categories = ["All", "Pet Supplies", "Home Gadgets", "Beauty", "Viral Finds"];

export function ProductFilters({ category, setCategory, minCommission, setMinCommission }: { category: string; setCategory: (v: string) => void; minCommission: number; setMinCommission: (v: number) => void }) {
  return (
    <Card className="h-fit p-5">
      <h2 className="flex items-center gap-2 font-bold"><SlidersHorizontal size={19} /> Filters</h2>
      <div className="mt-6"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#8d8f9b]">Category</p><div className="mt-3 space-y-1">{categories.map((item) => <button onClick={() => setCategory(item)} key={item} className={`focus-ring block w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${category === item ? "bg-[#fff0ea] font-semibold text-[#df4828]" : "text-[#63687a] hover:bg-[#faf6f3]"}`}>{item}</button>)}</div></div>
      <div className="mt-7"><div className="flex justify-between text-xs font-bold uppercase tracking-[.12em] text-[#8d8f9b]"><span>Min commission</span><span className="text-[#e84c2b]">{minCommission}%</span></div><input type="range" min="0" max="30" step="5" value={minCommission} onChange={(e) => setMinCommission(Number(e.target.value))} className="mt-4 w-full accent-[#ff5a36]" /></div>
      <div className="mt-7 rounded-xl bg-[#fff7f2] p-4"><p className="text-sm font-bold">Creator tip</p><p className="mt-2 text-xs leading-5 text-[#787b89]">A viral score above 85 plus 20% commission is a strong starting point.</p></div>
    </Card>
  );
}
