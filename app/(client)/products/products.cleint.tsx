"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/product.api";
import { getAllCategories } from "@/api/category.api";
import { TProduct } from "@/types/product.types";
import { TCategory } from "@/types/category.types";
import ProductCard from "@/components/landing/featured-products/product-card";
import ProductGridSkeleton from "@/components/sort.exploreall/productgrid";
import Link from "next/link";
import { MdOutlineCloudOff } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const SORT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Best Sellers", value: "-soldCount" },
  { label: "Newest", value: "-createdAt" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
];

export default function ProductClients() {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "";
  const category = searchParams.get("category") ?? "";
  const search = searchParams.get("query") ?? "";
  const router = useRouter();

  const [searchInput , setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search)
  }, [search]);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (sort) params.sort = sort;
    if (category) params.category = category;
    if(search) params.query = search;
    return params;
  }, [sort, category, search]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getAllProducts(queryParams),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: getAllCategories,
  });

  const categories: TCategory[] = categoriesData?.data ?? [];
  const products: TProduct[] = data?.data ?? [];
  const activeCategory = categories.find((c) => c._id === category);
  const pageTitle = activeCategory
  ? activeCategory.name
  : search
    ? `Results for “${search}”`
    : "All Products";

  const buildHref = (updates: { sort?: string; category?: string; search?: string }) => {
    const params = new URLSearchParams();
    const nextSort = updates.sort !== undefined ? updates.sort : sort;
    const nextCategory =
      updates.category !== undefined ? updates.category : category;
    const nextSearch  = updates.search !== undefined ? updates.search : search; 

    if (nextSort) params.set("sort", nextSort);
    if (nextCategory) params.set("category", nextCategory);
    if (nextSearch) params.set("query", nextSearch);

    const qs = params.toString();
    return qs ? `/products?${qs}` : "/products";
  };


  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if(searchInput.trim()) params.set("query", searchInput.trim());
    if(sort) params.set("sort", sort);
    if(category) params.set("category", category);
    const qs = params.toString();
    router.push(qs ? `/products?${qs}` : "/products")
  }



  return (
    <main className="min-h-[80vh] bg-blue-100">
      <div className="px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-wider">
              {pageTitle}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isLoading
                ? "Loading products..."
                : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
            </p>
          </div>

          {/* search */}
          <form onSubmit={onSearchSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
            type="search"
            value= {searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Products"
            className="flex-1 sm:w-64 px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            type="submit"
            
            >Search</button>
          </form>
          </div>

          {/* Sort */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-gray-600">
              Sort by:
            </span>
              {SORT_OPTIONS.map((opt) => {
                const isActive = sort === opt.value;
                return (
                  <Link
                    key={opt.value || "default"}
                    href={buildHref({ sort: opt.value })}
                    className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                    }`}
                  >
                    {opt.label}
                  </Link>
                );
              })}
            </div>
          </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0 space-y-4">
            {/* categories */}
            <div className="bg-white rounded-lg border border-gray-100 p-4 ">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Categories
              </h2>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={buildHref({ category: "" })}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                      !category
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    All Categories
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={buildHref({ category: cat._id })}
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        category === cat._id
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {(sort || category || search) && (
                <Link
                  href="/products"
                  className="mt-4 block text-center text-sm text-indigo-600 hover:underline"
                >
                  Clear filters
                </Link>
              )}
            </div>
          </aside>

          {/* Product grid */}
          <section className="flex-1 min-w-0">
            {isLoading && <ProductGridSkeleton count={10} />}

            {isError && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MdOutlineCloudOff className="text-red-300" size={48} />
                <p className="text-gray-600 font-medium mt-3">
                  Failed to load products
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {(error as any)?.message || "Please try again later"}
                </p>
              </div>
            )}

            {!isLoading && !isError && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MdOutlineCloudOff className="text-indigo-300" size={48} />
                <p className="text-gray-600 font-medium mt-3">
                  No products found
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Try changing the filters or category
                </p>
                <Link
                  href="/products"
                  className="mt-4 text-sm text-indigo-600 hover:underline"
                >
                  View all products
                </Link>
              </div>
            )}

            {!isLoading && !isError && products.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}