import BrandForm from "@/components/forms/admin/brands/brandform";
import PageTitle from "@/components/forms/admin/page-title";
import React from "react";

const CreateBrandPage = () => {
  return (
    <main className="h-full">
      <PageTitle
        title="Add new brand"
        linkText="Go Back"
        link="/admin/brands"
      />

      <BrandForm />
    </main>
  );
};
export default CreateBrandPage;
