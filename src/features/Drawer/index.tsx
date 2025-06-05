import { FiMenu } from 'react-icons/fi';
import Sidebar from '../Sidebar';

export const Drawer = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open  ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
            <div className="  relative  block h-min cursor-pointer rounded-lg bg-slate-100 p-1 ">
              <span className=" text-[30px] text-primary">
                <FiMenu />
              </span>
            </div>
          </label>
        </div>
        <div className="drawer-side lg:h-[calc(100vh-70px)] ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
