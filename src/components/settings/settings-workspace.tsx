"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  CreditCard,
  GearSix,
  LinkSimple,
  Lock,
  SignOut,
  Sparkle,
  Trash,
  User,
  VideoCamera,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BillingOverview } from "@/components/settings/billing-overview";

type Section = "account" | "preferences" | "notifications" | "affiliate" | "billing";

const nav = [
  ["account", "Account", User],
  ["preferences", "AI preferences", VideoCamera],
  ["notifications", "Notifications", Bell],
  ["affiliate", "Affiliate defaults", LinkSimple],
  ["billing", "Plan & billing", CreditCard],
] as const;

function Switch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`focus-ring relative h-6 w-11 rounded-full transition ${checked ? "bg-[#ff5a36]" : "bg-[#d9d6d2]"}`}
    >
      <span className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition ${checked ? "left-6" : "left-1"}`} />
    </button>
  );
}

export function SettingsWorkspace() {
  const [section, setSection] = useState<Section>("account");
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("Sarah Carter");
  const [email, setEmail] = useState("creator@clipcart.ai");
  const [timezone, setTimezone] = useState("Asia/Bangkok");
  const [language, setLanguage] = useState("English");
  const [style, setStyle] = useState("Problem-Solution");
  const [tone, setTone] = useState("Friendly");
  const [duration, setDuration] = useState("30s");
  const [platform, setPlatform] = useState("TikTok");
  const [subIdPrefix, setSubIdPrefix] = useState("sarah_");
  const [domain, setDomain] = useState("clipcart.ai");
  const [notifications, setNotifications] = useState({
    generation: true,
    campaign: true,
    weekly: true,
    product: false,
    marketing: false,
  });

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1700);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
      <aside className="h-fit rounded-2xl border border-[#eae5e1] bg-white p-3 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
        <div className="px-3 py-3">
          <p className="text-xs font-bold uppercase tracking-[.12em] text-[#92949f]">Workspace settings</p>
        </div>
        <nav className="space-y-1">
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`focus-ring flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition ${
                section === id
                  ? "bg-[#fff0ea] font-semibold text-[#e64b2a]"
                  : "text-[#555b6f] hover:bg-[#faf7f4] hover:text-[#171d31]"
              }`}
            >
              <Icon size={18} weight={section === id ? "fill" : "regular"} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="space-y-5">
        {section === "account" && (
          <>
            <section className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff0ea] text-[#ff5a36]"><User size={20} weight="fill" /></span>
                <div><h2 className="font-bold">Account details</h2><p className="mt-0.5 text-xs text-[#858896]">Update your personal information</p></div>
              </div>
              <div className="mt-6 flex flex-col gap-6 sm:flex-row">
                <div>
                  <div className="flex size-24 items-center justify-center rounded-full bg-[#f0c6ad] text-2xl font-extrabold text-[#673521]">SC</div>
                  <button className="mt-3 w-full text-xs font-semibold text-[#e64b2a] hover:underline">Change photo</button>
                </div>
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Full name</span><Input value={name} onChange={(event) => setName(event.target.value)} /></label>
                  <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Email address</span><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
                  <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Timezone</span><select value={timezone} onChange={(event) => setTimezone(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm"><option>Asia/Bangkok</option><option>America/New_York</option><option>Europe/London</option><option>Asia/Singapore</option></select></label>
                  <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Language</span><select value={language} onChange={(event) => setLanguage(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm"><option>English</option><option>Thai</option><option>Spanish</option><option>Vietnamese</option></select></label>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#eae5e1] bg-white p-5">
              <div className="flex items-center gap-3"><Lock size={20} className="text-[#6852d5]" /><div><h2 className="font-bold">Password & security</h2><p className="mt-0.5 text-xs text-[#858896]">Keep your account secure</p></div></div>
              <div className="mt-5 flex flex-col justify-between gap-3 rounded-xl bg-[#faf7f4] p-4 sm:flex-row sm:items-center">
                <div><p className="text-sm font-semibold">Password</p><p className="mt-1 text-xs text-[#858896]">Last changed 28 days ago</p></div>
                <Button variant="outline">Change password</Button>
              </div>
            </section>
          </>
        )}

        {section === "preferences" && (
          <section className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-[#efedff] text-[#6852d5]"><Sparkle size={20} weight="fill" /></span><div><h2 className="font-bold">AI generation defaults</h2><p className="mt-0.5 text-xs text-[#858896]">Pre-fill every new generation with your preferred settings</p></div></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Default video style</span><select value={style} onChange={(event) => setStyle(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm"><option>Review</option><option>Problem-Solution</option><option>Funny</option><option>Storytelling</option><option>Hard Sell</option><option>Soft Sell</option></select></label>
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Default tone</span><select value={tone} onChange={(event) => setTone(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm"><option>Friendly</option><option>Funny</option><option>Professional</option><option>Excited</option></select></label>
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Default duration</span><select value={duration} onChange={(event) => setDuration(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm"><option>15s</option><option>30s</option><option>60s</option></select></label>
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Default platform</span><select value={platform} onChange={(event) => setPlatform(event.target.value)} className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm"><option>TikTok</option><option>Reels</option><option>Shorts</option></select></label>
            </div>
            <div className="mt-6 space-y-3">
              {[["Include affiliate CTA", true], ["Generate captions automatically", true], ["Apply Brand Kit defaults", true], ["Auto-save generated scripts", false]].map(([label, value]) => (
                <div key={label as string} className="flex items-center justify-between rounded-xl bg-[#faf7f4] p-4"><div><p className="text-sm font-semibold">{label as string}</p><p className="mt-1 text-xs text-[#858896]">Used as the starting value for new campaigns.</p></div><Switch checked={value as boolean} onChange={() => undefined} /></div>
              ))}
            </div>
          </section>
        )}

        {section === "notifications" && (
          <section className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf3ff] text-[#3478d4]"><Bell size={20} weight="fill" /></span><div><h2 className="font-bold">Notification preferences</h2><p className="mt-0.5 text-xs text-[#858896]">Choose what ClipCart sends you</p></div></div>
            <div className="mt-6 divide-y divide-[#eee9e5]">
              {[
                ["generation", "Generation complete", "Get notified when your AI video is ready."],
                ["campaign", "Campaign status changes", "Published, processing, or failed campaign updates."],
                ["weekly", "Weekly performance summary", "Views, clicks, conversions, and estimated revenue."],
                ["product", "Trending product alerts", "New products matching your saved categories."],
                ["marketing", "Product news & tips", "Feature updates and creator education."],
              ].map(([key, label, description]) => (
                <div key={key} className="flex items-center justify-between gap-4 py-4"><div><p className="text-sm font-semibold">{label}</p><p className="mt-1 text-xs leading-5 text-[#858896]">{description}</p></div><Switch checked={notifications[key as keyof typeof notifications]} onChange={(checked) => setNotifications((current) => ({ ...current, [key]: checked }))} /></div>
              ))}
            </div>
          </section>
        )}

        {section === "affiliate" && (
          <section className="rounded-2xl border border-[#eae5e1] bg-white p-5 shadow-[0_10px_32px_rgba(32,24,20,.04)]">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-[#e9f8ef] text-[#16894a]"><LinkSimple size={20} weight="bold" /></span><div><h2 className="font-bold">Affiliate link defaults</h2><p className="mt-0.5 text-xs text-[#858896]">Control generated tracking links and attribution</p></div></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Default sub ID prefix</span><Input value={subIdPrefix} onChange={(event) => setSubIdPrefix(event.target.value)} /></label>
              <label><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">Short link domain</span><Input value={domain} onChange={(event) => setDomain(event.target.value)} /></label>
            </div>
            <div className="mt-5 rounded-xl bg-[#fff7f2] p-4"><p className="text-xs font-bold">Example generated link</p><p className="mt-2 break-all font-mono text-xs text-[#6e7384]">https://{domain}/go/product?sub_id={subIdPrefix}tiktok_01</p></div>
          </section>
        )}

        {section === "billing" && (
          <>
            <BillingOverview />
          </>
        )}

        <div className="flex justify-end">
          <Button onClick={save}>{saved ? <Check size={18} weight="bold" /> : <GearSix size={18} />} {saved ? "Settings saved" : "Save changes"}</Button>
        </div>

        <section className="rounded-2xl border border-[#f1d6d2] bg-[#fff8f6] p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h3 className="flex items-center gap-2 font-bold text-[#ad3828]"><Trash size={18} /> Danger zone</h3><p className="mt-2 text-xs leading-5 text-[#817579]">Permanently remove your account and all mock workspace data.</p></div><Button variant="outline" className="border-[#e9b8ae] text-[#b53b2a] hover:bg-[#fff0eb]">Delete account</Button></div>
        </section>

        <Link href="/login" className="flex w-fit items-center gap-2 text-sm font-semibold text-[#e64b2a] hover:underline"><SignOut size={17} /> Sign out of ClipCart</Link>
      </div>
    </div>
  );
}
