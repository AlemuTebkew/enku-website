import React from 'react'

const Nav = () => {
  return (
    <div className='flex justify-between py-2 px-12'>
      <div className='flex gap-5'>
        <p>Enku Beauty</p>
        <p>Categories</p>
        <p>Brands</p>
        <p>Luxe</p>
        <p>Enku Fashion</p>
        <p>Beauty Advice</p>
      </div>
      <div className='flex gap-5'>
        <input type='text'/>
        <button>Sign In</button>
        <button>Cart</button>
      </div>
    </div>
  )
}

export default Nav