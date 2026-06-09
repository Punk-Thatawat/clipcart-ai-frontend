import Image from "next/image";
import Link from "next/link";
import { DotsThree } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  {
    name: "Cat Climber Tower",
    shop: "Amazon US",
    product: "Pet Supplies",
    image: "/assets/campaign-cat.jpg",
    created: "May 12, 2025",
    views: "8.2K",
    clicks: "621",
    earnings: "$256.80",
    status: "Live",
  },
  {
    name: "Mini Projector",
    shop: "Amazon US",
    product: "Home & Living",
    image: "/assets/campaign-projector.jpg",
    created: "May 10, 2025",
    views: "6.7K",
    clicks: "512",
    earnings: "$198.30",
    status: "Live",
  },
  {
    name: "Niacinamide Serum",
    shop: "Amazon US",
    product: "Beauty",
    image: "/assets/campaign-serum.jpg",
    created: "May 8, 2025",
    views: "5.1K",
    clicks: "389",
    earnings: "$142.20",
    status: "Live",
  },
  {
    name: "LED Strip Lights",
    shop: "Amazon US",
    product: "Home & Living",
    image: "/assets/campaign-lights.jpg",
    created: "May 6, 2025",
    views: "4.3K",
    clicks: "301",
    earnings: "$98.60",
    status: "Rendering",
  },
  {
    name: "Spin Scrub Brush",
    shop: "Amazon US",
    product: "Cleaning",
    image: "/assets/campaign-cleaning.jpg",
    created: "May 4, 2025",
    views: "3.8K",
    clicks: "276",
    earnings: "$87.40",
    status: "Draft",
  },
];

export function RecentCampaigns() {
  return (
    <section className="rounded-2xl border border-[#e9e5e1] bg-white px-5 pb-2 pt-4 shadow-[0_8px_28px_rgba(32,24,20,.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-bold">Recent Campaigns</h2>
        <Link
          href="/campaigns"
          className="rounded-lg border border-[#e6e2de] bg-white px-3.5 py-2 text-[11px] font-medium text-[#444a5d] hover:bg-[#faf8f6]"
        >
          View all campaigns
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] table-fixed text-left text-[11px]">
          <thead className="border-b border-[#eae6e2] text-[10px] text-[#697083]">
            <tr>
              <th className="w-[31%] pb-2.5 font-medium">Campaign</th>
              <th className="w-[15%] pb-2.5 font-medium">Product</th>
              <th className="w-[14%] pb-2.5 font-medium">Created</th>
              <th className="w-[9%] pb-2.5 font-medium">Views</th>
              <th className="w-[9%] pb-2.5 font-medium">Clicks</th>
              <th className="w-[13%] pb-2.5 font-medium">Est. Earnings</th>
              <th className="w-[9%] pb-2.5 font-medium">Status</th>
              <th className="w-11" />
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.name} className="border-b border-[#efebe7] last:border-0">
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={campaign.image}
                      alt=""
                      width={70}
                      height={48}
                      className="h-12 w-[70px] shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-[#22283b]">{campaign.name}</p>
                      <p className="mt-1 text-[10px] text-[#74798a]">{campaign.shop}</p>
                    </div>
                  </div>
                </td>
                <td className="truncate py-2.5 pr-3 text-[#596073]">{campaign.product}</td>
                <td className="whitespace-nowrap py-2.5 pr-3 text-[#596073]">{campaign.created}</td>
                <td className="py-2.5 pr-3 font-medium">{campaign.views}</td>
                <td className="py-2.5 pr-3 font-medium">{campaign.clicks}</td>
                <td className="py-2.5 pr-3 font-medium">{campaign.earnings}</td>
                <td className="py-2.5">
                  <Badge
                    className={
                      campaign.status === "Live"
                        ? "bg-[#e7f7ec] text-[#168848]"
                        : campaign.status === "Rendering"
                          ? "bg-[#fff4dd] text-[#a96c00]"
                          : "bg-[#eef0f4] text-[#5c6271]"
                    }
                  >
                    <span className="mr-1 size-1.5 rounded-full bg-current" />
                    {campaign.status}
                  </Badge>
                </td>
                <td className="py-2.5 pl-2 text-right">
                  <button
                    type="button"
                    aria-label={`Open actions for ${campaign.name}`}
                    title="Campaign actions"
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-[#7a8090] transition hover:border-[#eee5df] hover:bg-[#fff7f3] hover:text-[#ef4b2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb6a5]"
                  >
                    <DotsThree size={20} weight="bold" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
