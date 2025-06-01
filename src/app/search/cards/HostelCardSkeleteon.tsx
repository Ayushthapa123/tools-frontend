import React from 'react';

export const HostelCardSkeleton = () => {
  return (
    <div className="card-bordered mb-2 flex h-full w-full animate-pulse cursor-pointer flex-col gap-4 rounded-3xl bg-white/80 opacity-90">
      {/* Image Section */}
      <div className="relative h-[300px] w-full rounded-3xl bg-gray-300">
        <div className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80"></div>
      </div>

      {/* Content Section */}
      <div className="flex-grow overflow-y-auto p-2" style={{ maxHeight: '150px' }}>
        {/* Location and Price */}
        <div className="mb-2 flex items-center justify-between">
          <div className="h-4 w-1/3 rounded bg-gray-300"></div>
          <div className="h-4 w-1/4 rounded bg-gray-300"></div>
        </div>

        {/* Title */}
        <div className="mb-2 h-6 w-2/3 rounded bg-gray-300"></div>

        {/* Description Placeholder */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-300"></div>
          <div className="h-3 w-5/6 rounded bg-gray-300"></div>
        </div>

        {/* Button Placeholder */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="h-9 w-40 rounded-xl bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};
