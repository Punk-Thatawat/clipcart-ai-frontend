"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CaretDown,
  Check,
  MagnifyingGlass,
  Pause,
  Play,
  SlidersHorizontal,
  UserCircle,
  Waveform,
  X,
} from "@phosphor-icons/react";
import { GenerationSettings, VoiceId } from "@/types/generator";

type VoiceProfile = {
  id: VoiceId;
  name: string;
  description: string;
  category: "Female" | "Male";
  styles: string[];
  color: string;
  voiceIndex: number;
};

const voices: VoiceProfile[] = [
  { id: "rachel", name: "Rachel", description: "Warm & conversational", category: "Female", styles: ["Warm", "Calm"], color: "from-[#3557a8] to-[#efb6b0]", voiceIndex: 0 },
  { id: "adam", name: "Adam", description: "Confident & clear", category: "Male", styles: ["Confident", "Professional"], color: "from-[#303747] to-[#87a8c7]", voiceIndex: 1 },
  { id: "bella", name: "Bella", description: "Bright & energetic", category: "Female", styles: ["Energetic", "Youthful"], color: "from-[#d06c76] to-[#f4c59c]", voiceIndex: 2 },
  { id: "josh", name: "Josh", description: "Friendly & relaxed", category: "Male", styles: ["Friendly", "Calm"], color: "from-[#598a70] to-[#b7d2b8]", voiceIndex: 3 },
  { id: "antoni", name: "Antoni", description: "Smooth & persuasive", category: "Male", styles: ["Sales", "Confident"], color: "from-[#6d5c93] to-[#c2afd7]", voiceIndex: 4 },
  { id: "charlotte", name: "Charlotte", description: "Elegant & premium", category: "Female", styles: ["Premium", "Calm"], color: "from-[#845d54] to-[#e2b9a8]", voiceIndex: 5 },
  { id: "liam", name: "Liam", description: "Fast & social-ready", category: "Male", styles: ["Energetic", "Youthful"], color: "from-[#256b76] to-[#84c6ca]", voiceIndex: 6 },
  { id: "sarah", name: "Sarah", description: "Natural & trustworthy", category: "Female", styles: ["Friendly", "Professional"], color: "from-[#b5647b] to-[#efb8c4]", voiceIndex: 7 },
  { id: "nicole", name: "Nicole", description: "Playful & expressive", category: "Female", styles: ["Funny", "Energetic"], color: "from-[#b6782c] to-[#f1ca7d]", voiceIndex: 8 },
  { id: "sam", name: "Sam", description: "Neutral & informative", category: "Male", styles: ["Professional", "Calm"], color: "from-[#516172] to-[#aebcca]", voiceIndex: 9 },
];

const filters = ["All", "Female", "Male", "Energetic", "Calm"] as const;

function VoiceAvatar({ voice, selected = false }: { voice: VoiceProfile; selected?: boolean }) {
  return (
    <span className={`relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${voice.color} text-white`}>
      <UserCircle size={27} weight="fill" />
      {selected && (
        <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[#ff5a36] text-white ring-2 ring-white">
          <Check size={10} weight="bold" />
        </span>
      )}
    </span>
  );
}

function TuningSlider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-xs font-semibold text-[#646978]">
        {label}
        <span className="text-[10px] font-bold text-[#9396a0]">{value}%</span>
      </span>
      <input type="range" min="0" max="100" value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer accent-[#171d31]" />
    </label>
  );
}

export function AiVoiceSettings({ settings, onChange }: { settings: GenerationSettings; onChange: (settings: GenerationSettings) => void }) {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [previewing, setPreviewing] = useState<VoiceId | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const activePreview = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(
    () => () => {
      activePreview.current = null;
      window.speechSynthesis?.cancel();
    },
    [],
  );

  const update = <K extends keyof GenerationSettings>(key: K, value: GenerationSettings[K]) =>
    onChange({ ...settings, [key]: value });

  const selectedVoice = voices.find((voice) => voice.id === settings.voiceId) ?? voices[0];
  const filteredVoices = useMemo(
    () =>
      voices.filter((voice) => {
        const matchesQuery = `${voice.name} ${voice.description} ${voice.styles.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesFilter =
          filter === "All" ||
          voice.category === filter ||
          voice.styles.includes(filter);
        return matchesQuery && matchesFilter;
      }),
    [filter, query],
  );

  const previewVoice = (voiceId: VoiceId) => {
    if (!("speechSynthesis" in window)) return;
    if (previewing === voiceId) {
      activePreview.current = null;
      window.speechSynthesis.cancel();
      setPreviewing(null);
      return;
    }

    activePreview.current = null;
    window.speechSynthesis.cancel();
    const profile = voices.find((voice) => voice.id === voiceId) ?? voices[0];
    const sample = new SpeechSynthesisUtterance(
      "This product is going viral, and here is why it might be worth the hype.",
    );
    const systemVoices = window.speechSynthesis.getVoices();
    sample.voice = systemVoices[profile.voiceIndex % Math.max(systemVoices.length, 1)] ?? null;
    sample.rate = 0.7 + settings.voiceSpeed * 0.008;
    sample.pitch = 0.65 + settings.voiceTone * 0.007;
    const finishPreview = () => {
      if (activePreview.current !== sample) return;
      activePreview.current = null;
      setPreviewing(null);
    };
    sample.onend = finishPreview;
    sample.onerror = finishPreview;
    activePreview.current = sample;
    setPreviewing(voiceId);
    window.speechSynthesis.speak(sample);
  };

  const selectVoice = (voiceId: VoiceId) => {
    update("voiceId", voiceId);
    setLibraryOpen(false);
  };

  return (
    <section className="sm:col-span-2">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.1em] text-[#858895]">AI voice</p>
          <p className="mt-1 text-xs text-[#858896]">Preview before selecting</p>
        </div>
        <span className="rounded-full bg-[#f4f1ee] px-2.5 py-1 text-[10px] font-bold text-[#656a78]">
          {settings.voiceModel}
        </span>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-[#ffb6a3] bg-[#fff7f3] p-3">
        <VoiceAvatar voice={selectedVoice} selected />
        <div className="min-w-0 flex-1">
          <strong className="block truncate text-sm">{selectedVoice.name}</strong>
          <span className="mt-0.5 block truncate text-[10px] text-[#858896]">{selectedVoice.description}</span>
        </div>
        <button type="button" onClick={() => previewVoice(selectedVoice.id)} aria-label={`Preview ${selectedVoice.name}`} className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#171d31] text-white hover:bg-[#ff5a36]">
          {previewing === selectedVoice.id ? <Pause size={13} weight="fill" /> : <Play size={13} weight="fill" />}
        </button>
        <button type="button" onClick={() => setLibraryOpen(true)} className="focus-ring rounded-lg border border-[#e8d8d1] bg-white px-3 py-2 text-xs font-bold text-[#555b6b] hover:border-[#ff9a80]">
          Browse voices
        </button>
      </div>

      {libraryOpen && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-[#e5ddd8] bg-white shadow-[0_16px_45px_rgba(32,24,20,.1)]">
          <div className="flex items-center justify-between border-b border-[#eee8e4] px-4 py-3">
            <div>
              <h4 className="text-sm font-bold">Voice library</h4>
              <p className="mt-0.5 text-[10px] text-[#858896]">{voices.length} voices available</p>
            </div>
            <button type="button" onClick={() => setLibraryOpen(false)} className="flex size-8 items-center justify-center rounded-lg hover:bg-[#f7f3f0]" aria-label="Close voice library">
              <X size={17} />
            </button>
          </div>

          <div className="p-4">
            <div className="relative">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9295a0]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search voices or styles..." className="focus-ring h-10 w-full rounded-xl border border-[#e8e1dc] pl-9 pr-3 text-xs" />
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {filters.map((item) => (
                <button key={item} type="button" onClick={() => setFilter(item)} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-bold ${filter === item ? "bg-[#171d31] text-white" : "bg-[#f4f1ee] text-[#656a78]"}`}>
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
              {filteredVoices.map((voice) => {
                const selected = voice.id === settings.voiceId;
                const playing = previewing === voice.id;
                return (
                  <div key={voice.id} className={`flex items-center gap-3 rounded-xl border p-3 ${selected ? "border-[#ff9a80] bg-[#fff7f3]" : "border-[#ebe5e1]"}`}>
                    <VoiceAvatar voice={voice} selected={selected} />
                    <button type="button" onClick={() => selectVoice(voice.id)} className="min-w-0 flex-1 text-left">
                      <strong className="block truncate text-sm">{voice.name}</strong>
                      <span className="mt-0.5 block truncate text-[10px] text-[#858896]">{voice.description}</span>
                      <span className="mt-1 block text-[9px] font-semibold text-[#a06b5d]">{voice.category} · {voice.styles.join(" · ")}</span>
                    </button>
                    <button type="button" onClick={() => previewVoice(voice.id)} aria-label={`${playing ? "Stop" : "Preview"} ${voice.name}`} className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#171d31] text-white hover:bg-[#ff5a36]">
                      {playing ? <Pause size={13} weight="fill" /> : <Play size={13} weight="fill" />}
                    </button>
                  </div>
                );
              })}
              {!filteredVoices.length && (
                <p className="py-8 text-center text-xs text-[#858896]">No voices match this search.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <button type="button" onClick={() => setAdvancedOpen((current) => !current)} className="focus-ring mt-3 flex w-full items-center justify-between rounded-xl border border-[#e8e1dc] bg-[#faf8f6] px-4 py-3 text-xs font-semibold text-[#555b6b]">
        <span className="flex items-center gap-2"><SlidersHorizontal size={16} />Advanced voice tuning</span>
        <CaretDown size={15} className={`transition ${advancedOpen ? "rotate-180" : ""}`} />
      </button>

      {advancedOpen && (
        <div className="mt-2 rounded-xl border border-[#e8e1dc] bg-white p-4">
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-[#f7f4f2] px-3 py-2.5">
            <Waveform size={17} className="text-[#ff5a36]" />
            <span className="text-xs font-semibold">{settings.voiceModel}</span>
            <span className="ml-auto text-[10px] text-[#9295a0]">Mock preview</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <TuningSlider label="Speed" value={settings.voiceSpeed} onChange={(value) => update("voiceSpeed", value)} />
            <TuningSlider label="Tone" value={settings.voiceTone} onChange={(value) => update("voiceTone", value)} />
            <TuningSlider label="Pacing" value={settings.voicePacing} onChange={(value) => update("voicePacing", value)} />
            <TuningSlider label="Style exaggeration" value={settings.voiceStyle} onChange={(value) => update("voiceStyle", value)} />
          </div>
        </div>
      )}
    </section>
  );
}
