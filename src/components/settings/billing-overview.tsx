"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard } from "@phosphor-icons/react";
import { apiFetch } from "@/lib/api";
import { CreditBalance, CurrentSubscription } from "@/types/api";
import { Button } from "@/components/ui/button";

export function BillingOverview() {
  const [subscription, setSubscription] = useState<CurrentSubscription | null>(null);
  const [credits, setCredits] = useState<CreditBalance | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void Promise.allSettled([
      apiFetch<CurrentSubscription>("/api/subscriptions/current"),
      apiFetch<CreditBalance>("/api/credits/balance"),
    ]).then(([subscriptionResult, creditsResult]) => {
      if (subscriptionResult.status === "fulfilled") {
        setSubscription(subscriptionResult.value);
      }
      if (creditsResult.status === "fulfilled") setCredits(creditsResult.value);
      setLoaded(true);
    });
  }, []);

  const planName = subscription?.planName ?? (loaded ? "Free" : "Loading...");
  const renewal = subscription
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(subscription.currentPeriodEnd))
    : null;

  return (
    <>
      <section className="rounded-2xl border border-[#f0ddd5] bg-[#fff0ea] p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#e64b2a]">
              Current plan
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">{planName}</h2>
            <p className="mt-2 text-sm text-[#746e77]">
              {renewal
                ? `${subscription?.billingCycle} billing · Current period ends ${renewal}`
                : "No active paid subscription"}
            </p>
          </div>
          <Link href="/payment"><Button>Manage billing</Button></Link>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-xs">
            <span>Available generation credits</span>
            <span>{credits?.availableBalance ?? "--"}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[#ff5a36]"
              style={{ width: `${Math.min(100, credits?.availableBalance ?? 0)}%` }}
            />
          </div>
        </div>
      </section>
      <section className="rounded-2xl border border-[#eae5e1] bg-white p-5">
        <h3 className="font-bold">Payment checkout</h3>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#faf7f4] p-4">
          <div className="flex items-center gap-3">
            <CreditCard size={24} />
            <div>
              <p className="text-sm font-semibold">Managed by payment provider</p>
              <p className="mt-1 text-xs text-[#858896]">
                Card details are not stored by ClipCart
              </p>
            </div>
          </div>
          <Link href="/payment"><Button variant="outline" size="sm">Open checkout</Button></Link>
        </div>
      </section>
    </>
  );
}
