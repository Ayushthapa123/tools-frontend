import { NavBarSkeleton } from "./NavBarSkeleton";
import { SidebarSkeleton } from "./SidebarSkeleton";

export const LayoutSkeleton = () => {
  return (
    <div>
      <div className=" flex h-[100vh] w-full  flex-col gap-1">
        <div className="skeleton flex  h-[10vh] w-full  flex-col justify-center rounded-none align-middle bg-white px-5">
          <NavBarSkeleton />
        </div>

        <div className=" flex h-[90vh] w-full gap-1 rounded-none ">
          <div className="skeleton h-full w-[300px] min-w-[300px] max-w-[300px] rounded-none  bg-white hidden md:block">
            <SidebarSkeleton />
          </div>

          <div className="flex-grow h-full bg-white rounded-lg skeleton">
            <div className="grid w-full h-auto gap-5 p-10 bg-white lg:grid-cols-4">
              <div className=" skeleton h-[150px]" />
              <div className=" skeleton h-[150px]" />
              <div className=" skeleton h-[150px]" />
              <div className=" skeleton h-[150px]" />
              <div className=" skeleton h-[150px]" />
              <div className=" skeleton h-[150px]" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
