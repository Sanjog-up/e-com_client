'use client'

import { useToggleWishlist, useIsWishlisted } from "@/hooks/wishlist.hook"
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import toast from "react-hot-toast";
import React from "react";



const WishlistButton = ({ productId, className ="" }: {
    productId: string;
    className?: string;
})  => {
    const  isWishlisted  = useIsWishlisted(productId);
    const toggleWishlistMuatation = useToggleWishlist();    

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleWishlistMuatation.mutate(productId, {
            onSuccess: (data) => {
                toast.success(data.wishListed ? "Added to wishlist" : "Removed from wishlist");
            },
            onError: (error: any) => {
                const message = error?.message || "Something went wrong";
                toast.error(message);
            }
        });
    };

    return (
        <button onClick={handleToggle}
        disabled={toggleWishlistMuatation.isPending}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} 
        className={`flex items-center justify-center rounded-full p-2 transition-colors disabled:opacity-50 text-2xl ${className}`}>
            {isWishlisted ? (
                <HiHeart size={20} className="text-red-500" />
            ) : (
                <HiOutlineHeart size={20} className="text-gray-400 hover:text-red-400"/>
            )}
        </button>
    );
};

export default WishlistButton;