"use client";

import { useAddToCart } from "@/hooks/useCart";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import toast from "react-hot-toast";
import React from "react";
import { error } from "console";

const AddToCartButton = ({productId,quantity = 1,}: { productId: string; quantity?: number;}) => {
  const addToCartMutation = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
  e.stopPropagation();
  addToCartMutation.mutate({productId, quantity},{
    onSuccess: () => toast.success("Added to cart"),
  
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Couldn't add to cart";
      toast.error(message);
    }}
  );
  }
  return (
    <button onClick={handleAddToCart}
    disabled={addToCartMutation.isPending}
    className="flex items-center justify-center gap-2 bg-indigo-400 hover:bg-indigo-600 disabled:bg-indigo-200 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
    >
        <HiOutlineShoppingBag size={18}/>
        {addToCartMutation.isPending ? "Adding.." : "Add to cart"}
    </button>
)
};
export default AddToCartButton;