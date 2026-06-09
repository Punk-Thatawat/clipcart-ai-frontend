"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowsClockwise,
  CaretDown,
  CaretLeft,
  CaretRight,
  Check,
  CheckCircle,
  Folder,
  FolderPlus,
  MagnifyingGlass,
  Plus,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { mockSocialAccounts } from "@/data/mock-social-accounts";
import {
  SocialAccount,
  SocialAccountStatus,
  SocialPlatform,
} from "@/types/social-account";
import { cn } from "@/lib/utils";

const baseGroups = [
  { name: "All Accounts", count: 49 },
  { name: "Cat Products", count: 10 },
  { name: "Beauty Creators", count: 9 },
  { name: "Home Gadgets", count: 11 },
  { name: "Viral Finds", count: 9 },
  { name: "Thailand Team", count: 10 },
];

const statusStyles: Record<SocialAccountStatus, string> = {
  Connected: "bg-[#e9f8ef] text-[#16894a]",
  "Action required": "bg-[#fff4dd] text-[#a96c00]",
  Expired: "bg-[#fff0ea] text-[#df4a2a]",
};

const platformConfig: Record<
  SocialPlatform,
  {
    icon: string;
    background: string;
    count: number;
    sampleHandle: string;
    permissions: string[];
  }
> = {
  TikTok: {
    icon: "/assets/icons/tiktok.svg",
    background: "bg-[#f2f3f6]",
    count: 38,
    sampleHandle: "@newcreator.account",
    permissions: [
      "Read account profile",
      "Upload and publish videos",
      "Check publishing status",
    ],
  },
  Facebook: {
    icon: "/assets/icons/facebook.svg",
    background: "bg-[#edf4ff]",
    count: 6,
    sampleHandle: "New Creator Page",
    permissions: [
      "Read Facebook Page profile",
      "Publish videos and Reels",
      "Read publishing insights",
    ],
  },
  YouTube: {
    icon: "/assets/icons/youtube.svg",
    background: "bg-[#fff0f0]",
    count: 3,
    sampleHandle: "@NewCreatorChannel",
    permissions: [
      "Read YouTube channel profile",
      "Upload videos and Shorts",
      "Read upload status",
    ],
  },
  X: {
    icon: "/assets/icons/x.svg",
    background: "bg-[#f2f3f6]",
    count: 2,
    sampleHandle: "@newcreator",
    permissions: [
      "Read account profile",
      "Publish posts and videos",
      "Read post status",
    ],
  },
};

const platforms = Object.keys(platformConfig) as SocialPlatform[];
const baseAccountCount = platforms.reduce(
  (sum, platform) => sum + platformConfig[platform].count,
  0,
);

function formatFollowers(value: number) {
  return value >= 1_000_000
    ? `${(value / 1_000_000).toFixed(1)}M`
    : `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}K`;
}

export function ConnectedAccountsWorkspace() {
  const [accounts, setAccounts] = useState(mockSocialAccounts);
  const [activeGroup, setActiveGroup] = useState("All Accounts");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | SocialAccountStatus>("All");
  const [platform, setPlatform] = useState<"All" | SocialPlatform>("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [connectOpen, setConnectOpen] = useState(false);
  const [connectPlatform, setConnectPlatform] =
    useState<SocialPlatform | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [toast, setToast] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [customGroups, setCustomGroups] = useState<string[]>([]);

  const groups = [
    ...baseGroups,
    ...customGroups.map((name) => ({ name, count: 0 })),
  ];

  const visibleAccounts = useMemo(
    () =>
      accounts.filter((account) => {
        const matchesGroup =
          activeGroup === "All Accounts" || account.group === activeGroup;
        const matchesStatus = status === "All" || account.status === status;
        const matchesPlatform =
          platform === "All" || account.platform === platform;
        const matchesQuery = `${account.displayName} ${account.handle} ${account.group} ${account.platform}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesGroup && matchesStatus && matchesPlatform && matchesQuery;
      }),
    [accounts, activeGroup, platform, query, status],
  );
  const totalPages = Math.max(1, Math.ceil(visibleAccounts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedAccounts = visibleAccounts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const rangeStart = visibleAccounts.length
    ? (currentPage - 1) * pageSize + 1
    : 0;
  const rangeEnd = Math.min(currentPage * pageSize, visibleAccounts.length);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const toggleSelected = (id: string) =>
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const toggleAutoPublish = (id: string) =>
    setAccounts((current) =>
      current.map((account) =>
        account.id === id
          ? { ...account, autoPublish: !account.autoPublish }
          : account,
      ),
    );

  const connectAccount = () => {
    if (!connectPlatform) return;
    setConnecting(true);
    window.setTimeout(() => {
      const config = platformConfig[connectPlatform];
      const account: SocialAccount = {
        id: `${connectPlatform.toLowerCase()}-${Date.now()}`,
        platform: connectPlatform,
        handle: config.sampleHandle,
        displayName: `New ${connectPlatform} Creator`,
        avatar: "/assets/product-cat.jpg",
        group: "Thailand Team",
        followers: 12400,
        lastPost: "Just connected",
        status: "Connected",
        autoPublish: false,
      };
      setAccounts((current) => [account, ...current]);
      setConnecting(false);
      setConnectOpen(false);
      setConnectPlatform(null);
      showToast(`${connectPlatform} account connected successfully`);
    }, 900);
  };

  const addGroup = () => {
    const value = newGroup.trim();
    if (!value || groups.some((group) => group.name === value)) return;
    setCustomGroups((current) => [...current, value]);
    setActiveGroup(value);
    setNewGroup("");
    showToast(`Created group "${value}"`);
  };

  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#171d31] text-white">
              <UsersThree size={25} weight="fill" />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold tracking-[-.035em]">
                Connected Social Accounts
              </h2>
              <p className="mt-1 text-sm text-[#73788b]">
                Manage TikTok, Facebook, X, and YouTube from one ClipCart account.
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setConnectPlatform(null);
            setConnectOpen(true);
          }}
          className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ff5a36] px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(255,90,54,.2)] transition hover:bg-[#e84322]"
        >
          <Plus size={18} weight="bold" />
          Connect Account
        </button>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {platforms.map((item) => {
          const config = platformConfig[item];
          const addedAccounts = accounts.filter(
            (account) =>
              account.platform === item &&
              !mockSocialAccounts.some((mock) => mock.id === account.id),
          ).length;
          const active = platform === item;

          return (
          <button
            type="button"
            onClick={() => {
              setPlatform(active ? "All" : item);
              setPage(1);
            }}
            key={item}
            className={cn(
              "group flex items-center gap-4 rounded-2xl border bg-white px-5 py-5 text-left shadow-[0_8px_25px_rgba(32,24,20,.035)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(32,24,20,.07)]",
              active
                ? "border-[#ff8e73] ring-2 ring-[#ffddd4]"
                : "border-[#ebe6e2] hover:border-[#ded6d0]",
            )}
          >
            <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-2xl transition group-hover:scale-105", config.background)}>
              <Image
                src={config.icon}
                alt=""
                width={25}
                height={25}
                className="size-[25px]"
              />
            </span>
            <div>
              <p className="text-[22px] font-extrabold tracking-[-.03em]">{config.count + addedAccounts}</p>
              <p className="mt-0.5 text-xs font-medium text-[#7b8090]">{item} accounts</p>
            </div>
          </button>
        )})}
      </section>

      <section className="grid min-h-[600px] overflow-hidden rounded-2xl border border-[#e8e3df] bg-white shadow-[0_12px_35px_rgba(32,24,20,.045)] lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="border-b border-[#ebe6e2] bg-[#fcfaf8] p-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-2">
            <p className="text-xs font-bold uppercase tracking-[.09em] text-[#8a8e9b]">
              Account groups
            </p>
            <FolderPlus size={17} className="text-[#727789]" />
          </div>
          <nav className="mt-3 space-y-1">
            {groups.map((group) => {
              const active = group.name === activeGroup;
              return (
                <button
                  key={group.name}
                  type="button"
                  onClick={() => {
                    setActiveGroup(group.name);
                    setSelected([]);
                    setPage(1);
                  }}
                  className={cn(
                    "focus-ring flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition",
                    active
                      ? "bg-[#fff0ea] font-bold text-[#e84b2a]"
                      : "font-medium text-[#555c6f] hover:bg-white",
                  )}
                >
                  {group.name === "All Accounts" ? (
                    <UsersThree size={18} weight={active ? "fill" : "regular"} />
                  ) : (
                    <Folder size={18} weight={active ? "fill" : "regular"} />
                  )}
                  <span className="min-w-0 flex-1 truncate">{group.name}</span>
                  <span className={cn("text-[11px]", active ? "text-[#e84b2a]" : "text-[#9a9da7]")}>
                    {group.count}
                  </span>
                </button>
              );
            })}
          </nav>
          <div className="mt-4 border-t border-[#ebe6e2] pt-4">
            <label className="text-[11px] font-semibold text-[#777c8c]">
              New group
            </label>
            <div className="mt-2 flex gap-2">
              <input
                value={newGroup}
                onChange={(event) => setNewGroup(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && addGroup()}
                placeholder="Group name"
                className="focus-ring h-9 min-w-0 flex-1 rounded-lg border border-[#e5dfda] bg-white px-3 text-xs"
              />
              <button type="button" onClick={addGroup} className="focus-ring flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#171d31] text-white">
                <Plus size={15} weight="bold" />
              </button>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-white p-3">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span>Account capacity</span>
              <span>{baseAccountCount + (accounts.length - mockSocialAccounts.length)}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eee9e5]">
              <div className="h-full rounded-full bg-[#ff5a36]" style={{ width: `${baseAccountCount + (accounts.length - mockSocialAccounts.length)}%` }} />
            </div>
            <p className="mt-2 text-[10px] leading-4 text-[#8a8e9b]">
              Connect up to 100 social accounts on your current plan.
            </p>
          </div>
        </aside>

        <div className="min-w-0 p-4 md:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
              <MagnifyingGlass size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9598a3]" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search name, handle, or group..."
                className="focus-ring h-11 w-full rounded-xl border border-[#e6e0db] bg-white pl-10 pr-4 text-sm"
              />
            </div>
            <div className="relative">
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as typeof status);
                  setPage(1);
                }}
                className="focus-ring h-11 min-w-44 appearance-none rounded-xl border border-[#e6e0db] bg-white pl-4 pr-10 text-sm font-medium text-[#555b6d]"
              >
                <option value="All">All statuses</option>
                <option value="Connected">Connected</option>
                <option value="Action required">Action required</option>
                <option value="Expired">Expired</option>
              </select>
              <CaretDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777c8c]" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">
                {platform === "All" ? activeGroup : `${platform} accounts`}
              </h3>
              <p className="mt-1 text-xs text-[#858997]">
                Showing {rangeStart}-{rangeEnd} of {visibleAccounts.length} accounts
              </p>
            </div>
            {selected.length > 0 && (
              <button type="button" onClick={() => setSelected([])} className="text-xs font-bold text-[#e84b2a]">
                Clear selection
              </button>
            )}
          </div>

          <div className="mt-4 grid gap-3 xl:grid-cols-2">
            {paginatedAccounts.map((account) => {
              const isSelected = selected.includes(account.id);
              return (
                <article
                  key={account.id}
                  className={cn(
                    "relative flex items-center gap-3 rounded-2xl border p-4 transition",
                    isSelected
                      ? "border-[#ff9e87] bg-[#fff9f6] shadow-[0_8px_22px_rgba(255,90,54,.08)]"
                      : "border-[#ebe5e1] hover:border-[#dcd3cd] hover:shadow-[0_8px_22px_rgba(32,24,20,.045)]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleSelected(account.id)}
                    aria-label={`Select ${account.displayName}`}
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-md border transition",
                      isSelected
                        ? "border-[#ff5a36] bg-[#ff5a36] text-white"
                        : "border-[#d7d1cc] bg-white text-transparent",
                    )}
                  >
                    <Check size={13} weight="bold" />
                  </button>
                  <Image src={account.avatar} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full object-cover ring-2 ring-white" />
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-2">
                      <h4 className="truncate text-sm font-bold">{account.displayName}</h4>
                      <Image
                        src={platformConfig[account.platform].icon}
                        alt={account.platform}
                        width={14}
                        height={14}
                        className="size-3.5 shrink-0"
                      />
                    </div>
                    <p className="mt-0.5 truncate text-xs text-[#7d8292]">{account.handle}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#777c8c]">
                      <span className="font-semibold text-[#555b6d]">{formatFollowers(account.followers)} followers</span>
                      <span>{account.group}</span>
                      <span>Posted {account.lastPost}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold", statusStyles[account.status])}>
                      {account.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleAutoPublish(account.id)}
                      aria-label={`Toggle auto publish for ${account.displayName}`}
                      aria-pressed={account.autoPublish}
                      className={cn(
                        "relative h-5 w-9 rounded-full transition",
                        account.autoPublish ? "bg-[#169c53]" : "bg-[#d9d7d4]",
                      )}
                    >
                      <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition", account.autoPublish ? "left-[18px]" : "left-0.5")} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {!visibleAccounts.length && (
            <div className="mt-10 flex min-h-64 flex-col items-center justify-center text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-[#f7f3f0] text-[#8b8f9c]">
                <MagnifyingGlass size={25} />
              </span>
              <h3 className="mt-4 font-bold">No accounts found</h3>
              <p className="mt-1 text-xs text-[#858997]">Try another search, status, or account group.</p>
            </div>
          )}

          {visibleAccounts.length > 0 && (
            <div className="mt-5 flex flex-col gap-3 border-t border-[#eee8e4] pt-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-xs font-medium text-[#74798a]">
                Rows per page
                <select
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setPage(1);
                  }}
                  className="focus-ring h-9 rounded-lg border border-[#e4ddd8] bg-white px-3 font-bold text-[#343a4e]"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
              <div className="flex items-center gap-2">
                <span className="mr-2 text-xs text-[#74798a]">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={currentPage === 1}
                  className="focus-ring flex size-9 items-center justify-center rounded-lg border border-[#e4ddd8] bg-white text-[#4f5568] hover:bg-[#faf7f5] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={cn(
                        "focus-ring hidden size-9 items-center justify-center rounded-lg text-xs font-bold sm:flex",
                        currentPage === pageNumber
                          ? "bg-[#171d31] text-white"
                          : "border border-[#e4ddd8] bg-white text-[#555b6d] hover:bg-[#faf7f5]",
                      )}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="focus-ring flex size-9 items-center justify-center rounded-lg border border-[#e4ddd8] bg-white text-[#4f5568] hover:bg-[#faf7f5] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {selected.length > 0 && (
        <div className="fixed bottom-5 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center gap-3 rounded-2xl border border-[#343b50] bg-[#171d31] p-3 pl-4 text-white shadow-[0_18px_45px_rgba(23,29,49,.3)] lg:left-[calc(50%+124px)]">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">{selected.length}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Accounts selected</p>
            <p className="text-[10px] text-white/60">Ready for bulk actions</p>
          </div>
          <button type="button" onClick={() => showToast("Move to group is ready for backend connection")} className="rounded-lg border border-white/15 px-3 py-2 text-xs font-bold hover:bg-white/10">
            Move to group
          </button>
          <button type="button" onClick={() => showToast("Selected accounts added to publishing destinations")} className="rounded-lg bg-[#ff5a36] px-3 py-2 text-xs font-bold hover:bg-[#e84322]">
            Create post
          </button>
        </div>
      )}

      {connectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#11162e]/40 p-4" onMouseDown={(event) => {
          if (event.target !== event.currentTarget) return;
          setConnectOpen(false);
          setConnectPlatform(null);
        }}>
          <div className="w-full max-w-lg rounded-3xl border border-[#e8e1dc] bg-white p-6 shadow-[0_24px_70px_rgba(23,29,49,.2)]">
            <div className="flex items-start justify-between">
              {connectPlatform ? (
                <span className={cn("flex size-12 items-center justify-center rounded-2xl", platformConfig[connectPlatform].background)}>
                  <Image
                    src={platformConfig[connectPlatform].icon}
                    alt={connectPlatform}
                    width={27}
                    height={27}
                    className="size-[27px]"
                  />
                </span>
              ) : (
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#171d31] text-white">
                  <Plus size={24} weight="bold" />
                </span>
              )}
              <button type="button" onClick={() => {
                setConnectOpen(false);
                setConnectPlatform(null);
              }} className="flex size-9 items-center justify-center rounded-xl hover:bg-[#f7f3f0]" aria-label="Close">
                <X size={19} />
              </button>
            </div>

            {!connectPlatform ? (
              <>
                <h3 className="mt-5 text-xl font-extrabold">Connect a social account</h3>
                <p className="mt-2 text-sm leading-6 text-[#727789]">
                  Choose where you want ClipCart to publish your affiliate videos.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {platforms.map((item) => {
                    const config = platformConfig[item];
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setConnectPlatform(item)}
                        className="focus-ring flex items-center gap-3 rounded-2xl border border-[#e8e1dc] p-4 text-left transition hover:border-[#ff9a80] hover:bg-[#fff9f6]"
                      >
                        <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", config.background)}>
                          <Image src={config.icon} alt="" width={24} height={24} className="size-6" />
                        </span>
                        <span>
                          <strong className="block text-sm">Connect {item}</strong>
                          <span className="mt-1 block text-[10px] text-[#858997]">
                            {config.count} accounts connected
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-5 text-[11px] leading-5 text-[#8a8e9b]">
                  Each social account signs in separately. Your ClipCart account and password stay unchanged.
                </p>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setConnectPlatform(null)}
                  className="mt-5 text-xs font-bold text-[#e84b2a]"
                >
                  Back to platforms
                </button>
                <h3 className="mt-3 text-xl font-extrabold">Connect a {connectPlatform} account</h3>
                <p className="mt-2 text-sm leading-6 text-[#727789]">
                  {connectPlatform} will ask you to sign in and approve publishing permissions. Your ClipCart login stays the same.
                </p>
                <div className="mt-5 space-y-3 rounded-2xl bg-[#faf7f5] p-4">
                  {platformConfig[connectPlatform].permissions.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-medium text-[#4e5568]">
                      <CheckCircle size={18} weight="fill" className="text-[#169c53]" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[11px] leading-5 text-[#8a8e9b]">
                  Mock connection only. Real OAuth and encrypted token storage will be handled by the backend.
                </p>
                <button type="button" onClick={connectAccount} disabled={connecting} className="focus-ring mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ff5a36] text-sm font-bold text-white hover:bg-[#e84322] disabled:opacity-70">
                  {connecting ? (
                    <ArrowsClockwise size={18} className="animate-spin" />
                  ) : (
                    <Image
                      src={platformConfig[connectPlatform].icon}
                      alt=""
                      width={18}
                      height={18}
                      className="size-[18px]"
                    />
                  )}
                  {connecting ? "Connecting..." : `Continue with ${connectPlatform}`}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-xl bg-[#171d31] px-4 py-3 text-sm font-semibold text-white shadow-xl">
          <CheckCircle size={18} weight="fill" className="text-[#55d78d]" />
          {toast}
        </div>
      )}
    </div>
  );
}
