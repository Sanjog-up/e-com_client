'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWishlist, toggleWishlist, clearWishlist } from "@/api/wishlist.api";
import { useAuth } from "./auth.hook";

export const useWishlist = () => {
    const { isAuthenticated } = useAuth();
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlist,
        enabled: isAuthenticated,
        retry: 1,
    });
};

export const useToggleWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
};

export const useClearWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: clearWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
};

export const useIsWishlisted = (productId: string) => {
    const { data } = useWishlist();
    return !!data?.wishList?.some((item) => item.product_id?._id === productId);
};