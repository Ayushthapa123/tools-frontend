
import Image from 'next/image';

import { GoPencil } from 'react-icons/go';
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
  const wholeContentLength = content
    .flatMap((item: any) => item.content)
    .reduce((acc: any, item: any) => acc + (item.value || '').length, 0);
  const blogReadTimeCalcuator = () => {
    const charactersPerMinute = 1500;
    const minutes = Math.ceil(wholeContentLength / charactersPerMinute);
    return minutes;
  };
  return (
    <>
      <Link href={`/blogs/${slug}`}>
        <div className="card h-full w-full cursor-pointer  rounded-2xl bg-white transition-all duration-200 hover:shadow-md">
          <div className="mb-4 w-full">
            <div className="relative">
              <div className="h-[300px] w-full overflow-hidden rounded ">
                <Image src={image} alt="" className="w-full rounded-b-none rounded-t-2xl" fill />
              </div>
              <div className="absolute bottom-3 right-2 flex items-center justify-center rounded-lg bg-gray-100 px-4 py-1 text-sm font-semibold text-gray-600">
                {blogReadTimeCalcuator()} min read
              </div>
            </div>
            <div className="flex items-center justify-between px-4 pt-3">
              <div className="flex items-center justify-start gap-3">
                <div className="flex cursor-default items-start gap-2 rounded-lg bg-gray-100 px-2 py-1">
                  <FaUser />
                  <span className="mb-0 text-sm text-gray-700">Hostelpilot</span>
                </div>
                {/* <div className='flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1 cursor-default'>
                  <BiUpvote />
                  <span className='text-gray-700 text-sm'>10</span>
                </div> */}
              </div>
              <div>
                {date && (
                  <div className="flex cursor-default items-center gap-2 px-1 py-1">
                    <GoPencil className="text-sm text-gray-700" />
                    <span className="inline-block text-sm text-gray-700">{date}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-0 px-4">
              <div>
                <p
                  className="text-dark mt-2 line-clamp-2 inline-block text-xl font-bold hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                  {title}
                </p>
              </div>

              <div>
                <p
                  className={`text-base font-medium text-gray-500 ${title.length > 15 ? 'line-clamp-3' : 'line-clamp-4'} mb-0`}>
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
