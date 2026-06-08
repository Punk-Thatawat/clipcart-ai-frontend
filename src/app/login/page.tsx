import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in | ClipCart AI",
  description: "Sign in to your ClipCart AI creator workspace.",
};

export default function LoginPage() {
  return <LoginForm />;
}
