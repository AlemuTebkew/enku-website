'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Separator } from "@/components/ui/separator"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Image from 'next/image';

const ProductDetail = () => {

  const [selectedImage, setSelectedImage] = useState<number>(0)

  const productdetail = {
    images: [
        "/images/1.avif",
        "/images/2.avif",
        "/images/1.avif",
        "/images/2.avif",
        "/images/1.avif",
    ],
    title: "Lakme Peach Milk Ultra Light Gel Moisturizer with Vitamin E & Peach Milk Extract 24HR Moisture Lock",
    variant: [
        "100g",
        "50g"
    ],
    description: "",
    ingredient: "",
    howToUse: ""
  }

  return (
    <div className='mx-auto max-w-c-1390 py-2 w-full lg:px-12 2xl:px-0'>
      <p>Home ❯ Hair ❯ Hair Care ❯ Shampoo</p>
      <div className='grid grid-cols-5 gap-10 mt-10 bg-background rounded-md mx-12 py-10 pl-8 pr-10'>
        <div className='col-span-2 flex flex-col gap-4'>
          <button className='ext-primaryT self-end'>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24"
            height="24"
            viewBox="0 0 23 20">
                <path className="text-primaryT self-end" fill="#fff" stroke="currentColor" d="M11.4967297,19.0021565 C12.1501607,18.4744665 15.7313591,16.1461023 16.6556949,15.4660553 C20.4639993,12.6642314 22.5,9.83806845 22.500204,6.31427989 C22.4080534,3.08900922 19.7336922,0.5 16.5,0.5 C14.6798666,0.5 13.0132876,1.30878098 11.8904344,2.71234752 L11.5,3.20039053 L11.1095656,2.71234752 C9.98671236,1.30878098 8.32013337,0.5 6.5,0.5 C3.16873226,0.5 0.5,3.08355995 0.5,6.3 C0.5,9.87466924 2.55294628,12.7216506 6.38828771,15.5301224 C7.34346545,16.229562 10.7334347,18.4195137 11.4967297,19.0021565 Z"></path>
            </svg>
          </button>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-2'>
                {
                    productdetail.images.map((image, index) => (
                        <div className={`border-2 ${selectedImage === index ? 'border-secondaryT' : ''}`} onMouseEnter={() => setSelectedImage(index)} onClick={() => setSelectedImage(index)}>
                            <img src={image} className='h-[50px] w-auto' alt=''/>
                        </div>
                    ))
                }
            </div>
            <div className='w-3/4 flex-1'>
                <img src={productdetail.images[selectedImage]} className='w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-125' alt=''/>
            </div>
          </div>
        </div>
        <div className='col-span-3'>
            <p className='text-[20px] font-medium'>{productdetail.title}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
