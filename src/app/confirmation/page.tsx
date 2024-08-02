import OrderConfirmation from '@/features/confirmation/pages/OrderConfirmation'
import React from 'react'

const page = () => {
  return (
    <div className='absolute w-full h-full top-0 left-0 bg-background z-50'>
      <OrderConfirmation/>
    </div>
  )
}

export default page
