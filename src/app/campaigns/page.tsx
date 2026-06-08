import Image from "next/image";
import { DownloadSimple, DotsThree, FunnelSimple } from "@phosphor-icons/react/dist/ssr";
import { mockCampaigns } from "@/data/mock-campaigns";
import { formatDate, formatNumber } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CampaignsPage() {
  return (
    <section className="rounded-2xl border border-[#ede7e2] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#ede7e2] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-bold">Generated campaigns</h2><p className="mt-1 text-sm text-[#7c808f]">{mockCampaigns.length} campaigns in your workspace</p></div><div className="flex gap-2"><Button variant="outline"><FunnelSimple /> Filter</Button><Button variant="outline"><DownloadSimple /> Export</Button></div></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left text-sm"><thead className="bg-[#fcfaf8] text-xs text-[#858896]"><tr><th className="px-5 py-4 font-medium">Product</th><th className="px-4 py-4 font-medium">Script title</th><th className="px-4 py-4 font-medium">Platform</th><th className="px-4 py-4 font-medium">Sub ID</th><th className="px-4 py-4 font-medium">Created</th><th className="px-4 py-4 font-medium">Views</th><th className="px-4 py-4 font-medium">Status</th><th /></tr></thead><tbody>{mockCampaigns.map((campaign) => <tr key={campaign.id} className="border-t border-[#f0ebe7]"><td className="px-5 py-4"><div className="flex items-center gap-3"><Image src={campaign.productImage} alt="" width={48} height={48} className="size-12 rounded-xl object-cover" /><span className="max-w-48 font-semibold">{campaign.productName}</span></div></td><td className="px-4 py-4 text-[#5e6374]">{campaign.scriptTitle}</td><td className="px-4 py-4">{campaign.platform}</td><td className="px-4 py-4 font-mono text-xs text-[#696e7d]">{campaign.subId}</td><td className="px-4 py-4 text-[#6c7180]">{formatDate(campaign.createdAt)}</td><td className="px-4 py-4 font-semibold">{formatNumber(campaign.views)}</td><td className="px-4 py-4"><Badge className={campaign.status === "Published" ? "bg-[#e9f8ef] text-[#148b4b]" : campaign.status === "Processing" ? "bg-[#fff4dd] text-[#a66a00]" : "bg-[#f0f1f4] text-[#626775]"}>{campaign.status}</Badge></td><td className="px-4"><button aria-label="Campaign menu"><DotsThree size={22} /></button></td></tr>)}</tbody></table></div>
    </section>
  );
}
