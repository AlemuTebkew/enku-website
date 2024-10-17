"use client"

import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react' // Arrow icons

interface Tip {
  id: number;
  title: string;
  description: string;
  content: string; // Assuming this is a reference or identifier for the content, e.g., a UUID.
  type: string; // Example: "tip"
  status: string; // Example: "draft"
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface YouTubeThumbnailCarouselProps {
  visibleItems: number; // Number of fully visible items
  videos:  Tip[]; // Updated to accept video tips
}

const YouTubeThumbnailCarousel: React.FC<YouTubeThumbnailCarouselProps> = ({ visibleItems, videos }) => {
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

  // Extract the YouTube thumbnail using the video ID
  const getYouTubeThumbnail = (youtubeUrl: string) => {
    const videoId = youtubeUrl.split('v=')[1] || youtubeUrl.split('/')[youtubeUrl.split('/').length - 1];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`; // YouTube's high-res thumbnail
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="flex">
          {videos.map((video, index) => (
            <CarouselItem
              key={video.id}
              className={`flex-shrink-0 max-w-[86%] lg:max-w-[30%] transition-transform transform`}
            >
              <div className="group">
                <img
                  src={getYouTubeThumbnail(video.content)}
                  alt={video.title}
                  className="w-full h-auto object-cover rounded-lg cursor-pointer"
                  onClick={() => window.open(video.content, "_blank")} // Redirect to YouTube
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

export default YouTubeThumbnailCarousel
