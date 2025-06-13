import TextInput from 'src/features/react-hook-form/TextField';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import { HostelGuestData, CreateHostelGuestInput, Gender } from 'src/gql/graphql';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { enqueueSnackbar } from 'notistack';
import { useUserStore } from 'src/store/userStore';
import Button from 'src/components/Button';
import { useEffect, useState } from 'react';
import {
  CreateHostelGuest,
  CreateHostelGuestMutation,
  CreateHostelGuestMutationVariables,
  UpdateHostelGuest,
  UpdateHostelGuestMutation,
  UpdateHostelGuestMutationVariables,
} from 'src/gql/graphql';

interface GuestFormProps {
  guest?: HostelGuestData;
  isEdit?: boolean;
}

export const GuestCreateForm = ({ guest, isEdit = true }: GuestFormProps) => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(!isEdit);
  const [allowToFillForm, setAllowToFillForm] = useState(!isEdit);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateHostelGuestInput>({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: undefined,
      dateOfBirth: undefined,
      nationality: '',
      permanentAddress: '',
      religion: '',
      occupation: '',
      emergencyContact: '',
      notes: '',
      hostelId: Number(user.hostelId),
      roomId: undefined,
      checkinDate: undefined,
      checkoutDate: undefined,
    },
  });

  useEffect(() => {
    if (guest) {
      reset({
        fullName: guest.fullName,
        email: guest.email,
        phoneNumber: guest.phoneNumber || '',
        gender: guest.gender || undefined,
        dateOfBirth: guest.dateOfBirth,
        nationality: guest.nationality || '',
        permanentAddress: guest.permanentAddress || '',
        religion: guest.religion || '',
        occupation: guest.occupation || '',
        emergencyContact: guest.emergencyContact || '',
        notes: guest.notes || '',
        hostelId: guest.hostelId,
        roomId: guest.roomId,
        checkinDate: guest.checkinDate,
        checkoutDate: guest.checkoutDate,
      });
    }
  }, [reset, guest]);

  const mutateCreateGuest = useGraphqlClientRequest<CreateHostelGuestMutation, CreateHostelGuestMutationVariables>(
    CreateHostelGuest.loc?.source.body!,
  );

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateGuest });

  const mutateUpdateGuest = useGraphqlClientRequest<UpdateHostelGuestMutation, UpdateHostelGuestMutationVariables>(
    UpdateHostelGuest.loc?.source.body!,
  );

  const { mutateAsync: mutateUpdateGuestAsync } = useMutation({ mutationFn: mutateUpdateGuest });

  const onSubmit = async (data: CreateHostelGuestInput) => {
    const input = { ...data, hostelId: Number(user.hostelId) };
    if (!isEdit) {
      mutateAsync({ createHostelGuestInput: input, withWelcomeEmail: sendWelcomeEmail, allowEdit: allowToFillForm }).then(res => {
        if (res?.createHostelGuest?.data?.id) {
          enqueueSnackbar('Guest created successfully.', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getHostelGuests'] });
          router.push(`/app/hostel-guests/`);
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
        }
      });
    } else {
      mutateUpdateGuestAsync({ 
        updateHostelGuestInput: { 
          ...input, 
          id: Number(guest?.id),
        },
        withWelcomeEmail: sendWelcomeEmail,
        allowEdit: allowToFillForm,
      }).then(res => {
        if (res?.updateHostelGuest?.data?.id) {
          enqueueSnackbar('Guest updated successfully.', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getHostelGuests'] });
          router.push(`/app/hostel-guests/`);
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
        }
      });
    }
  };

  const genderOptions = [
    { label: 'Male', value: Gender.Boys },
    { label: 'Female', value: Gender.Girls },
    { label: 'Others', value: Gender.Others },
  ];

  const getErrorMessage = (error: any): string | undefined => {
    if (!error) return undefined;
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    if (error.type === 'required') return 'This field is required';
    return undefined;
  };

  const buttonText = isEdit ? 'Update' : 'Create';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-2">
          <TextInput
            name="fullName"
            type="text"
            placeholder="Full Name"
            control={control}
            label="Full Name"
            required
            helpertext={getErrorMessage(errors.fullName)}
            error={!!errors.fullName}
          />
        </div>

        <div className="mb-2">
          <TextInput
            name="email"
            type="email"
            placeholder="Email Address"
            control={control}
            label="Email Address"
            required
            helpertext={getErrorMessage(errors.email)}
            error={!!errors.email}
          />
        </div>

        {!isExpanded && (
          <div className="mb-2 md:col-span-2">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
              onClick={() => setIsExpanded(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Show more fields
            </button>
          </div>
        )}

        {isExpanded && (
          <>
            <div className="mb-2">
              <TextInput
                name="phoneNumber"
                placeholder="Phone Number"
                control={control}
                label="Phone Number"
                helpertext={getErrorMessage(errors.phoneNumber)}
                error={!!errors.phoneNumber}
              />
            </div>

            <div className="mb-2">
              <TextInput
                name="emergencyContact"
                placeholder="Emergency Contact"
                control={control}
                label="Emergency Contact"
                helpertext={getErrorMessage(errors.emergencyContact)}
                error={!!errors.emergencyContact}
              />
            </div>

            <div className="mb-2">
              <ReactSelect
                name="gender"
                placeholder="Gender"
                options={genderOptions}
                defaultValue={genderOptions[0]}
                control={control}
                label="Gender"
                error={!!errors.gender}
              />
            </div>

            <div className="mb-2">
              <TextInput
                name="dateOfBirth"
                type="date"
                placeholder="Date of Birth"
                control={control}
                label="Date of Birth"
                helpertext={getErrorMessage(errors.dateOfBirth)}
                error={!!errors.dateOfBirth}
              />
            </div>

            <div className="mb-2">
              <TextInput
                name="nationality"
                placeholder="Nationality"
                control={control}
                label="Nationality"
                helpertext={getErrorMessage(errors.nationality)}
                error={!!errors.nationality}
              />
            </div>

            <div className="mb-2">
              <TextInput
                name="religion"
                placeholder="Religion"
                control={control}
                label="Religion"
                helpertext={getErrorMessage(errors.religion)}
                error={!!errors.religion}
              />
            </div>

            <div className="mb-2">
              <TextInput
                name="occupation"
                placeholder="Occupation"
                control={control}
                label="Occupation"
                helpertext={getErrorMessage(errors.occupation)}
                error={!!errors.occupation}
              />
            </div>

            <div className="mb-2 md:col-span-2">
              <TextArea
                name="permanentAddress"
                placeholder="Permanent Address"
                control={control}
                label="Permanent Address"
                error={!!errors.permanentAddress}
                rows={1}
              />
            </div>

            <div className="mb-2 md:col-span-2">
              <TextArea
                name="notes"
                placeholder="Additional Notes"
                control={control}
                label="Additional Notes"
                error={!!errors.notes}
                rows={1}
              />
            </div>

            <div className="mb-2 md:col-span-2">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
                onClick={() => setIsExpanded(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Show less fields
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={allowToFillForm}
            onChange={(e) => setAllowToFillForm(e.target.checked)}
            className="form-checkbox h-4 w-4 text-primary"
          />
          <span>Allow to complete form</span>
        </label>
      </div>
      <div className="mt-4 mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={sendWelcomeEmail}
            onChange={(e) => setSendWelcomeEmail(e.target.checked)}
            className="form-checkbox h-4 w-4 text-primary"
          />
          <span>Send welcome email </span>
        </label>
      </div>
   

      <div className="flex justify-end">
        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="submit"
            className={`btn btn-primary w-min`}
            label={buttonText}
          />
        </div>
      </div>
    </form>
  );
};
