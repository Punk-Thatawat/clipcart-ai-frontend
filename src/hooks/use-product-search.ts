"use client";

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { mockProducts } from "@/data/mock-products";
import { ApiProduct, PagedResult } from "@/types/api";
import { Product } from "@/types/product";

function mapProduct(product: ApiProduct): Product {
  const commissionRate =
    product.commissionRate <= 1
      ? product.commissionRate * 100
      : product.commissionRate;

  return {
    id: product.externalId,
    name: product.name,
    image: product.imageUrl,
    price: product.price,
    commissionRate,
    estimatedCommission: product.price * (commissionRate / 100),
    category: product.category,
    shopName: product.shop,
    viralScore: Math.round(product.viralScore),
    rating: 0,
    sold: 0,
    description: "Affiliate product returned by the ClipCart product provider.",
    affiliateLink: "",
  };
}

export function useProductSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [minCommission, setMinCommission] = useState(0);
  const [sort, setSort] = useState("viral");
  const [sourceProducts, setSourceProducts] = useState<Product[]>(mockProducts);
  const [totalCount, setTotalCount] = useState(mockProducts.length);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const result = await apiFetch<PagedResult<ApiProduct>>(
          `/api/products/search?query=${encodeURIComponent(query)}&page=1&pageSize=50`,
          { signal: controller.signal },
        );
        setSourceProducts(result.items.map(mapProduct));
        setTotalCount(result.totalCount);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to search products.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const products = useMemo(() => {
    const filtered = sourceProducts.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        product.commissionRate >= minCommission,
    );
    return [...filtered].sort((a, b) =>
      sort === "commission"
        ? b.commissionRate - a.commissionRate
        : sort === "price"
          ? a.price - b.price
          : b.viralScore - a.viralScore,
    );
  }, [category, minCommission, sort, sourceProducts]);

  return {
    products,
    totalCount,
    loading,
    error,
    query,
    setQuery,
    category,
    setCategory,
    minCommission,
    setMinCommission,
    sort,
    setSort,
  };
}
