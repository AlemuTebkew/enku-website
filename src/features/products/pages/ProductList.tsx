'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductCard from '../components/ProductCard';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Product } from '@/models/product';
import CustomButton from '@/components/Button';
import { Button } from '@/components/ui/button';

interface ProductListProps {
  category: string | null,
  subCategory: string | null,
  subSubCategory: string | null
}

// const ProductList: React.FC<ProductListProps>
const ProductList:React.FC<{products: Product[]}> = ({products}) => {

  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subCategory = searchParams.get('subCategory');
  const subSubCategory = searchParams.get('subSubCategory');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='h-screen relative'>
        <div className='mx-auto max-w-c-1390 py-2 w-full px-4 lg:px-12 2xl:px-0 mt-2'>
          <div className='flex'>
            {
              category && <div className='flex'>
                <p>{category}</p>
                {subCategory && <NavigateNextIcon/> }
              </div>
            }
            {
              subCategory && <div className='flex'>
                <p>{subCategory}</p>
                {subSubCategory && <NavigateNextIcon/> }
              </div>
            }
            {
              subSubCategory && <div className='flex'>
                <p>{subSubCategory}</p>
              </div>
            }
          </div>
          {/* <p>Home ❯ Hair ❯ Hair Care ❯ Shampoo</p> */}
          <p className='text-center font-semibold text-3xl mt-10'>All Products</p>
          <div className='grid grid-cols-1 xl:grid-cols-4 gap-8 mt-10'>
            <div className='hidden xl:col-span-1 xl:flex xl:flex-col xl:gap-2 sticky h-screen'>
              {/* First column content */}
              <div className='bg-background px-4 rounded-md'>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Sort By: Popularity</AccordionTrigger>
                    <AccordionContent>
                      Sort By: Popularity
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className='bg-background px-4'>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="Brand">
                    <AccordionTrigger>Brand</AccordionTrigger>
                    <AccordionContent>
                      Brand
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Price">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                      Price
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                      Category
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Concern">
                    <AccordionTrigger>Concern</AccordionTrigger>
                    <AccordionContent>
                      Concern
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Hair Type">
                    <AccordionTrigger>Hair Type</AccordionTrigger>
                    <AccordionContent>
                      Hair Type
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Discount">
                    <AccordionTrigger>Discount</AccordionTrigger>
                    <AccordionContent>
                      Discount
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Rating">
                    <AccordionTrigger>Average Customer Rating</AccordionTrigger>
                    <AccordionContent>
                      Average Customer Rating
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Preference">
                    <AccordionTrigger>Preference</AccordionTrigger>
                    <AccordionContent>
                      Preference
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Country">
                    <AccordionTrigger>Country Of Origin</AccordionTrigger>
                    <AccordionContent>
                      Country Of Origin
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Gender">
                    <AccordionTrigger>Gender</AccordionTrigger>
                    <AccordionContent>
                      Gender
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Formulation">
                    <AccordionTrigger>Formulation</AccordionTrigger>
                    <AccordionContent>
                      Formulation
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Ingredient">
                    <AccordionTrigger>Ingredient</AccordionTrigger>
                    <AccordionContent>
                      Ingredient
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Conscious">
                    <AccordionTrigger>Conscious</AccordionTrigger>
                    <AccordionContent>
                      Conscious
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Color">
                    <AccordionTrigger>Color</AccordionTrigger>
                    <AccordionContent>
                      Color
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-8 xl:col-span-3'>
              {/* Second column content */}
              {
                products && products.map((product, index) => (
                  <ProductCard key={index} product={product}/>
                ))
              }
            </div>
          </div>
        </div>
        <div className='w-full flex flex-1 justify-between bg-background rounded-md p-4 gap-4 mt-8 xl:hidden sticky bottom-0 shadow-soft'>
                <Button variant={'outline'} className='w-full h-auto flex gap-2 '>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                  <defs><filter id="579yu3ce3a" width="105.8%" height="143.8%" x="-2.9%" y="-21.9%" filterUnits="objectBoundingBox"><feOffset dy="-1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><g fill="none" fill-rule="evenodd" opacity=".54"><g fill="#001325" fill-rule="nonzero"><g filter="url(#579yu3ce3a)" transform="translate(-45 -685) translate(0 672)"><g><g><g><g><path d="M5.05 13.551V2.224c0-.373-.307-.68-.679-.68-.372 0-.68.307-.68.68V13.55l-2.513-2.834c-.272-.271-.68-.307-.95-.069-.272.271-.308.68-.07.95l3.704 4.144c.277.343.97.29 1.188 0v-2.19zM12.074 4.398L8.404.255c-.327-.33-.937-.35-1.221 0V13.74c0 .373.307.68.679.68.372 0 .679-.271.679-.647V2.45l2.514 2.834c.271.271.68.307.95.069.271-.274.307-.683.069-.954z" transform="translate(33 6) translate(12) translate(0 7) translate(6 4)"></path></g></g></g></g></g></g></g>
                  </svg>
                  <div className='flex flex-col items-start'>
                    <p className='font-bold'>Sort</p>
                    <p className=''>By Popularity</p>
                  </div>
                </Button>
                <Button variant={'outline'} className='w-full h-auto flex gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                  <defs><filter id="565v74wosa" width="105.8%" height="143.8%" x="-2.9%" y="-21.9%" filterUnits="objectBoundingBox"><feOffset dy="-1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><g fill="none" fill-rule="evenodd" opacity=".54"><g fill="#001325" fill-rule="nonzero"><g filter="url(#565v74wosa)" transform="translate(-207 -685) translate(0 672)"><g><g><g><path d="M18.533 5c.567 0 1.028.46 1.028 1.028 0 .247-.089.485-.25.672l-4.98 5.773v5.193c0 .332-.16.643-.43.836L11.9 19.935c-.462.33-1.104.224-1.435-.237-.125-.175-.192-.384-.192-.599v-6.625l-5.02-5.771c-.372-.429-.327-1.078.101-1.45C5.541 5.09 5.78 5 6.028 5h12.505zm-5.468 7.841h-1.528v5.797l1.528-1.094V12.84zm4.95-6.576H6.548l4.688 5.39h2.127l4.65-5.39z" transform="translate(195 6) translate(12) translate(0 7)"></path></g></g></g></g></g></g>
                  </svg>
                  <div className='flex flex-col items-start'>
                    <p className='font-bold'>Filter</p>
                    <p>No Filter Applied</p>
                  </div>
                </Button>
        </div>
      </div>
      {/* <div className='w-full h-screen absolute'>
      </div> */}
    </Suspense>
  );

};

export default ProductList;
