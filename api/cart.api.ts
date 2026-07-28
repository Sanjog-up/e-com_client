import { TCart } from "@/types/cart.types";
import api from ".";

export const addToCart = async(data:{productId: string, quantity: number}): Promise<{cart:TCart}> => {
    try {
        const response = await api.post("/cart", data);
        return response.data.data;
    } catch (error:any) {
        throw error?.response?.data;
    }
};

export const getCart = async(): Promise<{cart:TCart}> => {
    try {
        const response = await api.get("/cart");
        return response.data.data;
    } catch (error:any) {
        throw error?.response?.data;
    }
};

export const updateCart = async(productId: string, quantity: number): Promise<{cart:TCart}> => {
    try {
        const response = await api.patch(`/cart/${productId}`, {quantity});
        return response.data.data;
    } catch (error:any) {
        throw error?.response?.data;
    }
};

export const removeFromCart = async(productId: string): Promise<{cart:TCart}> => {
    try {
        const response = await api.delete(`/cart/${productId}`);
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}
export const clearCart = async(): Promise<{cart:TCart}> => {
    try {
        const response = await api.delete("/cart");
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}