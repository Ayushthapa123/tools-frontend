// components/Sidebar.tsx

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import DashboardIcon from '../../components/icons/Dashboard';
import RoomIcon from '../../components/icons/Room';

import LogoutIcon from '../../components/icons/LogOut';
import { useState } from 'react';
import { IoIosArrowUp, IoMdPhotos } from 'react-icons/io';
import IconButton from '../../components/IconButton';
import RulesIcon from '../../components/icons/Rules';
import { useUserStore } from 'src/store/userStore';
import {
  LogOutMutationVariables,
  LogOut,
  LogOutMutation,
  UserType,
  User
} from 'src/gql/graphql';
import { RiToolsFill } from 'react-icons/ri';
import { FaAssistiveListeningSystems, FaBloggerB, FaChair, FaHotel, FaLightbulb, FaRegLightbulb, FaTools } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { GrGallery, GrUserSettings } from 'react-icons/gr';
import SettingsIcon from 'src/components/icons/Settings';
import MenuItem from './MenuItem';
import { BsFileSlidesFill, BsPeople } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';
import MarketingIcon from 'src/components/icons/Marketing';
import { MdSettingsApplications } from 'react-icons/md';
import { setupFsCheck } from 'next/dist/server/lib/router-utils/filesystem';
import { BiHelpCircle } from 'react-icons/bi';
interface MenuItemType {
  icon: JSX.Element;
  text: string;
  href: string;
  children?: boolean;
  childRoutes?: MenuItemType[];
  handleFunc?: () => void;
  show?: boolean;
}



const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { user ,setUser} = useUserStore();

  const mutateLogOutRequest = useGraphqlClientRequest<LogOutMutation, LogOutMutationVariables>(
    LogOut.loc?.source.body!,
  );

  const { mutateAsync } = useMutation({ mutationFn: mutateLogOutRequest });

  const menuItems: MenuItemType[] = [
    {
      icon: <DashboardIcon />,
      text: 'Explore ',
      href: '/',
      children: false,
      show: true,
    },
 
 
    {
      icon: <FaTools />,
      text: 'My Tools',
      href: '/app/tool',
      children: false,
      show: true
    },
    {
      icon: <FaAssistiveListeningSystems />,
      text: 'My Assets',
      href: '/app/asset',
      children: false,
      show: true
    },
   
   
 
  ];

  /**
   * Handles user logout by removing the refresh token from localStorage
   * and redirecting to the login page
   */
  const logOut = () => {
    mutateAsync({}).then(res => {
      if (res?.logout?.success) {
        
        setUser({...user, userId: null})
        router.push('/login');
      }
    });
  };

  // this function
  const bottomItems: MenuItemType[] = [
    // { icon: <SettingsIcon />, text: 'Settings', href: '/app/settings' },
    { icon: <BiHelpCircle />, text: 'Help', href: '/app/help' },

    { icon: <LogoutIcon />, text: 'Log Out', href: '/', handleFunc: logOut },
  ];
  

  return (
    <div className="relative z-[99909] flex h-full w-[18rem] flex-col border-r bg-base-100 px-[1rem] shadow-lg">
      <div className="flex h-full w-full flex-col">
        <div className="relative box-content w-full">
          {/* profile */}
          {/* <UserProfile /> */}
        </div>
        <div className="mt-5 flex w-full flex-grow flex-col gap-1">
          {menuItems
            .filter(item => item.show)
            .map((item, index) => (
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
        <div className="mt-5 flex w-full flex-col gap-1">
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
        <div className="absolute right-5 top-2 cursor-pointer">
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
            <div key={item.text} className="py-1 ">
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


