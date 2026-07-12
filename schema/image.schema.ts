import * as yup from 'yup';

const Max_Size = 5 * 1024 * 1024;
const Supported_Formats = ['image/jpeg', 'image/png', 'image/webp'];

export const ImageSchema = yup.object({
    image: yup
    .mixed<File>()
    .required('Image is required')
    .test('filesize', 'File must be under 5mb', (value)=> {
        if(!value) return true;
        if (!(value instanceof File)) return true;
        return value.size <= Max_Size;
    } )
    .test('filetype', 'Only JPG, PNG, WEBP allowed', (value)=>{
        if(!value) return true;
        if (!(value instanceof File)) return true;
        return Supported_Formats.includes(value.type)
    })
})