'use client'

import ProductForm from "@/components/forms/admin/products/product.form";
import PageTitle from "@/components/forms/admin/page-title";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getProductById } from "@/api/product.api";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as string),
    enabled: !!id && id !== "undefined",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;
  }

  return (
    <main className="h-full">
      <PageTitle
        title="Edit product"
        linkText="Go Back"
        link="/admin/products"
      />
      <ProductForm defaultValues={product?.data} productId={id} />
    </main>
  );
};

export default EditProductPage;