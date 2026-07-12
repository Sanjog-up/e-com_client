'use client'

import CategoryForm from "@/components/forms/admin/categories/categoryform";
import PageTitle from "@/components/forms/admin/page-title";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getCategoryById } from "@/api/category.api";


const EditCategoryPage = () => {
  const { id } = useParams<{id: string}>();

  const { data: category, isLoading, error } = useQuery({
    
     queryKey: ["Category", id],
    queryFn: () => getCategoryById(id as string),
     enabled: !!id && id!== "undefined", 
  });
console.log("Fetched category:", category);
console.log("submit clicked")
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;
  }
console.log("form errors:", error);

  return (
    <main className="h-full">
      <PageTitle
        title="Edit Category"
        linkText="Go Back"
        link="/admin/Categorys"
      />
      <CategoryForm 
      defaultValues={category?.data ? {
        name: category.data.name,
        category: category.data.category ?? "",
        logo: category.data.image?.path ?? "",
      }: undefined
      }
      categoryId={id} />
    </main>
  );
};

export default EditCategoryPage;