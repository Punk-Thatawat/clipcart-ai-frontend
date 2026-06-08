import { Product } from "@/types/product";
import { ProductCard } from "./product-card";

export function ProductGrid({ products, savedIds, onSave, onGenerate }: { products: Product[]; savedIds: string[]; onSave: (id: string) => void; onGenerate: (product: Product) => void }) {
  if (!products.length) return <div className="col-span-full rounded-2xl border border-dashed border-[#ded6d0] bg-white p-12 text-center"><p className="font-bold">No matching products</p><p className="mt-2 text-sm text-[#7d8190]">Try a different search or lower the commission filter.</p></div>;
  return <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} saved={savedIds.includes(product.id)} onSave={onSave} onGenerate={onGenerate} />)}</div>;
}
