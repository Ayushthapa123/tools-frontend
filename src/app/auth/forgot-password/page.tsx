'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import { FullLogo } from 'src/features/Logo/FullLogoWithText';
import { Logo } from 'src/features/Logo';
import TextInput from 'src/features/react-hook-form/TextField';
import { LogInUser, LogInUserMutation, LogInUserMutationVariables, ResetPasswordMutationVariables } from 'src/gql/graphql';
import { ResetPassword } from 'src/gql/graphql';
import { ResetPasswordMutation } from 'src/gql/graphql';

type ResetPasswordData = {
  password: string;
  confirmPassword: string;
};

function ForgotPasswordByTokenInner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const mutateLoginRequest = useGraphqlClientRequest<LogInUserMutation, LogInUserMutationVariables>(
      LogInUser.loc?.source.body!,
    );
  
    const { mutateAsync:LoginUser } = useMutation({ mutationFn: mutateLoginRequest });

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  watch('password');
  watch('confirmPassword');

  const mutateResetPassword = useGraphqlClientRequest<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPassword.loc?.source.body!
  );

  const { mutateAsync: resetPassword } = useMutation({
    mutationFn: mutateResetPassword,
  });

  const checkPasswordValidity = () => {
    const password = getValues().password;
    const confirmPassword = getValues().confirmPassword;

    if (password.length < 8) {
      return false;
    } else if (confirmPassword !== password) {
      return false;
    } else {
      return true;
    }
  };

  const isValid = checkPasswordValidity();

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      setError('Invalid reset token');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await resetPassword({
        input: {
          password: data.password,
          token: token,
        },
      });

      if (response?.resetPassword?.id) {
        setSuccess(true);
        const login = await LoginUser({ input: { email: response?.resetPassword?.email, password: data?.password } });
        if (login?.loginUser?.id) {
          router.push("/")
        }
      } else {
        setError('Failed to reset password');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <section className="flex min-h-screen flex-col justify-center bg-gray-100 p-5 align-middle lg:py-[3rem]">
        <div className="container mx-auto">
          <div className="relative mx-auto max-w-[450px] rounded-lg bg-white px-[1rem] py-[1.5rem] text-center sm:px-12 md:px-[2.5rem]">
            <div className="text-error">Invalid reset token. Please request a new password reset.</div>
            <div className="mt-4">
              <Button
                label="Back to Login"
                onClick={() => router.push('/login')}
                className="bg-primary w-full"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Password Reset Successful</h2>
                  <p className="text-gray-600 mb-6">
                    Your password has been successfully reset. You can now log in with your new password.
                  </p>
                  <Button
                    label="Log In"
                    onClick={() => router.push('/login')}
                    className="bg-primary w-full"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-primary mb-6">Reset Password</h2>
                  <p className="text-gray-400 mb-8 w-full">
                    Please enter your new password below.
                  </p>

                  {error && <p className="text-error mb-4">{error}</p>}

                  <form className="bg-white text-left" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full">
                      <div className="mb-5">
                        <TextInput
                          name="password"
                          type="password"
                          placeholder="Enter New Password"
                          control={control}
                          label="New Password"
                          required
                          helpertext={errors.password?.type === 'required' ? 'Password Is Required' : ''}
                          error={!!errors.password}
                        />
                        {getValues('password') && getValues('password').length < 8 && (
                          <span className="text-[11px] text-gray-500">
                            Password must be at least 8 characters long
                          </span>
                        )}
                      </div>

                      <div className="mb-6">
                        <TextInput
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm New Password"
                          control={control}
                          label="Confirm Password"
                          required
                          helpertext={
                            errors.confirmPassword?.type === 'required'
                              ? 'Confirm Password Is Required'
                              : ''
                          }
                          error={!!errors.confirmPassword}
                        />
                        {getValues('password') &&
                          getValues('confirmPassword') &&
                          getValues('password') !== getValues('confirmPassword') && (
                            <span className="text-[11px] text-error">
                              Passwords do not match
                            </span>
                          )}
                      </div>

                      <div className="mb-6">
                        <Button
                          label="Reset Password"
                          disabled={loading || !isValid}
                          className={`${
                            loading || !isValid ? 'cursor-not-allowed opacity-30' : 'opacity-100'
                          } bg-primary w-full rounded-md px-4 py-2 font-bold`}
                        />
                      </div>
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

export default function ForgotPasswordByToken() {
  return (
    <Suspense>
      <ForgotPasswordByTokenInner />
    </Suspense>
  );
}
