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

export function SignupForm() {
  const router = useRouter();
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [creatorType, setCreatorType] = useState("Affiliate creator");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createAccount = async (event?: FormEvent) => {
    event?.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }
    if (!acceptedTerms) {
      setError("Please accept the terms to create your account.");
      return;
    }

    setLoading(true);
    try {
      const result = await apiFetch<AuthResult>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, displayName: name.trim() }),
      }, false);
      auth.setSession(result);
      router.push("/dashboard");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to create your account.",
      );
      setLoading(false);
    }
  };

  const continueWithGoogle = () => {
    window.location.href = googleLoginUrl();
  };

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[minmax(0,1fr)_minmax(480px,.88fr)]">
      <section className="flex min-h-screen flex-col px-6 py-6 sm:px-10 lg:px-14">
        <Link href="/login" className="w-fit">
          <AppLogo />
        </Link>

        <div className="mx-auto flex w-full max-w-[460px] flex-1 flex-col justify-center py-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#e64b2a]">
              Start creating
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-.05em] text-[#10172f]">
              Create your creator account.
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#747889]">
              Set up your workspace and generate your first affiliate campaign
              in minutes.
            </p>
          </div>

          <button
            type="button"
            onClick={continueWithGoogle}
            disabled={loading}
            className="focus-ring mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#e7e1dc] bg-white text-sm font-semibold text-[#242a40] transition hover:bg-[#fffaf7] disabled:opacity-50"
          >
            <GoogleLogo size={20} weight="bold" />
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#eee8e3]" />
            <span className="text-xs text-[#92949f]">or sign up with email</span>
            <span className="h-px flex-1 bg-[#eee8e3]" />
          </div>

          <form onSubmit={createAccount} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#30364a]">
                  Full name
                </span>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Sarah Carter"
                  autoComplete="name"
                  className="h-12"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#30364a]">
                  Creator type
                </span>
                <select
                  value={creatorType}
                  onChange={(event) => setCreatorType(event.target.value)}
                  className="focus-ring h-12 w-full rounded-xl border border-[#e7e1dc] bg-white px-4 text-sm text-[#30364a]"
                >
                  <option>Affiliate creator</option>
                  <option>Content creator</option>
                  <option>Agency or team</option>
                  <option>Just exploring</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#30364a]">
                Email address
              </span>
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="h-12"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#30364a]">
                  Password
                </span>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    className="h-12 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="focus-ring absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#777b89] hover:bg-[#f7f2ee]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#30364a]">
                  Confirm password
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  className="h-12"
                />
              </label>
            </div>

            <label className="flex items-start gap-3 text-xs leading-5 text-[#696e7e]">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[#ff5a36]"
              />
              <span>
                I agree to the{" "}
                <button type="button" className="font-semibold text-[#d94627] hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="font-semibold text-[#d94627] hover:underline">
                  Privacy Policy
                </button>
                .
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-xl bg-[#fff0eb] px-4 py-3 text-xs font-medium text-[#b13c23]">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creating your account..." : "Create account"}
              {!loading && <ArrowRight size={18} weight="bold" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#777b89]">
            Already have an account?{" "}
            <Link href="/login" className="focus-ring rounded font-bold text-[#e64b2a] hover:underline">
              Sign in
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
            No credit card required
          </span>
        </div>

        <div className="relative mx-auto max-w-[520px]">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#d74727]">
            Your creator workspace
          </p>
          <h2 className="mt-4 text-5xl font-extrabold leading-[1.08] tracking-[-.055em] text-[#10172f]">
            Make your first campaign before your coffee gets cold.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#686a76]">
            Start with realistic mock products and explore the complete
            AI-assisted workflow without connecting a store.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-3">
            {[
              ["5 steps", "from product to video"],
              ["1 click", "to generate a campaign"],
              ["0 setup", "to explore the workflow"],
              ["24/7", "creative momentum"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="rounded-2xl border border-white/80 bg-white/65 p-4 backdrop-blur"
              >
                <p className="text-2xl font-extrabold tracking-[-.04em] text-[#ff5a36]">
                  {value}
                </p>
                <p className="mt-1 text-xs font-medium text-[#6c6e79]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-3 rounded-2xl border border-white/80 bg-white/55 p-5 backdrop-blur">
          <CheckCircle size={24} weight="fill" className="shrink-0 text-[#169c53]" />
          <p className="text-sm font-semibold leading-6 text-[#34394d]">
            Your account opens directly into a ready-to-explore creator dashboard.
          </p>
        </div>
      </aside>
    </main>
  );
}
