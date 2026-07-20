import ProductList from "@/components/forms/admin/products/product-list";
import CategorySection from "@/components/landing/category-section";
import FeaturedProducts from "@/components/landing/featured-products";
import ProductsList from "@/components/landing/featured-products/featured-lst";
import Hero from "@/components/landing/hero";
import NewArrivals from "@/components/landing/new_arrivals-section";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/header/index";
import LandingPage from "@/components/layout/landing.page";


export default function Home() {
  return (
    <main className="min-h-screen w-full ">
      {/* <Header/> */}
      {/* <LandingPage/> */}
      <Hero/> 
      {/* hero section */}
      {/* Our category */}
      {/* featured products */}
      <FeaturedProducts/>
      <NewArrivals/>
      <section>
        <h2 className="text-xl font-bold text-gray-600 tracking-wider mb-4">All Products</h2>
        <ProductsList/>
      </section>
      <Footer/>
    </main>
  )
}