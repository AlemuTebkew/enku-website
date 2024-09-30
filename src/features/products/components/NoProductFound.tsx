import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import Link from 'next/link';

interface NoProductsFoundProps {
    title: string,
    message: string
}
const NoProductsFound = ({title, message}: NoProductsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] space-y-6 lg:col-span-3">
      <img 
        src="/images/no-products.jpg" 
        alt="No Products" 
        className="w-40 h-40 object-contain" 
      />
      <h2 className="text-2xl font-semibold text-gray-700">
        {title}
      </h2>
      <p className="text-md  text-center text-gray-500">
        {message}
      </p>
      <Link href="/">
        <Button className="px-8 py-3 text-white bg-pink-500 hover:bg-pink-600 rounded-full">
            Back to home
        </Button>
      </Link>
    </div>
  );
};

export default NoProductsFound;
