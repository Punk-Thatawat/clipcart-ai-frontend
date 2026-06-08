"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  EyeSlash,
  GoogleLogo,
  Sparkle,
} from "@phosphor-icons/react";
import { AppLogo } from "@/components/brand/app-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/auth-provider";
import { apiFetch, googleLoginUrl } from "@/lib/api";
import { AuthResult } from "@/types/api";

export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const [email, setEmail] = useState("creator@clipcart.ai");
  const [password, setPassword] = useState("clipcartdemo");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signIn = async (event?: FormEvent) => {
    event?.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const result = await apiFetch<AuthResult>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }, false);
      auth.setSession(result);
      router.push("/dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    setMessage("");
    if (!email) {
      setMessage("Enter your email address first.");
      return;
    }
    try {
      await apiFetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      }, false);
      setMessage("If the account exists, reset instructions will be sent.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to request a reset.");
    }
  };

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[minmax(0,1fr)_minmax(480px,.88fr)]">
      <section className="flex min-h-screen flex-col px-6 py-6 sm:px-10 lg:px-14">
        <Link href="/login" className="w-fit">
          <AppLogo />
        </Link>

        <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#e64b2a]">
              Welcome back
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-.05em] text-[#10172f]">
              Keep creating videos that sell.
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#747889]">
              Sign in to find your next winning product and turn it into a
              ready-to-post campaign.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = googleLoginUrl();
            }}
            className="focus-ring mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#e7e1dc] bg-white text-sm font-semibold text-[#242a40] transition hover:bg-[#fffaf7]"
          >
            <GoogleLogo size={20} weight="bold" />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#eee8e3]" />
            <span className="text-xs text-[#92949f]">or continue with email</span>
            <span className="h-px flex-1 bg-[#eee8e3]" />
          </div>

          <form onSubmit={signIn} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#30364a]">
                Email address
              </span>
              <Input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-12"
              />
            </label>

            <label className="block">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#30364a]">
                  Password
                </span>
                <button
                  type="button"
                  onClick={forgotPassword}
                  className="focus-ring rounded text-xs font-semibold text-[#e64b2a] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="focus-ring absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#777b89] hover:bg-[#f7f2ee]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlash size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </label>

            <label className="flex w-fit items-center gap-2 text-sm text-[#626778]">
              <input type="checkbox" defaultChecked className="size-4 rounded accent-[#ff5a36]" />
              Keep me signed in
            </label>

            {message && (
              <p className="rounded-xl bg-[#fff3ed] px-4 py-3 text-xs text-[#a54027]">
                {message}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in to ClipCart"}
              {!loading && <ArrowRight size={18} weight="bold" />}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-[#777b89]">
            New to ClipCart?{" "}
            <Link href="/signup" className="focus-ring rounded font-bold text-[#e64b2a] hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#a0a2ab] sm:text-left">
          © 2026 ClipCart AI. Built for affiliate creators.
        </p>
      </section>

      <aside className="relative hidden overflow-hidden bg-[#fff1e9] p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-[#ffd7c7]/70" />
        <div className="absolute -bottom-20 -left-24 size-72 rounded-full bg-white/60" />

        <div className="relative flex justify-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-bold text-[#b64025] backdrop-blur">
            <Sparkle size={16} weight="fill" />
            AI affiliate video studio
          </span>
        </div>

        <div className="relative mx-auto max-w-[520px]">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#d74727]">
            One product. One click.
          </p>
          <h2 className="mt-4 text-5xl font-extrabold leading-[1.08] tracking-[-.055em] text-[#10172f]">
            From product idea to ready-to-post video.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#686a76]">
            ClipCart handles the hook, script, storyboard, caption, hashtags,
            affiliate link, and video preview.
          </p>

          <div className="mt-9 space-y-3">
            {[
              "Find high-commission viral products",
              "Generate complete campaigns in minutes",
              "Keep every script and sub_id organized",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-4 text-sm font-semibold text-[#30364a] backdrop-blur"
              >
                <CheckCircle size={21} weight="fill" className="text-[#169c53]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl border border-white/80 bg-white/55 p-5 backdrop-blur">
          <p className="text-lg font-bold text-[#1e2439]">
            “My content workflow finally feels simple.”
          </p>
          <p className="mt-3 text-sm text-[#70727e]">
            Sarah Carter · Affiliate creator
          </p>
        </div>
      </aside>
    </main>
  );
}
