"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { Product } from "@/models/product";
import Link from "next/link";
import { buildFileUrl } from "@/utils/apiBase";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title = "Best Selling Products",
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="relative w-full mx-auto overflow-hidden">
        <Carousel setApi={setApi} opts={{ loop: false, align: "start" }} className="w-full">
          <CarouselContent className="flex gap-4 -ml-2 md:-ml-4">
            {products.map((product) => {
              const price = product?.variations?.length && product?.variations[0]
                ? product.variations[0].price
                : product.price;
              
              return (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      {/* Product Image */}
                      <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={buildFileUrl(product.imageUrl)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4 flex flex-col flex-1">
                        {/* Category/Package Type */}
                        {product.category && (
                          <p className="text-sm text-gray-500 mb-1">
                            {product.category.name}
                          </p>
                        )}
                        
                        {/* Product Name */}
                        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                          {product.name}
                        </h3>
                        
                        {/* Price */}
                        <p className="text-lg font-bold text-red-600 mb-2">
                          {parseFloat(price).toLocaleString()} ETB
                        </p>
                        
                        {/* Free Delivery */}
                        <div className="flex items-center gap-1 text-green-600 mt-auto">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                          </svg>
                          <span className="text-sm font-medium">Free Delivery</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Next Button */}
        {products.length > 4 && (
          <Button
            onClick={() => api?.scrollNext()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 z-10"
            aria-label="Next products"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default ProductCarousel;

