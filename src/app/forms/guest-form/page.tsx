'use client';

import { useMutation } from '@tanstack/react-query';

import React, { Suspense, useEffect, useState } from 'react';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';

import {
GetHostelGuestWithToken,
GetHostelGuestWithTokenQuery,
GetHostelGuestWithTokenQueryVariables
} from 'src/gql/graphql';

import { useRouter, useSearchParams } from 'next/navigation';

import { useAccessTokenStore } from 'src/store/accessTokenStore';
import { GuestCreateForm } from 'src/app/app/hostel-guests/[slug]/GuestCreateForm';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';
export default function Home() {
  return (
    <div>
      <Suspense>
        <GuestForm />
      </Suspense>
    </div>
  );
}

function GuestForm() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token'); 

  const { data: guestData, isLoading} = useGraphQLQuery<GetHostelGuestWithTokenQuery, GetHostelGuestWithTokenQueryVariables>({
    queryKey: ['getGuest', token],
    query: GetHostelGuestWithToken.loc!.source.body,
    variables: { token: token || '' },
    enabled: !!token
    });

  if(!token)  return <div>Invalid token</div>

  if(isLoading) return <div>Loading...</div> 
  if(!guestData?.hostelGuestByToken?.data) return <div>Guest not found</div>

//   useEffect(() => {
//     if (token) {
//       signUp({
//         input: {
//           token: token,
//         },
//       }).then(res => {
//         if (res?.signUpWithGoogle?.id) {
//           setAccessToken(res.signUpWithGoogle.token.accessToken);
//           // localStorage.setItem('refreshToken', res.signUpWithGoogle.token.refreshToken);
//           router.push('/app');
//         }
//       });
//     } else {
//       router.push('/login');
//     }
//   }, [router, setAccessToken, signUp, token]);

  return <section className="">
    <GuestCreateForm guest={guestData?.hostelGuestByToken?.data} isEdit={true} withToken={true} />
  </section>;
}
