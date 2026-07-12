import api from ".";

//* get all
export const getAllBrands = async () => {
  try {
    const response = await api.get("/brands");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

//* get by id
export const getBrandById = async (id: string) => {
  try {
    const response = await api.get(`/brands/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

//* create
export const createBrand = async (data: any) => {
  try {
    const response = await api.post("/brands", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// update

// delete