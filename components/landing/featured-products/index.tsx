// 'use client'

// import { FaChevronDown } from "react-icons/fa6";
// import { getFeaturedProducts } from "@/api/product.api";
// import { useQuery } from "@tanstack/react-query";
// import ProductCard from "./product-card";
// import ProductGridSkeleton from "@/components/sort.exploreall/productgrid";
// import ExploreDropDown from "@/components/sort.exploreall/dropdown";
// import { useExploreOptions } from "@/components/sort.exploreall/explore.option";


// const FeaturedProducts = () => {
//     const { data, isLoading } = useQuery({
//         queryFn: getFeaturedProducts,
//         queryKey: ["featured-products"]
//     });
//     return (
//         <div className='pt-10 py-4 bg-blue-100 min-h-60 px-32 '>
//             {/* heading */}
//             <div className='flex justify-between '>
//                 {/* left section */}
//                 <div>
//                     <h2 className='text-xl font-bold text-gray-700 tracking-wider'>Featured Products</h2>
//                     <p className='text-sm font-normal text-gray-500'>Explore our newly featured products</p>
//                 </div>
//                 <div className='flex gap-1 items-center cursor-pointer'>
//                     <span>Explore All</span>
//                     <FaChevronDown />
//                 </div>
//                 {/* right section */}
//             </div>

//             {/* card */}
//             <div className='mt-4 grid grid-cols-5 gap-4'>
//                 {isLoading && <p>Loading...</p>}
//                 {(data?.data ?? []).map((product:any) => (
//                     <ProductCard key={product._id} product={product} />
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default FeaturedProducts

"use client";

import { getFeaturedProducts } from "@/api/product.api";
import { useQuery } from "@tanstack/react-query";
import { TProduct } from "@/types/product.types";
import ProductCard from "./product-card";
import ProductGridSkeleton from "@/components/sort.exploreall/productgrid";
import ExploreDropDown from "@/components/sort.exploreall/dropdown";
import { useExploreOptions } from "@/components/sort.exploreall/explore.option";

const FeaturedProducts = () => {
  const { data, isLoading } = useQuery({
    queryFn: getFeaturedProducts,
    queryKey: ["featured-products"],
  });
  const exploreOptions = useExploreOptions();

  return (
    // pt-10 keeps the spacing *inside* this section so its background
    // isn't broken up by a margin gap showing the page background through
    <div className="pt-10 pb-4 min-h-60 px-32 bg-blue-100">
      {/* heading */}
      <div className="flex justify-between">
        {/* left section */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 tracking-wider">
            Featured Products
          </h2>
          <p className="text-sm font-normal text-gray-500">
            Explore our newly featured products
          </p>
        </div>
        <ExploreDropDown options={exploreOptions} />
      </div>

      {/* card */}
      <div className="mt-4">
        {isLoading && <ProductGridSkeleton count={8} />}
        {!isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(data?.data ?? []).map((product: TProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;