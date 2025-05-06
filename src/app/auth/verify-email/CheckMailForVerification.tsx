import { FullLogo } from 'src/features/Logo/FullLogoWithText';
import Button from 'src/components/Button';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';
import { Logo } from 'src/features/Logo';
import { LogOut, ResendVerificationMail, ResendVerificationMailMutation, ResendVerificationMailMutationVariables } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { LogOutMutation } from 'src/gql/graphql';
import { LogOutMutationVariables } from 'src/gql/graphql';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useUserStore } from 'src/store/userStore';
import { useToastStore } from 'src/store/toastStore';

export const CheckMailForVerification = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { setShowToast, setMessage, setRole } = useToastStore();
  const mutateLogOutRequest = useGraphqlClientRequest<LogOutMutation, LogOutMutationVariables>(
    LogOut.loc?.source.body!,
  );
  const { mutateAsync } = useMutation({ mutationFn: mutateLogOutRequest });
  const mutateResendVerificationMail = useGraphqlClientRequest<ResendVerificationMailMutation, ResendVerificationMailMutationVariables>(
    ResendVerificationMail.loc?.source.body!,
  );
  const { mutateAsync: resendVerificationMail } = useMutation({
    mutationFn: mutateResendVerificationMail,
  });

  const handleLogout = () => {
    mutateAsync({}).then(res => {
      if (res?.logout?.success) {
        router.push('/');
      }
    });
  };

  const handleResendEmail = async () => {
    if (!user.userId) {
      setShowToast(true);
      setMessage('User ID not found. Please log in again.');
      setRole('error');
      return;
    }
    try {
      const res = await resendVerificationMail({ id: user.userId });
      console.log(res);
      if (res?.resendVerificationMail) {
        setShowToast(true);
        setMessage('Verification email resent successfully!');
        setRole('success');
      } else {
        setShowToast(true);
        setMessage('Failed to resend verification email.');
        setRole('error');
      }
    } catch (err: any) {
      setShowToast(true);
      setMessage(err?.message || 'An error occurred while resending email.');
      setRole('error');
    }
  };

  return (
    <section className="flex min-h-screen flex-col justify-center bg-gray-100 p-5 align-middle lg:py-[3rem]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[450px] rounded-lg bg-white px-[1rem] py-[1.5rem] text-center shadow-md sm:px-12 md:px-[2.5rem]">
              <div className="relative mb-5 flex justify-center">
                <div className='flex justify-center'>
                <Logo />
                <FullLogo />
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <MdEmail className="text-6xl text-primary animate-bounce" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We have sent a verification link to your email address. Please check your inbox and click the link to verify your account. You must verify your email before you can access the site.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Didn&apos;t receive the email? Check your spam folder  
                <span className="text-primary font-medium cursor-pointer hover:underline" onClick={() => handleResendEmail()}> Resend Email</span>.
              </p>
              <div>
                <Button label={"Log out"} className='w-full text-primary ' onClick={() => handleLogout()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};  