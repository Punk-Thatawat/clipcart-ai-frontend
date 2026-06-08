"use client";

import { GenerationSettings as Settings, Platform, Tone, VideoDuration, VideoStyle } from "@/types/generator";

const styles: VideoStyle[] = ["Review", "Problem-Solution", "Funny", "Storytelling", "Hard Sell", "Soft Sell"];
const durations: VideoDuration[] = ["15s", "30s", "60s"];
const tones: Tone[] = ["Friendly", "Funny", "Professional", "Excited"];
const platforms: Platform[] = ["TikTok", "Reels", "Shorts"];

function SettingsSelect({ label, value, options, onSelect }: { label: string; value: string; options: string[]; onSelect: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">{label}</span>
      <select value={value} onChange={(e) => onSelect(e.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e8e1dc] bg-white px-3 text-sm">
        <option value={value}>{value}</option>
        {options.filter((item) => item !== value).map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  );
}

export function GenerationSettings({ settings, onChange }: { settings: Settings; onChange: (settings: Settings) => void }) {
  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => onChange({ ...settings, [key]: value });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SettingsSelect label="Video style" value={settings.style} options={styles} onSelect={(v) => update("style", v as VideoStyle)} />
      <SettingsSelect label="Duration" value={settings.duration} options={durations} onSelect={(v) => update("duration", v as VideoDuration)} />
      <SettingsSelect label="Tone" value={settings.tone} options={tones} onSelect={(v) => update("tone", v as Tone)} />
      <SettingsSelect label="Platform" value={settings.platform} options={platforms} onSelect={(v) => update("platform", v as Platform)} />
      <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Target audience</span><input value={settings.targetAudience} onChange={(e) => update("targetAudience", e.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e8e1dc] bg-white px-3 text-sm" /></label>
      <label className="flex items-center gap-3 rounded-xl bg-[#fff5f0] p-4 text-sm font-medium sm:col-span-2"><input type="checkbox" checked={settings.includeCta} onChange={(e) => update("includeCta", e.target.checked)} className="size-4 accent-[#ff5a36]" /> Include affiliate call-to-action</label>
    </div>
  );
}
