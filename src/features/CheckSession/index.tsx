"use client"
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { RefreshToken, RefreshTokenMutation, RefreshTokenMutationVariables } from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';

export const CheckSession = () => {
  const mutateRefreshToken = useGraphqlClientRequest<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshToken.loc?.source.body!);

  const { setUser, user } = useUserStore();
  const router=useRouter()

  const { mutateAsync: getAccessToken } = useMutation({ mutationFn: mutateRefreshToken });

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return;
    } else {
      alert('hi')
      getAccessToken({ }).then(res => {
        if (res?.refreshTokens?.token?.accessToken) {
          setUser({
            userName: res.refreshTokens?.user.fullName,
            userEmail: res.refreshTokens.user.email,
            userId: Number(res.refreshTokens.user.id), 
            hostelId:Number(res.refreshTokens.user.homestayId),
            userType:res.refreshTokens.user.userType
          });
          // if usetype is guest then don't push to app page
          if (res.refreshTokens.user.userType !== 'GUEST') {
            // router.push('/app');
          }
        } else {
          localStorage.removeItem('refreshToken');
        }
      });
    }
  }, [getAccessToken, router, setUser]);
  return <div></div>;
};
