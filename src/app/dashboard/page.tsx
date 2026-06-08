import Link from "next/link";
import {
  CirclesFour,
  UserCircle,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns";
import { DashboardStatGrid } from "@/components/dashboard/dashboard-stat-grid";
import { TopProducts } from "@/components/dashboard/top-products";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-[-.045em] md:text-[38px]">
              Good morning, Sarah!
            </h1>
            <Sparkle size={30} weight="fill" className="text-[#f4a62a]" />
          </div>
          <p className="mt-2 text-base text-[#666c7e]">
            Create scroll-stopping affiliate videos in minutes.
          </p>
        </div>

        <Link
          href="/generator"
          className="focus-ring flex min-h-[88px] min-w-[290px] items-center justify-center gap-3 rounded-2xl bg-[#ff5a36] px-7 text-white shadow-[0_14px_30px_rgba(255,90,54,.2)] transition hover:bg-[#e84322]"
        >
          <Sparkle size={25} weight="fill" />
          <span>
            <span className="block text-xl font-bold">Generate Video</span>
            <span className="mt-1 block text-xs font-medium text-white/85">
              Create AI video from any product
            </span>
          </span>
        </Link>
      </section>

      <DashboardStatGrid />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_35px_rgba(32,24,20,.035)]">
            <h2 className="text-lg font-bold">Find a product to promote</h2>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Input placeholder="Search for products, keywords or brands..." className="h-12" />
              <Link href="/products">
                <Button className="h-12 w-full whitespace-nowrap px-7 sm:w-auto">
                  Search Products
                </Button>
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium text-[#596074]">Popular searches:</span>
              {["cat gadgets", "skin care", "home must haves", "viral finds", "cleaning tools"].map((item) => (
                <span key={item} className="rounded-full border border-[#eee9e5] bg-[#faf8f6] px-3 py-1.5 text-[11px] text-[#5f6575]">
                  {item}
                </span>
              ))}
            </div>
          </section>
          <RecentCampaigns />
          <section className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#f4ddd4] bg-[#fff0ea] px-6 py-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <span className="flex size-11 items-center justify-center rounded-full border-4 border-[#fff0ea] bg-[#ffd9cc] text-[#2c2230]">
                  <UserCircle size={23} weight="fill" />
                </span>
                <span className="flex size-11 items-center justify-center rounded-full border-4 border-[#fff0ea] bg-[#ffd9cc] text-[#2c2230]">
                  <CirclesFour size={22} weight="fill" />
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold">Create faster with AI</h3>
                <p className="mt-1 text-xs text-[#77717a]">
                  Use AI Avatars, auto-captions and trending hooks to boost views.
                </p>
              </div>
            </div>
            <Link href="/generator">
              <Button className="min-w-[150px]">
                <Sparkle size={17} weight="fill" />
                Try AI Studio
              </Button>
            </Link>
          </section>
        </div>
        <TopProducts />
      </div>
    </div>
  );
}
