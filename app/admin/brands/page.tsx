import React from "react";
import PageTitle from "@/components/forms/admin/page-title";
import BrandList from "@/components/forms/admin/brands/brand-list";
import BrandForm from "@/components/forms/admin/brands/brandform";
const Brands = () => {
  return (
    <main className="h-full">
      <PageTitle
        title="All Brands"
        linkText="Add new"
        link="/admin/brands/create"
      />
      <BrandList />
    </main>
  );
};

export default Brands;
