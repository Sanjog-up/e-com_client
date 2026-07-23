"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/api/category.api";
import { TCategory } from "@/types/category.types";
import { ExploreOption } from "./dropdown";

export const SORT_OPTIONS: ExploreOption[] = [
  { label: "All Products", href: "/products" },
  { label: "Best Sellers", href: "/products?sort=-soldCount" },
  { label: "Newest", href: "/products?sort=-createdAt" },
];

export const useExploreOptions = (): ExploreOption[] => {
  const { data } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: getAllCategories,
  });

  const categoryOptions: ExploreOption[] = (data?.data ?? []).map(
    (category: TCategory) => ({
      label: category.name,
      href: `/products?category=${category._id}`,
    })
  );

  return [...SORT_OPTIONS, ...categoryOptions];
};