"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CaretDown, ChartBar, CirclesFour, FileText, GearSix, Gift, Heart, House, LinkSimple, List, MagicWand, MagnifyingGlass, Megaphone, Palette, ShareNetwork, SignOut, UserPlus, X } from "@phosphor-icons/react";
import { AppLogo } from "@/components/brand/app-logo";
import { useAuth } from "@/components/auth/auth-provider";

const titles: Record<string, [string, string]> = {
  "/dashboard": ["Good morning, Sarah!", "Create scroll-stopping affiliate videos in minutes."],
  "/products": ["Find your next winner", "Search products with strong commissions and viral potential."],
  "/generator": ["AI Video Generator", "Turn one product into a ready-to-post campaign."],
  "/campaigns": ["Campaign History", "Track every generated campaign in one place."],
  "/scripts": ["Script Library", "Your best hooks, captions, and scripts, ready to reuse."],
  "/templates": ["Video Templates", "Start faster with proven affiliate video structures."],
  "/auto-reels": ["Auto Reels", "Keep your affiliate content pipeline running automatically."],
  "/analytics": ["Analytics", "Understand what drives views, clicks, and affiliate revenue."],
  "/connected-accounts": ["Connected Accounts", "Manage TikTok, Facebook, X, and YouTube from one ClipCart account."],
  "/affiliate-links": ["Affiliate Links", "Create, organize, and track links with campaign sub IDs."],
  "/brand-kit": ["Brand Kit", "Keep every generated campaign consistent with your creator brand."],
  "/saved": ["Saved Products", "Review the products you bookmarked for future campaigns."],
  "/settings": ["Settings", "Manage your account, generation defaults, and notifications."],
};

export function AppHeader() {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const pathname = usePathname();
  const root = `/${pathname.split("/")[1]}`;
  const [title, subtitle] = titles[root] ?? ["Product details", "Review the product before generating your campaign."];
  const isDashboard = root === "/dashboard";
  return (
    <header className="flex h-[68px] items-center justify-between gap-4 border-b border-[#ebe7e3] bg-white px-5 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={() => setMenuOpen(true)} className="focus-ring flex size-10 items-center justify-center rounded-xl border border-[#ece5e0] lg:hidden" aria-label="Open menu"><List size={21} /></button>
        <div className={`min-w-0 ${isDashboard ? "lg:hidden" : ""}`}>
          <h1 className="truncate text-lg font-extrabold tracking-[-.03em]">{title}</h1>
          <p className="mt-0.5 hidden text-xs text-[#73788b] md:block">{subtitle}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2.5">
        <button className="focus-ring hidden size-10 items-center justify-center rounded-xl text-[#252b3e] hover:bg-[#faf6f3] sm:flex" aria-label="What's new">
          <Gift size={22} />
        </button>
        <button className="focus-ring relative flex size-10 items-center justify-center rounded-xl text-[#252b3e] hover:bg-[#faf6f3]" aria-label="Notifications">
          <Bell size={22} /><span className="absolute right-1.5 top-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-[#ff5a36] text-[9px] font-bold text-white">3</span>
        </button>
        <div className="relative">
          <button
            onClick={() => setAccountOpen((current) => !current)}
            className="focus-ring flex items-center gap-2 rounded-xl p-1.5 hover:bg-[#faf6f3]"
            aria-label="Account menu"
            aria-expanded={accountOpen}
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-[#f0c6ad] text-xs font-extrabold text-[#673521]">
              {(auth.user?.displayName ?? "Sarah Carter").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
            </span>
            <CaretDown size={15} className={`hidden text-[#30364a] transition sm:block ${accountOpen ? "rotate-180" : ""}`} />
          </button>
          {accountOpen && (
            <>
              <button
                className="fixed inset-0 z-40 cursor-default"
                aria-label="Close account menu"
                onClick={() => setAccountOpen(false)}
              />
              <div className="absolute right-0 top-12 z-50 w-60 rounded-xl border border-[#e9e3de] bg-white p-2 shadow-[0_18px_45px_rgba(32,24,20,.14)]">
                <div className="border-b border-[#eee8e3] px-3 py-3">
                  <p className="text-sm font-bold text-[#171d31]">{auth.user?.displayName ?? "Sarah Carter"}</p>
                  <p className="mt-1 text-xs text-[#858896]">{auth.user?.email ?? "creator@clipcart.ai"}</p>
                </div>
                <Link
                  href="/signup"
                  onClick={() => setAccountOpen(false)}
                  className="mt-2 flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-[#4f5568] hover:bg-[#faf6f3]"
                >
                  <UserPlus size={18} />
                  Create another account
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false);
                    void auth.logout();
                  }}
                  className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-[#e64b2a] hover:bg-[#fff0ea]"
                >
                  <SignOut size={18} />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#11162e]/35 lg:hidden" onMouseDown={(event) => event.target === event.currentTarget && setMenuOpen(false)}>
          <div className="h-full w-[286px] bg-white p-5 shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between"><AppLogo size="sm" /><button onClick={() => setMenuOpen(false)} className="focus-ring flex size-9 items-center justify-center rounded-lg"><X size={20} /></button></div>
            <nav className="mt-8 space-y-2">
              {[
                ["/dashboard", "Dashboard", House],
                ["/products", "Product Search", MagnifyingGlass],
                ["/generator", "AI Generator", MagicWand],
                ["/campaigns", "Campaigns", Megaphone],
                ["/scripts", "Script Library", FileText],
                ["/templates", "Templates", CirclesFour],
                ["/auto-reels", "Auto Reels", MagicWand],
                ["/analytics", "Analytics", ChartBar],
                ["/connected-accounts", "Connected Accounts", ShareNetwork],
                ["/affiliate-links", "Affiliate Links", LinkSimple],
                ["/brand-kit", "Brand Kit", Palette],
                ["/saved", "Saved", Heart],
                ["/settings", "Settings", GearSix],
              ].map(([href, label, NavIcon]) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    onClick={() => setMenuOpen(false)}
                    key={href as string}
                    href={href as string}
                    aria-current={active ? "page" : undefined}
                    className={`flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition ${
                      active
                        ? "bg-[#fff0ea] text-[#e84b2a]"
                        : "text-[#555b6f] hover:bg-[#faf6f3] hover:text-[#151b32]"
                    }`}
                  >
                    <NavIcon size={20} weight={active ? "fill" : "regular"} />
                    {label as string}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
