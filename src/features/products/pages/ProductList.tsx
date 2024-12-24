'use client';

import React, { useState, useEffect, Suspense, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox"
import ProductCard from '../components/ProductCard';
import dynamic from 'next/dynamic' // Import dynamic for SSR issues
import { Product } from '@/models/product';
import { Button } from '@/components/ui/button';
import FilterDrawer from '../components/FilterDrawer';
import { useLazyFilterProductsQuery, useLazyGetFilterByCategoryIdQuery } from '../api/productApi';
import SkeletonLoader from '../components/SkeletonLoader';
import SkeletonFilterProductList from '../components/SkeletonProductFilter';
import NoProductsFound from '../components/NoProductFound';

// Define the props for the ProductList component
interface ProductListProps {
    category: string | null;
    subCategory: string | null;
    subSubCategory: string | null;
}

// Dynamically import the NavigateNextIcon component to avoid hydration errors
const ClientSideNavigateNextIcon = dynamic(() => import('@mui/icons-material/NavigateNext'), {
    ssr: false,
});

// Define the main ProductList component
const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
      // State to track if the component has mounted on client
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
      // Get search parameters from the URL
    const searchParams = useSearchParams();
    const router = useRouter();
    const category = searchParams.get('category');
    const categoryId = searchParams.get('categoryId');
    const subCategory = searchParams.get('subCategory');
    const subSubCategory = searchParams.get('subSubCategory');
    const filterBy = searchParams.get('filters');
    // State for filter drawer and selected filters
    const [filter, setFilter] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<number[]>(() => {
        // Load filters from localStorage if available and if `filterBy` exists
        if (typeof localStorage !== 'undefined' && filterBy) {
            const storedFilters = localStorage.getItem('selectedFilters');
            return storedFilters ? JSON.parse(storedFilters) : [];
        }
        return [];
    });
     // State to track if filters are applied
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    // State to track initial load
    const [isInitialLoad, setIsInitialLoad] = useState(true);
      // State to force component update
    const [forceUpdate, setForceUpdate] = useState(0);

     // RTK Query hooks for fetching data
    const [
        getFiltersByCategory,
        { data: filtersData, isLoading: isGetFiltersLoading, isSuccess: isGetFiltersSuccess, isError: isGetFiltersError },
    ] = useLazyGetFilterByCategoryIdQuery();
    const [
        getProductsByFilter,
        { data: productData, isLoading: isGetProductLoading, isSuccess: isGetProductSuccess, isError: isGetProductError },
    ] = useLazyFilterProductsQuery();
      // State to store fetched products after applying the filters
    const [filteredProductsState, setFilteredProductsState] = useState<Product[] | null>(null);
    // Memoize the filtered products to prevent unnecessary re-renders
    const filteredProducts = useMemo(() => {
           return isFilterApplied ? (filteredProductsState || []) : products;
     }, [products, isFilterApplied, filteredProductsState, forceUpdate]);

      // Fetch filters when categoryId changes or at initial load
    useEffect(() => {
        if (categoryId) {
            getFiltersByCategory(`/filters/${categoryId}`);
        } else {
            getFiltersByCategory(`/filters`);
        }
            // Fetch initial product data when the component first mounts
        if(isInitialLoad){
             fetchInitialProducts();
            setIsInitialLoad(false)
       }
    }, [categoryId, isInitialLoad, getFiltersByCategory]);

    // Fetch products by filters
    const fetchFilteredProducts = useCallback(async (filters: number[]) => {
        // Set initial state when no filter is applied
        if (filters.length === 0) {
             setFilteredProductsState(products);
              setIsFilterApplied(false);
          } else {
              // Fetch products using API
           try {
            const response = await getProductsByFilter(filters);
                // Update the products based on response
                 if (response.data && response.data.length > 0) {
                   setFilteredProductsState(response.data);
                 } else {
                   setFilteredProductsState([]);
                 }
               setIsFilterApplied(true);
           }
            catch (error) {
              console.log('error fetching filtered products:', error);
                setFilteredProductsState([]);
              setIsFilterApplied(true);
           }
      }
       // Force update of the component
      setForceUpdate(prev => prev + 1)
   }, [getProductsByFilter, products]);


    // Update products based on filterBy
    useEffect(() => {
      if (filterBy) {
          const initialFilters = filterBy.split(',').map(filterId => +filterId);
           setSelectedFilters(initialFilters)
           fetchFilteredProducts(initialFilters)
       } else {
            // Fetch the product data when no filter is provided in the URL
            fetchFilteredProducts([]);
       }
     }, [filterBy, fetchFilteredProducts]);

     // Fetch initial product data
     const fetchInitialProducts = () => {
       if (products && products.length > 0) {
            setFilteredProductsState(products)
         } else {
              setFilteredProductsState([])
         }
     }

       // Update localStorage when selectedFilters change
    useEffect(() => {
        // Store selected filters to localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
         }
    }, [selectedFilters]);

       // Handler for single filter selection
   const handleFilterChange = (filterId: number) => {
       // Update the selected filters using the function form of the state setter
      setSelectedFilters(prevFilters => {
         if (prevFilters.includes(filterId)) {
           // If the filterId is already present, it means the user want to unselect the current filter
             fetchFilteredProducts([]);
             return [];
         } else {
            // If the filterId is not present, it means the user want to select a new filter
            fetchFilteredProducts([filterId]);
              return [filterId];
           }
      });
   };
    // Handler for multiple filter selections
    const handleManyFiltersChange = (filterIds: number[]) => {
        setSelectedFilters(filterIds);
         fetchFilteredProducts(filterIds);
    };


      // Update URL when filters change
    const applyFilters = (filters: number[]) => {
        // Create a query to store the URL params
        const query: Record<string, string> = {
            ...(category && { category }),
            ...(categoryId && { categoryId }),
            ...(subCategory && { subCategory }),
            ...(subSubCategory && { subSubCategory }),
            ...(filters.length > 0 && { filters: filters.join(',') }),
        };
        // Create a URL instance
        const url = new URL(window.location.href);
        url.search = new URLSearchParams(query).toString();
           // Push the new URL in browser history
       router.push(url.toString());
    };

       // Return null if the component is not mounted in the client
    if (!isClient) return null;

  return (
    <Suspense fallback={<SkeletonFilterProductList />}>
      <div className="h-auto relative bg-[#F3F3F3]">
        <div className="mx-auto max-w-c-1390 py-2 w-full px-4 lg:px-12 2xl:px-0 mt-2">
          <div className="flex">
            {category && (
              <div className="flex">
                <p>{category}</p>
                   {/* Render the icon only when it is on the client side */}
                {subCategory && <ClientSideNavigateNextIcon />}
              </div>
            )}
            {subCategory && (
              <div className="flex">
                <p>{subCategory}</p>
                {/* Render the icon only when it is on the client side */}
                {subSubCategory && <ClientSideNavigateNextIcon />}
              </div>
            )}
            {subSubCategory && (
              <div className="flex">
                <p>{subSubCategory}</p>
              </div>
            )}
          </div>
          <p className="w-full text-center font-semibold text-2xl py-4">All Products</p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4">
            <div className="hidden lg:col-span-1 lg:flex lg:flex-col lg:gap-0 h-min border rounded">
              <div className="bg-background">
                <Accordion type="single" collapsible className="w-full">
                  {filtersData &&
                    filtersData.map(filter => (
                      <AccordionItem value={filter.name} key={filter.name} className="">
                        <AccordionTrigger className="text-md font-normal capitalize px-4">
                          {filter.name}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                          {filter.values.map((value, index) => (
                            <div key={index} className="flex flex-col gap-4 px-4">
                              <div key={value.value} className="flex items-center justify-between w-full">
                                <label htmlFor={`${filter.name}-${value.id}`} className="">
                                  {value.value}
                                </label>
                                <Checkbox
                                  id={`${filter.name}-${value.id}`}
                                  checked={selectedFilters.includes(value.id)}
                                  onCheckedChange={() => handleFilterChange(value.id)}
                                />
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            </div>
            <div className="w-full lg:col-span-3 flex flex-col gap-4">
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8" key={forceUpdate}>
                 {/* Show skeleton loader when products are loading */}
                {isGetProductLoading && <SkeletonLoader />}
                 {/* Display products when no filter are applied */}
                {
                  !isGetProductLoading &&
                    !isFilterApplied &&
                    filteredProducts &&
                    filteredProducts.length > 0 &&
                    filteredProducts.map((product, index) => <ProductCard key={index} product={product} />)
                }
                  {/* Display the products when the filter is applied */}
                {!isGetProductLoading &&
                  isFilterApplied &&
                  filteredProducts &&
                  filteredProducts.length > 0 &&
                  filteredProducts.map((product, index) => <ProductCard key={index} product={product} />)}
                    {/* Display no products found component when no product available  */}
                
              </div>
            </div>
            <div className="w-full lg:col-span-4 flex flex-col gap-4">
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8" key={forceUpdate}>
              {!isGetProductLoading &&
                  isFilterApplied &&
                  filteredProducts &&
                  filteredProducts.length === 0 && (
                    <NoProductsFound
                      title="No Products Available"
                      message="We are sorry, but it looks like we do not have any products at the moment."
                    />
                  )}
                   {/* Display no products found component when no product available on initial load  */}
                {!isGetProductLoading && !isFilterApplied && products && products.length === 0 && (
                  <NoProductsFound
                    title="No Products Available"
                    message="We are sorry, but it looks like we do not have any products at the moment."
                  />
                )}
                   {/* Display no products found component when no initial products  */}
                {!products && (
                  <NoProductsFound
                    title="No Products Available"
                    message="We are sorry, but it looks like we do not have any products at the moment."
                  />
                )}
              </div>
              </div>
          </div>
        </div>
        <div className="max-w-full mx-auto py-2 px-4 flex justify-between gap-4 bg-background rounded-md mt-2 lg:hidden sticky bottom-0 shadow-soft overflow-x-hidden">
          <Button
            variant={'outline'}
            className="flex-[.5] h-auto flex hover:text-background hover:bg-primary border-tertiary1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <defs>
                <filter
                  id="579yu3ce3a"
                  width="105.8%"
                  height="143.8%"
                  x="-2.9%"
                  y="-21.9%"
                  filterUnits="objectBoundingBox"
                >
                  <feOffset dy="-1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                  <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"></feGaussianBlur>
                  <feColorMatrix
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"
                  ></feColorMatrix>
                  <feMerge>
                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>
              <g fill="none" fillRule="evenodd" opacity=".54">
                <g fill="currentColor" fillRule="nonzero">
                  <g filter="url(#579yu3ce3a)" transform="translate(-45 -685) translate(0 672)">
                    <g>
                      <g>
                        <g>
                          <g>
                            <path
                              d="M5.05 13.551V2.224c0-.373-.307-.68-.679-.68-.372 0-.68.307-.68.68V13.55l-2.513-2.834c-.272-.271-.68-.307-.95-.069-.272.271-.308.68-.07.95l3.704 4.144c.277.343.97.29 1.188 0v-2.19zM12.074 4.398L8.404.255c-.327-.33-.937-.35-1.221 0V13.74c0 .373.307.68.679.68.372 0 .679-.271.679-.647V2.45l2.514 2.834c.271.271.68.307.95.069.271-.274.307-.683.069-.954z"
                              transform="translate(33 6) translate(12) translate(0 7) translate(6 4)"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div className="flex flex-col items-start">
              <p className="font-bold">Sort</p>
              <p className="text-[12px]">By Popularity</p>
            </div>
          </Button>
          <Button
            variant={'outline'}
            className="flex-[.5] h-auto flex hover:text-background hover:bg-primary border-tertiary1"
            onClick={() => setFilter(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <defs>
                <filter
                  id="565v74wosa"
                  width="105.8%"
                  height="143.8%"
                  x="-2.9%"
                  y="-21.9%"
                  filterUnits="objectBoundingBox"
                >
                  <feOffset dy="-1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                  <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"></feGaussianBlur>
                  <feColorMatrix
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"
                  ></feColorMatrix>
                  <feMerge>
                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>
              <g fill="none" fillRule="evenodd" opacity=".54">
                <g fill="currentColor" fillRule="nonzero">
                  <g filter="url(#565v74wosa)" transform="translate(-207 -685) translate(0 672)">
                    <g>
                      <g>
                        <g>
                          <path
                            d="M18.533 5c.567 0 1.028.46 1.028 1.028 0 .247-.089.485-.25.672l-4.98 5.773v5.193c0 .332-.16.643-.43.836L11.9 19.935c-.462.33-1.104.224-1.435-.237-.125-.175-.192-.384-.192-.599v-6.625l-5.02-5.771c-.372-.429-.327-1.078.101-1.45C5.541 5.09 5.78 5 6.028 5h12.505zm-5.468 7.841h-1.528v5.797l1.528-1.094V12.84zm4.95-6.576H6.548l4.688 5.39h2.127l4.65-5.39z"
                            transform="translate(195 6) translate(12) translate(0 7)"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div className="flex flex-col items-start">
              <p className="font-bold">Filter</p>
              <p className="text-[12px]">No Filter Applied</p>
            </div>
          </Button>
        </div>
      </div>
      <FilterDrawer
        isOpen={filter}
        onClose={setFilter}
        filters={filtersData}
        selectedFilters={selectedFilters}
        onSetFilter={handleManyFiltersChange}
      />
    </Suspense>
  );
};

export default ProductList;