'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';
import { FcGoogle } from 'react-icons/fc';

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
import { FullLogo } from 'src/features/Logo/FullLogoWithText';
import { Logo } from 'src/features/Logo';
import Image from 'next/image';

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
        router.push('/app');
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

  const signupFeatures = [
    {
      title: 'Manage Bookings',
    }, {
      title: 'Track Customers',
    }, {
      title: 'Digital Marketing',
    }, {
      title: 'Analytics Dashboard',
    }
  ]

  return (
    <section className="flex min-h-[100vh]  flex-col justify-center bg-gray-100 md:p-5 p-2 align-middle">
      <div className="container mx-auto ">

        <div className="flex flex-wrap ">
          <div className="flex flex-col-reverse md:flex-row w-[90vw] md:w-[70vw] mx-auto items-center justify-center ">
            <div className="md:w-[50%] w-[100%] h-[100%] text-center text-2xl font-bold bg-white p-5 rounded-lg rounded-r-none">
              <div>
                <h3 className='text-2xl lg:text-4xl font-bold text-center'>Welcome to Hostel Admin.</h3>
                <div className='flex items-center justify-center mt-4'>
                <Image
                  src="/hero.png"
                  alt="Hostel png"
                  width={270}
                  height={270}
                />
                </div>
                <p className='text-gray-600 mt-12 md:text-lg text-base'>
                  <strong className='text-primary'>Hostel Admin</strong> is a management platform for hostel owners to 
                </p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 ml-8 gap-0 mt-2 text-sm'>
                {
                  signupFeatures.map((feature, index) => (
                    <div key={index} className='p-3 bg-gray-50  text-base text-gray-700 rounded-lg text-left'>
                      <span className='text-primary  font-semibold'>✓</span> {feature.title}
                    </div>
                  ))
                }
                  </div>
              <div className='mt-8 leading-tight'>
                <p className='text-gray-500 lg:text-base text-sm'>
                  Create an account, add your hostel details, and get listed on our platform.
                </p>
              </div>
            </div>
            <div className="md:w-[50%] w-[100%] h-[100%] relative md:border-l border-primary/50 rounded-l-none overflow-hidden rounded-lg bg-white px-5 py-[1rem] text-center sm:px-[1rem] md:px-[3rem]">
            <div className="relative  mb-5 flex items-start md:items-center  gap-1 md:-ml-4">
                <Logo />
                <div>
                  <FullLogo />
                </div>
              </div>
              <div>
                <p className=" text-error">{error ?? error}</p>
              </div>
              <form className="bg-white text-left " onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full py-3 ">
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
                    className={`${loading || !isValid ? 'cursor-not-allowed opacity-30' : 'opacity-100'
                      } w-full rounded-md bg-primary px-4 py-2  font-bold   `}
                  />
                </div>
              </form>

              <p className="text-body-color text-base">
                <span className="pr-0.5">Already a member?</span>
                <Link href="/login" className="ml-1 text-blue hover:underline">
                  Log In
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
}
