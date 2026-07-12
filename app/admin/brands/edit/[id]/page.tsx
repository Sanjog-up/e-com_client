'use client'

import BrandForm from "@/components/forms/admin/brands/brandform";
import PageTitle from "@/components/forms/admin/page-title";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getBrandById } from "@/api/brand.api"; 

const EditBrandPage = () => {
  const { id } = useParams<{id: string}>();

  const { data: brand, isLoading, error } = useQuery({
     queryKey: ["brand", id],
    queryFn: () => getBrandById(id as string),
     enabled: !!id && id!== "undefined", 
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
        title="Edit brand"
        linkText="Go Back"
        link="/admin/brands"
      />
      <BrandForm defaultValues={brand?.data} brandId={id} />
    </main>
  );
};

export default EditBrandPage;