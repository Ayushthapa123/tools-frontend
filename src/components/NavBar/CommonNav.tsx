'use client';
import Link from 'next/link';
import { Logo } from '../Logo';
import { useUserStore } from 'src/store/userStore';
// import { MobileNav } from './MobileNav';

import { motion } from 'framer-motion';
import { useState } from 'react';
import SignupModal from '../Modal/SignUpModal';
import { useAccessTokenStore } from 'src/store/accessTokenStore';
import { RefreshTokenMutationVariables } from 'src/gql/graphql';
import { useRouter } from 'next/navigation';
import { RefreshToken } from 'src/gql/graphql';
import { RefreshTokenMutation } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { UserProfile } from '../UserProfile';

export const CommonNav = () => {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ isCurrencyOpen, setIsCurrencyOpen ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCurrency = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
  };
  const router = useRouter();
  const mutateRefreshToken = useGraphqlClientRequest<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshToken.loc?.source.body!);

  const { setAccessToken, accessToken } = useAccessTokenStore();
  const { setUser, user } = useUserStore();

  const { mutateAsync: getAccessToken } = useMutation({ mutationFn: mutateRefreshToken });

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      getAccessToken({  }).then(res => {
        if (res?.refreshTokens?.token?.accessToken) {
          setAccessToken(res.refreshTokens.token.accessToken);
          setUser({
            userId: Number(res.refreshTokens.user.id),
            hostelId: res.refreshTokens.user.homestayId ?? null,
            userEmail: res.refreshTokens.user.email,
            userName: res.refreshTokens.user.fullName,
            userType: res.refreshTokens.user.userType,
          });
        }
      });
    }
  }, [ getAccessToken, router, setAccessToken, setUser ]);

  return (
    <div
      className="sticky top-0 z-[999] flex h-[70px] w-full  bg-white  px-3 shadow-sm md:h-[70px] md:px-[30px] "
      id="common-nav">
      <div className="flex w-full justify-between ">
        <div className="relative flex w-auto">
          <div className="relative h-[60px] w-[150px] md:h-[70px] md:w-[210px] ">
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
                      <div className="py-3 text-[1rem] p1-1">Login</div>
                    </motion.div>
                  </Link>
                </div>

                {/* <div className="flex gap-1 md:gap-2">
                  <Link href={'/signup'}>
                    <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                      <div className="py-3 text-[1rem] pl-1">Signup</div>
                    </motion.div>
                  </Link>
                </div> */}

                <button
                  className="flex flex-row items-center justify-center rounded-full border border-transparent bg-primary font-medium tracking-wide transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 md:min-w-fit py-0"
                >
                  <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                    <Link href={"/signup"}>
                      <span className="block sm:hidden md:block text-white">Signup</span>
                    </Link>
                  </motion.div>
                </button>
              </>
            )}

            {/* Desktop Navigation */}
            {/* <nav className="hidden items-center space-x-8 md:flex">
              <Link href="/" className="h2 font-medium text-primary">
                Find Your Room
              </Link>
              <Link href="/hotel-search-halfmap" className="font-medium text-primary">
                Find your Home
              </Link>
              <Link href="/blog" className="font-medium text-primary">
                Blog
              </Link>
              <Link href="/become-local-expert" className="font-medium text-primary">
                Become Local Expert
              </Link>
              <Link href="/contact" className="font-medium text-primary">
                Contact
              </Link>
              <Link href="/about" className="font-medium text-primary">
                About
              </Link>
            </nav> */}

            {user.userId && (
              <div className=" flex flex-col justify-center ">
                <div className="flex gap-1 md:gap-2">
                  <UserProfile />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};
