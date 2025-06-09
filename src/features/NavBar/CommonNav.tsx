'use client';
import Link from 'next/link';
import { Logo } from '../Logo';
import { useUserStore } from 'src/store/userStore';
// import { MobileNav } from './MobileNav';

import { motion } from 'framer-motion';
import { domainConfig } from 'src/config/domainConfig';
import { UserProfile } from '../UserProfile';
import { CreateHostelModal } from 'src/app/app/hostel-info/CreateHostelModal';
import { UserType } from 'src/gql/graphql';
import { Drawer } from '../Drawer';

export const CommonNav = () => {
  const { user } = useUserStore();

  return (
    <div
      className="sticky top-0 z-[999] flex h-[70px] w-full  flex-col  justify-center bg-white px-3 align-middle  shadow-sm md:h-[70px] md:px-[30px]"
      id="common-nav">
      <div className="flex w-full justify-between overflow-hidden ">
        <div className=" flex-shrink-0  ">
          <div className="relative h-[60px] w-[70px] md:h-[70px] ">
            <Logo />
          </div>
        </div>
        <div className="flex  flex-1" />

        <div className=" flex flex-shrink-0 flex-col justify-center ">
          <div className="flex gap-1 md:gap-4">
            {!user.userId && domainConfig.appName === 'hosteladmin' && (
              <>
                <div className="flex gap-1 md:gap-2">
                  <Link href={'/login'}>
                    <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                      <div className="p1-1 py-3 text-[1rem] hover:underline">Login</div>
                    </motion.div>
                  </Link>
                </div>

                <button className="flex flex-row items-center justify-center rounded-full border border-transparent bg-primary py-0 font-medium tracking-wide transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 lg:min-w-fit">
                  <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                    <Link href={'/signup'}>
                      <span className="block text-white md:block">Signup</span>
                    </Link>
                  </motion.div>
                </button>
              </>
            )}

            <div className=" flex gap-3 ">
              {user.userId && (
                <div className=" flex flex-col justify-center ">
                  <div className="flex gap-1 md:gap-2">
                    <UserProfile />
                  </div>
                </div>
              )}
              <div className=" ">
                {user.userType !== UserType.Student && user.userId && (
                  <div className="left-0 top-[70px]  lg:hidden ">
                    <Drawer />
                  </div>
                )}
              </div>
            </div>
            {user.userType === UserType.HostelOwner && !user.hostelId && <CreateHostelModal />}
          </div>
          <div className=" flex gap-1 md:gap-2">
            {domainConfig.appName === 'hostelpilot' && (
              <button className="flex flex-row items-center justify-center rounded-full border border-transparent bg-primary  font-medium tracking-wide transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 lg:min-w-fit">
                <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                  <Link href={'https://hosteladmin.com/signup'}>
                    <span className="block text-white md:block">List My Hostel</span>
                  </Link>
                </motion.div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
