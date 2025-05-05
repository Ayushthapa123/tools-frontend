"use client"
import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest"
import { VerifyEmail, VerifyEmailDocument, VerifyEmailInput, VerifyEmailMutation, VerifyEmailMutationVariables } from "src/gql/graphql"
import { useEffect, useRef } from "react"
import { MdMarkEmailRead, MdError, MdEmail } from "react-icons/md"
import Link from "next/link"

export default function VerifyUserEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryVerification = useGraphqlClientRequest<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmail.loc?.source.body!)
  const { mutate: verifyUser, status, error } = useMutation({
    mutationFn: queryVerification,
    onSuccess: (data) => {
      if (data?.verifyEmail) {
        console.log("verified")
        router.push('/');
      }
    }
  })

  const hasTriggered = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token") as string;
    if (!token || hasTriggered.current) return;

    hasTriggered.current = true;
    verifyUser({ token: { token } as VerifyEmailInput });
  }, [  ]);


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Card header with breadcrumbs */}
          <div className="mb-4">
            <div className="breadcrumbs text-sm">
              <ul>
                <li><Link href="/" className="text-primary hover:text-primary/80">Home</Link></li>
                <li className="text-gray-500">Email Verification</li>
              </ul>
            </div>
          </div>

          {/* Main verification card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="text-center">
                {status === 'pending' && (
                  <>
                    <div className="flex justify-center mb-4">
                      <MdEmail className="text-6xl text-primary animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-semibold text-primary mb-4">Verifying Your Email</h2>
                    <div className="flex justify-center mb-4">
                      <div className="loading loading-spinner loading-lg text-primary"></div>
                    </div>
                    <p className="text-gray-600">Please wait while we verify your email address...</p>
                  </>
                )}

                {error && (
                  <>
                    <div className="flex justify-center mb-4">
                      <MdError className="text-6xl text-error" />
                    </div>
                    <h2 className="text-2xl font-semibold text-error mb-4">Verification Failed</h2>
                    <p className="text-gray-600 mb-4">We couldn not verify your email address.</p>
                    <div className="bg-error/10 rounded-lg p-4 mb-4">
                      <p className="text-error">{error.message}</p>
                    </div>
                    <Link
                      href="/signup"
                      className="btn btn-primary">
                      Try Signing Up Again
                    </Link>
                  </>
                )}

                {status === 'success' && (
                  <>
                    <div className="flex justify-center mb-4">
                      <MdMarkEmailRead className="text-6xl text-success animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-semibold text-success mb-4">Email Verified!</h2>
                    <p className="text-gray-600 mb-4">Your email has been successfully verified.</p>
                    <p className="text-gray-500 text-sm">Redirecting you to homepage...</p>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <p className="text-center text-sm text-gray-600">
                Need help? <Link href="/contact" className="text-primary hover:underline">Contact Support</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 