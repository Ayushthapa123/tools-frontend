'use client';
import Link from 'next/link';
import { Logo } from '../Logo';
import { useUserStore } from 'src/store/userStore';
// import { MobileNav } from './MobileNav';

import { enqueueSnackbar } from 'notistack';
import { motion } from 'framer-motion';

export const CommonNav = () => {
  const { user } = useUserStore();

  const handleCreateTool = () => {
    enqueueSnackbar('Tool creation is coming soon', { variant: 'error' });
  };

  return (
    <div
      className="sticky top-0 z-[999] flex h-[70px] w-full  flex-col  justify-center bg-white px-3 align-middle  shadow-sm md:h-[70px] md:px-[30px]"
      id="common-nav">
      <div className="flex w-full justify-between overflow-hidden ">
        <div className=" flex flex-shrink-0 ">
          <div className="relative ">
            <Logo />
          </div>
          <div className=" mt-2 hidden flex-col justify-center md:flex"></div>
        </div>
        <div className="flex  flex-1" />

        <div className=" flex flex-shrink-0 flex-col justify-center ">
          <div className="flex flex-row-reverse gap-2 md:gap-4">
            

            <div className="flex flex-row-reverse gap-3">
              <div className=" flex gap-3 ">
                { 
                  <div className="flex flex-col justify-center">
                    <div className="bg-gray-50o hover:bg-gray-1000 flex items-center gap-2 rounded-lg  py-2 transition md:gap-4">
                      <Link href={user.userId ? '/app/my-tools' : '/signup'}>
                        <button className="flex items-center gap-2 rounded-md bg-primary  py-1 text-base font-semibold text-white shadow transition hover:bg-primary/90 md:text-lg">
                          <svg
                            className="mr-1 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          List My Tool
                        </button>
                      </Link>
                    </div>
                  </div>
                }
                <div className=" mt-2 ">
                  {/* <div className="left-0 top-[70px]  lg:hidden ">
                    <Drawer />
                  </div> */}
                </div>
              </div>
            </div>
            {!user.userId &&
              <>
                <div className="flex gap-1 md:gap-2">
                  <Link href={'/login'}>
                    <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                      <div className="p1-1 py-3 text-[1rem] hover:underline">Login</div>
                    </motion.div>
                  </Link>
                </div>
              </>
            }
            <div className=" flex gap-1 md:gap-2">
              {/* {domainConfig.appName === 'hostelpilot' && !user.userEmail && (
              <button className="flex flex-row items-center justify-center rounded-full border border-transparent bg-primary  font-medium tracking-wide transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 lg:min-w-fit">
                <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                  <Link href={'https://hosteladmin.com/signup'}>
                    <span className="block text-white md:block">List My Hostel <b className='text-xs  bg-neutral p-1 rounded text-gray-600 px-1'> FREE</b></span>
                  </Link>
                </motion.div>
              </button>
            )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
