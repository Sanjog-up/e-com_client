import React from "react";
import PageTitle from "@/components/forms/admin/page-title";

const ProdusctIdPage = () => {
  return (
    <main className="h-full">
      <PageTitle
        title="All Products"
        linkText="Products"
        link="/admin/products"
      />
    </main>
  );
};

export default ProdusctIdPage;
