import { createClient } from 'contentful';
import BlogLists from './BlogsList';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';
import Button from 'src/components/Button';
const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
});
export const FeaturedBlogs = async () => {
  return (
    <div className="flex flex-col w-[90%] my-4 mx-auto">
     <div className="flex mb-4 w-full items-center  justify-between">
        <h1 className={`text-left font-semibold text-xl sm:text-2xl md:text-3xl ${montserrat.className}`}>
          Featured Blogs
        </h1>
      </div>
      <BlogLists />
      <div className='flex justify-center w-fit mx-auto my-4'>
      <Link href={`/blogs`}>
          <Button label="See All blogs" endAdornment={<IoIosArrowRoundForward className='text-4xl font-semibold'/>} />
        </Link>
      </div>
    </div>
  );
};
