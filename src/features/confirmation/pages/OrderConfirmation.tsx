import React from 'react'

const OrderConfirmation = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <div className="text-center">
        <h2 className="text-2xl font-bold text-pink-600">🎉 Thank You for Your Order!</h2>
        <p className="mt-4 text-lg text-gray-700">
        Your order has been received. One of our agents will call you shortly to confirm the delivery details.
        </p>
        <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900">Track Your Order</h3>
        <p className="mt-2 text-gray-600">
            We`&apos;`ve saved your order details. To easily follow your order status, simply log in with your phone number.
        </p>
        </div>
        <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900">Explore More</h3>
        <p className="mt-2 text-gray-600">
            While you wait, feel free to explore our wide range of beauty products and discover more that you`&apos;`ll love.
        </p>
        </div>
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
