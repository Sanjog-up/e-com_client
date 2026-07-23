'use client'

import { FaChevronDown } from "react-icons/fa6";
import { getFeaturedProducts } from "@/api/product.api";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";

const FeaturedProducts = () => {
    const { data, isLoading } = useQuery({
        queryFn: getFeaturedProducts,
        queryKey: ["featured-products"]
    });
    return (
        <div className='mt-10 py-4  bg-gray-50 min-h-60 px-20 '>
            {/* heading */}
            <div className='flex justify-between '>
                {/* left section */}
                <div>
                    <h2 className='text-xl font-bold text-gray-700 tracking-wider'>Featured Products</h2>
                    <p className='text-sm font-normal text-gray-500'>Explore our newly featured products</p>
                </div>
                <div className='flex gap-1 items-center cursor-pointer'>
                    <span>Explore All</span>
                    <FaChevronDown />
                </div>
                {/* right section */}
            </div>

            {/* card */}
            <div className='mt-4 grid grid-cols-5 gap-4'>
                {isLoading && <p>Loading...</p>}
                {(data?.data ?? []).map((product:any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>


        </div>
    )
}

export default FeaturedProducts