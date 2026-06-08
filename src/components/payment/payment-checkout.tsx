"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  CreditCard,
  Lock,
  QrCode,
  ShieldCheck,
  Sparkle,
  Timer,
} from "@phosphor-icons/react";
import { AppLogo } from "@/components/brand/app-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { CheckoutSession } from "@/types/api";

const plans = {
  creator: {
    name: "Creator Pro",
    monthly: 29,
    description: "For creators building a consistent affiliate content engine.",
    features: ["50 AI videos per month", "Auto Reels scheduling", "Brand Kit defaults", "Analytics & link tracking"],
  },
  studio: {
    name: "Studio",
    monthly: 69,
    description: "For teams and power creators producing content at scale.",
    features: ["150 AI videos per month", "3 creator workspaces", "Priority generation", "Advanced exports"],
  },
};

export function PaymentCheckout() {
  const [plan, setPlan] = useState<keyof typeof plans>("creator");
  const [annual, setAnnual] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qr">("card");
  const [cardName, setCardName] = useState("Sarah Carter");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("08/29");
  const [cvc, setCvc] = useState("123");
  const [country, setCountry] = useState("Thailand");
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  const selectedPlan = plans[plan];
  const monthlyPrice = annual
    ? Math.round(selectedPlan.monthly * 0.8 * 100) / 100
    : selectedPlan.monthly;
  const dueToday = annual ? monthlyPrice * 12 : monthlyPrice;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (
      paymentMethod === "card" &&
      (cardName.trim().length < 2 ||
        cardNumber.replace(/\s/g, "").length < 16 ||
        expiry.length < 5 ||
        cvc.length < 3)
    ) {
      setError("Please check your payment details.");
      return;
    }
    setProcessing(true);
    if (paymentMethod === "qr") {
      window.setTimeout(() => {
        setProcessing(false);
        setComplete(true);
      }, 1100);
      return;
    }

    try {
      const origin = window.location.origin;
      const checkout = await apiFetch<CheckoutSession>("/api/payments/checkout", {
        method: "POST",
        body: JSON.stringify({
          purchaseType: "Subscription",
          productCode: plan === "creator" ? "pro" : "business",
          billingCycle: annual ? "Yearly" : "Monthly",
          successUrl: `${origin}/payment?status=success`,
          cancelUrl: `${origin}/payment?status=cancelled`,
        }),
      });
      window.location.href = checkout.checkoutUrl;
    } catch (requestError) {
      setProcessing(false);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to create checkout.",
      );
    }
  };

  if (complete) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf6] p-6">
        <section className="w-full max-w-lg rounded-3xl border border-[#e7e1dc] bg-white p-8 text-center shadow-[0_24px_70px_rgba(32,24,20,.1)]">
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#e9f8ef] text-[#16894a]">
            <CheckCircle size={42} weight="fill" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-[-.045em]">
            Welcome to {selectedPlan.name}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#74798a]">
            Your mock payment was successful. Your workspace has been upgraded
            and all premium tools are ready to explore.
          </p>
          <div className="mt-6 rounded-xl bg-[#fff7f2] p-4 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-[#777b89]">Plan</span>
              <strong>{selectedPlan.name}</strong>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-[#777b89]">Billing</span>
              <strong>{annual ? "Annual" : "Monthly"}</strong>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-[#777b89]">Amount</span>
              <strong>${dueToday.toFixed(2)}</strong>
            </div>
          </div>
          <Link href="/dashboard" className="mt-6 block">
            <Button size="lg" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf6]">
      <header className="flex h-[72px] items-center justify-between border-b border-[#ebe6e2] bg-white px-5 sm:px-8 lg:px-12">
        <Link href="/dashboard" className="w-fit">
          <AppLogo size="sm" />
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#697083]">
          <Lock size={15} weight="fill" className="text-[#16894a]" />
          Secure mock checkout
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 py-8 lg:px-8">
        <Link
          href="/settings"
          className="flex w-fit items-center gap-2 text-sm font-semibold text-[#666c7e] hover:text-[#e64b2a]"
        >
          <ArrowLeft size={17} /> Back to settings
        </Link>

        <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e8e3df] bg-white p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.12em] text-[#e64b2a]">
                    Choose your plan
                  </p>
                  <h1 className="mt-2 text-2xl font-extrabold tracking-[-.04em]">
                    Upgrade your creator workflow
                  </h1>
                </div>
                <div className="flex rounded-xl bg-[#f5f1ee] p-1">
                  <button
                    onClick={() => setAnnual(false)}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold ${
                      !annual ? "bg-white text-[#171d31] shadow-sm" : "text-[#777b89]"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setAnnual(true)}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold ${
                      annual ? "bg-white text-[#171d31] shadow-sm" : "text-[#777b89]"
                    }`}
                  >
                    Annual <span className="text-[#16894a]">−20%</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(Object.entries(plans) as Array<
                  [keyof typeof plans, (typeof plans)[keyof typeof plans]]
                >).map(([id, item]) => (
                  <button
                    key={id}
                    onClick={() => setPlan(id)}
                    className={`focus-ring rounded-2xl border p-5 text-left transition ${
                      plan === id
                        ? "border-[#ff7a5d] bg-[#fff7f2] ring-2 ring-[#ffd5c8]"
                        : "border-[#e8e3df] hover:border-[#ffc1af]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold">{item.name}</h2>
                      {plan === id && (
                        <CheckCircle size={21} weight="fill" className="text-[#ff5a36]" />
                      )}
                    </div>
                    <p className="mt-3 text-3xl font-extrabold">
                      ${annual ? Math.round(item.monthly * 0.8) : item.monthly}
                      <span className="text-sm font-medium text-[#858896]">/mo</span>
                    </p>
                    <p className="mt-3 min-h-10 text-xs leading-5 text-[#74798a]">
                      {item.description}
                    </p>
                    <div className="mt-4 space-y-2">
                      {item.features.map((feature) => (
                        <p
                          key={feature}
                          className="flex items-center gap-2 text-xs font-medium text-[#4e5568]"
                        >
                          <Check size={14} weight="bold" className="text-[#16894a]" />
                          {feature}
                        </p>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <form
              id="payment-form"
              onSubmit={submit}
              className="rounded-2xl border border-[#e8e3df] bg-white p-5 sm:p-6"
            >
              <div>
                <h2 className="font-bold">Payment method</h2>
                <p className="mt-0.5 text-xs text-[#858896]">
                  Choose how you would like to complete this demo checkout
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("card");
                    setError("");
                  }}
                  className={`focus-ring flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-[#ff7a5d] bg-[#fff7f2] ring-2 ring-[#ffd5c8]"
                      : "border-[#e8e3df] hover:border-[#ffc1af]"
                  }`}
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf3ff] text-[#3478d4]">
                    <CreditCard size={21} weight="fill" />
                  </span>
                  <span>
                    <strong className="block text-sm">Credit or debit card</strong>
                    <span className="mt-1 block text-xs text-[#858896]">
                      Use the demo card
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("qr");
                    setError("");
                  }}
                  className={`focus-ring flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                    paymentMethod === "qr"
                      ? "border-[#ff7a5d] bg-[#fff7f2] ring-2 ring-[#ffd5c8]"
                      : "border-[#e8e3df] hover:border-[#ffc1af]"
                  }`}
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#e9f8ef] text-[#16894a]">
                    <QrCode size={22} weight="fill" />
                  </span>
                  <span>
                    <strong className="block text-sm">QR Payment</strong>
                    <span className="mt-1 block text-xs text-[#858896]">
                      PromptPay or mobile banking
                    </span>
                  </span>
                </button>
              </div>

              {paymentMethod === "card" ? (
                <div className="mt-6 grid gap-4 border-t border-[#eee9e5] pt-6 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">
                      Name on card
                    </span>
                    <Input
                      value={cardName}
                      onChange={(event) => setCardName(event.target.value)}
                    />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">
                      Card number
                    </span>
                    <div className="relative">
                      <Input
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(event) =>
                          setCardNumber(event.target.value.replace(/[^\d ]/g, "").slice(0, 19))
                        }
                        className="pr-12 font-mono"
                      />
                      <CreditCard
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#858896]"
                        size={20}
                      />
                    </div>
                  </label>
                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">
                      Expiry
                    </span>
                    <Input
                      value={expiry}
                      onChange={(event) => setExpiry(event.target.value.slice(0, 5))}
                      placeholder="MM/YY"
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">
                      CVC
                    </span>
                    <Input
                      type="password"
                      inputMode="numeric"
                      value={cvc}
                      onChange={(event) =>
                        setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                    />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#858895]">
                      Billing country
                    </span>
                    <select
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      className="focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-3 text-sm"
                    >
                      <option>Thailand</option>
                      <option>United States</option>
                      <option>Singapore</option>
                      <option>United Kingdom</option>
                    </select>
                  </label>
                </div>
              ) : (
                <div className="mt-6 border-t border-[#eee9e5] pt-6">
                  <div className="rounded-2xl bg-[#f8faf9] p-5 sm:flex sm:items-center sm:gap-7">
                    <div className="mx-auto flex size-52 shrink-0 items-center justify-center rounded-2xl border-8 border-white bg-white shadow-[0_10px_30px_rgba(25,35,30,.1)] sm:mx-0">
                      <QrCode size={166} weight="fill" className="text-[#172033]" />
                    </div>
                    <div className="mt-5 text-center sm:mt-0 sm:text-left">
                      <span className="inline-flex rounded-full bg-[#fff0eb] px-3 py-1 text-[11px] font-bold uppercase tracking-[.08em] text-[#c9492d]">
                        Demo QR - not scannable
                      </span>
                      <h3 className="mt-3 text-lg font-bold">Scan with your banking app</h3>
                      <p className="mt-2 text-sm leading-6 text-[#74798a]">
                        PromptPay and supported mobile banking apps can be used
                        in a production checkout.
                      </p>
                      <div className="mt-4 rounded-xl border border-[#e3e9e5] bg-white p-4">
                        <div className="flex justify-between gap-5 text-xs">
                          <span className="text-[#858896]">Merchant</span>
                          <strong>ClipCart AI</strong>
                        </div>
                        <div className="mt-3 flex justify-between gap-5 text-xs">
                          <span className="text-[#858896]">Amount</span>
                          <strong>${dueToday.toFixed(2)}</strong>
                        </div>
                      </div>
                      <p className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#c17819] sm:justify-start">
                        <Timer size={16} weight="fill" />
                        Expires in 09:42
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl bg-[#fff0eb] px-4 py-3 text-xs font-medium text-[#b13c23]"
                >
                  {error}
                </p>
              )}
            </form>
          </div>

          <aside className="h-fit lg:sticky lg:top-6">
            <section className="rounded-2xl border border-[#e8e3df] bg-white p-6 shadow-[0_18px_48px_rgba(32,24,20,.08)]">
              <h2 className="text-lg font-bold">Order summary</h2>
              <div className="mt-5 rounded-xl bg-[#fff7f2] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold">{selectedPlan.name}</p>
                    <p className="mt-1 text-xs text-[#777b89]">
                      {annual ? "Annual billing" : "Monthly billing"}
                    </p>
                  </div>
                  <Sparkle size={22} weight="fill" className="text-[#ff5a36]" />
                </div>
                <div className="mt-4 space-y-2">
                  {selectedPlan.features.map((feature) => (
                    <p key={feature} className="flex items-center gap-2 text-xs text-[#596073]">
                      <Check size={14} weight="bold" className="text-[#16894a]" />
                      {feature}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mt-5 space-y-3 border-b border-[#eee9e5] pb-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#777b89]">{selectedPlan.name}</span>
                  <span>${dueToday.toFixed(2)}</span>
                </div>
                {annual && (
                  <div className="flex justify-between">
                    <span className="text-[#777b89]">Annual discount</span>
                    <span className="font-semibold text-[#16894a]">20% included</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#777b89]">Tax</span>
                  <span>$0.00</span>
                </div>
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-sm text-[#777b89]">Due today</p>
                  <p className="mt-1 text-xs text-[#9a9ca6]">
                    {annual ? "Billed annually" : "Billed monthly"}
                  </p>
                </div>
                <p className="text-3xl font-extrabold tracking-[-.04em]">
                  ${dueToday.toFixed(2)}
                </p>
              </div>
              <Button
                type="submit"
                form="payment-form"
                size="lg"
                className="mt-6 w-full"
                disabled={processing}
              >
                {processing
                  ? "Processing..."
                  : paymentMethod === "qr"
                    ? "I've completed payment"
                    : `Pay $${dueToday.toFixed(2)}`}
                {!processing &&
                  (paymentMethod === "qr" ? (
                    <QrCode size={18} weight="bold" />
                  ) : (
                    <Lock size={17} weight="fill" />
                  ))}
              </Button>
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#e9f8ef] p-4">
                <ShieldCheck
                  size={22}
                  weight="fill"
                  className="shrink-0 text-[#16894a]"
                />
                <p className="text-xs leading-5 text-[#4d6658]">
                  <b>Demo checkout only.</b> No payment is processed or stored.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
