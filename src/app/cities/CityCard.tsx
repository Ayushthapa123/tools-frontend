import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import Link from 'next/link';
import Image from 'next/image';
import { FiEdit } from 'react-icons/fi';
import { BlogPostData } from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';
import Button from 'src/components/Button';
import { Chip } from 'src/components/Chip';

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
    <div className="relative flex overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-2xl gap-3 group">
      {/* Image Section */}
      <div className="relative h-48 w-48 flex-shrink-0">
        {cityLink ? (
          <Link href={cityLink} className="block h-full w-full">
            <Image
              src={city?.coverImageUrl || '/placeholder-room.jpg'}
              alt={city?.title ?? 'City image'}
              fill
              className="rounded-t-md object-cover transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </Link>
        ) : (
          <Image
            src={city?.coverImageUrl || '/placeholder-room.jpg'}
            alt={city?.title ?? 'City image'}
            fill
            className="rounded-t-md object-cover"
            priority
          />
        )}
      </div>

      {/* Content Section */}
      <div className="flex min-h-[130px] gap-3 px-3 py-4 w-full">
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col items-start justify-start gap-0 pb-1 lg:flex-row lg:items-start lg:justify-between lg:gap-2">
            {cityLink ? (
              <Link href={cityLink} className="mb-0 text-lg font-bold text-blue-700 hover:underline" title={city?.title ?? ''}>
                <h2 className="mb-0 " title={city?.title ?? ''}>
                {city?.title ?? 'Untitled City'}
              </h2>
              </Link>
            ) : (
              <h2 className="mb-0 " title={city?.title ?? ''}>
                {city?.title ?? 'Untitled City'}
              </h2>
            )}
          </div>
          <div className="mt-1 text-gray-600 text-sm min-h-[40px]">
            {city?.metaDescription || <span className="italic text-gray-400">No description available.</span>}
          </div>
          {/* Optionally show tags if present */}
          {city?.tags && city.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {city.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Action Buttons (if needed in future) */}
        {/* <div className="absolute right-3 top-2 z-20 flex gap-2"></div> */}
      </div>
    </div>
  );
};
