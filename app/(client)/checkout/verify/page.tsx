'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useVerifyKhaltiPayment } from '@/components/common/orders/use-order'
import withAuth from '@/hoc/withAuth.hoc'
import { Role } from '@/types/enum.types'

const KhaltiCallback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pidx = searchParams.get('pidx')
  const { mutate, isPending } = useVerifyKhaltiPayment()
  const [failed, setFailed] = useState(false)
  const calledRef = useRef(false)

  useEffect(() => {
    if (!pidx || calledRef.current) return
    calledRef.current = true

    mutate(pidx, {
      onSuccess: (res) => {
        router.replace(`/orders/${res.order._id}`)
      },
      onError: () => {
        setFailed(true)
      },
    })
  }, [pidx, mutate, router])

  if (!pidx) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 text-sm">Missing payment reference. This page shouldn&apos;t be visited directly.</p>
        <Link href="/" className="text-sm underline mt-4 inline-block">Back to home</Link>
      </div>
    )
  }

  if (failed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 text-sm">We couldn&apos;t verify your payment. If money was deducted, it will be refunded automatically, or contact support with your reference.</p>
        <Link href="/checkout" className="text-sm underline mt-4 inline-block">Return to checkout</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
      {isPending ? 'Verifying your payment...' : 'Redirecting...'}
    </div>
  )
}

const Page = withAuth(KhaltiCallback, [Role.USER])
export default Page