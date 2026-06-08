"use client";

import { useState } from "react";
import { Check, Copy, PencilSimple } from "@phosphor-icons/react";
import { mockScripts } from "@/data/mock-scripts";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ScriptLibrary() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (id: string, text: string) => { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 1400); };
  return <div className="grid gap-5 lg:grid-cols-2">{mockScripts.map((script) => <article key={script.id} className="rounded-2xl border border-[#ede7e2] bg-white p-5 shadow-[0_10px_35px_rgba(32,24,20,.035)]"><div className="flex items-start justify-between gap-4"><div><Badge>{script.productName}</Badge><h2 className="mt-3 text-lg font-bold">{script.title}</h2></div><span className="whitespace-nowrap text-xs text-[#92949f]">{formatDate(script.updatedAt)}</span></div><div className="mt-5 rounded-xl bg-[#fff7f2] p-4"><p className="text-[11px] font-bold uppercase tracking-[.13em] text-[#e64b2a]">Hook</p><p className="mt-2 font-semibold leading-6">“{script.hook}”</p></div><div className="mt-4"><p className="text-[11px] font-bold uppercase tracking-[.13em] text-[#8a8d99]">Caption</p><p className="mt-2 text-sm leading-6 text-[#626778]">{script.caption}</p></div><div className="mt-4 flex flex-wrap gap-2">{script.hashtags.map((tag) => <span key={tag} className="text-xs font-medium text-[#e64b2a]">{tag}</span>)}</div><div className="mt-5 flex gap-2 border-t border-[#eee8e3] pt-4"><Button variant="outline" onClick={() => copy(script.id, `${script.hook}\n\n${script.script}\n\n${script.caption}\n${script.hashtags.join(" ")}`)}>{copied === script.id ? <Check className="text-[#15954f]" /> : <Copy />} {copied === script.id ? "Copied" : "Copy"}</Button><Button variant="ghost"><PencilSimple /> Edit</Button></div></article>)}</div>;
}
