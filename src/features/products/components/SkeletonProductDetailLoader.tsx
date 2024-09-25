import React from 'react';

const SkeletonProductDetail = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-stretch space-y-6 lg:space-y-0 lg:space-x-6 p-4">
      {/* Product Image Skeleton */}
      <div className="w-full lg:w-1/2 rounded-md">
        <div className="bg-gray-200 h-80 w-full rounded-md"></div> {/* Placeholder for the image */}
      </div>

      {/* Product Information Skeleton */}
      <div className="w-full lg:w-1/2">
        {/* Product Title */}
        <div className="bg-gray-200 h-8 w-3/4 rounded-md animate-pulse mb-2"></div> 

        {/* Product Price */}
        <div className="bg-gray-200 h-6 w-1/4 rounded-md animate-pulse mb-2"></div>

        {/* Product Description */}
        <div className="space-y-4">
          <div className="bg-gray-200 h-4 w-full rounded-md animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-5/6 rounded-md animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-4/6 rounded-md animate-pulse"></div>
        </div>

        {/* Product Specifications/Details */}
        <div className="space-y-4 mt-2">
          <div className="bg-gray-200 h-6 w-1/3 rounded-md animate-pulse"></div> {/* Section Title */}
          <div className="space-y-2 animate-pulse">
            <div className="bg-gray-200 h-4 w-full rounded-md animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-full rounded-md animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-5/6 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Add to Cart Button Skeleton */}
        <div className="bg-gray-200 h-10 w-1/3 rounded-md animate-pulse mt-2"></div> {/* Placeholder for button */}
      </div>
    </div>
  );
};

export default SkeletonProductDetail;
