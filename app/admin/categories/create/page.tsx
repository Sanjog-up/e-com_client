import PageTitle from "@/components/forms/admin/page-title";
import CategoryForm from "@/components/forms/admin/categories/categoryform";
import React from "react";

const CategoryCreatePage = () => {
  return (
    <main className="h-full">
      <PageTitle
        title="Add Category"
        linkText="Go back"
        link="/admin/categories"
      />
      <CategoryForm />
    </main>
  );
};

export default CategoryCreatePage;
