'use client'

import Image from "next/image";
import { TCartItem } from "@/types/cart.types";
import { useUpdateCartItem, useRemoveFromCart } from "@/hooks/useCart";
import { HiOutlineTrash, HiMinus, HiPlus } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const CartItemRow =  ({item}: {item: TCartItem}) => {
    const { product, quantity } = item;
    const [localQuantity, setLocalQuantity] = useState(quantity);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { mutate : updateCartItem, isPending: isUpdating} = useUpdateCartItem();
    const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();

    useEffect(()=> {
        setLocalQuantity(quantity)
    }, [quantity])

    const commitQuantity = (nextQty: number) => {
        if(debounceRef.current) clearTimeout(debounceRef.current)
            debounceRef.current = setTimeout(() => {
        updateCartItem({ productId: product._id, quantity: nextQty },
            {
                onError: () => {
                    toast.error("Couldn't update quantity");
                    setLocalQuantity(quantity);
                }
            }
        )
    }, 400)
    }

    const handeIncrement = () => {
        if(localQuantity >= product.stock) return
        const next = localQuantity + 1
        setLocalQuantity(next)
        commitQuantity(next)
    }
    const handleDecrement = () => {
        if(localQuantity <= 1) return
        const next = localQuantity -1
        setLocalQuantity(next)
        commitQuantity(next)
    }

    const handleRemove = () => {
        removeFromCart(product._id, {
            onSuccess: () => toast.success(`Removed ${product.name} from cart`),
            onError: () => toast.error("Couldn't remove item"),
        })
    }

    const subtotal = product.price * localQuantity
    const isBusy = isUpdating || isRemoving

    return(
        <div className={`flex items-center gap-4 py-4 border-b ${isBusy ? "opacity-60" : ""}`}>
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                src={product.cover_image.path}
                alt={product.name}
                fill
                className="object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-gray-500">Rs. {product.price.toLocaleString()}</p>
                {localQuantity > product.stock && (
                    <p className="text-xs text-red-500 mt-1">Only {product.stock} left in stcok</p>
                )}
            </div>

            <div className="flex items-center border rounded-md">
                <button
                type="button"
                onClick={handleDecrement}
                disabled={localQuantity <= 1 || isBusy}
                className="p-2 disabled:opacity-30"
                >
                    <HiMinus className="h-4 w-4"/>
                </button>
                <span className="w-8 text-center text-sm">{localQuantity}</span>
                <button type="button"
                onClick={handeIncrement}
                disabled={localQuantity >= product.stock || isBusy}
                className="p-2 disabled:opacity-30">
                    <HiPlus className="h-4 w-4"/>
                </button>
            </div>

            <p className="w-20 text-right font-medium ">Rs. {subtotal.toLocaleString()}</p>

            <button
            type="button"
            onClick={handleRemove}
            disabled={isBusy}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
                <HiOutlineTrash className="h-5 w-5"/>
            </button>
        </div>
    )

}

export default CartItemRow;