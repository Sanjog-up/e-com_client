import PageTitle from "@/components/forms/admin/page-title";
import BrandList from "@/components/forms/admin/brands/brand-list";

export const dynamic = "force-dynamic";
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
