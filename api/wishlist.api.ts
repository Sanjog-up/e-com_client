import { TToggleWishlistResponse, TWishlistResponse } from "@/types/wishlist.types";
import api from ".";

export const getWishlist = async() => {
    try {
        const response = await api.get("/wishlist");
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}

export const toggleWishlist = async(productId:string) =>{
    try {
        const response = await api.patch(`/wishlist/${productId}`);
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
};

export const clearWishlist = async() =>{
    try {
        const response = await api.delete(`/wishlist`);
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
};