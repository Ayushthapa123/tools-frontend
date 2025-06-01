'use client';

import { useMutation } from '@tanstack/react-query';

import React, { Suspense, useEffect, useState } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';

import {
  SignUpWithGoogle,
  SignUpWithGoogleMutation,
  SignUpWithGoogleMutationVariables,
} from 'src/gql/graphql';

import { useRouter, useSearchParams } from 'next/navigation';

import { useAccessTokenStore } from 'src/store/accessTokenStore';

export default function Home() {
  return (
    <div>
      <Suspense>
        <SignUp />
      </Suspense>
    </div>
  );
}

function SignUp() {
  const searchParams = useSearchParams();

  const token = searchParams.get('code')?.replace('%2F', '/');
  const router = useRouter();
  const { setAccessToken } = useAccessTokenStore();

  const mutateSignupRequest = useGraphqlClientRequest<
    SignUpWithGoogleMutation,
    SignUpWithGoogleMutationVariables
  >(SignUpWithGoogle.loc?.source.body!);

  const { mutateAsync: signUp } = useMutation({ mutationFn: mutateSignupRequest });

  useEffect(() => {
    if (token) {
      signUp({
        input: {
          token: token,
        },
      }).then(res => {
        if (res?.signUpWithGoogle?.id) {
          setAccessToken(res.signUpWithGoogle.token.accessToken);
          // localStorage.setItem('refreshToken', res.signUpWithGoogle.token.refreshToken);
          router.push('/app');
        }
      });
    } else {
      router.push('/login');
    }
  }, [router, setAccessToken, signUp, token]);

  return <section className=""></section>;
}
