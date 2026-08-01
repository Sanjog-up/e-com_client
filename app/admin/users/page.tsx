import PageTitle from "@/components/forms/admin/page-title";
import React from "react";

export const dynamic = "force-dynamic";

const Users = () => {
  return (
    <main className="h-full">
      <PageTitle title="All Users" linkText="Dashboard" link="/admin" />
    </main>
  );
};

export default Users;
