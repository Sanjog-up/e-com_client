import * as yup from "yup";

const Max_Size = 5 * 1024 * 1024;
const Supported_Formats = ["image/jpeg", "image/png", "image/webp"];

export const brandSchema = yup.object({
    name: yup.string().required(),
    description: yup
    .string()
    .trim()
    .optional()
    .test('is-non-empty', "description must be 25 chars long",(val)=>{
        if(!val) return true;
        return  val.length >= 25;
    }),
    // .min(25, "must be 25 chars long"),
    logo: yup
    .mixed<File | File[]>()
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

export type TBrabdInput = yup.InferType<typeof brandSchema>;