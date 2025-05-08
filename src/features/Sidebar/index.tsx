// components/Sidebar.tsx

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import DashboardIcon from '../../components/icons/Dashboard';
import HostelInfoIcon from '../../components/icons/HostelInfo';
import RoomIcon from '../../components/icons/Room';

import LogoutIcon from '../../components/icons/LogOut';
import {  MdOutlineDirections } from 'react-icons/md';
import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import IconButton from '../../components/IconButton';
import RulesIcon from '../../components/icons/Rules';
import { useUserStore } from 'src/store/userStore';   
import { LogInUser, LogInUserMutation, LogInUserMutationVariables, LogOutMutationVariables, LogOut, LogOutMutation, UserType } from 'src/gql/graphql';
import BookingIcon from '../../components/icons/Booking';
import { FaHotel, FaRegLightbulb } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { GrGallery } from 'react-icons/gr';
interface MenuItemType {
  icon: JSX.Element;
  text: string;
  href: string;
  children?: boolean;
  childRoutes?: MenuItemType[];
  handleFunc?: () => void;
  show?: boolean;
}

interface MenuItemProps {
  icon: JSX.Element;
  text: string;
  href: string;
  isActive?: boolean;
  handleFunc?: () => void;
}

const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { user } = useUserStore();

  const mutateLogOutRequest = useGraphqlClientRequest<LogOutMutation, LogOutMutationVariables>(
    LogOut.loc?.source.body!,
  );

  const { mutateAsync } = useMutation({ mutationFn: mutateLogOutRequest });


  const menuItems: MenuItemType[] = [
    {
      icon: <DashboardIcon />,
      text: 'Dashboard',
      href: '/app',
      children: false,
      show: (user.userType === UserType.HomestayOwner || user.userType === UserType.Superadmin),
    },
    {
      icon: <FaHotel />,
      text: 'Homestays',
      href: '/app/homestays',
      children: false,
      show: ( user.userType === UserType.Superadmin || user.userType === UserType.CommunityOwner),
    },
    { icon: <FaHotel />, text: 'Homestay', href: '/app/homestay-info', children: false, show: user.userType === UserType.HomestayOwner },
    { icon: <RoomIcon />, text: 'Rooms', href: '/app/room', children: false, show: user.userType === UserType.HomestayOwner },
    { icon: <GrGallery />, text: 'Gallery', href: '/app/gallery', children: false, show: user.userType === UserType.HomestayOwner },
    { icon: <BookingIcon />, text: 'Bookings', href: '/app/booking', children: false, show: user.userType === UserType.HomestayOwner },

    // { icon: <PriceIcon />, text: 'Pricing', href: '/app/pricing', children: false },
    // { icon: <GalleryIcon />, text: 'Gallery', href: '/app/gallery', children: false, show: user.userType === UserType.HomestayOwner },
    // { icon: <MapIcon />, text: 'Location', href: '/app/location', children: false, show: user.userType === UserType.HomestayOwner },
    // { icon: <CommunityIcon />, text: 'Community', href: '/app/community', children: false },

    {
      icon: <MdOutlineDirections />,
      text: 'More',
      href: '',
      children: true,
      show: user.userType === UserType.HomestayOwner,
      childRoutes: [
        // { icon: <WifiIcon />, text: 'Amenities', href: '/app/amenities', show: user.userType === UserType.HomestayOwner },
        // { icon: <ServiceIcon />, text: 'Services', href: '/app/services', show: user.userType === UserType.HomestayOwner },

        { icon: <RulesIcon className='text-primary'/>, text: 'Rules', href: '/app/rules', show: user.userType === UserType.HomestayOwner },
        { icon: <FaRegLightbulb />, text: 'Amenities', href: '/app/amenities', show: user.userType === UserType.HomestayOwner },
      ],
    },

  ];  

  /**
   * Handles user logout by removing the refresh token from localStorage
   * and redirecting to the login page
   */
  const logOut = () => {
    mutateAsync({}).then(res => {
      if (res?.logout?.success) {
        router.push('/login');
      }
    });
  };

  // this function 
  const bottomItems: MenuItemType[] = [
    // { icon: <SettingsIcon />, text: 'Settings', href: '/app/settings' },
    { icon: <LogoutIcon />, text: 'Log Out', href: '/', handleFunc: logOut },
  ];

  return (
    <div className="relative z-[99909] flex h-full w-[18rem] flex-col border-r bg-base-100 px-[1rem] shadow-lg">
      <div className="flex flex-col w-full h-full">
        <div className="box-content relative w-full">
          {/* profile */}
          {/* <UserProfile /> */}
        </div>
        <div className="flex flex-col flex-grow w-full gap-2 mt-5">
          {menuItems.filter((item) => item.show).map((item, index) => (
            <React.Fragment key={index}>
              {!item.children && (
                <MenuItem
                  icon={item.icon}
                  text={item.text}
                  href={item.href}
                  isActive={pathName === item.href}
                />
              )}
              {item.children && (
                <div>
                  <MenuList item={item} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-col w-full gap-2 mt-5">
          {bottomItems.map((item, index) => (
            <React.Fragment key={index}>
              <MenuItem
                icon={item.icon}
                text={item.text}
                href={item.href}
                isActive={pathName === item.href}
                handleFunc={item?.handleFunc}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const MenuList = ({ item }: { item: any }) => {
  const pathName = usePathname();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div className="relative " onClick={() => setShowMenu(!showMenu)}>
        <div className="absolute cursor-pointer right-5 top-2">
          <IconButton>
            <IoIosArrowUp className={`text-lg text-primary ${showMenu ? '' : 'rotate-180'}`} />
          </IconButton>
        </div>
        <MenuItem
          key={item.text}
          icon={item.icon}
          text={item.text}
          href={item.href}
          isActive={pathName == item.href}
          handleFunc={item?.handleFunc}
          // closeSidebar={closeSidebar}
        />
      </div>
      {showMenu && (
        <div className="pl-5 ">
          {item.childRoutes.map((item: any) => (
            <div key={item.text} className='py-1 '>
              <MenuItem
                icon={item.icon}
                text={item.text}
                href={item.href}
                isActive={pathName == item.href}
                handleFunc={item?.handleFunc}
                // closeSidebar={closeSidebar}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, href, isActive, handleFunc }) => {
  return (
    <div className="flex w-full items-center text-[1.3rem]">
      <Link href={href} className="w-full">
        <div
          onClick={() => {
            handleFunc?.();
          }}
          className={`flex w-full gap-[1rem] rounded-lg pl-3 py-[0.5rem] ${
            isActive ? 'bg-slate-100 font-semibold text-primary' : 'font-medium text-dark hover:bg-slate-100'
          }`}
        >
          <div className="relative top-[5px] font-bold text-primary">{icon}</div>
          <div className="relative left-[-8px] flex items-center">{text}</div>
        </div>
      </Link>
    </div>
  );
};
