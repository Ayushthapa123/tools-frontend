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

      getAccessToken({ }).then(res => {
        if (res?.refreshTokens?.token?.accessToken) {
          setUser({
            userName: res.refreshTokens?.user.fullName,
            userEmail: res.refreshTokens.user.email,
            userId: Number(res.refreshTokens.user.id), 
            homestayId:Number(res.refreshTokens.user.homestayId),
            userType:res.refreshTokens.user.userType
          });
     
        }else{
          // router.push('/login')
        }
      });
  }, [getAccessToken, router, setUser]);
  return <div/>;
};
