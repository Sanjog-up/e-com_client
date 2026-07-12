
import { IImage } from '@/types/category.types'
import { Role } from '@/types/enum.types'
import {createContext} from 'react'

export  interface IUser {
    _id: string,
    full_name: string,
    email: string,
    profile_image?: IImage
    createdAt: string,
    updatedAt: string,
    role: Role
}

type TContext = {
    user: IUser | null;
    isAuthenticated: boolean,
    isLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<TContext>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    logout: () => {}
})

export default AuthContext;