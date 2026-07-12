'use client'

import { useAuth } from "@/hooks/auth.hook";
import { Role } from "@/types/enum.types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const withAuth = (Component: React.ComponentType<any>, roles?: Role[]) => {
    
    return function ProtectedComponent(props: any){
         console.log('withAUth')
        

        const { user, isLoading} = useAuth()
        const router = useRouter()
        console.log('roles:', roles, 'user.role:', user?.role)

        useEffect(() => {
            if(isLoading){
                return 
            }
            if(!isLoading && !user ){
                toast.error('Unauthorized.Login required')
                router.replace('/auth/login')
                return
            }
            if(!isLoading && user && roles && roles.length > 0 &&  !roles?.includes(user.role)){
                toast.error('Unauthorized.You cannot access this resource')
                router.replace('/')
                return
            }
        }, [isLoading, user, router])

        if(isLoading){
            return<main className="h-screen w-screen flex justify-center items-center absolute inset-0 z-50">
                <p>Loading</p>
            </main>
        }

       if(!isLoading && !user ){
                return null
            }
            if(!isLoading && user && !roles?.includes(user.role)){
                return null
            }

            return <Component {...props}/>;
    }
}
export default withAuth