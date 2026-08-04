import api from ".";;
import { TLoginInput, TRegisterInput } from "@/types/auth.types";

// login
export const login = async (data: TLoginInput) => {
  try {
    const response = await api.post("/auth/login",data);
    if(response.data?.data?.access_token){
      localStorage.setItem("access_token", response.data.data.access_token);
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data ?? {message: error.message, success: false};
  }
};

// register
export const register = async (data: TRegisterInput) => {
  try {
    const response = await api.post(
      "/auth/register",
      data,
    );
    if(response.data?.data?.token){
      localStorage.setItem("access_token", response.data.data.token);
    }
    return response.data
  } catch (error:any) {
    throw error.response?.data ?? {message: error.message, success: false};
  }
}

// get profile
export const getProfile = async () => {
  const token = typeof window !== "undefined" 
  ? localStorage.getItem("access_token")
  : null;
  if(!token) {
    return { data: null, success: true};
  }
  try {
    const response = await api.get("/auth/me")
    return response.data;
  } catch (error:any) {
    throw error.response?.data ?? {message: error.message, success: false};
  }
}

// logout
export const logoutApi = async() => {
  try {
    const response = await api.get("/auth/logout");
    return response.data;
  } catch (error:any) {
    throw error.response?.data ?? {message: error.message, success: false};
  } finally{
    if(typeof window !== 'undefined'){
      localStorage.removeItem("access_token");
    }
  }
}