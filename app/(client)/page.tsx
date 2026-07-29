import FeaturedProducts from "@/components/landing/featured-products";
import ProductsList from "@/components/landing/featured-products/featured-lst";
import Hero from "@/components/landing/hero";
import NewArrivals from "@/components/landing/new_arrivals-section";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full ">
      <Hero/> 
       <FeaturedProducts/>
      <NewArrivals/>
      <section className=" py-3  px-4 sm:px-8 lg:px-16 xl:px-24   bg-blue-100">
        <Link href="/products" 
        className="text-xl font-bold text-gray-600 tracking-wider mb-4"
        >View All products</Link>
        <ProductsList/>
      </section>
      <Footer/>
    </main>
  )
}