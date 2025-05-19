'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import TextInput from 'src/features/react-hook-form/TextField';
import { ChangePassword, ChangePasswordMutation, ChangePasswordMutationVariables } from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { enqueueSnackbar } from 'notistack';

type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordPage({ userId }: { userId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Watch password fields for validation
  watch('newPassword');
  watch('confirmPassword');

  const mutateChangePassword = useGraphqlClientRequest<ChangePasswordMutation, ChangePasswordMutationVariables>(
    ChangePassword.loc?.source.body!
  );  

  const { mutateAsync: changePassword } = useMutation({
    mutationFn: mutateChangePassword,
  });

  const checkPasswordValidity = () => {
    const newPassword = getValues().newPassword;
    const confirmPassword = getValues().confirmPassword;

    if (newPassword.length < 8) {
      return false;
    } else if (confirmPassword !== newPassword) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!checkPasswordValidity()) {
      setError('Please check your password requirements');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await changePassword({
        userId: userId,
        input: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      })

      if (response?.changePassword) {
        setSuccess(true);
        setError('');
        enqueueSnackbar('Password changed successfully!',{variant:'success'})
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else{
        setError('Failed to change password');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex w-full flex-col justify-center rounded-xl p-5 align-middle">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[550px] rounded-lg bg-white px-8 py-8 border">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Change Password</h2>
              
              {error && <p className="mb-4 text-error">{error}</p>}
              {success && (
                <p className="mb-4 text-green-600">Password changed successfully!</p>
              )}

              <form className="bg-white text-left" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full space-y-4">
                  <div>
                    <TextInput
                      name="currentPassword"
                      type="password"
                      placeholder="Current Password"
                      control={control}
                      label="Current Password"
                      required
                      helpertext={
                        errors.currentPassword?.type === 'required'
                          ? 'Current password is required'
                          : ''
                      }
                      error={!!errors.currentPassword}
                    />
                  </div>

                  <div>
                    <TextInput
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      control={control}
                      label="New Password"
                      required
                      helpertext={
                        errors.newPassword?.message
                      }
                      error={!!errors.newPassword}
                    
                    />
                  </div>

                  <div>
                    <TextInput
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      control={control}
                      label="Confirm New Password"
                      required
                      helpertext={
                        errors.confirmPassword?.type === 'required'
                          ? 'Please confirm your new password'
                          : getValues().newPassword !== getValues().confirmPassword
                          ? 'Passwords do not match'
                          : ''
                      }
                      error={!!errors.confirmPassword || 
                        (getValues().newPassword !== getValues().confirmPassword && 
                         getValues().confirmPassword !== '')}
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      label="Change Password"
                      type="submit"
                      loading={loading}
                      className="w-full md:w-auto"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}