import React from "react";
import PageTitle from "@/components/forms/admin/page-title";
import Header from "@/components/layout/header";
const Page = () => {
  return (
    <main>
      <PageTitle
        title="Dashboard"
        linkText="View Orders"
        link="/admin/orders"
      />
      
    </main>
  );
};
export default Page;
