import React from 'react';

const SkeletonFilterProductList = () => {
  return (
    <div className="flex">
      {/* Filter Sidebar Skeleton */}
      <div className="w-1/4 p-4">
        <div className="animate-pulse rounded-md h-6 w-3/4 mb-4"></div> {/* Filter Title */}
        <div className="space-y-4">
          {/* Filter Items */}
          <div className="bg-gray-200 h-4 w-full animate-pulse rounded-md"></div>
          <div className="bg-gray-200 h-4 w-3/4 animate-pulse rounded-md"></div>
          <div className="bg-gray-200 h-4 w-1/2 animate-pulse rounded-md"></div>
          <div className="bg-gray-200 h-4 w-2/3 animate-pulse rounded-md"></div>
        </div>
      </div>

      {/* Product List Skeleton */}
      <div className="w-3/4 p-4 grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-md p-4 animate-pulse rounded-md">
            <div className="animate-pulse rounded-md bg-gray-200 h-40 w-full mb-4"></div> {/* Product Image */}
            <div className="animate-pulse rounded-md bg-gray-200 h-6 w-3/4 mb-2"></div>  {/* Product Title */}
            <div className="animate-pulse rounded-md bg-gray-200 h-4 w-1/2"></div>       {/* Price */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonFilterProductList;
