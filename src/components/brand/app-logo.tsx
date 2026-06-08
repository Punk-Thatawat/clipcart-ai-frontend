import { Circle, Play, ShoppingCartSimple, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
  size?: "sm" | "md";
};

export function AppLogo({ className, size = "md" }: AppLogoProps) {
  const compact = size === "sm";

  return (
    <span
      className={cn("inline-flex shrink-0 items-center", compact ? "gap-2" : "gap-2.5", className)}
      aria-label="ClipCart AI"
    >
      <span
        aria-hidden="true"
        className={cn("relative block shrink-0", compact ? "h-10 w-12" : "h-12 w-[58px]")}
      >
        <ShoppingCartSimple
          weight="fill"
          className="absolute bottom-0 left-0 text-[#ff5a36]"
          size={compact ? 40 : 48}
        />
        <Play
          weight="fill"
          className={cn(
            "absolute text-white",
            compact ? "left-[15px] top-[13px]" : "left-[18px] top-[15px]",
          )}
          size={compact ? 13 : 16}
        />
        <Circle
          weight="fill"
          className={cn(
            "absolute text-[#11182e]",
            compact ? "bottom-[1px] left-[9px]" : "bottom-0 left-[11px]",
          )}
          size={compact ? 8 : 10}
        />
        <Circle
          weight="fill"
          className={cn(
            "absolute text-[#11182e]",
            compact ? "bottom-[1px] left-[28px]" : "bottom-0 left-[34px]",
          )}
          size={compact ? 8 : 10}
        />
        <Sparkle
          weight="fill"
          className={cn(
            "absolute text-[#ff5a36]",
            compact ? "right-0 top-0" : "right-0 top-0",
          )}
          size={compact ? 13 : 16}
        />
        <Sparkle
          weight="fill"
          className={cn(
            "absolute text-[#ff8a6f]",
            compact ? "right-[11px] top-[8px]" : "right-[13px] top-[10px]",
          )}
          size={compact ? 7 : 8}
        />
      </span>

      <span
        className={cn(
          "whitespace-nowrap font-extrabold tracking-[-.045em] text-[#10172f]",
          compact ? "text-[19px]" : "text-[24px]",
        )}
      >
        ClipCart <b className="font-bold text-[#ff5a36]">AI</b>
      </span>
    </span>
  );
}
