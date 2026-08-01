import React from "react";
import PageTitle from "@/components/forms/admin/page-title";

export const dynamic = "force-dynamic";

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
