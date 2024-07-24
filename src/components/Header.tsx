import React from 'react';

const Header = () => {
  return (
    <div className='hidden bg-secondary w-full py-2 lg:block'>
      <div className='mx-auto max-w-c-1390 flex justify-between items-center text-background lg:px-12 2xl:px-0'>
        <p className='font-body font-medium text-lg'>Discover Your True Beauty with Enku Beauty!</p>
        <div className='flex justify-between gap-10'>
          <p className='font-body cursor-pointer hover:text-primary'>Download App</p>
          <p className='font-body cursor-pointer hover:text-primary'>Customer Support</p>
        </div>
      </div>
    </div>
  );
};

export default Header;