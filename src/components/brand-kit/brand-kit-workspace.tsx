"use client";

import { useState } from "react";
import {
  Check,
  Hash,
  ImageSquare,
  MagicWand,
  Palette,
  Plus,
  Quotes,
  Sparkle,
  TextAa,
  UploadSimple,
} from "@phosphor-icons/react";
import { BrandKit } from "@/types/brand-kit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialBrand: BrandKit = {
  name: "Sarah Creates",
  handle: "@sarahfinds",
  tagline: "Smart finds for easier everyday life.",
  voice: "Friendly & honest",
  audience: "Busy creators and young professionals aged 18–34",
  primaryColor: "#FF5A36",
  secondaryColor: "#10172F",
  accentColor: "#E9F8EF",
  fontStyle: "Modern & bold",
  defaultCta: "Tap the link to check today’s price.",
  hashtags: ["#SarahFinds", "#SmartShopping", "#CreatorPicks"],
  wordsToUse: "simple, genuinely useful, worth it, everyday upgrade",
  wordsToAvoid: "guaranteed, life-changing, cheapest ever, must buy",
};

const voices = ["Friendly & honest", "Excited & energetic", "Calm & premium", "Funny & playful", "Expert & educational"];
const fontStyles = ["Modern & bold", "Clean & minimal", "Soft & editorial", "Playful & rounded"];

export function BrandKitWorkspace() {
  const [brand, setBrand] = useState(initialBrand);
  const [newHashtag, setNewHashtag] = useState("");
  const [saved, setSaved] = useState(false);
  const [logoMode, setLogoMode] = useState<"initials" | "uploaded">("initials");

  const update = <K extends keyof BrandKit>(key: K, value: BrandKit[K]) =>
    setBrand((current) => ({ ...current, [key]: value }));

  const addHashtag = () => {
    const formatted = newHashtag.trim().startsWith("#")
      ? newHashtag.trim()
      : `#${newHashtag.trim().replace(/\s+/g, "")}`;
    if (!formatted || formatted === "#" || brand.hashtags.includes(formatted)) return;
    update("hashtags", [...brand.hashtags, formatted]);
    setNewHashtag("");
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#f0ddd5] bg-[#fff0ea] p-6 md:flex-row md:items-center">
        <div>
          <Badge className="bg-white/80">
            <Sparkle size={13} weight="fill" />
            Applied to AI generations
          </Badge>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-.04em]">
            Make every video unmistakably yours.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#746e77]">
            Define your visual identity, writing style, preferred language, CTA,
            and hashtags once. ClipCart will use them as generation defaults.
          </p>
        </div>
        <Button onClick={save} className="min-w-[150px]">
          {saved ? <Check size={18} weight="bold" /> : <MagicWand size={18} weight="fill" />}
          {saved ? "Brand saved" : "Save brand kit"}
        </Button>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff0ea] text-[#ff5a36]">
                <ImageSquare size={20} weight="fill" />
              </span>
              <div><h3 className="font-bold">Brand identity</h3><p className="mt-0.5 text-xs text-[#858896]">Logo, creator name, and positioning</p></div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-[180px_minmax(0,1fr)]">
              <div>
                <div
                  className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-[#ddd5cf] text-white shadow-sm"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  {logoMode === "initials" ? (
                    <span className="text-4xl font-extrabold tracking-[-.08em]">
                      {brand.name.split(" ").map((item) => item[0]).join("").slice(0, 2)}
                    </span>
                  ) : (
                    <ImageSquare size={48} weight="fill" />
                  )}
                </div>
                <button onClick={() => setLogoMode((current) => current === "initials" ? "uploaded" : "initials")} className="focus-ring mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#e7e1dc] text-xs font-semibold text-[#555b6f] hover:bg-[#faf7f4]">
                  <UploadSimple size={16} /> Upload logo
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Brand name</span><Input value={brand.name} onChange={(event) => update("name", event.target.value)} /></label>
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Creator handle</span><Input value={brand.handle} onChange={(event) => update("handle", event.target.value)} /></label>
                <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Tagline</span><Input value={brand.tagline} onChange={(event) => update("tagline", event.target.value)} /></label>
                <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Target audience</span><Input value={brand.audience} onChange={(event) => update("audience", event.target.value)} /></label>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#efedff] text-[#6655c5]"><Palette size={20} weight="fill" /></span>
              <div><h3 className="font-bold">Visual style</h3><p className="mt-0.5 text-xs text-[#858896]">Colors and typography used in previews</p></div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Primary", "primaryColor"],
                ["Secondary", "secondaryColor"],
                ["Accent", "accentColor"],
              ].map(([label, key]) => (
                <label key={key} className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">{label}</span>
                  <div className="flex h-11 items-center gap-2 rounded-xl border border-[#e7e1dc] bg-white px-2">
                    <input type="color" value={brand[key as keyof BrandKit] as string} onChange={(event) => update(key as "primaryColor", event.target.value)} className="size-7 cursor-pointer rounded border-0 bg-transparent" />
                    <span className="font-mono text-xs text-[#596073]">{brand[key as keyof BrandKit]}</span>
                  </div>
                </label>
              ))}
              <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Typography</span><select value={brand.fontStyle} onChange={(event) => update("fontStyle", event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm">{fontStyles.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
          </section>

          <section className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#e9f8ef] text-[#16894a]"><Quotes size={20} weight="fill" /></span>
              <div><h3 className="font-bold">Brand voice</h3><p className="mt-0.5 text-xs text-[#858896]">Guide how ClipCart writes scripts and captions</p></div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Voice style</span><select value={brand.voice} onChange={(event) => update("voice", event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm">{voices.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Default CTA</span><Input value={brand.defaultCta} onChange={(event) => update("defaultCta", event.target.value)} /></label>
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Words to use</span><textarea value={brand.wordsToUse} onChange={(event) => update("wordsToUse", event.target.value)} className="focus-ring min-h-24 w-full rounded-xl border border-[#e7e1dc] p-3 text-sm leading-6" /></label>
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Words to avoid</span><textarea value={brand.wordsToAvoid} onChange={(event) => update("wordsToAvoid", event.target.value)} className="focus-ring min-h-24 w-full rounded-xl border border-[#e7e1dc] p-3 text-sm leading-6" /></label>
            </div>
          </section>

          <section className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf3ff] text-[#3478d4]"><Hash size={20} weight="bold" /></span>
              <div><h3 className="font-bold">Default hashtags</h3><p className="mt-0.5 text-xs text-[#858896]">Added automatically to generated captions</p></div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {brand.hashtags.map((tag) => (
                <button key={tag} onClick={() => update("hashtags", brand.hashtags.filter((item) => item !== tag))} className="focus-ring rounded-full bg-[#fff0ea] px-3 py-2 text-xs font-semibold text-[#d94627] hover:bg-[#ffe1d6]">{tag} ×</button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Input value={newHashtag} onChange={(event) => setNewHashtag(event.target.value)} onKeyDown={(event) => event.key === "Enter" && (event.preventDefault(), addHashtag())} placeholder="#YourBrandTag" />
              <Button variant="outline" size="icon" onClick={addHashtag}><Plus size={17} /></Button>
            </div>
          </section>
        </div>

        <aside className="h-fit xl:sticky xl:top-24">
          <section className="overflow-hidden rounded-2xl border border-[#eae5e1] bg-white shadow-[0_16px_42px_rgba(32,24,20,.08)]">
            <div className="border-b border-[#eee9e5] px-5 py-4"><h3 className="font-bold">Brand preview</h3><p className="mt-1 text-xs text-[#858896]">How your generated content can look</p></div>
            <div className="p-5">
              <div className="overflow-hidden rounded-[24px] bg-[#151a2d] p-2.5 shadow-xl">
                <div className="flex aspect-[9/14] flex-col justify-between rounded-[18px] p-5 text-white" style={{ backgroundColor: brand.secondaryColor }}>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full text-sm font-extrabold" style={{ backgroundColor: brand.primaryColor }}>
                      {brand.name.split(" ").map((item) => item[0]).join("").slice(0, 2)}
                    </span>
                    <div><p className="text-sm font-bold">{brand.name || "Your brand"}</p><p className="text-[10px] text-white/60">{brand.handle || "@yourhandle"}</p></div>
                  </div>

                  <div>
                    <Badge className="bg-white/15 text-white">Creator pick</Badge>
                    <h4 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-.04em]">
                      This little find made my routine so much easier.
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-white/70">{brand.tagline}</p>
                  </div>

                  <div>
                    <p className="rounded-xl px-4 py-3 text-center text-sm font-bold text-white" style={{ backgroundColor: brand.primaryColor }}>
                      {brand.defaultCta}
                    </p>
                    <p className="mt-4 line-clamp-2 text-xs leading-5 text-white/60">{brand.hashtags.join(" ")}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-xl bg-[#fff7f2] p-4">
                <p className="flex items-center gap-2 text-sm font-bold"><TextAa size={17} className="text-[#ff5a36]" /> {brand.voice}</p>
                <p className="mt-2 text-xs leading-5 text-[#777b89]">Future scripts will prioritize your saved vocabulary, CTA, colors, and hashtags.</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
