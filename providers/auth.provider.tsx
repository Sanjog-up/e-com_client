'use client'

import { getProfile, logoutApi } from '@/api/auth.api'
import AuthContext from '@/context/auth.context'
import { QueryClient, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const AuthProvider = ({children}: Readonly<{children: React.ReactNode}>) => {
    const queryClient = useQueryClient();
    const {data, isLoading} = useQuery({
        queryFn: getProfile,
        queryKey: ['me'],
        staleTime: 5* 60* 1000,
        retry: false,


    })
    console.log('auth provider', data?.data)
    
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
        logout:  () => {
          console.log('logged out')
          
          }}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
