import Link from 'next/link';
import React from 'react';

export default function ExploreMore() {
  return (
    <div className=' w-full relative'>
      <div className="from-blue-600/10 relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r via-purple-600/10 to-indigo-600/10 py-20 text-center">
        <div className="from-blue-500/5 absolute inset-0 bg-gradient-to-r to-purple-500/5"></div>
        <div className="relative z-10">
          <h3 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
            Ready to Explore More?
          </h3>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600">
            Discover thousands more AI tools in our comprehensive directory. Find the perfect
            solution for your specific needs and take your projects to the next level.
          </p>
          <Link
            href="/search"
            className="from-blue-600 hover:from-blue-700 hover:shadow-blue-500/25 group transform rounded-2xl bg-gradient-to-r to-purple-600 px-10 py-5 text-xl font-bold  shadow-2xl transition-all duration-300 hover:scale-105 hover:to-purple-700">
            <button  
            type='button' 
            className='text-primary'
            
            >
              <span className="mr-3 ">🚀</span>
              Browse All AI Tools
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
