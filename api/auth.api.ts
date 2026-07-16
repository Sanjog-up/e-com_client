import api from ".";;
import { TLoginInput, TRegisterInput } from "@/types/auth.types";

// login
export const login = async (data: TLoginInput) => {
  try {
    const response = await api.post(
      "/auth/login",
      data,
    );
    return response.data;
  } catch (error: any) {
    
    throw error.response.data;
  }
};

// register
export const register = async (data: TRegisterInput) => {
  try {
    const response = await api.post(
      "auth/register",
      data,
    )
    return response.data
  } catch (error:any) {
    throw error.response?.data ?? {mesaage: error.message, success: false};
  }
}

// get profile
export const getProfile = async () => {
  try {
    const response = await api.get("/auth/me")
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}