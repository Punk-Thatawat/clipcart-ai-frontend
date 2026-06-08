"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarBlank,
  CheckCircle,
  Clock,
  GearSix,
  MagicWand,
  Pause,
  Play,
  Plus,
  Sparkle,
  VideoCamera,
} from "@phosphor-icons/react";
import { mockProducts } from "@/data/mock-products";
import { mockTemplates } from "@/data/mock-templates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Automation {
  id: number;
  name: string;
  product: string;
  image: string;
  platform: string;
  schedule: string;
  template: string;
  nextRun: string;
  active: boolean;
}

const initialAutomations: Automation[] = [
  {
    id: 1,
    name: "Daily Cat Finds",
    product: "Cozy Flower Cat Bed",
    image: mockProducts[0].image,
    platform: "TikTok",
    schedule: "Every day · 7:00 PM",
    template: "Problem → Solution Winner",
    nextRun: "Today, 7:00 PM",
    active: true,
  },
  {
    id: 2,
    name: "Weekend Beauty Picks",
    product: "Niacinamide Glow Serum",
    image: mockProducts[5].image,
    platform: "Reels",
    schedule: "Sat & Sun · 10:00 AM",
    template: "Soft-Sell Daily Routine",
    nextRun: "Saturday, 10:00 AM",
    active: true,
  },
  {
    id: 3,
    name: "Viral Gadget Test",
    product: "Cordless Mini Handheld Vacuum",
    image: mockProducts[2].image,
    platform: "Shorts",
    schedule: "Mon, Wed, Fri · 6:30 PM",
    template: "Honest Product Review",
    nextRun: "Paused",
    active: false,
  },
];

export function AutoReelsWorkspace() {
  const [automations, setAutomations] = useState(initialAutomations);
  const [productId, setProductId] = useState(mockProducts[0].id);
  const [templateId, setTemplateId] = useState(mockTemplates[0].id);
  const [platform, setPlatform] = useState("TikTok");
  const [frequency, setFrequency] = useState("Every day");
  const [time, setTime] = useState("19:00");
  const [approval, setApproval] = useState(true);
  const [created, setCreated] = useState(false);

  const toggleAutomation = (id: number) => {
    setAutomations((current) =>
      current.map((automation) =>
        automation.id === id
          ? {
              ...automation,
              active: !automation.active,
              nextRun: automation.active ? "Paused" : "Tomorrow, 7:00 PM",
            }
          : automation,
      ),
    );
  };

  const createAutomation = () => {
    const product = mockProducts.find((item) => item.id === productId) ?? mockProducts[0];
    const template = mockTemplates.find((item) => item.id === templateId) ?? mockTemplates[0];
    setAutomations((current) => [
      {
        id: Date.now(),
        name: `${product.category} Auto Reel`,
        product: product.name,
        image: product.image,
        platform,
        schedule: `${frequency} · ${time}`,
        template: template.name,
        nextRun: approval ? "Waiting for approval" : "Tomorrow",
        active: true,
      },
      ...current,
    ]);
    setCreated(true);
    setTimeout(() => setCreated(false), 2200);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#f0ddd5] bg-[#fff0ea] p-6 md:flex-row md:items-center">
        <div>
          <Badge className="bg-white/80">
            <Sparkle size={13} weight="fill" />
            New automation workspace
          </Badge>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-.04em]">
            Create consistently without starting from zero.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#746e77]">
            Schedule ClipCart to prepare affiliate scripts, captions, storyboards,
            and video drafts from your selected products.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["3", "Active"],
            ["12", "This month"],
            ["4.8h", "Time saved"],
          ].map(([value, label]) => (
            <div key={label} className="min-w-[92px] rounded-xl bg-white/75 px-4 py-3 text-center">
              <p className="text-xl font-extrabold">{value}</p>
              <p className="mt-1 text-[10px] text-[#7b7680]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
          <div className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff0ea] text-[#ff5a36]">
              <MagicWand size={20} weight="fill" />
            </span>
            <div>
              <h3 className="font-bold">New Auto Reel</h3>
              <p className="mt-0.5 text-xs text-[#858896]">Configure your recurring content</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Product</span>
              <select value={productId} onChange={(event) => setProductId(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm">
                {mockProducts.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Template</span>
              <select value={templateId} onChange={(event) => setTemplateId(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm">
                {mockTemplates.map((template) => <option key={template.id} value={template.id}>{template.name}</option>)}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Platform</span>
                <select value={platform} onChange={(event) => setPlatform(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm">
                  <option>TikTok</option><option>Reels</option><option>Shorts</option>
                </select>
              </label>
              <label>
                <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Frequency</span>
                <select value={frequency} onChange={(event) => setFrequency(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm">
                  <option>Every day</option><option>Weekdays</option><option>3 times a week</option><option>Weekly</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Publish time</span>
              <input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm" />
            </label>

            <label className="flex items-start gap-3 rounded-xl bg-[#fff7f2] p-4">
              <input type="checkbox" checked={approval} onChange={(event) => setApproval(event.target.checked)} className="mt-0.5 size-4 accent-[#ff5a36]" />
              <span><span className="block text-sm font-semibold">Require approval</span><span className="mt-1 block text-xs leading-5 text-[#777b89]">Review every video before it is marked ready to publish.</span></span>
            </label>

            <Button onClick={createAutomation} className="w-full">
              {created ? <CheckCircle size={18} weight="fill" /> : <Plus size={18} weight="bold" />}
              {created ? "Automation created" : "Create automation"}
            </Button>
          </div>
        </aside>

        <section className="rounded-2xl border border-[#eae5e1] bg-white shadow-[0_10px_32px_rgba(32,24,20,.04)]">
          <div className="flex items-center justify-between border-b border-[#eee9e5] px-5 py-4">
            <div>
              <h3 className="font-bold">Your automations</h3>
              <p className="mt-1 text-xs text-[#858896]">{automations.length} recurring content workflows</p>
            </div>
            <Button variant="outline" size="sm"><GearSix size={16} /> Manage defaults</Button>
          </div>

          <div className="divide-y divide-[#eee9e5]">
            {automations.map((automation) => (
              <article key={automation.id} className="p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <Image src={automation.image} alt="" width={72} height={72} className="size-[72px] rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold">{automation.name}</h4>
                      <Badge className={automation.active ? "bg-[#e9f8ef] text-[#16894a]" : "bg-[#eef0f4] text-[#626775]"}>
                        {automation.active ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <p className="mt-1 truncate text-sm text-[#666c7e]">{automation.product}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#7b7f8d]">
                      <span className="flex items-center gap-1.5"><VideoCamera size={15} /> {automation.platform}</span>
                      <span className="flex items-center gap-1.5"><CalendarBlank size={15} /> {automation.schedule}</span>
                      <span className="flex items-center gap-1.5"><MagicWand size={15} /> {automation.template}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 lg:min-w-[210px] lg:justify-end">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#9a9ca6]">Next run</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#4d5366]"><Clock size={14} /> {automation.nextRun}</p>
                    </div>
                    <Button variant={automation.active ? "outline" : "soft"} size="icon" onClick={() => toggleAutomation(automation.id)} aria-label={automation.active ? "Pause automation" : "Resume automation"}>
                      {automation.active ? <Pause size={17} weight="fill" /> : <Play size={17} weight="fill" />}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
