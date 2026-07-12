import { LoginSchema, RegisterSchema } from '../schema/auth.schema'
import * as yup from "yup"

export type TLoginInput = yup.InferType<typeof LoginSchema>;
export type TRegisterInput = yup.InferType<typeof RegisterSchema>;