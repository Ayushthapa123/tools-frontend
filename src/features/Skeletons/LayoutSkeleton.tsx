import { NavBarSkeleton } from './NavBarSkeleton';
import { SidebarSkeleton } from './SidebarSkeleton';

export const LayoutSkeleton = () => {
  return (
    <div>
      <div className=" flex h-[100vh] w-full  flex-col gap-1">
        <div className="skeleton flex  h-[10vh] w-full  flex-col justify-center rounded-none bg-white px-5 align-middle">
          <NavBarSkeleton />
        </div>

        <div className=" flex h-[90vh] w-full gap-1 rounded-none ">
          <div className="skeleton hidden h-full w-[300px] min-w-[300px] max-w-[300px]  rounded-none bg-white md:block">
            <SidebarSkeleton />
          </div>

          <div className="skeleton h-full flex-grow rounded-lg bg-white">
            <div className="grid h-auto w-full gap-5 bg-white p-10 lg:grid-cols-4">
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
