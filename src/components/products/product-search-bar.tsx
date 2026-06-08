"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

export function ProductSearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="relative flex-1"><MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-[#898c99]" size={20} /><Input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search product name, category, or shop..." className="h-12 pl-12" /></div>;
}
