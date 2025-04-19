import { BsThreeDots } from "react-icons/bs";


export const UserProfileSkeleton = () => {
  return (
    <div className="flex items-center skeleton w-full justify-between gap-3 p-5">
      <div className="relative h-14 w-14">
        <div className="skeleton h-full w-full rounded-full"></div>
      </div>
      <div className="ml-3 flex-grow">
        <div className="text-23 line-clamp-1 truncate font-semibold text-primary">
          <div className="skeleton h-7 w-full"></div>
        </div>
        <div className="text-14 line-clamp-1 font-medium text-gray-400">
          {/* <div className="skeleton h-4 w-full"></div> */}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="skeleton flex h-7 w-7 items-center justify-center rounded-md  p-1 align-middle">
          {/* <BsThreeDots /> */}
        </div>
      </div>
    </div>
  );
 }
