"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { AnalyticsDashboard, CreditBalance } from "@/types/api";
import { StatCard } from "./stat-card";

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function DashboardStatGrid() {
  const [analytics, setAnalytics] = useState<AnalyticsDashboard | null>(null);
  const [credits, setCredits] = useState<CreditBalance | null>(null);

  useEffect(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 30);

    void Promise.allSettled([
      apiFetch<AnalyticsDashboard>(
        `/api/analytics/dashboard?from=${isoDate(from)}&to=${isoDate(to)}`,
      ),
      apiFetch<CreditBalance>("/api/credits/balance"),
    ]).then(([analyticsResult, creditsResult]) => {
      if (analyticsResult.status === "fulfilled") setAnalytics(analyticsResult.value);
      if (creditsResult.status === "fulfilled") setCredits(creditsResult.value);
    });
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Credits Available"
        value={credits ? String(credits.availableBalance) : "--"}
        note={credits ? `${credits.reservedBalance} reserved` : "Sign in to load"}
        icon="/assets/icons/play-fill.svg"
      />
      <StatCard
        label="Est. Commissions"
        value={analytics ? `$${analytics.estimatedEarnings.toLocaleString()}` : "--"}
        note="Last 30 days"
        icon="/assets/icons/currency-dollar.svg"
        tone="green"
      />
      <StatCard
        label="Clicks"
        value={analytics ? analytics.clicks.toLocaleString() : "--"}
        note="Last 30 days"
        icon="/assets/icons/shopping-cart-simple.svg"
      />
      <StatCard
        label="Conversion Rate"
        value={analytics ? `${analytics.conversionRate.toFixed(1)}%` : "--"}
        note={analytics ? `${analytics.conversions} conversions` : "Sign in to load"}
        icon="/assets/icons/chart-line-up.svg"
        tone="purple"
      />
    </div>
  );
}
