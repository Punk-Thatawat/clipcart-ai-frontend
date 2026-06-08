"use client";

import { useState } from "react";
import { Check, Copy, FloppyDisk, Play, Repeat } from "@phosphor-icons/react";
import { GenerationResult } from "@/types/generator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScriptEditor } from "./script-editor";
import { StoryboardList } from "./storyboard-list";

export function GeneratedResult({ result, onRegenerate }: { result: GenerationResult; onRegenerate: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(`${result.hook}\n\n${result.script}`); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><Badge className="bg-[#eaf8ef] text-[#148a49]">Generation complete</Badge><h2 className="mt-2 text-2xl font-extrabold tracking-[-.04em]">Your campaign is ready</h2></div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={copy}>{copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy Script"}</Button><Button variant="outline"><FloppyDisk /> Save Campaign</Button><Button variant="soft" onClick={onRegenerate}><Repeat /> Regenerate</Button></div></div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-[#ede7e2] bg-white p-5"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#e54a29]">Hook</p><p className="mt-3 text-xl font-bold leading-8">“{result.hook}”</p></section>
          <section className="rounded-2xl border border-[#ede7e2] bg-white p-5"><h3 className="font-bold">Speaking script</h3><div className="mt-4"><ScriptEditor initialValue={result.script} /></div></section>
          <section className="rounded-2xl border border-[#ede7e2] bg-white p-5"><h3 className="font-bold">Scene-by-scene storyboard</h3><div className="mt-4"><StoryboardList scenes={result.storyboard} /></div></section>
          <section className="rounded-2xl border border-[#ede7e2] bg-white p-5"><h3 className="font-bold">Caption & hashtags</h3><p className="mt-3 text-sm leading-6 text-[#5f6474]">{result.caption}</p><div className="mt-3 flex flex-wrap gap-2">{result.hashtags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div></section>
          <section className="rounded-2xl border border-[#ede7e2] bg-white p-5"><h3 className="font-bold">Affiliate link</h3><div className="mt-3 flex gap-2"><input readOnly value={result.affiliateLink} className="min-w-0 flex-1 rounded-xl bg-[#f7f4f2] px-3 text-xs text-[#606576]" /><Button size="icon" variant="outline" onClick={() => navigator.clipboard.writeText(result.affiliateLink)}><Copy /></Button></div></section>
        </div>
        <div className="h-fit rounded-[28px] bg-[#171b2e] p-3 shadow-xl">
          <div className="flex aspect-[9/16] flex-col items-center justify-center rounded-[22px] bg-[#f6cbbb] px-6 text-center text-[#2c1b1a]"><span className="flex size-16 items-center justify-center rounded-full bg-white/75"><Play size={28} weight="fill" className="text-[#ff5a36]" /></span><p className="mt-5 text-lg font-extrabold">AI video preview</p><p className="mt-2 text-xs leading-5 opacity-70">Your generated scenes, voiceover, and captions will appear here.</p></div>
        </div>
      </div>
    </div>
  );
}
