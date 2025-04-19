import { UserProfileSkeleton } from "./UserProfileSkeleton";


export const SidebarSkeleton = () => {
  return (
    <div className=" h-auto">
      <div className="flex h-full w-full flex-col gap-4 p-5">
        <UserProfileSkeleton />
      </div>
      <div className=" flex flex-col gap-5 p-5">
        <div className=" flex-grow flex  flex-col gap-3">
          <div className="skeleton h-[40px] w-full  rounded-lg" />
          <div className="skeleton h-[40px] w-full  rounded-lg" />
          <div className="skeleton h-[40px] w-full  rounded-lg" />
          <div className="skeleton h-[40px] w-full  rounded-lg" />
          <div className="skeleton h-[40px] w-full  rounded-lg" />
        </div>
        <div>
          <div className="skeleton h-[40px] w-full  rounded-lg" />
        </div>
      </div>
    </div>
  );
 }
