import { notFound } from "next/navigation";
import { ProductDetailPanel } from "@/components/products/product-detail-panel";
import { mockProducts } from "@/data/mock-products";

export function generateStaticParams() { return mockProducts.map(({ id }) => ({ id })); }

export default async function ProductDetailPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = mockProducts.find((item) => item.id === id);
  if (!product) notFound();
  return <ProductDetailPanel product={product} />;
}
