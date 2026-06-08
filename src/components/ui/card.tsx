import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-[#ede7e2] bg-white shadow-[0_10px_35px_rgba(32,24,20,.045)]", className)} {...props} />;
}
