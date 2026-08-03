import axios from "axios";
import api from ".";

export const getAllProducts = async(params?: Record<string, any>) => {
    try {
        const response = await api.get("/products", {params});
        return response.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}

export const getFeaturedProducts = async () => {
    try {
        const response = await api.get("/products/featured");
        return response.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}

export const getNewArrivals = async() => {
    try {
        const response = await api.get("/products/new-arrivals");
        return response.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}

export const getProductById = async(id: string)=> {
    try {
        const response = await api.get(`/products/${id}`)
        return response.data;
    } catch (error:any) {
        throw error?.response?.data;
    }
}
export const createProduct = async (data: FormData) => {
  try {
    const response = await api.post("/products", data);
    return response.data;
  } catch (error) {
    if(axios.isAxiosError(error))
        throw error;
  }
};