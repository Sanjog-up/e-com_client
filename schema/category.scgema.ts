import * as yup from "yup";

const Max_Size = 5 * 1024 * 1024;
const Supported_Formats = ["image/jpeg", "image/png", "image/webp"];

export const categorySchema = yup.object({
    name: yup.string().required(),
    category: yup
    .string()
    .required(),

    image: yup
    .mixed<File | string>()
    .required("logo khai")
    .test('filesize', 'File must be under 5mb', (value) => {
        if(!value) return true;
        if (!(value instanceof File)) return true;
        return value.size <= Max_Size;
    })
    .test('filetype', 'Only JPG, PNG, WEBP allowed', (value)=>{
        if(!value) return true;
        if (!(value instanceof File)) return true;
        return Supported_Formats.includes(value.type)
    })
});

export type TCategoryInput = yup.InferType<typeof categorySchema>;