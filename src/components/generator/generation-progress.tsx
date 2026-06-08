"use client";

import { CheckCircle, CircleNotch } from "@phosphor-icons/react";

export function GenerationProgress({ steps, activeStep }: { steps: string[]; activeStep: number }) {
  return (
    <div className="rounded-2xl border border-[#f2dfd6] bg-[#fff8f4] p-5">
      <div className="mb-5"><p className="font-bold">Creating your campaign</p><p className="mt-1 text-sm text-[#7b7f8c]">ClipCart is turning product details into scroll-stopping content.</p></div>
      <div className="space-y-3">{steps.map((label, index) => <div key={label} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${index === activeStep ? "bg-white font-semibold shadow-sm" : "text-[#777b89]"}`}>{index < activeStep ? <CheckCircle size={19} weight="fill" className="text-[#15974f]" /> : index === activeStep ? <CircleNotch size={19} className="animate-spin text-[#ff5a36]" /> : <span className="size-[19px] rounded-full border border-[#ddd5cf]" />} {label}</div>)}</div>
    </div>
  );
}
