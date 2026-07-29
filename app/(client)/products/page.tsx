import { Suspense } from "react";
import ProductClients from "./products.cleint";
import ProductGridSkeleton from "@/components/sort.exploreall/productgrid";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton count={10} />}>
      <ProductClients />
    </Suspense>
  );
}