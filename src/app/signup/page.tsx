'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';

import {
  GetGoogleOauthUrl,
  GetGoogleOauthUrlQuery,
  GetGoogleOauthUrlQueryVariables,
  SignupUser,
  SignupUserMutation,
  SignupUserMutationVariables,
  UserType,
} from 'src/gql/graphql';

import { useSearchParams } from 'next/navigation';
import Button from 'src/components/Button';
import { Logo } from 'src/features/Logo';
import Image from 'next/image';
import GoogleIcon from 'src/components/icons/Google';

export default function Home() {
  return (
    <div>
      <Suspense>
        <SignUp />
      </Suspense>
    </div>
  );
}

type signupData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
};
function SignUp() {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');

  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<signupData>({
    defaultValues: {
      fullName: '',
      email: email ?? '',
      password: '',
      confirmPassword: '',
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
    queryKey: [ 'getGoogleAuthUrl' ],
    queryFn: fetchData,
  });

  const mutateSignupRequest = useGraphqlClientRequest<
    SignupUserMutation,
    SignupUserMutationVariables
  >(SignupUser.loc?.source.body!);

  const { mutateAsync: signUp } = useMutation({ mutationFn: mutateSignupRequest });

  const onSubmit = async (data: signupData) => {
    setLoading(true);
    signUp({
      input: {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        userType: UserType.HostelOwner,
        // phoneNumber: data.phoneNumber,
      },
    }).then(res => {
      if (res?.signupUser?.id) {
        // localStorage.setItem('refreshToken', res.signupUser.token.refreshToken);
        router.push('/app/hostel-info');
      } else {
        // @ts-ignore
        setError(res?.errors?.[ 0 ]?.message ?? 'Failed to signup!');
      }
    });

    // Need help in the getting the message in the result

    setLoading(false);
  };
  const checkPasswordValidity = () => {
    const password = getValues().password;
    const confirmPassword = getValues().confirmPassword;

    if (password.length < 8) {
      return false;
    } else if (confirmPassword != password) {
      return false;
    } else {
      return true;
    }
  };

  watch('password');
  watch('confirmPassword');

  const isValid = checkPasswordValidity();

  useEffect(() => {
    setError('');
  }, []);

  const openSignupUrl = () => {
    // @ts-ignore
    if (signupUrl) window.location = signupUrl;
  };

  const signUpFeatures = [
    {
      title: 'Manage Guests',
      icon: '👥',
    },
    {
      title: 'Attract Customers',
      icon: '🎯',
    },
    {
      title: 'Digital Marketing',
      icon: '📱',
    },
    {
      title: 'Upload Room Rates',
      icon: '🏠',
    },
  ];

  return (
    <section className="flex min-h-[100vh]  flex-col justify-center  md:p-5 p-1 align-middle">
      <div className="container md:mx-auto ">

        <div className="flex flex-wrap ">
          <div className="flex flex-col-reverse md:flex-row-reverse w-[90vw] md:w-[90vw] mx-auto items-center justify-center ">
            <div className="relative z-10 md:w-[50%] w-[100%] h-[100%] text-center text-2xl font-bold  p-5 rounded-r-2xl">
              <div>
                {/* <h3 className='text-2xl lg:text-lg font-medium text-center'>Welcome to signup !</h3> */}
                <div className='flex items-center justify-center mt-4'>
                  <Image
                    src="/hero.png"
                    alt="Hostel png"
                    width={450}
                    height={450}
                  />
                </div>
                <p className='text-gray-700 mt-12 font-normal md:text-lg text-base'>
                  <strong className='text-primary'>Hostel Admin</strong> is a management platform for hostel owners to
                </p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 md:w-[70%] md:mx-auto gap-0 mt-2 text-sm'>
                {
                  signUpFeatures.map((feature) => (
                    <div key={feature.title} className='p-2 text-base text-gray-600 font-normal rounded-lg text-left break-words'>
                      <span className=''>{feature.icon}</span> {feature.title}
                    </div>
                  ))
                }

              </div>
              <div className='mt-8 leading-tight'>
                <p className='text-gray-400 lg:text-base text-sm'>
                  Create an account, add your hostel details, and get listed on our platform.
                </p>
              </div>
              <span className="absolute -z-10 overflow-hidden right-3 top-4">
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
            </div>
            <div className="md:w-[50%] w-[100%] h-[100%] relative rounded-l-2xl overflow-hidden bg-base-100 px-3 py-[1rem] text-center sm:px-[1rem] md:px-[3rem]">
              <div className="relative md:w-[70%] w-full mx-auto mb-8 flex items-start md:items-center justify-center  gap-1">
                <div className='flex items-end gap-3 justify-center opacity-70'>
                  <h1 className='mb-0'>Signup with </h1>
                  <div className=''>
                    <Logo />
                  </div>
                </div>
                {/* <div>
                  <FullLogo />
                </div> */}
              </div>
              <div className="md:w-[80%] mx-auto mb-4  ">

                <Button
                  variant="teal"
                  onClick={() => openSignupUrl()}
                  label="Continue With Google"
                  startAdornment={<GoogleIcon className="text-3xl " />}
                  className="bg-primary"
                  height="lg"
                />
              </div>
              <p className="text-body-color text-base">
                <span className="pr-0.5">Already a member?</span>
                <Link href="/login" className="ml-1 text-blue hover:underline">
                  Log In
                </Link>
              </p>
              <hr className="  my-3 w-full border" />
              <div>
                <p className=" text-error">{error ?? error}</p>
              </div>
              <form className=" md:w-[80%] mx-auto text-left " onSubmit={handleSubmit(onSubmit)}>
                <div className=" py-3 ">
                  <div className="">
                    <TextInput
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      control={control}
                      label="Full Name"
                      required
                      helpertext={errors.email?.type === 'required' ? 'Name Is Required' : ''}
                      error={!!errors.email}
                      customType="name"
                      tabIndex={1}
                      autoFocus
                    />
                  </div>
                  <div className="mt-5 ">
                    <TextInput
                      name="email"
                      type="email"
                      customType="email"
                      placeholder="example@email.co.uk"
                      control={control}
                      label="Email Address"
                      // endAdornment={<MailOutlineOutlinedIcon />}
                      required
                      helpertext={errors.email?.type === 'required' ? 'Email Is Required' : ''}
                      error={!!errors.email}
                    />
                  </div>
                  {/* <div className="mt-5 ">
                    <TextInput
                      name="phoneNumber"
                      type="tel"
                      placeholder="Enter Phone Number"
                      control={control}
                      label="Phone Number"
                      helpertext={
                        errors.phoneNumber?.type === 'required' ? 'Phone Number Is Required' : ''
                      }
                      error={!!errors.phoneNumber}
                    />
                  </div> */}
                  <div className="mt-5 ">
                    <TextInput
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      control={control}
                      label="Password"
                      // endAdornment={<MailOutlineOutlinedIcon />}
                      required
                      helpertext={
                        errors.password?.type === 'required' ? 'Password Is Required' : ''
                      }
                      error={!!errors.password}
                    />
                    {getValues('password') && getValues('password').length < 8 && (
                      <span className=" text-[11px] text-gray-500">
                        password must be at least 8 character long
                      </span>
                    )}
                  </div>

                  <div className="mt-5 ">
                    <TextInput
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      control={control}
                      label="Confirm Password"
                      // endAdornment={<MailOutlineOutlinedIcon />}
                      required
                      helpertext={
                        errors.confirmPassword?.type === 'required' ? 'Password Is Required' : ''
                      }
                      error={!!errors.confirmPassword}
                    />
                  </div>
                </div>

                <div className="mb-5 flex justify-center">
                  <Button
                    label={'Sign up'}
                    disabled={loading || !isValid}
                    className={`${loading || !isValid ? 'cursor-not-allowed opacity-100' : 'opacity-100'
                      } w-full rounded-md bg-primary px-4 py-2  font-bold   `}
                  />
                </div>
              </form>






              <div>
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
}
