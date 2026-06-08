"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  FilmStrip,
  FunnelSimple,
  MagicWand,
  Play,
  Sparkle,
} from "@phosphor-icons/react";
import { mockTemplates } from "@/data/mock-templates";
import { Platform, VideoStyle } from "@/types/generator";
import { Badge } from "@/components/ui/badge";

const styles: Array<"All" | VideoStyle> = [
  "All",
  "Review",
  "Problem-Solution",
  "Funny",
  "Storytelling",
  "Hard Sell",
  "Soft Sell",
];

const platforms: Array<"All" | Platform> = ["All", "TikTok", "Reels", "Shorts"];

export function TemplateLibrary() {
  const [style, setStyle] = useState<(typeof styles)[number]>("All");
  const [platform, setPlatform] = useState<(typeof platforms)[number]>("All");

  const templates = useMemo(
    () =>
      mockTemplates.filter(
        (template) =>
          (style === "All" || template.style === style) &&
          (platform === "All" || template.platform === platform),
      ),
    [platform, style],
  );

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#f0ddd5] bg-[#fff0ea] p-6 md:flex-row md:items-center">
        <div>
          <Badge className="bg-white/75">
            <Sparkle size={13} weight="fill" />
            Creator-tested formats
          </Badge>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-.04em]">
            Pick a proven structure. Make it yours.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#736e78]">
            Every template includes a hook pattern, scene flow, recommended duration,
            and platform-ready pacing.
          </p>
        </div>
        <Link
          href="/generator"
          className="focus-ring flex h-12 items-center justify-center gap-2 rounded-xl bg-[#ff5a36] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(255,90,54,.2)] hover:bg-[#e84322]"
        >
          <MagicWand size={18} weight="fill" />
          Start from scratch
        </Link>
      </section>

      <section className="rounded-2xl border border-[#ebe6e2] bg-white p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-[#343a4e]">
            <FunnelSimple size={18} />
            Filter templates
          </div>
          <div className="flex flex-wrap gap-2">
            {styles.map((item) => (
              <button
                key={item}
                onClick={() => setStyle(item)}
                className={`focus-ring rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                  style === item
                    ? "bg-[#fff0ea] text-[#e64b2a]"
                    : "border border-[#ebe6e2] text-[#626779] hover:bg-[#faf7f4]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value as (typeof platforms)[number])}
            className="focus-ring h-10 rounded-xl border border-[#e7e1dc] bg-white px-3 text-xs font-semibold text-[#4d5366]"
          >
            {platforms.map((item) => (
              <option key={item}>{item === "All" ? "All platforms" : item}</option>
            ))}
          </select>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {templates.map((template) => (
          <article
            key={template.id}
            className="group overflow-hidden rounded-2xl border border-[#eae5e1] bg-white shadow-[0_10px_32px_rgba(32,24,20,.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(32,24,20,.08)]"
          >
            <div className={`relative flex aspect-[16/9] items-center justify-center ${template.color}`}>
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge className="bg-white/85 text-[#3e4457]">{template.platform}</Badge>
                {template.popular && <Badge>Popular</Badge>}
              </div>
              <div className={`flex size-16 items-center justify-center rounded-full bg-white/85 shadow-sm ${template.accent}`}>
                <Play size={28} weight="fill" />
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/75 bg-white/70 px-4 py-3 backdrop-blur">
                <p className={`text-[10px] font-bold uppercase tracking-[.12em] ${template.accent}`}>Hook pattern</p>
                <p className="mt-1 truncate text-sm font-bold text-[#22283b]">“{template.hook}”</p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={`text-xs font-bold ${template.accent}`}>{template.style}</p>
                  <h3 className="mt-1 text-lg font-bold">{template.name}</h3>
                </div>
                <FilmStrip size={21} className="shrink-0 text-[#9699a4]" />
              </div>
              <p className="mt-3 min-h-12 text-sm leading-6 text-[#6d7282]">{template.description}</p>
              <div className="mt-4 flex items-center gap-4 border-t border-[#eee9e5] pt-4 text-xs text-[#74798a]">
                <span className="flex items-center gap-1.5"><Clock size={15} /> {template.duration}</span>
                <span className="flex items-center gap-1.5"><FilmStrip size={15} /> {template.scenes} scenes</span>
              </div>
              <Link
                href={`/generator?template=${template.id}`}
                className="focus-ring mt-4 flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ff5a36] text-sm font-bold text-white transition hover:bg-[#e84322]"
              >
                Use template <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {!templates.length && (
        <div className="rounded-2xl border border-dashed border-[#ddd5cf] bg-white p-12 text-center">
          <p className="font-bold">No templates match these filters</p>
          <button
            onClick={() => {
              setStyle("All");
              setPlatform("All");
            }}
            className="mt-3 text-sm font-semibold text-[#e64b2a] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
