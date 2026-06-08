"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChartLineUp,
  CurrencyDollar,
  CursorClick,
  Eye,
  FunnelSimple,
  Play,
  TrendUp,
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCampaigns } from "@/data/mock-campaigns";
import { formatCurrency, formatNumber } from "@/lib/format";

const ranges = ["7 days", "30 days", "90 days"] as const;

const metrics = {
  "7 days": [
    ["Total views", "52.8K", "+18.4%", Eye, "peach"],
    ["Link clicks", "3,284", "+12.7%", CursorClick, "blue"],
    ["Conversion rate", "4.6%", "+0.8pp", TrendUp, "purple"],
    ["Est. revenue", "$1,248", "+23.1%", CurrencyDollar, "green"],
  ],
  "30 days": [
    ["Total views", "218K", "+22.6%", Eye, "peach"],
    ["Link clicks", "14.2K", "+16.3%", CursorClick, "blue"],
    ["Conversion rate", "4.2%", "+0.4pp", TrendUp, "purple"],
    ["Est. revenue", "$4,892", "+19.8%", CurrencyDollar, "green"],
  ],
  "90 days": [
    ["Total views", "684K", "+31.8%", Eye, "peach"],
    ["Link clicks", "43.7K", "+28.2%", CursorClick, "blue"],
    ["Conversion rate", "3.9%", "-0.2pp", TrendUp, "purple"],
    ["Est. revenue", "$13,740", "+26.4%", CurrencyDollar, "green"],
  ],
} as const;

const chartValues = {
  "7 days": [28, 42, 35, 54, 46, 67, 78],
  "30 days": [25, 31, 28, 44, 39, 52, 48, 63, 57, 70, 66, 84],
  "90 days": [18, 27, 23, 35, 31, 46, 42, 52, 49, 60, 55, 68, 65, 78],
};

const toneStyles = {
  peach: "bg-[#fff0ea] text-[#ff5a36]",
  blue: "bg-[#eaf3ff] text-[#3478d4]",
  purple: "bg-[#efedff] text-[#6655c5]",
  green: "bg-[#e9f8ef] text-[#16894a]",
};

export function AnalyticsDashboard() {
  const [range, setRange] = useState<(typeof ranges)[number]>("30 days");
  const points = useMemo(() => chartValues[range], [range]);
  const max = Math.max(...points);
  const polyline = points
    .map((value, index) => `${(index / (points.length - 1)) * 100},${92 - (value / max) * 76}`)
    .join(" ");

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[#777b89]">Performance overview</p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-[-.04em]">
            Your content is trending up.
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[#e7e1dc] bg-white p-1">
          {ranges.map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`focus-ring rounded-lg px-4 py-2 text-xs font-semibold transition ${
                range === item ? "bg-[#fff0ea] text-[#e64b2a]" : "text-[#6a6f80] hover:bg-[#faf7f4]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics[range].map(([label, value, change, Icon, tone]) => {
          const positive = !change.startsWith("-");
          return (
            <Card key={label} className="p-5">
              <div className="flex items-center justify-between">
                <span className={`flex size-11 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
                  <Icon size={22} weight="fill" />
                </span>
                <span className={`flex items-center gap-1 text-xs font-bold ${positive ? "text-[#16894a]" : "text-[#c34a36]"}`}>
                  {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {change}
                </span>
              </div>
              <p className="mt-5 text-sm text-[#74798a]">{label}</p>
              <p className="mt-1 text-3xl font-extrabold tracking-[-.045em]">{value}</p>
              <p className="mt-2 text-xs text-[#9a9ca6]">vs previous period</p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold">Revenue & views trend</h3>
              <p className="mt-1 text-xs text-[#858896]">Daily estimated affiliate revenue</p>
            </div>
            <Badge className="bg-[#e9f8ef] text-[#16894a]">
              <ChartLineUp size={14} />
              Best day: $286
            </Badge>
          </div>

          <div className="mt-6 h-[300px] rounded-xl bg-[#fcfaf8] p-5">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-label="Revenue trend chart">
              {[20, 40, 60, 80].map((y) => (
                <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#ebe7e3" strokeWidth=".4" vectorEffect="non-scaling-stroke" />
              ))}
              <defs>
                <linearGradient id="analytics-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff7555" stopOpacity=".2" />
                  <stop offset="100%" stopColor="#ff7555" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={`0,96 ${polyline} 100,96`} fill="url(#analytics-area)" />
              <polyline points={polyline} fill="none" stroke="#ff5a36" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-[#9a9ca6]">
            <span>Start</span><span>Mid period</span><span>Today</span>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-bold">Platform performance</h3>
          <p className="mt-1 text-xs text-[#858896]">Share of total views</p>
          <div className="mt-6 space-y-6">
            {[
              ["TikTok", 58, "126.4K", "bg-[#171d31]"],
              ["Reels", 27, "58.9K", "bg-[#ff5a36]"],
              ["Shorts", 15, "32.7K", "bg-[#6852d5]"],
            ].map(([name, share, views, color]) => (
              <div key={name as string}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span className={`size-2.5 rounded-full ${color}`} /><span className="text-sm font-semibold">{name}</span></div>
                  <div className="text-right"><p className="text-sm font-bold">{share}%</p><p className="text-[10px] text-[#92949f]">{views} views</p></div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f0ece9]">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${share}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-xl bg-[#fff7f2] p-4">
            <p className="flex items-center gap-2 text-sm font-bold"><Play size={17} weight="fill" className="text-[#ff5a36]" /> TikTok is your top channel</p>
            <p className="mt-2 text-xs leading-5 text-[#74798a]">Problem-Solution videos drive 34% more clicks than your average campaign.</p>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-[#eee9e5] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="font-bold">Top-performing campaigns</h3><p className="mt-1 text-xs text-[#858896]">Ranked by estimated commission</p></div>
          <button className="focus-ring flex h-9 items-center gap-2 rounded-lg border border-[#e7e1dc] px-3 text-xs font-semibold text-[#5e6374] hover:bg-[#faf7f4]"><FunnelSimple size={15} /> All platforms</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="bg-[#fcfaf8] text-[10px] uppercase tracking-[.08em] text-[#8c8f9b]">
              <tr><th className="px-5 py-3 font-semibold">Campaign</th><th className="px-4 py-3 font-semibold">Platform</th><th className="px-4 py-3 font-semibold">Views</th><th className="px-4 py-3 font-semibold">CTR</th><th className="px-4 py-3 font-semibold">Conversions</th><th className="px-4 py-3 font-semibold">Est. revenue</th></tr>
            </thead>
            <tbody>
              {mockCampaigns.map((campaign, index) => (
                <tr key={campaign.id} className="border-t border-[#eee9e5]">
                  <td className="px-5 py-3.5"><div className="flex items-center gap-3"><span className="w-4 text-xs font-bold text-[#a0a2ab]">{index + 1}</span><Image src={campaign.productImage} alt="" width={44} height={44} className="size-11 rounded-lg object-cover" /><div><p className="font-semibold">{campaign.scriptTitle}</p><p className="mt-1 text-[10px] text-[#858896]">{campaign.productName}</p></div></div></td>
                  <td className="px-4 py-3.5">{campaign.platform}</td>
                  <td className="px-4 py-3.5 font-semibold">{formatNumber(campaign.views)}</td>
                  <td className="px-4 py-3.5">{(5.2 - index * 0.48).toFixed(2)}%</td>
                  <td className="px-4 py-3.5">{43 - index * 7}</td>
                  <td className="px-4 py-3.5 font-bold text-[#16894a]">{formatCurrency(campaign.estimatedCommission)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
