'use client'
import { getNewArrivals } from "@/api/product.api";
import { FaChevronDown } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../featured-products/product-card";

const NewArrivals = () => {
    const { data, isLoading } = useQuery({
        queryKey: [ "new arrivals"],
        queryFn: getNewArrivals,
    })
    return (
        <div className='pt-10 py-4 bg-blue-100 min-h-60 px-32 '>
            {/* heading */}
            <div className='flex justify-between '>
                {/* left section */}
                <div>
                    <h2 className='text-xl font-bold text-gray-700 tracking-wider'>New Arrivals</h2>
                    <p className='text-sm font-normal text-gray-500'>Explore our newly added products</p>
                </div>
                <div className='flex gap-1 items-center cursor-pointer'>
                    <span>Explore All</span>
                    <FaChevronDown />
                </div>
                {/* right section */}
            </div>

            {/* card */}
            <div className='mt-4 grid grid-cols-5 gap-4 '>
                {isLoading && <p>Loading</p>}
                {(data?.data ?? []).map((product:any)=> (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
       </div>
    )
}
export default NewArrivals