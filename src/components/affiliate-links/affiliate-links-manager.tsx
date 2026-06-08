"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Check,
  Copy,
  CurrencyDollar,
  CursorClick,
  LinkSimple,
  MagnifyingGlass,
  Plus,
  ShoppingBag,
  TrendUp,
} from "@phosphor-icons/react";
import { mockProducts } from "@/data/mock-products";
import { AffiliateLink } from "@/types/affiliate-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatNumber } from "@/lib/format";

const initialLinks: AffiliateLink[] = [
  {
    id: 1,
    productId: mockProducts[0].id,
    productName: mockProducts[0].name,
    productImage: mockProducts[0].image,
    shortLink: "clipcart.ai/go/catbed",
    subId: "tiktok_cat_01",
    campaign: "Cozy Cat TikTok",
    clicks: 2840,
    conversions: 128,
    revenue: 576,
    active: true,
    createdAt: "Jun 7, 2026",
  },
  {
    id: 2,
    productId: mockProducts[2].id,
    productName: mockProducts[2].name,
    productImage: mockProducts[2].image,
    shortLink: "clipcart.ai/go/minivac",
    subId: "reels_clean_02",
    campaign: "Desk Reset Reels",
    clicks: 1964,
    conversions: 87,
    revenue: 417.6,
    active: true,
    createdAt: "Jun 5, 2026",
  },
  {
    id: 3,
    productId: mockProducts[5].id,
    productName: mockProducts[5].name,
    productImage: mockProducts[5].image,
    shortLink: "clipcart.ai/go/glow",
    subId: "beauty_softsell",
    campaign: "Morning Glow",
    clicks: 1420,
    conversions: 62,
    revenue: 321.16,
    active: true,
    createdAt: "Jun 2, 2026",
  },
  {
    id: 4,
    productId: mockProducts[7].id,
    productName: mockProducts[7].name,
    productImage: mockProducts[7].image,
    shortLink: "clipcart.ai/go/sunset",
    subId: "shorts_room_01",
    campaign: "Room Makeover",
    clicks: 638,
    conversions: 21,
    revenue: 68.25,
    active: false,
    createdAt: "May 28, 2026",
  },
];

export function AffiliateLinksManager() {
  const [links, setLinks] = useState(initialLinks);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | "Active" | "Paused">("All");
  const [productId, setProductId] = useState(mockProducts[0].id);
  const [campaign, setCampaign] = useState("");
  const [subId, setSubId] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [created, setCreated] = useState(false);

  const filteredLinks = useMemo(
    () =>
      links.filter((link) => {
        const matchesQuery = `${link.productName} ${link.campaign} ${link.subId}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesStatus =
          status === "All" ||
          (status === "Active" && link.active) ||
          (status === "Paused" && !link.active);
        return matchesQuery && matchesStatus;
      }),
    [links, query, status],
  );

  const copyLink = async (link: AffiliateLink) => {
    await navigator.clipboard.writeText(`https://${link.shortLink}?sub_id=${link.subId}`);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 1400);
  };

  const createLink = () => {
    const product = mockProducts.find((item) => item.id === productId) ?? mockProducts[0];
    const safeSubId =
      subId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_") ||
      `clipcart_${Date.now().toString().slice(-5)}`;
    setLinks((current) => [
      {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        shortLink: `clipcart.ai/go/${product.id.slice(0, 12)}`,
        subId: safeSubId,
        campaign: campaign.trim() || `${product.category} Campaign`,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        active: true,
        createdAt: "Just now",
      },
      ...current,
    ]);
    setCampaign("");
    setSubId("");
    setCreated(true);
    setTimeout(() => setCreated(false), 1800);
  };

  const totals = links.reduce(
    (result, link) => ({
      clicks: result.clicks + link.clicks,
      conversions: result.conversions + link.conversions,
      revenue: result.revenue + link.revenue,
    }),
    { clicks: 0, conversions: 0, revenue: 0 },
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Active links", links.filter((link) => link.active).length.toString(), LinkSimple, "bg-[#fff0ea] text-[#ff5a36]"],
          ["Total clicks", formatNumber(totals.clicks), CursorClick, "bg-[#eaf3ff] text-[#3478d4]"],
          ["Conversions", totals.conversions.toString(), TrendUp, "bg-[#efedff] text-[#6655c5]"],
          ["Est. revenue", formatCurrency(totals.revenue), CurrencyDollar, "bg-[#e9f8ef] text-[#16894a]"],
        ].map(([label, value, Icon, tone]) => (
          <div key={label as string} className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
            <span className={`flex size-11 items-center justify-center rounded-xl ${tone}`}>
              <Icon size={22} weight="fill" />
            </span>
            <p className="mt-4 text-sm text-[#74798a]">{label as string}</p>
            <p className="mt-1 text-3xl font-extrabold tracking-[-.04em]">{value as string}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff0ea] text-[#ff5a36]">
              <Plus size={19} weight="bold" />
            </span>
            <div>
              <h2 className="font-bold">Create affiliate link</h2>
              <p className="mt-0.5 text-xs text-[#858896]">Add tracking with a unique sub ID</p>
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
              <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Campaign name</span>
              <Input value={campaign} onChange={(event) => setCampaign(event.target.value)} placeholder="e.g. Summer TikTok push" />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Sub ID</span>
              <Input value={subId} onChange={(event) => setSubId(event.target.value)} placeholder="e.g. tiktok_summer_01" />
              <p className="mt-2 text-[11px] leading-5 text-[#8b8e9b]">Use a unique sub ID to identify the channel, creator, or campaign.</p>
            </label>
            <div className="rounded-xl bg-[#fff7f2] p-4">
              <p className="text-xs font-bold text-[#454b5e]">Link preview</p>
              <p className="mt-2 break-all font-mono text-[10px] leading-5 text-[#74798a]">
                clipcart.ai/go/product?sub_id={subId || "your_sub_id"}
              </p>
            </div>
            <Button onClick={createLink} className="w-full">
              {created ? <Check size={18} weight="bold" /> : <LinkSimple size={18} weight="bold" />}
              {created ? "Link created" : "Create link"}
            </Button>
          </div>
        </aside>

        <section className="overflow-hidden rounded-2xl border border-[#eae5e1] bg-white shadow-[0_10px_32px_rgba(32,24,20,.04)]">
          <div className="flex flex-col gap-3 border-b border-[#eee9e5] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold">Your affiliate links</h2>
              <p className="mt-1 text-xs text-[#858896]">{filteredLinks.length} links found</p>
            </div>
            <div className="flex gap-2">
              <div className="relative min-w-0 flex-1 sm:w-64">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9699a4]" size={16} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search links..." className="focus-ring h-10 w-full rounded-xl border border-[#e7e1dc] bg-white pl-9 pr-3 text-xs" />
              </div>
              <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className="focus-ring h-10 rounded-xl border border-[#e7e1dc] bg-white px-3 text-xs font-semibold">
                <option>All</option><option>Active</option><option>Paused</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead className="bg-[#fcfaf8] text-[10px] uppercase tracking-[.08em] text-[#8c8f9b]">
                <tr><th className="px-5 py-3 font-semibold">Product & campaign</th><th className="px-4 py-3 font-semibold">Link</th><th className="px-4 py-3 font-semibold">Sub ID</th><th className="px-4 py-3 font-semibold">Clicks</th><th className="px-4 py-3 font-semibold">Conv.</th><th className="px-4 py-3 font-semibold">Revenue</th><th className="px-4 py-3 font-semibold">Status</th></tr>
              </thead>
              <tbody>
                {filteredLinks.map((link) => (
                  <tr key={link.id} className="border-t border-[#eee9e5]">
                    <td className="px-5 py-3.5"><div className="flex items-center gap-3"><Image src={link.productImage} alt="" width={48} height={48} className="size-12 rounded-xl object-cover" /><div><p className="max-w-52 truncate font-semibold">{link.productName}</p><p className="mt-1 text-[10px] text-[#858896]">{link.campaign} · {link.createdAt}</p></div></div></td>
                    <td className="px-4 py-3.5"><button onClick={() => copyLink(link)} className="focus-ring flex items-center gap-2 rounded-lg bg-[#f7f4f2] px-3 py-2 font-mono text-[10px] text-[#596073] hover:bg-[#fff0ea]">{link.shortLink}{copiedId === link.id ? <Check className="text-[#16894a]" /> : <Copy />}</button></td>
                    <td className="px-4 py-3.5 font-mono text-[10px] text-[#666c7e]">{link.subId}</td>
                    <td className="px-4 py-3.5 font-semibold">{formatNumber(link.clicks)}</td>
                    <td className="px-4 py-3.5 font-semibold">{link.conversions}</td>
                    <td className="px-4 py-3.5 font-bold text-[#16894a]">{formatCurrency(link.revenue)}</td>
                    <td className="px-4 py-3.5"><button onClick={() => setLinks((current) => current.map((item) => item.id === link.id ? { ...item, active: !item.active } : item))}><Badge className={link.active ? "bg-[#e9f8ef] text-[#16894a]" : "bg-[#eef0f4] text-[#626775]"}>{link.active ? "Active" : "Paused"}</Badge></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!filteredLinks.length && (
            <div className="p-12 text-center"><ShoppingBag size={32} className="mx-auto text-[#bbb8b4]" /><p className="mt-3 font-bold">No links found</p><p className="mt-1 text-xs text-[#858896]">Try a different search or filter.</p></div>
          )}
        </section>
      </div>
    </div>
  );
}
