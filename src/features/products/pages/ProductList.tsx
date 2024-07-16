'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const page = searchParams.get('page') || 1;
  const sort = searchParams.get('sort') || 'popularity';
  const brandFilter = searchParams.get('brand_filter') || '';

  return (
    <div className='mx-auto max-w-c-1390 py-2 w-full lg:px-12 2xl:px-0'>
      <p>Home ❯ Hair ❯ Hair Care ❯ Shampoo</p>
      <p className='text-center'>All Products</p>
      <div className='grid grid-cols-4 gap-8 mt-10'>
        <div className='col-span-1 flex flex-col gap-2'>
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
        <div className='col-span-3 grid grid-cols-3 gap-8'>
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
  );
};

export default ProductList;
