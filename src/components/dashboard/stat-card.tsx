import Image from "next/image";
import { Card } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string;
  note: string;
  icon: string;
  tone?: "peach" | "green" | "purple" | "blue";
};

export function StatCard({
  label,
  value,
  note,
  icon,
  tone = "peach",
}: StatCardProps) {
  const tones = {
    peach: "bg-[#fff0ea]",
    green: "bg-[#e9f8ef]",
    purple: "bg-[#f0edff]",
    blue: "bg-[#eaf3ff]",
  };

  return (
    <Card className="flex min-h-[132px] items-center gap-4 p-5">
      <span
        className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
      >
        <Image src={icon} alt="" width={30} height={30} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs text-[#62697c]">{label}</p>
        <p className="mt-1 text-[28px] font-extrabold tracking-[-.04em]">{value}</p>
        <p className="mt-1 text-[11px] font-medium text-[#15944f]">↑ {note}</p>
      </div>
    </Card>
  );
}
