"use client"

import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react' // Arrow icons

interface CustomCarouselProps {
  visibleItems: number; // Number of fully visible items
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ visibleItems }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Calculate item width based on how many items you want to show fully.
  const itemWidth = 100 / visibleItems // percentage width based on visible items

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="flex">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className={`flex-shrink-0 max-w-[86%] lg:max-w-[30%] transition-transform transform`}
            >
              <div className="group">
                <img
                  src={`banner/banner${(index % 3) + 1}.avif`}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Previous Button */}
      <Button
        onClick={() => api?.scrollTo(current - 1)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
      >
        <ChevronLeft />
      </Button>

      {/* Next Button */}
      <Button
        onClick={() => api?.scrollTo(current + 1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
      >
        <ChevronRight />
      </Button>
    </div>
  )
}

export default CustomCarousel
