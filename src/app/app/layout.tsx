'use client';

import React, { useEffect, useState } from 'react';

import Navbar from 'src/components/NavBar';
import { Drawer } from 'src/components/Drawer';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { RefreshToken, RefreshTokenMutation, RefreshTokenMutationVariables } from 'src/gql/graphql';
import { useMutation } from '@tanstack/react-query';
import { LayoutSkeleton } from '../../features/Skeletons/LayoutSkeleton';
import { useRouter } from 'next/navigation';
import { useAccessTokenStore } from 'src/store/accessTokenStore';
import GlobalToast from 'src/components/GlobalToast';

import { useUserStore } from 'src/store/userStore';

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
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      getAccessToken({ input: { refreshToken: refreshToken } }).then(res => {
        if (res?.refreshTokens?.token?.accessToken) {
          setAccessToken(res.refreshTokens.token.accessToken);
          setUser({
            userId: Number(res.refreshTokens.user.id),
            hostelId: res.refreshTokens.user.homestayId ?? null,
            userEmail: res.refreshTokens.user.email,
            userName: res.refreshTokens.user.fullName,
            userType: res.refreshTokens.user.userType,
          });
          if (res.refreshTokens.user.userType === 'GUEST') {
            router.push('/app/my-profile');
          }
        } else {
          localStorage.removeItem('refreshToken');
          router.push('/login');
        }
      });
    } else {
      router.push('/login');
    }
  }, [getAccessToken, router, setAccessToken, setUser]);

  return (
    <div className=" w-full bg-gray-50">
      <GlobalToast />

      {accessToken ? (
        <>
          <div className=" relative  z-[999] h-[70px] shadow-sm">
            <Navbar />
          </div>

          <div className=" pt-15    h-[calc(100vh-70px)] w-full  md:flex">
            {user.userType!=="GUEST" &&<div className="fixed z-50 hidden  lg:relative lg:flex">
              <Drawer />
            </div>}

            <div
              className={`  relative h-[calc(100vh-70px)] w-full overflow-y-scroll   bg-slate-50 p-3 md:p-5`}>
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <LayoutSkeleton />
        </>
      )}
    </div>
  );
}
