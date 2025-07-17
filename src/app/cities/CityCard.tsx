import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import Link from 'next/link';
import Image from 'next/image';
import { FiEdit } from 'react-icons/fi';
import { BlogPostData } from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';
import Button from 'src/components/Button';
import { Chip } from 'src/components/Chip';
import { FaUser } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';

export const CityCard = ({
  city,
  subRoute
}: {
  city: Partial<BlogPostData> | undefined | null;
  subRoute?:string
}) => {
  // Helper for slug link
  const cityLink = city?.slug ? `/${subRoute??"cities"}/${city.slug}` : undefined;

  return (
    <>
       <Link href={`/cities/${city?.slug}`}>
        <div className="card h-full w-full cursor-pointer  rounded-2xl bg-white transition-all duration-200 hover:shadow-md">
          <div className="mb-4 w-full">
            <div className="relative">
              <div className="h-[300px] w-full overflow-hidden rounded ">
                <Image src={city?.coverImageUrl || "/placeholder-room.jpg"} alt="" className="w-full rounded-b-none rounded-t-2xl" fill />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-start gap-3">
                <div className="flex cursor-default items-start gap-2 rounded-lg bg-gray-100 px-2 py-1">
                  <FaUser />
                  <span className="mb-0 text-sm text-gray-700">Hostelpilot</span>
                </div>
              </div>
              <div>
                {city?.createdAt && (
                  <div className="flex cursor-default items-center gap-2 px-1 py-1">
                    <GoPencil className="text-sm text-gray-700" />
                    <span className="inline-block text-sm text-gray-700">{city?.createdAt.split("T")[0]}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-0 px-4">
              <div>
                <p
                  className="text-dark mt-2 line-clamp-2 inline-block text-xl font-bold hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                  {city?.title}
                </p>
              </div>

              <div>
                <p
                  className={`text-base font-medium text-gray-500 ${ city?.title && city?.title.length > 15 ? 'line-clamp-3' : 'line-clamp-4'} mb-0`}>
                  {city?.metaDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
