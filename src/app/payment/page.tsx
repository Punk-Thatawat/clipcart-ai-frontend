import type { Metadata } from "next";
import { PaymentCheckout } from "@/components/payment/payment-checkout";

export const metadata: Metadata = {
  title: "Upgrade plan | ClipCart AI",
  description: "Choose a ClipCart AI creator plan.",
};

export default function PaymentPage() {
  return <PaymentCheckout />;
}
