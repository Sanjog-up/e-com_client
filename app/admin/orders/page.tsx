import React from "react";
import PageTitle from "@/components/forms/admin/page-title";

export const dynamic = "force-dynamic";
const Orders = () => {
  return (
    <main className="h-full">
      <PageTitle title="All Orders" linkText="Dashboard" link="/admin" />
    </main>
  );
};

export default Orders;
