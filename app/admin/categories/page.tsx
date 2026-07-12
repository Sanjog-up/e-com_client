import PageTitle from "@/components/forms/admin/page-title";
import CategoryList from "@/components/forms/admin/categories/category-list";
import React from "react";

const Categories = () => {
  return (
    <main>
      <PageTitle
        title="All Categories"
        linkText="Add New"
        link="/admin/categories/create"
      />
      <CategoryList />
    </main>
  );
};

export default Categories;
