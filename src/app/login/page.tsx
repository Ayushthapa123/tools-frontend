'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import { Logo } from 'src/features/Logo';
import { FullLogo } from 'src/features/Logo/FullLogoWithText';
import TextInput from 'src/features/react-hook-form/TextField';

import {
  GetGoogleOauthUrl,
  GetGoogleOauthUrlQuery,
  GetGoogleOauthUrlQueryVariables,
  LogInUser,
  LogInUserMutation,
  LogInUserMutationVariables,
  UserType,
} from 'src/gql/graphql';
import { useAccessTokenStore } from 'src/store/accessTokenStore';

type loginData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const { setAccessToken, accessToken } = useAccessTokenStore();

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<loginData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  watch('email');
  watch('password');

  const querySignupUrl = useGraphqlClientRequest<
    GetGoogleOauthUrlQuery,
    GetGoogleOauthUrlQueryVariables
  >(GetGoogleOauthUrl.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.getGoogleAuthUrl.url;
  };

  const { data: signupUrl } = useQuery({
    queryKey: ['getGoogleAuthUrl'],
    queryFn: fetchData,
  });

  const mutateLoginRequest = useGraphqlClientRequest<LogInUserMutation, LogInUserMutationVariables>(
    LogInUser.loc?.source.body!,
  );

  const { mutateAsync } = useMutation({ mutationFn: mutateLoginRequest });

  const onSubmit = async (data: loginData) => {
    setLoading(true);

    mutateAsync({ input: { email: getValues('email'), password: getValues('password') } }).then(
      res => {
        if (res?.loginUser?.id) {
          //after login what to do before pushing him to dashboard/me
          setAccessToken(res.loginUser.token.accessToken);
          // localStorage.setItem('refreshToken', res.loginUser.token.refreshToken);
          if (res.loginUser.userType === UserType.HostelOwner) {
            router.push('/app');
          } else {
            router.push('/app/my-profile');
          }
        } else {
          setError('Failed to login!');
        }
      },
    );

    // Need help in the getting the message in the result

    setLoading(false);
  };
  const checkPasswordValidity = () => {
    const password = getValues().password;
    if (password.length < 8) {
      return false;
    }
    return true;
  };
  const checkEmailValidity = () => {
    const email = getValues().email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = checkPasswordValidity() && checkEmailValidity();

  useEffect(() => {
    //if refreshToken already present push it to the app
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      router.push('/app');
    }
  }, [router]);

  const openSignupUrl = () => {
    // @ts-ignore
    if (signupUrl) window.location = signupUrl;
  };

  return (
    <section className="flex min-h-[100vh] flex-col justify-center bg-gray-100 p-5 align-middle lg:py-[3rem] ">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className=" relative mx-auto max-w-[450px]  rounded-lg bg-white px-[1rem] py-[1.5rem] text-center sm:px-12 md:px-[2.5rem]">
              <div className="relative mb-5 flex items-center  gap-1 md:-ml-4">
                <Logo />
                <div>
                  <FullLogo />
                </div>
              </div>
              <p className="  text-error">{error ?? error}</p>

              <form className=" bg-white text-left" onSubmit={handleSubmit(onSubmit)}>
                <div className=" w-full py-3">
                  <div className="mt-3 ">
                    <TextInput
                      name="email"
                      type="email"
                      placeholder="example@email.co.uk"
                      control={control}
                      label="Email Address"
                      required
                      helpertext={errors.email?.type === 'required' ? 'Email Is Required' : ''}
                      error={!!errors.email}
                      autoFocus
                    />
                  </div>
                  <div className="mt-3 ">
                    <TextInput
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      control={control}
                      label="Password"
                      required
                      helpertext={
                        errors.password?.type === 'required' ? 'Password Is Required' : ''
                      }
                      error={!!errors.password}
                    />
                  </div>
                </div>

                <div className="mb-5 flex justify-center">
                  <Button
                    label="Log in"
                    disabled={loading || !isValid}
                    className={`${
                      loading || !isValid ? 'cursor-not-allowed opacity-30' : 'opacity-100'
                    } rounded-md bg-primary px-4 py-2 font-bold   `}
                  />
                </div>
              </form>

              <a
                href="/auth/forgotpassword"
                className="text-dark mb-2 inline-block text-base hover:text-primary hover:underline "
              >
                Forgot Password?
              </a>
              <p className="text-base">
                <span className="pr-0.5">Don&apos;t have an account yet? </span>
                <Link href="/signup" className="text-blue hover:underline ">
                  Get one here
                </Link>
              </p>
              <div className=" w-full   ">
                <hr className="  my-3 w-full border" />

                <button
                  onClick={() => openSignupUrl()}
                  className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 font-bold text-white"
                >
                  <FcGoogle className="mr-2 text-3xl" />
                  Continue With Google
                </button>
              </div>

              <div>
                <span className="absolute right-1 top-1">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="1.39737"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 1.39737 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 1.39737 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 13.6943 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 13.6943 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 25.9911 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 25.9911 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 38.288 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 38.288 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 1.39737 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 13.6943 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 25.9911 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 38.288 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 1.39737 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 13.6943 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 25.9911 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 38.288 14.0086)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
                <span className="absolute bottom-1 left-1">
                  <svg
                    width="29"
                    height="40"
                    viewBox="0 0 29 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="2.288"
                      cy="25.9912"
                      r="1.39737"
                      transform="rotate(-90 2.288 25.9912)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 14.5849 25.9911)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 26.7216 25.9911)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="13.6944"
                      r="1.39737"
                      transform="rotate(-90 2.288 13.6944)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 14.5849 13.6943)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 26.7216 13.6943)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="38.0087"
                      r="1.39737"
                      transform="rotate(-90 2.288 38.0087)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="1.39739"
                      r="1.39737"
                      transform="rotate(-90 2.288 1.39739)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 14.5849 38.0089)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 26.7216 38.0089)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 14.5849 1.39761)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 26.7216 1.39761)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
