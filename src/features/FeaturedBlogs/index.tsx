import { createClient } from 'contentful';
import BlogLists from './BlogsList';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';
const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
});
export const FeaturedBlogs = async () => {
  return (
    <div className="flex w-full flex-col  space-y-10 px-6 py-12 sm:px-12 md:px-16 lg:px-20 xl:px-28">
     <div className="flex w-full items-center  justify-between">
        <h1 className={`text-left text-3xl sm:text-4xl md:text-5xl ${montserrat.className}`}>
          Featured Blogs
        </h1>
        <Link href={`/blogs`}>
          {' '}
          <button className=" flex  h-12  items-center justify-center space-x-2   rounded-lg bg-gradient-to-r from-[#F1F5F9] via-[#F8FAFC] to-white text-base font-bold  text-[#418C7E] hover:cursor-pointer hover:from-[#eaecee] hover:via-[#eef4f9] sm:text-lg ">
            <span>See All</span>{' '}
            <span className=" text-2xl md:text-3xl">
              <IoIosArrowRoundForward />
            </span>
          </button>
        </Link>
      </div>
      <BlogLists />
    </div>
  );
};
