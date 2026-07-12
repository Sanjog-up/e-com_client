import api from ".";

//* get all
export const getAllCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

//* get by id
export const getCategoryById = async (id: string) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

//* create
export const createCategory = async (data: any) => {
  try {
    const response = await api.post("/categories", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// update

// delete