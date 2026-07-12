import api from ".";;
import { TLoginInput, TRegisterInput } from "@/types/auth.types";

// login
export const login = async (data: TLoginInput) => {
  try {
    // console.log("login");
    const response = await api.post(
      "/auth/login",
      data,
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

// register
export const register = async (data: TRegisterInput) => {
  try {
    // console.log("register");
    const response = await api.post(
      "http://localhost:3001/api/v1/auth/register",
      data,
    )
    return response.data
  } catch (error:any) {
    console.log(error.response.data);
    throw error.response.data;
  }
}

// get profile
export const getProfile = async () => {
  try {
    const response = await api.get("/auth/me")
    return response.data;
  } catch (error:any) {
    console.log(error.response.data);
    throw error.response.data;
  }
}