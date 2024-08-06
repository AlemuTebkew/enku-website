import React from 'react'

const OrderConfirmation = () => {
  return (
    <div className="max-w-lg mx-auto px-6 py-4 my-20 bg-white rounded-lg">
    <div className="text-center">
        <h2 className="text-2xl font-bold text-pink-600">🎉 Thank You for Your Order!</h2>
        <p className="mt-4 text-lg text-gray-700">
        Your order has been received. One of our agents will call you shortly to confirm the delivery details.
        </p>
    </div>
    <div className="mt-8 text-center">
        <a
        href="/"
        className="inline-block px-5 py-3 text-white bg-pink-600 rounded-full hover:bg-pink-500 transition"
        >
        Continue Shopping
        </a>
    </div>
    <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">Stay Beautiful, Stay Enku!</p>
    </div>
    </div>

  )
}

export default OrderConfirmation
