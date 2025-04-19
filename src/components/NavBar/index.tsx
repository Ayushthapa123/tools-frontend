// components/Navbar.js

import { IoMdNotifications } from 'react-icons/io';
import { Drawer } from '../Drawer';
import { CreateHostelModal } from 'src/app/app/homestay-info/CreateHostelModal';
import { useUserStore } from 'src/store/userStore';
import { LogoIcon } from '../Logo/LogoIcon';
import { useEffect, useState } from 'react';
import { UserProfile } from '../UserProfile';

const Navbar = () => {
  const { user } = useUserStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user?.hostelId && user?.userType === 'HOMESTAY_OWNER') {
      setShowModal(true);
    }
  }, [user?.hostelId, user?.userType]);
  return (
    <nav className="h-[70px]  bg-white px-4  shadow-sm">
      <div className="flex items-center justify-between mx-5  md:mx-10">
        {!user?.hostelId && showModal && <CreateHostelModal />}
        {/* Left side - Logo */}
        <div className="relative flex items-center">
          <LogoIcon />
        </div>

        {/* Right side - Notification Icon */}
        <div className="relative flex gap-3  top-1">
      
          <div className="relative p-1 rounded-lg cursor-pointer  h-min bg-slate-100 top-1">
            <span className=" relative text-[25px] text-primary ">
              <IoMdNotifications />
            </span>
          </div>
          <UserProfile />

          <div className="left-0 top-[70px]  lg:hidden ">
            <Drawer />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
