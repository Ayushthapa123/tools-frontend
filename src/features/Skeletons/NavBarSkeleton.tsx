import { BsThreeDots } from 'react-icons/bs';

export const NavBarSkeleton = () => {
  return (
    <div className="skeleton flex w-full items-center justify-between gap-10 px-10 ">
      <div className="ml-3 flex-grow ">
        <div className="text-23 line-clamp-1 truncate font-semibold text-primary">
          <div className="skeleton h-7 w-full"></div>
        </div>
        <div className="text-14 line-clamp-1 font-medium text-gray-400">
          {/* <div className="skeleton h-4 w-full"></div> */}
        </div>
      </div>
      <div className="flex items-center justify-center"></div>
      <div className="relative h-14 w-14">
        <div className="skeleton h-full w-full rounded-full"></div>
      </div>
    </div>
  );
};
