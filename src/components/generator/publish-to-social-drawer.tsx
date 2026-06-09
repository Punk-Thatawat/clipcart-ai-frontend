"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  CalendarBlank,
  CaretDown,
  Check,
  CheckCircle,
  Clock,
  MagnifyingGlass,
  PaperPlaneTilt,
  UsersThree,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import { mockSocialAccounts } from "@/data/mock-social-accounts";
import { GenerationResult } from "@/types/generator";
import { SocialPlatform } from "@/types/social-account";
import { cn } from "@/lib/utils";

const platformConfig: Record<
  SocialPlatform,
  { icon: string; background: string }
> = {
  TikTok: { icon: "/assets/icons/tiktok.svg", background: "bg-[#f2f3f6]" },
  Facebook: { icon: "/assets/icons/facebook.svg", background: "bg-[#edf4ff]" },
  X: { icon: "/assets/icons/x.svg", background: "bg-[#f2f3f6]" },
  YouTube: { icon: "/assets/icons/youtube.svg", background: "bg-[#fff0f0]" },
};

const platforms = Object.keys(platformConfig) as SocialPlatform[];
const groups = [
  "All groups",
  ...Array.from(new Set(mockSocialAccounts.map((account) => account.group))),
];

export function PublishToSocialDrawer({
  result,
  open,
  onClose,
}: {
  result: GenerationResult;
  open: boolean;
  onClose: () => void;
}) {
  const [selectedPlatforms, setSelectedPlatforms] =
    useState<SocialPlatform[]>(platforms);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All groups");
  const [mode, setMode] = useState<"now" | "schedule">("now");
  const [scheduleAt, setScheduleAt] = useState("");
  const [activeCaption, setActiveCaption] =
    useState<SocialPlatform>("TikTok");
  const [captions, setCaptions] = useState<Record<SocialPlatform, string>>({
    TikTok: `${result.caption}\n\n${result.hashtags.join(" ")}`,
    Facebook: `${result.caption}\n\n${result.hashtags.join(" ")}`,
    X: `${result.caption.slice(0, 180)} ${result.hashtags.slice(0, 2).join(" ")}`,
    YouTube: `${result.caption}\n\n${result.hashtags.join(" ")}`,
  });
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const visibleAccounts = useMemo(
    () =>
      mockSocialAccounts.filter((account) => {
        const matchesPlatform = selectedPlatforms.includes(account.platform);
        const matchesGroup = group === "All groups" || account.group === group;
        const matchesQuery =
          `${account.displayName} ${account.handle} ${account.group}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return matchesPlatform && matchesGroup && matchesQuery;
      }),
    [group, query, selectedPlatforms],
  );

  const invalidSelected = mockSocialAccounts.filter(
    (account) =>
      selectedAccounts.includes(account.id) && account.status !== "Connected",
  );
  const publishableCount = selectedAccounts.length - invalidSelected.length;

  if (!open) return null;

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform],
    );
  };

  const toggleAccount = (id: string) =>
    setSelectedAccounts((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const selectHealthy = () =>
    setSelectedAccounts(
      visibleAccounts
        .filter((account) => account.status === "Connected")
        .map((account) => account.id),
    );

  const publish = () => {
    if (!publishableCount || (mode === "schedule" && !scheduleAt)) return;
    setPublishing(true);
    window.setTimeout(() => {
      setPublishing(false);
      setPublished(true);
    }, 1100);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-end bg-[#11162e]/40 backdrop-blur-[2px] animate-fade-in"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <aside className="h-full w-full max-w-[760px] overflow-y-auto bg-[#fffaf6] shadow-2xl animate-slide-in">
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-[#eae4df] bg-white/95 px-5 py-4 backdrop-blur md:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#e64b2a]">
              Social publishing
            </p>
            <h2 className="mt-1 text-xl font-extrabold">
              Publish to social accounts
            </h2>
            <p className="mt-1 text-xs text-[#7b8090]">
              Choose destinations, review copy, then post now or schedule.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring flex size-10 items-center justify-center rounded-xl hover:bg-[#f7f3f0]"
            aria-label="Close publish drawer"
          >
            <X size={20} />
          </button>
        </header>

        {published ? (
          <div className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
            <span className="flex size-20 items-center justify-center rounded-3xl bg-[#e9f8ef] text-[#169c53]">
              <CheckCircle size={40} weight="fill" />
            </span>
            <h3 className="mt-5 text-2xl font-extrabold">
              {mode === "now" ? "Publishing jobs created" : "Posts scheduled"}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#74798a]">
              {publishableCount} account jobs were added to the mock publishing
              queue. You can track delivery status from Campaign History.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring mt-6 rounded-xl bg-[#171d31] px-6 py-3 text-sm font-bold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-5 p-5 md:p-7">
            <section>
              <div className="flex items-center justify-between">
                <h3 className="font-bold">1. Choose platforms</h3>
                <span className="text-xs text-[#858997]">
                  {selectedPlatforms.length} selected
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {platforms.map((platform) => {
                  const selected = selectedPlatforms.includes(platform);
                  const config = platformConfig[platform];
                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={cn(
                        "focus-ring relative flex items-center gap-2 rounded-xl border p-3 text-left transition",
                        selected
                          ? "border-[#ff9b82] bg-[#fff7f3]"
                          : "border-[#e8e1dc] bg-white",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-9 items-center justify-center rounded-lg",
                          config.background,
                        )}
                      >
                        <Image
                          src={config.icon}
                          alt=""
                          width={19}
                          height={19}
                          className="size-[19px]"
                        />
                      </span>
                      <span className="truncate text-xs font-bold">
                        {platform}
                      </span>
                      {selected && (
                        <span className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-[#ff5a36] text-white">
                          <Check size={10} weight="bold" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-[#e8e1dc] bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold">2. Select destinations</h3>
                  <p className="mt-1 text-xs text-[#858997]">
                    Only healthy connections can receive publishing jobs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={selectHealthy}
                  className="text-xs font-bold text-[#e84b2a]"
                >
                  Select healthy accounts
                </button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px]">
                <div className="relative">
                  <MagnifyingGlass
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9295a0]"
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search accounts..."
                    className="focus-ring h-10 w-full rounded-xl border border-[#e8e1dc] pl-9 pr-3 text-xs"
                  />
                </div>
                <div className="relative">
                  <select
                    value={group}
                    onChange={(event) => setGroup(event.target.value)}
                    className="focus-ring h-10 w-full appearance-none rounded-xl border border-[#e8e1dc] bg-white pl-3 pr-9 text-xs font-semibold"
                  >
                    {groups.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <CaretDown
                    size={13}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
              <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
                {visibleAccounts.map((account) => {
                  const selected = selectedAccounts.includes(account.id);
                  const unavailable = account.status !== "Connected";
                  return (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => !unavailable && toggleAccount(account.id)}
                      disabled={unavailable}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition",
                        selected
                          ? "border-[#ff9b82] bg-[#fff7f3]"
                          : "border-[#eee8e4] bg-white",
                        unavailable && "cursor-not-allowed opacity-60",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-md border",
                          selected
                            ? "border-[#ff5a36] bg-[#ff5a36] text-white"
                            : "border-[#d8d2cd] text-transparent",
                        )}
                      >
                        <Check size={12} weight="bold" />
                      </span>
                      <Image
                        src={account.avatar}
                        alt=""
                        width={38}
                        height={38}
                        className="size-[38px] rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold">
                          {account.displayName}
                        </p>
                        <p className="mt-0.5 truncate text-[10px] text-[#858997]">
                          {account.handle} · {account.group}
                        </p>
                      </div>
                      <Image
                        src={platformConfig[account.platform].icon}
                        alt={account.platform}
                        width={16}
                        height={16}
                        className="size-4"
                      />
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-[9px] font-bold",
                          unavailable
                            ? "bg-[#fff1e8] text-[#d96024]"
                            : "bg-[#e9f8ef] text-[#16894a]",
                        )}
                      >
                        {account.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-[#e8e1dc] bg-white p-4">
              <h3 className="font-bold">3. Review platform copy</h3>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {selectedPlatforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => setActiveCaption(platform)}
                    className={cn(
                      "whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-bold",
                      activeCaption === platform
                        ? "bg-[#171d31] text-white"
                        : "bg-[#f4f1ee] text-[#656a78]",
                    )}
                  >
                    {platform}
                  </button>
                ))}
              </div>
              <textarea
                value={captions[activeCaption]}
                onChange={(event) =>
                  setCaptions((current) => ({
                    ...current,
                    [activeCaption]: event.target.value,
                  }))
                }
                rows={5}
                className="focus-ring mt-3 w-full resize-none rounded-xl border border-[#e8e1dc] p-3 text-xs leading-5"
              />
              {activeCaption === "X" && (
                <p className="mt-2 text-right text-[10px] text-[#858997]">
                  {captions.X.length}/280 characters
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-[#e8e1dc] bg-white p-4">
              <h3 className="font-bold">4. Choose publish time</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMode("now")}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-left",
                    mode === "now"
                      ? "border-[#ff9b82] bg-[#fff7f3]"
                      : "border-[#e8e1dc]",
                  )}
                >
                  <PaperPlaneTilt size={20} weight="fill" />
                  <span>
                    <strong className="block text-sm">Post now</strong>
                    <span className="text-[10px] text-[#858997]">
                      Add jobs to the queue immediately
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("schedule")}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-left",
                    mode === "schedule"
                      ? "border-[#ff9b82] bg-[#fff7f3]"
                      : "border-[#e8e1dc]",
                  )}
                >
                  <CalendarBlank size={20} weight="fill" />
                  <span>
                    <strong className="block text-sm">Schedule</strong>
                    <span className="text-[10px] text-[#858997]">
                      Pick a future date and time
                    </span>
                  </span>
                </button>
              </div>
              {mode === "schedule" && (
                <label className="mt-3 block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#656a78]">
                    <Clock size={15} />
                    Publish date and time
                  </span>
                  <input
                    type="datetime-local"
                    value={scheduleAt}
                    onChange={(event) => setScheduleAt(event.target.value)}
                    className="focus-ring h-11 w-full rounded-xl border border-[#e8e1dc] px-3 text-sm"
                  />
                </label>
              )}
            </section>

            {invalidSelected.length > 0 && (
              <div className="flex items-start gap-3 rounded-xl bg-[#fff4dd] p-4 text-[#996200]">
                <WarningCircle size={19} weight="fill" className="mt-0.5" />
                <p className="text-xs leading-5">
                  {invalidSelected.length} selected accounts need reconnection and
                  will not be published.
                </p>
              </div>
            )}

            <div className="sticky bottom-0 flex items-center gap-3 border-t border-[#e8e1dc] bg-[#fffaf6]/95 py-4 backdrop-blur">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <UsersThree size={18} />
                  {publishableCount} destinations
                </p>
                <p className="mt-0.5 text-[10px] text-[#858997]">
                  Mock publishing queue · no posts will be sent
                </p>
              </div>
              <button
                type="button"
                onClick={publish}
                disabled={
                  publishing ||
                  publishableCount === 0 ||
                  (mode === "schedule" && !scheduleAt)
                }
                className="focus-ring flex h-12 min-w-44 items-center justify-center gap-2 rounded-xl bg-[#ff5a36] px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(255,90,54,.2)] hover:bg-[#e84322] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {publishing ? (
                  "Creating jobs..."
                ) : (
                  <>
                    <PaperPlaneTilt size={18} weight="fill" />
                    {mode === "now"
                      ? `Publish to ${publishableCount}`
                      : `Schedule ${publishableCount}`}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
