'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import {
  VerifyEmail,
  VerifyEmailDocument,
  VerifyEmailInput,
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from 'src/gql/graphql';
import { useEffect, useRef, Suspense } from 'react';
import { MdMarkEmailRead, MdError, MdEmail } from 'react-icons/md';
import Link from 'next/link';
import { useToastStore } from 'src/store/toastStore';
import { enqueueSnackbar } from 'notistack';

function VerifyUserEmailInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryVerification = useGraphqlClientRequest<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VerifyEmail.loc?.source.body!);
  const {
    mutate: verifyUser,
    status,
    error,
  } = useMutation({
    mutationFn: queryVerification,
    onSuccess: data => {
      if (data?.verifyEmail) {
        enqueueSnackbar('Email verified successfully!', { variant: 'success' });
        router.push('/app/my-profile');
      }
    },
  });
  const hasTriggered = useRef(false);

  useEffect(() => {
    const token = searchParams.get('token') as string;
    if (!token || hasTriggered.current) return;

    hasTriggered.current = true;
    verifyUser({ token: { token } as VerifyEmailInput });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md">
          {/* Card header with breadcrumbs */}
          <div className="mb-4">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link href="/" className="text-primary hover:text-primary/80">
                    Home
                  </Link>
                </li>
                <li className="text-gray-500">Email Verification</li>
              </ul>
            </div>
          </div>

          {/* Main verification card */}
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="p-6 sm:p-8">
              <div className="text-center">
                {status === 'pending' && (
                  <>
                    <div className="mb-4 flex justify-center">
                      <MdEmail className="animate-bounce text-6xl text-primary" />
                    </div>
                    <h2 className="mb-4 text-2xl font-semibold text-primary">
                      Verifying Your Email
                    </h2>
                    <div className="mb-4 flex justify-center">
                      <div className="loading loading-spinner loading-lg text-primary"></div>
                    </div>
                    <p className="text-gray-600">
                      Please wait while we verify your email address...
                    </p>
                  </>
                )}

                {error && (
                  <>
                    <div className="mb-4 flex justify-center">
                      <MdError className="text-6xl text-error" />
                    </div>
                    <h2 className="mb-4 text-2xl font-semibold text-error">Verification Failed</h2>
                    <p className="mb-4 text-gray-600">We couldn not verify your email address.</p>
                    <div className="mb-4 rounded-lg bg-error/10 p-4">
                      <p className="text-error">{error.message}</p>
                    </div>
                    <Link href="/signup" className="btn btn-primary">
                      Try Signing Up Again
                    </Link>
                  </>
                )}

                {status === 'success' && (
                  <>
                    <div className="mb-4 flex justify-center">
                      <MdMarkEmailRead className="animate-bounce text-6xl text-success" />
                    </div>
                    <h2 className="mb-4 text-2xl font-semibold text-success">Email Verified!</h2>
                    <p className="mb-4 text-gray-600">Your email has been successfully verified.</p>
                    <p className="text-sm text-gray-500">Redirecting you to homepage...</p>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 px-6 py-4">
              <p className="text-center text-sm text-gray-600">
                Need help?{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyUserEmail() {
  return (
    <Suspense>
      <VerifyUserEmailInner />
    </Suspense>
  );
}
