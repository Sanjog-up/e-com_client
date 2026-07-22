'use client'

import { useState } from "react";

interface Product{
    _id: string,
    name: string,
    price: number,
    description: string,
    images: string[]
}
export default function ProductsPage({products}: { products:Product[]}){


 const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

return (
    <div>
        {/* product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.map((product)=> (
                <div
                key={product._id}
                onClick={()=> setSelectedProduct(product)}
                className="cursor-pointer"
                >    
                {/* boxs size */}
                    <div>
                        <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    />
                    </div>
                    <p className="mt-2 font-serif">{product.name}</p>
                    <p className="text-sm text-gray-600">Rs.{product.price}</p>
                </div>
            ))}
        </div>
        {selectedProduct && (
            <div onClick={()=> setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            >
                <div onClick={(e)=> e.stopPropagation()}
                    className="relative w-full max-w-lg rounded-xl bg-white p-6">
                        <button
                        onClick={()=>setSelectedProduct(null)}
                        className="absolute top-4 right-4 text-gray-300">
                            x
                            </button>  

                            <img
                            src={selectedProduct.images[0]}
                            alt={selectedProduct.name}
                            className="w-full aspect-3/4 object-cover rounded-lg"
                            />
                            <h2>{selectedProduct.name}</h2>
                            <p>{selectedProduct.description}</p> 
                            <p>{selectedProduct.price}</p>

                </div>
            </div>
        )}
    </div>
)}