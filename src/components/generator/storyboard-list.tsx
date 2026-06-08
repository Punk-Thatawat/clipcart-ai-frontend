import { StoryboardScene } from "@/types/generator";

export function StoryboardList({ scenes }: { scenes: StoryboardScene[] }) {
  return <div className="space-y-3">{scenes.map((scene) => <div key={scene.scene} className="grid gap-3 rounded-xl bg-[#faf7f4] p-4 sm:grid-cols-[48px_1fr]"><div className="flex size-10 items-center justify-center rounded-xl bg-[#fff0ea] text-sm font-extrabold text-[#e44726]">{scene.scene}</div><div><div className="flex items-center gap-2"><p className="text-sm font-bold">{scene.visual}</p><span className="rounded-full bg-white px-2 py-1 text-[10px] text-[#858895]">{scene.time}</span></div><p className="mt-2 text-sm leading-6 text-[#656a7b]">“{scene.voiceover}”</p></div></div>)}</div>;
}
