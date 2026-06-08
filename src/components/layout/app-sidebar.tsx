"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChartBar,
  CirclesFour,
  FileText,
  GearSix,
  Heart,
  House,
  LinkSimple,
  MagicWand,
  MagnifyingGlass,
  Megaphone,
  Palette,
  Sparkle,
  VideoCamera,
} from "@phosphor-icons/react";
import { AppLogo } from "@/components/brand/app-logo";
import { useAuth } from "@/components/auth/auth-provider";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: House, route: "/dashboard" },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone, route: "/campaigns" },
  { href: "/products", label: "Product Finder", icon: MagnifyingGlass, route: "/products" },
  { href: "/generator", label: "AI Video Studio", icon: VideoCamera, route: "/generator" },
  { href: "/scripts", label: "Script Library", icon: FileText, route: "/scripts" },
  { href: "/templates", label: "Templates", icon: CirclesFour, route: "/templates" },
  { href: "/auto-reels", label: "Auto Reels", icon: MagicWand, badge: "New", route: "/auto-reels" },
  { href: "/analytics", label: "Analytics", icon: ChartBar, route: "/analytics" },
  { href: "/affiliate-links", label: "Affiliate Links", icon: LinkSimple, route: "/affiliate-links" },
  { href: "/brand-kit", label: "Brand Kit", icon: Palette, route: "/brand-kit" },
  { href: "/saved", label: "Saved", icon: Heart, route: "/saved" },
  { href: "/settings", label: "Settings", icon: GearSix, route: "/settings" },
];

export function AppSidebar() {
  const auth = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const routes = Array.from(
      new Set(navItems.map((item) => item.route).filter(Boolean)),
    ) as string[];
    const timers: ReturnType<typeof setTimeout>[] = [];
    const startPrefetch = () => {
      routes
        .filter((route) => route !== pathname)
        .forEach((route, index) => {
          timers.push(setTimeout(() => router.prefetch(route), index * 180));
        });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleId = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(startPrefetch, { timeout: 1200 })
      : window.setTimeout(startPrefetch, 450);

    return () => {
      timers.forEach(clearTimeout);
      if (idleWindow.cancelIdleCallback && typeof idleId === "number") {
        idleWindow.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, [pathname, router]);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-[#ebe7e3] bg-white px-3 py-5 lg:flex">
      <Link href="/dashboard" className="w-fit px-1">
        <AppLogo size="sm" />
      </Link>

      <nav className="mt-7 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, badge, route }) => {
          const active = Boolean(route && (pathname === route || pathname.startsWith(`${route}/`)));
          return (
            <Link
              key={`${href}-${label}`}
              href={href}
              onMouseEnter={() => route && router.prefetch(route)}
              onFocus={() => route && router.prefetch(route)}
              onTouchStart={() => route && router.prefetch(route)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "focus-ring flex h-[44px] items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition",
                active
                  ? "bg-[#fff0ea] font-semibold text-[#f04e2c]"
                  : "text-[#3f465a] hover:bg-[#faf6f3] hover:text-[#151b32]",
              )}
            >
              <Icon size={19} weight={active ? "fill" : "regular"} />
              <span>{label}</span>
              {badge && <span className="ml-auto rounded-full bg-[#e5f6e9] px-2 py-0.5 text-[10px] font-semibold text-[#168849]">{badge}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-[#fff0ea] p-4">
        <div className="flex items-center gap-2 text-sm font-bold"><Sparkle size={19} weight="fill" className="text-[#ff5a36]" /> Upgrade to Pro</div>
        <p className="mt-2 text-[11px] leading-5 text-[#6f7180]">Unlock AI avatars, voiceovers, and unlimited exports.</p>
        <Link href="/payment" className="focus-ring mt-4 flex w-full items-center justify-center rounded-lg bg-[#ff5a36] py-2.5 text-xs font-bold text-white shadow-[0_8px_18px_rgba(255,90,54,.18)]">
          Upgrade Now
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-[#eee8e3] px-2 pt-4">
        <div className="flex size-9 items-center justify-center rounded-full bg-[#17203b] text-xs font-bold text-white">
          {(auth.user?.displayName ?? "Sarah Carter").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div><p className="max-w-32 truncate text-xs font-semibold">{auth.user?.displayName ?? "Sarah Carter"}</p><p className="text-[10px] text-[#8b8e9b]">{auth.user ? auth.user.role : "Pro Plan"}</p></div>
      </div>
    </aside>
  );
}
