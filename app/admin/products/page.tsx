import React from "react";
import PageTitle from "@/components/forms/admin/page-title";
import ProductList from "@/components/forms/admin/products/product-list";

const AdminProdusctsPage = () => {
  return (
    <main className="h-full">
      <PageTitle title="All Products" linkText="Add new" link="/admin/products/create" />
      <ProductList/>
    </main>

  );
};

export default AdminProdusctsPage;
