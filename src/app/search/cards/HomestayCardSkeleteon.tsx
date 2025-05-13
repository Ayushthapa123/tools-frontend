import React from 'react';

export const HomestayCardSkeleton = () => {
  return (
    <div className="card-bordered mb-2 flex h-full w-full cursor-pointer flex-col gap-4 rounded-3xl bg-white/80 opacity-90 animate-pulse">
      {/* Image Section */}
      <div className="relative h-[300px] w-full rounded-3xl bg-gray-300">
        <div className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80"></div>
      </div>

      {/* Content Section */}
      <div className="flex-grow overflow-y-auto p-2" style={{ maxHeight: '150px' }}>
        {/* Location and Price */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        </div>

        {/* Title */}
        <div className="h-6 w-2/3 mb-2 bg-gray-300 rounded"></div>

        {/* Description Placeholder */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-300 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
        </div>

        {/* Button Placeholder */}
        <div className="flex items-center justify-between gap-2 mt-3">
          <div className="h-9 w-40 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
