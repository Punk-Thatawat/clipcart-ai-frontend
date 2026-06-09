"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  DownloadSimple,
  FilmStrip,
  FloppyDisk,
  Play,
  Repeat,
  ShareNetwork,
  Sparkle,
} from "@phosphor-icons/react";
import { GenerationResult } from "@/types/generator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScriptEditor } from "./script-editor";
import { StoryboardList } from "./storyboard-list";
import { PublishToSocialDrawer } from "./publish-to-social-drawer";

export function GeneratedResult({
  result,
  onRegenerate,
  showStoryboard = false,
}: {
  result: GenerationResult;
  onRegenerate: () => void;
  showStoryboard?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [exported, setExported] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(`${result.hook}\n\n${result.script}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const totalDuration = result.storyboard.at(-1)?.time.split("-").at(-1) ?? "";

  const exportVideo = () => {
    setExported(true);
    window.setTimeout(() => setExported(false), 1800);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge className="bg-[#eaf8ef] text-[#148a49]">Generation complete</Badge>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-.04em]">
            Your campaign is ready
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={copy}>
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy Script"}
          </Button>
          <Button variant="outline">
            <FloppyDisk />
            Save Campaign
          </Button>
          <Button variant="soft" onClick={onRegenerate}>
            <Repeat />
            Regenerate
          </Button>
        </div>
      </div>

      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-5">
          <section className="rounded-2xl border border-[#f1d9d0] bg-[#fff7f3] p-5">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[#e54a29]">
              <Sparkle size={15} weight="fill" />
              Hook
            </p>
            <p className="mt-3 text-xl font-bold leading-8">
              &ldquo;{result.hook}&rdquo;
            </p>
          </section>

          {showStoryboard && <section className="rounded-2xl border border-[#ede7e2] bg-[#fffdfb] p-5 shadow-[0_12px_36px_rgba(32,24,20,.04)]">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0ea] text-[#ff5a36]">
                  <FilmStrip size={21} weight="fill" />
                </span>
                <div>
                  <h3 className="font-bold">Scene-by-scene storyboard</h3>
                  <p className="mt-1 text-xs leading-5 text-[#7a7f8e]">
                    Visual direction, on-screen copy, and voiceover for every shot.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge>{result.storyboard.length} scenes</Badge>
                {totalDuration && <Badge>{totalDuration}</Badge>}
              </div>
            </div>
            <StoryboardList scenes={result.storyboard} />
          </section>}

          <section className="rounded-2xl border border-[#ede7e2] bg-white p-5">
            <h3 className="font-bold">Speaking script</h3>
            <p className="mt-1 text-xs text-[#858896]">
              Edit the full voiceover while keeping the storyboard as your shot guide.
            </p>
            <div className="mt-4">
              <ScriptEditor initialValue={result.script} />
            </div>
          </section>

          <section className="rounded-2xl border border-[#ede7e2] bg-white p-5">
            <h3 className="font-bold">Caption & hashtags</h3>
            <p className="mt-3 text-sm leading-6 text-[#5f6474]">{result.caption}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.hashtags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </div>
          </section>

          <section className="rounded-2xl border border-[#ede7e2] bg-white p-5">
            <h3 className="font-bold">Affiliate link</h3>
            <div className="mt-3 flex gap-2">
              <input
                readOnly
                value={result.affiliateLink}
                className="min-w-0 flex-1 rounded-xl bg-[#f7f4f2] px-3 text-xs text-[#606576]"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => navigator.clipboard.writeText(result.affiliateLink)}
              >
                <Copy />
              </Button>
            </div>
          </section>
        </div>

        <aside className="h-fit 2xl:sticky 2xl:top-24">
          <div className="rounded-[28px] bg-[#171b2e] p-3 shadow-xl">
            <div className="flex aspect-[9/16] flex-col items-center justify-center rounded-[22px] bg-[#f6cbbb] px-6 text-center text-[#2c1b1a]">
              <span className="flex size-16 items-center justify-center rounded-full bg-white/75">
                <Play size={28} weight="fill" className="text-[#ff5a36]" />
              </span>
              <p className="mt-5 text-lg font-extrabold">AI video preview</p>
              <p className="mt-2 text-xs leading-5 opacity-70">
                {showStoryboard
                  ? `Preview assembled from ${result.storyboard.length} storyboard scenes, voiceover, and captions.`
                  : "Your generated voiceover, captions, and product visuals will appear here."}
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-2xl border border-[#ede7e2] bg-white p-4">
            <p className="text-xs font-bold">Production summary</p>
            <div className="mt-3 space-y-2 text-xs text-[#707586]">
              {showStoryboard && <p className="flex justify-between"><span>Scenes</span><b>{result.storyboard.length}</b></p>}
              <p className="flex justify-between"><span>Duration</span><b>{totalDuration || "30s"}</b></p>
              <p className="flex justify-between"><span>Format</span><b>9:16 vertical</b></p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <Button
              size="lg"
              className="w-full"
              onClick={() => setPublishOpen(true)}
            >
              <ShareNetwork size={19} weight="fill" />
              Publish to Social Accounts
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={exportVideo}
            >
              {exported ? (
                <Check size={19} weight="bold" />
              ) : (
                <DownloadSimple size={19} />
              )}
              {exported ? "Export queued" : "Download Video"}
            </Button>
          </div>
        </aside>
      </div>
      <PublishToSocialDrawer
        result={result}
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
      />
    </div>
  );
}
