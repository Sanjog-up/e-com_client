'use client'
import withAuth from '@/hoc/withAuth.hoc'
import { Role } from '@/types/enum.types'
import React from 'react'

const WishList = () => {
  return (
    <div>
      wishlist
    </div>
  )
}

const Page = withAuth(WishList, [Role.USER])
export default Page
