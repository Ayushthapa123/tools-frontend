"use client"
import Image from 'next/image';
import { BiUpvote } from 'react-icons/bi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { GoPencil } from "react-icons/go";
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

interface Iprops {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
  content: any;
}

const BlogCard = ({ date, description, image, title, slug, content }: Iprops) => {
  const wholeContentLength = content.flatMap((item: any) => item.content).reduce((acc: any, item: any) => acc + (item.value || '').length, 0);
  const blogReadTimeCalcuator = () => { 
    const charactersPerMinute = 1500;
    const minutes = Math.ceil(wholeContentLength / charactersPerMinute);
    return minutes;
  }
  return (
    <>
      <Link href={`/blogs/${slug}`}>
        <div className="w-full bg-white h-full rounded-2xl  card cursor-pointer hover:shadow-md transition-all duration-200">
          <div className="w-full mb-4">
            <div className='relative'>
              <div className="h-[300px] w-full overflow-hidden rounded ">
                <Image src={image} alt="" className="w-full rounded-t-2xl rounded-b-none" fill />
              </div>
              <div className='absolute text-sm px-4 py-1 text-gray-600 font-semibold flex justify-center bottom-3 items-center right-2 bg-gray-100 rounded-lg'>
                {blogReadTimeCalcuator()} min read
              </div>
            </div>
            <div className='px-4 pt-3 flex items-center justify-between'>
              <div className='flex items-center justify-start gap-3'>
                <div className='flex items-start gap-2 bg-gray-100 rounded-lg px-2 py-1 cursor-default'>
                  <FaUser />
                  <span className='mb-0 text-gray-700 text-sm'>Hostelpilot</span>
                </div>
                {/* <div className='flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1 cursor-default'>
                  <BiUpvote />
                  <span className='text-gray-700 text-sm'>10</span>
                </div> */}
              </div>
              <div>
                {date && (
                  <div className='flex items-center gap-2 px-1 py-1 cursor-default'>
                    <GoPencil className='text-gray-700 text-sm' />
                    <span className="inline-block text-sm text-gray-700">
                      {date}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className='px-4 mb-0'>
              <h3 className='mb-0'>
                <a
                  href={`/blogs/` + slug}
                  className="inline-block mt-2 text-xl font-bold line-clamp-2 text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                  {title}
                </a>
              </h3>
              <p className={`text-base font-medium text-gray-500 ${title.length > 15 ? 'line-clamp-3' : 'line-clamp-4'} mb-0`}>{description}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
