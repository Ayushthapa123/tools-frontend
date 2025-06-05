'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import { Logo } from 'src/features/Logo';
import { FullLogo } from 'src/features/Logo/FullLogoWithText';
import TextInput from 'src/features/react-hook-form/TextField';
import {
  ForgotPassword,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from 'src/gql/graphql';

type ForgotPasswordData = {
  email: string;
};

export default function ForgotUserPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    defaultValues: {
      email: '',
    },
  });
  const email = watch('email');

  const mutateForgotPassword = useGraphqlClientRequest<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPassword.loc?.source.body!);

  const { mutateAsync: forgotPassword } = useMutation({
    mutationFn: mutateForgotPassword,
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setLoading(true);
    setError('');
    try {
      const response = await forgotPassword({ email: data.email });
      if (response?.forgotPassword?.id) {
        setSuccess(true);
      } else {
        setError('Failed to process request');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col justify-center bg-gray-100 p-5 align-middle lg:py-[3rem]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[450px] rounded-lg bg-white px-[1rem] py-[1.5rem] text-center sm:px-12 md:px-[2.5rem]">
              <div className="relative mb-5 flex items-center gap-1 md:-ml-4">
                <Logo />
                <div>
                  <FullLogo />
                </div>
              </div>

              {success ? (
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-success/20 p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="mb-4 text-2xl font-semibold text-primary">Check Your Email</h2>
                  <p className="mb-6 text-gray-600">
                    Click the link in the email to reset your password.
                  </p>
                  <Button
                    label="Return to Login"
                    onClick={() => router.push('/login')}
                    className="w-full bg-primary"
                  />
                </div>
              ) : (
                <>
                  <h2 className="mb-6 text-2xl font-semibold text-primary">Forgot Password</h2>
                  <p className="mb-8 w-full text-gray-400">
                    Enter your email address and we will send you instructions to reset your
                    password.
                  </p>

                  {error && <p className="mb-4 text-error">{error}</p>}

                  <form className="bg-white text-left" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6 w-full">
                      <TextInput
                        name="email"
                        type="email"
                        placeholder="example@email.co.uk"
                        control={control}
                        label="Email Address"
                        required
                        helpertext={errors.email?.type === 'required' ? 'Email Is Required' : ''}
                        error={!!errors.email}
                      />
                    </div>

                    <div className="mb-6">
                      <Button
                        label="Continue"
                        disabled={loading || !email}
                        className={`${
                          loading ? 'cursor-not-allowed opacity-30' : 'opacity-100'
                        } w-full rounded-md bg-primary px-4 py-2 font-bold`}
                      />
                    </div>
                  </form>

                  <p className="text-base">
                    <span className="pr-0.5">Remember your password?</span>
                    <a href="/login" className="text-blue hover:underline">
                      Log In
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
