'use client'

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { getProductById } from "@/api/product.api"
import { TProduct } from "@/types/product.types"
import { ProductModalProvider, useProductModal } from "@/context/productmodal.context"

export const ProductModal = () => {
    const { productId, closeProduct } =  useProductModal()
    const { data, isLoading} = useQuery({
        queryKey:['product', productId],
        queryFn: () => getProductById(productId as string),
        enabled: !!productId,
    })

    const product: TProduct | undefined = data?.data
    if(!productId)
        return null
    return(
        <div 
        onClick={closeProduct}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-90vh overflow-y-auto rounded-xl bg-white p-6">

                    <button
                    onClick={closeProduct}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                        x
                    </button>

                    {isLoading || !product ? (
                        <div className="h-96 animate-pulse bg-gray-100 rounded-lg"/>
                    ):(
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className=" relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                                <Image 
                                src={product.cover_image.path}
                                alt={product.name}
                                fill
                                className="object-cover"/>
                            </div>
                            <div>
                                <h2 className="text-xl font-serif">{product.name}</h2>
                                <p className="mt-1 font-bold">Rs. {product.price}</p>
                                <p className="mt-3 text-sm text-gray-500">{product.description}</p>
                            </div>
                        </div>
                        )
                    }

            </div>
        </div>
    )
}