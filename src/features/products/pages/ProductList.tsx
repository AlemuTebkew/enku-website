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

interface ProductListProps {
  category: string | null,
  subCategory: string | null,
  subSubCategory: string | null
}

const ProductList = () => {

  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subCategory = searchParams.get('subCategory');
  const subSubCategory = searchParams.get('subSubCategory');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='mx-auto max-w-c-1390 mt-32 py-2 w-full px-4 lg:px-12 2xl:px-0 xl:mt-40'>
        <div className='flex gap-2'>
          {
            category && <div className='flex gap-2'>
              <p>{category}</p>
              {subCategory && <NavigateNextIcon/> }
              
            </div>
          }
          {
            subCategory && <div className='flex gap-2'>
              <p>{subCategory}</p>
              {subSubCategory && <NavigateNextIcon/> }
            </div>
          }
          {
            subSubCategory && <div className='flex gap-2'>
              <p>{subSubCategory}</p>
            </div>
          }
        </div>
        {/* <p>Home ❯ Hair ❯ Hair Care ❯ Shampoo</p> */}
        <p className='text-center'>All Products</p>
        <div className='grid grid-cols-1 xl:grid-cols-4 gap-8 mt-10'>
          <div className='hidden xl:col-span-1 xl:flex xl:flex-col xl:gap-2'>
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
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ProductList;
