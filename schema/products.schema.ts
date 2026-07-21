import * as yup from 'yup'

const Max_Size = 5 * 1024 * 1024;
const Supported_Formats = ["image/jpeg", "image/png", "image/webp"];

const imageTest = (value: unknown) => {
  if (!value) return true;
  if (!(value instanceof File)) return true;
  return value.size <= Max_Size && Supported_Formats.includes(value.type);
};

export const productsSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().min(25, "at least 25 chars req.").required(),
    price: yup.number().required().typeError("price must be a number").positive(),
    stock:yup.number().required().typeError("stock must be a numebr").min(0),
    category: yup.string().required("category is required"),
    brand: yup.string().required("brand is required"),
    cover_image: yup.mixed<File | string >().required("cover image is required").test("filesize", "File must be under 5mb", imageTest),
    images: yup.array().of(yup.mixed<File | string>().required()).min(1, "at least one gallery image required").required("atleast 1 gallery image is required"),
    new_arrival: yup.boolean().default(false),
    featured: yup.boolean().default(false),
})

export type TProductInput = yup.InferType<typeof productsSchema>;