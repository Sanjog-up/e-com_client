import CategorySection from "@/components/landing/category-section";
import Hero from "@/components/landing/hero";
import NewArrivals from "@/components/landing/new_arrivals-section";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import LandingPage from "@/components/layout/landing.page";
import TryOnPage from "../tryon";

export default function Home() {
  return (
    <main className="min-h-screen w-full ">
      {/* <Header/> */}
      {/* <LandingPage/> */}
      <Hero/> 
      <CategorySection/>
      {/* hero section */}
      {/* Our category */}
      {/* featured products */}
      <NewArrivals/>
        <TryOnPage/>
      <Footer/>
    </main>
  )
}