"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { useAuth } from "@/components/auth/auth-provider";

export function AuthCallback({
  status,
  error,
}: {
  status?: string;
  error?: string;
}) {
  const router = useRouter();
  const { refreshUser, user } = useAuth();
  const [failed, setFailed] = useState(
    error ?? (status === "success" ? "" : "Google login did not complete."),
  );

  useEffect(() => {
    if (error || status !== "success") return;
    void refreshUser().then((currentUser) => {
      if (currentUser) router.replace("/dashboard");
      else setFailed("The session was created, but the user profile could not be loaded.");
    });
  }, [error, refreshUser, router, status]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf6] p-6">
      <section className="w-full max-w-md rounded-3xl border border-[#e7e1dc] bg-white p-8 text-center shadow-[0_24px_70px_rgba(32,24,20,.1)]">
        {failed ? (
          <>
            <WarningCircle size={48} weight="fill" className="mx-auto text-[#e64b2a]" />
            <h1 className="mt-5 text-2xl font-extrabold">Google login failed</h1>
            <p className="mt-3 text-sm text-[#74798a]">{failed}</p>
            <button
              onClick={() => router.replace("/login")}
              className="mt-6 h-11 w-full rounded-xl bg-[#ff5a36] text-sm font-bold text-white"
            >
              Back to sign in
            </button>
          </>
        ) : (
          <>
            {user ? (
              <CheckCircle size={48} weight="fill" className="mx-auto text-[#16894a]" />
            ) : (
              <SpinnerGap size={48} className="mx-auto animate-spin text-[#ff5a36]" />
            )}
            <h1 className="mt-5 text-2xl font-extrabold">Finishing sign in</h1>
            <p className="mt-3 text-sm text-[#74798a]">
              Loading your ClipCart workspace...
            </p>
          </>
        )}
      </section>
    </main>
  );
}
