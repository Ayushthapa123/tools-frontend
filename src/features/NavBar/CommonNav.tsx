'use client';
import Link from 'next/link';
import { Logo } from '../Logo';
import { useUserStore } from 'src/store/userStore';
// import { MobileNav } from './MobileNav';

import { motion } from 'framer-motion';

import { UserProfile } from '../UserProfile';
import { CreateHostelModal } from 'src/app/app/hostel-info/CreateHostelModal';
import { UserType } from 'src/gql/graphql';

export const CommonNav = () => {

  const { user } = useUserStore();

  return (
    <div
      className="sticky top-0 z-[999] flex h-[70px] w-full  bg-white  px-3 shadow-sm md:h-[70px] md:px-[30px] "
      id="common-nav">
      <div className="flex w-full justify-between ">
        <div className="relative flex w-auto">
          <div className="relative h-[60px] w-[150px] md:h-[70px] md:w-fit ">
            <Logo />
            {/* <h1>Home Stay</h1> */}
          </div>
        </div>

        <div className=" flex flex-col justify-center ">
          <div className="flex gap-1 md:gap-4">
            {!user.userId && (
              <>
                <div className="flex gap-1 md:gap-2">
                  <Link href={'/login'}>
                    <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                      <div className="py-3 text-[1rem] p1-1 hover:underline" >Login</div>
                    </motion.div>
                  </Link>
                </div>



                <button
                  
                  className="flex flex-row items-center justify-center rounded-full border border-transparent bg-primary font-medium tracking-wide transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 lg:min-w-fit py-0"
                >
                  <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                    <Link href={"/signup"}>
                      <span className="block md:block text-white">Signup</span>
                    </Link>
                  </motion.div>
                </button>
              </>
            )}



            {user.userId && (
              <div className=" flex flex-col justify-center ">
                <div className="flex gap-1 md:gap-2">
                  <UserProfile />
                </div>
              </div>
            )}
            {user.userType === UserType.HostelOwner && !user.hostelId && <CreateHostelModal />}
          </div>
        </div>
      </div>
    </div >
  );
};
