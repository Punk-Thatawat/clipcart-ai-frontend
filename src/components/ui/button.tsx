import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "brand" | "outline" | "ghost" | "soft";
  size?: "sm" | "md" | "lg" | "icon";
}

export function Button({ className, variant = "brand", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold transition disabled:pointer-events-none disabled:opacity-50",
        variant === "brand" && "bg-[#ff5a36] text-white shadow-[0_10px_24px_rgba(255,90,54,.2)] hover:bg-[#e84322]",
        variant === "outline" && "border border-[#e7e1dc] bg-white text-[#151b32] hover:border-[#ffb39f] hover:bg-[#fffaf7]",
        variant === "ghost" && "text-[#565c70] hover:bg-[#f7f2ee] hover:text-[#11172d]",
        variant === "soft" && "bg-[#fff0ea] text-[#d94121] hover:bg-[#ffe3d9]",
        size === "sm" && "h-9 px-3 text-xs",
        size === "md" && "h-11 px-4 text-sm",
        size === "lg" && "h-13 px-6 text-base",
        size === "icon" && "size-10 p-0",
        className,
      )}
      {...props}
    />
  );
}
