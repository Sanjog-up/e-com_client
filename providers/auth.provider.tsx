'use client'

import { getProfile, logoutApi } from '@/api/auth.api'
import AuthContext from '@/context/auth.context'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const AuthProvider = ({children}: Readonly<{children: React.ReactNode}>) => {
    const queryClient = useQueryClient();
    const {data, isLoading} = useQuery({
        queryFn: getProfile,
        queryKey: ['me'],
        staleTime: 0,
        retry: false,


    })
    
    const logout = async() => {
      try{
        await logoutApi();
      } finally{
        queryClient.setQueryData(['me'], null)
      }
    }
  return (
    <AuthContext.Provider 
    value={{
        isAuthenticated: !! data?.data, 
        isLoading: isLoading, 
        user: data?.data ?? null, 
        logout:  () => logout()
        }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
