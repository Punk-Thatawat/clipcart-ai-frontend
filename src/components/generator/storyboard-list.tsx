import {
  ArrowRight,
  Camera,
  Clock,
  MicrophoneStage,
  TextT,
} from "@phosphor-icons/react";
import { StoryboardScene } from "@/types/generator";

export function StoryboardList({ scenes }: { scenes: StoryboardScene[] }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-1.5">
        {scenes.map((scene, index) => (
          <div key={scene.scene} className="flex min-w-0 flex-1 items-center">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ff5a36] text-[11px] font-extrabold text-white">
              {scene.scene}
            </div>
            {index < scenes.length - 1 && (
              <span className="mx-1.5 h-1 min-w-3 flex-1 rounded-full bg-[#ffd9ce]" />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {scenes.map((scene) => (
          <article
            key={scene.scene}
            className="overflow-hidden rounded-2xl border border-[#e9e2dd] bg-white shadow-[0_8px_24px_rgba(32,24,20,.04)]"
          >
            <div className="flex min-h-28 items-center justify-between bg-[#fff3ed] p-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#e64b2a]">
                  Scene {scene.scene}
                </span>
                <p className="mt-2 max-w-[230px] text-sm font-bold leading-5 text-[#171d31]">
                  {scene.visual}
                </p>
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#ff5a36] shadow-sm">
                <Camera size={23} weight="fill" />
              </span>
            </div>

            <div className="space-y-3 p-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f1ee] px-2.5 py-1 text-[10px] font-semibold text-[#606576]">
                  <Clock size={12} weight="bold" />
                  {scene.time}
                </span>
                {scene.shot && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef3ff] px-2.5 py-1 text-[10px] font-semibold text-[#4863a8]">
                    <Camera size={12} weight="bold" />
                    {scene.shot}
                  </span>
                )}
              </div>

              {scene.onScreenText && (
                <div className="rounded-xl border border-[#f0e9e4] bg-[#fcfaf8] p-3">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-[#8a8e9c]">
                    <TextT size={13} weight="bold" />
                    On-screen text
                  </p>
                  <p className="mt-1.5 text-sm font-bold text-[#262c40]">
                    {scene.onScreenText}
                  </p>
                </div>
              )}

              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-[#8a8e9c]">
                  <MicrophoneStage size={13} weight="bold" />
                  Voiceover
                </p>
                <p className="mt-1.5 text-sm leading-6 text-[#5f6576]">
                  &ldquo;{scene.voiceover}&rdquo;
                </p>
              </div>

              {scene.transition && (
                <p className="flex items-center gap-1.5 border-t border-[#f0ebe7] pt-3 text-[11px] font-medium text-[#777c8c]">
                  <ArrowRight size={14} />
                  {scene.transition}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
