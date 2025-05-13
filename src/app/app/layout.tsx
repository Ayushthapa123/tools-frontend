'use client';

import React, { useEffect, useState } from 'react';

import Navbar from 'src/features/NavBar';
import { Drawer } from 'src/features/Drawer';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { GetUserById, GetUserByIdQueryVariables, GetUserByIdQuery, RefreshToken, RefreshTokenMutation, RefreshTokenMutationVariables } from 'src/gql/graphql';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LayoutSkeleton } from '../../features/Skeletons/LayoutSkeleton';
import { useRouter } from 'next/navigation';
import { useAccessTokenStore } from 'src/store/accessTokenStore';
import GlobalToast from 'src/features/GlobalToast';

import { useUserStore } from 'src/store/userStore';
import { ThemeProvider } from 'src/features/themes/ThemeProvider';
import { CheckMailForVerification } from '../auth/verify-email/CheckMailForVerification';
import LoadingSpinner from 'src/components/Loading';

export default function Layout({
  children,
}: {
  params: { pageTitle: string };
  children: React.ReactNode;
}) {
  const router = useRouter();
  const mutateRefreshToken = useGraphqlClientRequest<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshToken.loc?.source.body!);

  const { setAccessToken, accessToken } = useAccessTokenStore();
  const { setUser,user } = useUserStore();

  const { mutateAsync: getAccessToken } = useMutation({ mutationFn: mutateRefreshToken });

  useEffect(() => {
    // const refreshToken = localStorage.getItem('refreshToken');
   
      getAccessToken({}).then(res => {
        if (res?.refreshTokens?.token?.accessToken) {
          setAccessToken(res.refreshTokens.token.accessToken);
          setUser({
            userId: Number(res.refreshTokens.user.id),
            homestayId: res.refreshTokens.user.homestayId ?? null, 
            userEmail: res.refreshTokens.user.email,
            userName: res.refreshTokens.user.fullName,
            userType: res.refreshTokens.user.userType,
          });
          if (res.refreshTokens.user.userType === 'GUEST') {
            router.push('/app/my-profile');
          }
        } else {
          router.push('/login');
        }
      });
    
  }, [getAccessToken, router, setAccessToken, setUser]);

  // Fetch user profile by userId
  const queryUser = useGraphqlClientRequest<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserById.loc?.source.body!);
  const fetchUser = async () => {
    const res = await queryUser({ id: Number(user.userId) });
    return res.getUserById;
  };
  const { data: userData, isLoading} = useQuery({
    queryKey: [ 'getUser' ],
    queryFn: fetchUser,
    enabled: !!user.userId && user.userId !== null,
  });
  if(isLoading) return (
    <>
    <LoadingSpinner color='primary' size='lg' />
    </>
  )
  return (
    <ThemeProvider>
        <div className=" w-full ">
          <GlobalToast />
          {accessToken ? (
            <>
              <div className=" relative  z-[999] h-[70px] shadow-sm">
                <Navbar />
              </div>

              {userData ? userData?.isVerified == false ? <CheckMailForVerification /> : (
                <div className=" pt-15    h-[calc(100vh-70px)] w-full  md:flex">
                  {user.userType !== "GUEST" &&
                    <div className="fixed z-50 hidden  lg:relative lg:flex">
                    <Drawer />
                  </div>}


                  <div
                    className={`  relative h-[calc(100vh-70px)] w-full overflow-y-scroll   bg-slate-50 p-3 md:p-5`}>
                    {children}
                  </div>
              </div>)
              :""  
              }
            </>
          ) : (
            <>
              <LayoutSkeleton />
            </>
          )}
        </div>
      </ThemeProvider>
  );
}
