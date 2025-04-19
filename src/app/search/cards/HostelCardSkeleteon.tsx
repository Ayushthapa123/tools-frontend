import React from 'react';


export const HostelCardSkeleton = () => {

  return (
    <div className="card-bordered flex h-[230px] w-full animate-pulse cursor-pointer gap-4 rounded-3xl bg-base-200 p-3">
      <div className="card-bordered relative h-full w-[350px] rounded-3xl bg-gray-300"></div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
          <div className="flex gap-3 mt-2 text-lg">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="w-2/3 h-6 my-3 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          <div className="h-4 mt-2 bg-gray-300 rounded"></div>
        </div>
        <div className="mt-3">
          <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
          <div className="w-full h-4 mt-2 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-4 mt-1 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end h-full">
        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};
