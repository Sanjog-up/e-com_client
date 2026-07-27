'use client'

import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query";
import { addToCart, getCart, updateCart, removeFromCart, clearCart } from "@/api/cart.api";

export const useCart = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
    })
} 

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"]});
        },
    });
};

export const useUpdateCartItem = () => {
    const queyClient = useQueryClient();
    return useMutation({
        mutationFn:({productId, quantity}: {productId: string, quantity: number}) => 
            updateCart(productId, quantity),
        onSuccess: () => {
            queyClient.invalidateQueries({queryKey:["cart"]});
        },
    })
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cart"]});
        }
    })
};

export const useClearClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: clearCart,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ["cart"]});
        }
    })
}