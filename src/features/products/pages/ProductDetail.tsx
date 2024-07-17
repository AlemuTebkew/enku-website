'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';

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
        <div className='w-full'>
            <div className='mx-0 xl:mx-12'>
                <p>Home ❯ Hair ❯ Hair Care ❯ Shampoo</p>
                <div className='grid grid-cols-1 xl:grid-cols-5 xl:gap-10 mt-10 bg-background rounded-md py-6 px-4 xl:pl-8 xl:pr-10'>
                    <div className='w-full xl:col-span-2 flex flex-col gap-4'>
                        <button className='text-primaryT self-end'>
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24"
                            height="24"
                            viewBox="0 0 23 20">
                                <path className="text-primaryT self-end" fill="#fff" stroke="currentColor" d="M11.4967297,19.0021565 C12.1501607,18.4744665 15.7313591,16.1461023 16.6556949,15.4660553 C20.4639993,12.6642314 22.5,9.83806845 22.500204,6.31427989 C22.4080534,3.08900922 19.7336922,0.5 16.5,0.5 C14.6798666,0.5 13.0132876,1.30878098 11.8904344,2.71234752 L11.5,3.20039053 L11.1095656,2.71234752 C9.98671236,1.30878098 8.32013337,0.5 6.5,0.5 C3.16873226,0.5 0.5,3.08355995 0.5,6.3 C0.5,9.87466924 2.55294628,12.7216506 6.38828771,15.5301224 C7.34346545,16.229562 10.7334347,18.4195137 11.4967297,19.0021565 Z"></path>
                            </svg>
                        </button>
                        <div className='flex gap-4'>
                            <div className='hidden xl:flex xl:flex-col xl:gap-2'>
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
                        <p className='mt-2'>({productdetail.variant[0]})</p>
                        <p className='mt-2'>
                        <span className='text-md mr-2 line-through'>4000 ETB</span>
                        3000 ETB
                        <span className='text-primaryT ml-2'>25% Off</span>
                        </p>
                        <Button className='hidden xl:block mt-4'>Add to Bag</Button>
                    </div>
                </div>
            </div>
            <div className='mx-4 xl:mx-12 mt-8'>
                <p className='text-xl font-semibold'>Product Description</p>
                <div className='flex flex-col gap-10 mt-4 xl:flex-row'>
                    <div className='w-full'>
                        <Tabs defaultValue="account" className="bg-background">
                            <TabsList className=''>
                                <TabsTrigger value="description" className='text-lg'>Description</TabsTrigger>
                                <TabsTrigger value="ingredient" className='text-lg'>Ingredient</TabsTrigger>
                                <TabsTrigger value="howtouse" className='text-lg'>How to use</TabsTrigger>
                            </TabsList>
                            <TabsContent className='px-4' value="description">Make changes to your account here.</TabsContent>
                            <TabsContent value="password">Change your password here.</TabsContent>
                        </Tabs>
                    </div>
                    <div className='hidden w-1/4 bg-background xl:block'>
                        <Button className='flex gap-2 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><g fill="none" fill-rule="evenodd"><path d="M21 23H-3V-1h24z"></path><path fill="#fff" fill-rule="nonzero" d="M9.348 0A4.355 4.355 0 0 0 5 4.348v.87a.435.435 0 1 0 .87 0v-.87A3.472 3.472 0 0 1 9.348.87a3.472 3.472 0 0 1 3.478 3.478v.87a.435.435 0 1 0 .87 0v-.87A4.355 4.355 0 0 0 9.348 0zM5.22 6a.87.87 0 0 0-.87.87H2.179a.435.435 0 0 0-.435.367L.004 18.976a.454.454 0 0 0 .109.353c.082.095.2.15.326.15h1.304v.434h1.305v-.435H15.22v.435h1.305v-.435h1.304a.428.428 0 0 0 .326-.15.453.453 0 0 0 .109-.352l-1.74-11.74a.436.436 0 0 0-.434-.366h-2.174a.87.87 0 1 0-1.739 0H6.091a.87.87 0 0 0-.87-.87z"></path></g></svg>
                            Add to Bag
                        </Button>
                    </div>
                </div>
            </div>
            <div className='flex bg-background rounded-md p-4 gap-4 mt-8 xl:hidden sticky bottom-0 shadow-soft'>
                <Button variant={'outline'} className='w-1/4'>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24"
                    height="24"
                    viewBox="0 0 23 20">
                        <path className="text-primaryT self-end" fill="#fff" stroke="currentColor" d="M11.4967297,19.0021565 C12.1501607,18.4744665 15.7313591,16.1461023 16.6556949,15.4660553 C20.4639993,12.6642314 22.5,9.83806845 22.500204,6.31427989 C22.4080534,3.08900922 19.7336922,0.5 16.5,0.5 C14.6798666,0.5 13.0132876,1.30878098 11.8904344,2.71234752 L11.5,3.20039053 L11.1095656,2.71234752 C9.98671236,1.30878098 8.32013337,0.5 6.5,0.5 C3.16873226,0.5 0.5,3.08355995 0.5,6.3 C0.5,9.87466924 2.55294628,12.7216506 6.38828771,15.5301224 C7.34346545,16.229562 10.7334347,18.4195137 11.4967297,19.0021565 Z"></path>
                    </svg>
                </Button>
                <Button className='w-full flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><g fill="none" fill-rule="evenodd"><path d="M21 23H-3V-1h24z"></path><path fill="#fff" fill-rule="nonzero" d="M9.348 0A4.355 4.355 0 0 0 5 4.348v.87a.435.435 0 1 0 .87 0v-.87A3.472 3.472 0 0 1 9.348.87a3.472 3.472 0 0 1 3.478 3.478v.87a.435.435 0 1 0 .87 0v-.87A4.355 4.355 0 0 0 9.348 0zM5.22 6a.87.87 0 0 0-.87.87H2.179a.435.435 0 0 0-.435.367L.004 18.976a.454.454 0 0 0 .109.353c.082.095.2.15.326.15h1.304v.434h1.305v-.435H15.22v.435h1.305v-.435h1.304a.428.428 0 0 0 .326-.15.453.453 0 0 0 .109-.352l-1.74-11.74a.436.436 0 0 0-.434-.366h-2.174a.87.87 0 1 0-1.739 0H6.091a.87.87 0 0 0-.87-.87z"></path></g></svg>
                    Add to Bag
                </Button>
            </div>
        </div>
        
    </div>
  );
};

export default ProductDetail;
