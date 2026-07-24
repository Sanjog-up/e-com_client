import axios from "axios";
import api from ".";
import { TProduct } from "@/types/product.types";

type ApiResponse<T>= {
    success: boolean,
    message: string;
    data:T
}

export const getAllProducts = async(params?: Record<string, any>):Promise<ApiResponse<TProduct>> => {
    try {
        const response = await api.get("/products", {params});
        return response.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}

export const getFeaturedProducts = async () => 
    getAllProducts({ sort : "-soldCount", limit: 8});

export const getNewArrivals = async() => 
    getAllProducts({ sort: "-createdAt", limit:8});

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