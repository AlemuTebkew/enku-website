import CheckoutPage from '@/features/checkout/page/CheckoutPage'
import React from 'react'

const page = () => {
  return (
    <div className='absolute w-full h-screen top-0 left-0 bg-background z-50 pt-4'>
      <CheckoutPage/>
    </div>
  )
}

export default page