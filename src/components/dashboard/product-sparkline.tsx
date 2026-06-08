import Image from "next/image";

export function ProductSparkline() {
  return (
    <Image
      src="/assets/green-sparkline-small.png"
      alt=""
      width={72}
      height={36}
      className="h-9 w-[72px] object-contain"
      aria-hidden="true"
    />
  );
}
