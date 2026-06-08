import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("focus-ring h-11 w-full rounded-xl border border-[#e7e1dc] bg-white px-4 text-sm text-[#11172d] placeholder:text-[#9a9dab]", className)} {...props} />;
}
