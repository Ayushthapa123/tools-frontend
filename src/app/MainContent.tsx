'use client';

import React, { useEffect } from 'react';

import Navbar from 'src/features/NavBar';
import { Drawer } from 'src/features/Drawer';
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
import GlobalToast from 'src/features/GlobalToast';

import { useUserStore } from 'src/store/userStore';
import { ThemeProvider } from 'src/features/themes/ThemeProvider';
import LoadingSpinner from 'src/components/Loading';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { useRouter } from 'next/navigation';

export default function MainContent({
  children,
}: {
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



  if (isLoading)
    return (
      <>
        <LoadingSpinner color="primary" size="lg" />
      </>
    );
  return (
    <ThemeProvider>
      <div className=" w-full ">
        <GlobalToast />
        <>
          <div className=" relative  z-[999] h-[70px] shadow-sm">
            <CommonNav />
          </div>
          
        
              <div className=" pt-15    h-[calc(100vh-70px)] w-full  md:flex">
              
                  <div className="fixed z-50 hidden  lg:relative lg:flex">
                    <Drawer />
                  </div>
                

                <div
                  className={`  relative h-[calc(100vh-70px)] w-full overflow-y-scroll   bg-slate-50 p-3 md:p-5`}
                >
                    {user.userEmail??"no user"}
                  {children}
                </div>
              </div>
            
          
        </>
      </div>
    </ThemeProvider>
  );
}
