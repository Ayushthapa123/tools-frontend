'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';

import TextInput from 'src/features/react-hook-form/TextField';

import {
  GetGoogleOauthUrl,
  GetGoogleOauthUrlQuery,
  GetGoogleOauthUrlQueryVariables,
  LogInUser,
  LogInUserMutation,
  LogInUserMutationVariables,
} from 'src/gql/graphql';
import { useAccessTokenStore } from 'src/store/accessTokenStore';
import { useUserStore } from 'src/store/userStore';
import { regex } from 'src/utils/regex';
type loginData = {
  email: string;
  password: string;
};
const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const { setAccessToken, accessToken } = useAccessTokenStore();
  const { user } = useUserStore();

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
          if (res.loginUser.userType !== 'GUEST') {
            router.push('/app');
          } else {
            router.push('/');
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
    const emailRegex = regex.email;
    return emailRegex.test(email);
  };

  const isValid = checkPasswordValidity() && checkEmailValidity();

  useEffect(() => {
    //if refreshToken already present push it to the app
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken && user?.userType !== 'GUEST') {
      // router.push('/app');
    }
  }, [router, user]);

  const openSignupUrl = () => {
    // Redirects to signup URL if one is provided
    // @ts-ignore
    if (signupUrl) window.location = signupUrl;
  };

  return (
    <section className="flex  w-full flex-col justify-center bg-gray-100 p-5 align-middle  lg:py-[3rem]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className=" relative mx-auto max-w-[450px]  rounded-lg bg-white px-[1rem] py-[1.5rem] text-center sm:px-12 md:px-[2.5rem]">
              <p className=" text-error">{error ?? error}</p>

              <form className="bg-white text-left " onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full py-3 ">
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
                      tabIndex={1}
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

                <div className="mb-5 ">
                  <Button
                    variant="teal"
                    label="Log In"
                    disabled={loading || !isValid}
                    type="submit"
                    className={`${loading || !isValid ? 'cursor-not-allowed opacity-30' : ' opacity-100'}`}
                  />
                </div>
              </form>

              <div className="w-full ">
                <hr className="my-3 w-full border " />

                <Button
                  variant="teal"
                  onClick={() => openSignupUrl()}
                  label="Continue With Google"
                  startAdornment={<FcGoogle className="text-3xl " />}
                  className='bg-primary'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
