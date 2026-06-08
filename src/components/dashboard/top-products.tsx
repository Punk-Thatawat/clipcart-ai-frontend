import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProductSparkline } from "./product-sparkline";

const products = [
  {
    id: "cozy-cat-bed",
    name: "Flower Cat Bed",
    category: "Pet Supplies",
    price: "$24.99",
    growth: "45%",
    image: "/assets/product-cat.jpg",
  },
  {
    id: "fabric-shaver",
    name: "Portable Fabric Shaver",
    category: "Home & Kitchen",
    price: "$16.99",
    growth: "38%",
    image: "/assets/product-shaver.jpg",
  },
  {
    id: "serum",
    name: "24K Gold Serum",
    category: "Beauty",
    price: "$19.99",
    growth: "35%",
    image: "/assets/product-serum.jpg",
  },
  {
    id: "phone-stand",
    name: "5-in-1 Keychain Tool",
    category: "Viral Finds",
    price: "$7.99",
    growth: "30%",
    image: "/assets/product-tool.jpg",
  },
];

export function TopProducts() {
  return (
    <section className="h-fit rounded-2xl border border-[#e9e5e1] bg-white p-5 shadow-[0_8px_28px_rgba(32,24,20,.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-bold">Top Viral Products</h2>
        <Link
          href="/products"
          className="rounded-lg border border-[#e6e2de] bg-white px-3.5 py-2 text-[11px] font-medium text-[#444a5d] hover:bg-[#faf8f6]"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-5">
        {products.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group grid grid-cols-[108px_minmax(0,1fr)_64px] items-center gap-4"
          >
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={108}
                height={100}
                className="h-[100px] w-[108px] rounded-xl object-cover"
              />
              <span
                className={`absolute -left-1 -top-1 flex size-8 items-center justify-center rounded-full text-xs font-bold ${
                  index < 3 ? "bg-[#ff5a36] text-white" : "bg-[#f0efed] text-[#747887]"
                }`}
              >
                {index + 1}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[10px] text-[#7c8190]">{product.category}</p>
              <p className="mt-2 line-clamp-2 text-[14px] font-bold leading-5 text-[#20263a] group-hover:text-[#ef4c2a]">
                {product.name}
              </p>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-[13px] font-bold">{product.price}</span>
                <span className="text-[11px] font-semibold text-[#1ca056]">↑ {product.growth}</span>
              </div>
            </div>

            <ProductSparkline />
          </Link>
        ))}
      </div>

      <Link
        href="/products"
        className="mt-6 flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e5e1dd] text-xs font-medium text-[#30364a] hover:bg-[#faf8f6]"
      >
        Explore more products <ArrowRight size={15} />
      </Link>
    </section>
  );
}
