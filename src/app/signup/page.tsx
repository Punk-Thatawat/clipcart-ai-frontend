import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create account | ClipCart AI",
  description: "Create your ClipCart AI creator workspace.",
};

export default function SignupPage() {
  return <SignupForm />;
}
