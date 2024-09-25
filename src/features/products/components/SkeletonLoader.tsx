const SkeletonLoader = () => {
    return (
      <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
            <div key={index} className="rounded-md animate-pulse rounded-md">
                <div className="animate-pulse rounded-md bg-gray-200 h-40 w-full mb-4"></div> {/* Product Image */}
                <div className="animate-pulse rounded-md bg-gray-200 h-6 w-3/4 mb-2"></div>  {/* Product Title */}
                <div className="animate-pulse rounded-md bg-gray-200 h-4 w-1/2"></div>       {/* Price */}
          </div>
        ))}
      </div>
    );
  };

  export default SkeletonLoader;
  