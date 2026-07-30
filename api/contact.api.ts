import api from ".";

export const sendContactMessage = async (data: { name: string; email: string; message: string }) => {
  try {
    const response = await api.post("/contact", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data ?? { message: error.message, success: false };
  }
};