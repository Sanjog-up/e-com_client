import api from ".";

export const addToCart = async(data:{productId: string, quantity: number}) => {
    try {
        const response = await api.post("/cart", data);
        return response.data.data;
    } catch (error:any) {
        throw error?.response?.data;
    }
};

export const getCart = async() => {
    try {
        const response = await api.get("/cart");
        return response.data.data;
    } catch (error:any) {
        throw error?.response?.data;
    }
};

export const updateCart = async(productId: string, quantity: number) => {
    try {
        const response = await api.patch(`/cart/${productId}`, {quantity});
        return response.data.data;
    } catch (error:any) {
        throw error?.response?.data;
    }
};

export const removeFromCart = async(productId: string) => {
    try {
        const response = await api.delete(`/cart/${productId}`);
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}
export const clearCart = async() => {
    try {
        const response = await api.delete("/cart");
        return response.data.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}