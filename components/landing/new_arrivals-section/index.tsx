'use client'
import { getNewArrivals } from "@/api/product.api";
import { FaChevronDown } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../featured-products/product-card";
import ProductGridSkeleton from "@/components/sort.exploreall/productgrid";
import { TProduct } from "@/types/product.types";
import { useExploreOptions } from "@/components/sort.exploreall/explore.option";
import ExploreDropDown from "@/components/sort.exploreall/dropdown";

const NewArrivals = () => {
    const { data, isLoading } = useQuery({
        queryKey: [ "new arrivals"],
        queryFn: getNewArrivals,
    });
    const exploreOptions = useExploreOptions();
    return (
        <div className='pt-10 py-4 bg-blue-100 min-h-60 px-32 '>
            {/* heading */}
            <div className='flex justify-between '>
                {/* left section */}
                <div>
                    <h2 className='text-xl font-bold text-gray-700 tracking-wider'>New Arrivals</h2>
                    <p className='text-sm font-normal text-gray-500'>Explore our newly added products</p>
                </div>
                <ExploreDropDown options={exploreOptions}/>
                </div>
                {/* right section */}
            

            {/* card */}
            <div className='mt-4'>
                {isLoading && <ProductGridSkeleton count={8}/>}
                {!isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {(data?.data ?? []).map((product:TProduct)=> (
                    <ProductCard key={product._id} product={product}/>
                ))}
                </div>
                )}
            </div>
       </div>
    )
}
export default NewArrivals