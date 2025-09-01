'use client';

import React, { useEffect } from 'react';

import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  GetUserById,
  GetUserByIdQueryVariables,
  GetUserByIdQuery,
  RefreshToken,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
  UserType,
} from 'src/gql/graphql';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useUserStore } from 'src/store/userStore';
import { ThemeProvider } from 'src/features/themes/ThemeProvider';
import { CheckMailForVerification } from '../auth/verify-email/CheckMailForVerification';
import LoadingSpinner from 'src/components/Loading';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { useRouter } from 'next/navigation';
import { Drawer } from 'src/features/Drawer';

export default function Layout({
  children,
}: {
  params: { pageTitle: string };
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const router = useRouter();
  // Fetch user profile by userId
  const queryUser = useGraphqlClientRequest<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserById.loc?.source.body!,
  );
  const fetchUser = async () => {
    const res = await queryUser({ id: Number(user.userId) });
    return res.getUserById;
  };
  const { data: userData, isLoading } = useQuery({
    queryKey: ['getUser'],
    queryFn: fetchUser,
    enabled: !!user.userId && user.userId !== null,
  });

  const mutateRefreshToken = useGraphqlClientRequest<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshToken.loc?.source.body!);

  const { setUser } = useUserStore();

  const { mutateAsync: getAccessToken } = useMutation({ mutationFn: mutateRefreshToken });

  useEffect(() => {
    getAccessToken({}).then(res => {
      if (res?.refreshTokens?.token?.accessToken) {
        setUser({
          userName: res.refreshTokens?.user.fullName,
          userEmail: res.refreshTokens.user.email,
          userId: Number(res.refreshTokens.user.id),
          hostelId: Number(res.refreshTokens.user.id),
          userType: res.refreshTokens.user.userType,
        });
      } else {
        router.push('/login');
      }
    });
  }, [getAccessToken, setUser]);

  if (isLoading)
    return (
      <>
        <LoadingSpinner color="primary" size="lg" />
      </>
    );
  return (
    <div className=" w-full ">
      <div className=" w-full ">
        <>
          <div className=" relative  z-[999] h-[70px] shadow-sm">
            <CommonNav />
          </div>

          <div className=" pt-15    h-[calc(100vh-70px)] w-full  md:flex">
            {user.userId && (
              <div className="fixed z-50 hidden  lg:relative lg:flex">
                <Drawer />
              </div>
            )}
            <div className=" w-full  p-3 overflow-y-auto ">
            {children}
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
