'use client'

import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query";
import { addToCart, getCart, updateCart, removeFromCart, clearCart } from "@/api/cart.api";
import { useAuth } from "./auth.hook";

export const useCart = () => {
    const { isAuthenticated } = useAuth()
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
        enabled: isAuthenticated,
        retry: 1,
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