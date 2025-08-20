import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCamera, FaEdit } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  GenderType,
  GetUserById,
  GetUserByIdQuery,
  GetUserByIdQueryVariables,
  LogOut,
  LogOutMutation,
  LogOutMutationVariables,
  UpdateUser,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserType,
} from 'src/gql/graphql';
import LogoutIcon from 'src/components/icons/LogOut';
import { useUserStore } from 'src/store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Modal } from 'src/components/Modal';
import TextInput from 'src/features/react-hook-form/TextField';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import { useForm } from 'react-hook-form';
import DatePicker from 'src/features/react-hook-form/DatePicker';
import { enqueueSnackbar } from 'notistack';
import { uploadImage } from 'src/utils/uploadImage';

export const OwnProfile = (props: { userType: string }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [ loading, setLoading ] = useState(false);
  const mutateLogOutRequest = useGraphqlClientRequest<LogOutMutation, LogOutMutationVariables>(
    LogOut.loc?.source.body!,
  );
  const { mutateAsync } = useMutation({ mutationFn: mutateLogOutRequest });
  const mutateUpdateUser = useGraphqlClientRequest<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUser.loc?.source.body!,
  );
  const { mutateAsync: updateUser } = useMutation({ mutationFn: mutateUpdateUser });
  const [ openPersonalModal, setOpenPersonalModal ] = useState(false);
  const [ openProfilePictureModal, setOpenProfilePictureModal ] = useState(false);

  // Fetch user profile by userId
  const queryUser = useGraphqlClientRequest<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserById.loc?.source.body!,
  );
  const fetchUser = async () => {
    const res = await queryUser({ id: Number(user.userId) });
    return res.getUserById;
  };
  const { data: userData } = useQuery({
    queryKey: [ 'getUserById' ],
    queryFn: fetchUser,
    enabled: !!user.userId && user.userId !== null,
  });

  // Form for personal details
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: userData?.data?.fullName || '',
      city: '',
      altPhoneNumber: userData?.data?.altPhoneNumber || '',
      phoneNumber: userData?.data?.phoneNumber || '',
      gender: userData?.data?.gender || '',
      dateOfBirth: userData?.data?.dateOfBirth || '',
    },
  });

  const {
    control: controlProfilePicture,
    register: registerProfilePicture,
    handleSubmit: handleSubmitProfilePicture,
    formState: { errors: errorsProfilePicture },
    reset: resetProfilePicture,
  } = useForm({
    defaultValues: {
      profilePicture: '',
    },
  });

  // Update form values when userData changes
  useEffect(() => {
    if (userData?.data) {
      reset({
        fullName: userData.data.fullName || '',
        city: '',
        altPhoneNumber: userData.data.altPhoneNumber || '',
        phoneNumber: userData.data.phoneNumber || '',
        gender: userData.data.gender || '',
        dateOfBirth: userData.data.dateOfBirth || '',
      });
    }
  }, [ userData, reset, openPersonalModal ]);

  const genderOptions = [
    { label: 'Boys', value: GenderType.Boys },
    { label: 'Girls', value: GenderType.Girls },
    { label: 'Others', value: GenderType.Others },
  ];

  const onSubmitPersonal = async (data: any) => {
    try {
      const res = await updateUser({
        input: {
          ...data,
          id: user.userId,
        },
      });
      if (res?.updateUser?.data?.id) {
        enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
        queryClient.invalidateQueries({ queryKey: [ 'getUserById' ] });
      } else {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    } finally {
      setOpenPersonalModal(false);
    }
  };

  const handleLogout = () => {
    mutateAsync({}).then(res => {
      if (res?.logout?.success) {
        router.push('/login');
      }
    });
  };

  const [ imageUrl, setImageUrl ] = useState(userData?.data?.profilePicture || '');
  const onSubmitProfilePicture = async (data: any) => {
    setLoading(true);
    const response = await uploadImage(data.profilePicture[ 0 ]);
    if (!response) {
      enqueueSnackbar('Something went wrong during upload!', { variant: 'error' });
      setLoading(false);
      return;
    }

    setImageUrl(response);
    const imageUploaded = await updateUser({
      input: {
        id: Number(user.userId),
        profilePicture: response,
      },
    });
    if (imageUploaded?.updateUser?.data?.id) {
      enqueueSnackbar('Profile picture updated successfully!', { variant: 'success' });
      setLoading(false);
      setOpenProfilePictureModal(false);
    } else {
      enqueueSnackbar('Something went wrong during upload!', { variant: 'error' });
      setLoading(false);
      setOpenProfilePictureModal(false);
    }
  };
  const personalDetails = [
    { label: "Name", value: userData?.data?.fullName },
    { label: "Email", value: userData?.data?.email },
    { label: "City", value: "" },
    { label: "Phone Number", value: userData?.data?.phoneNumber ?? "N/A" },
    { label: "Alternative Phone Number", value: userData?.data?.altPhoneNumber ?? "N/A" },
    { label: "Gender", value: userData?.data?.gender ?? "N/A" },
    { label: "Date of Birth", value: userData?.data?.dateOfBirth ?? "N/A" },
  ];

  const verificationStatus = [
    { label: "Verified User", show: userData?.data?.isVerified, className: "text-white bg-green" },
    { label: "Not Verified User", show: !userData?.data?.isVerified, className: "text-white bg-red" },
  ];

  return (
    <div>
      <div className=" min-h-[calc(100vh-400px)] w-full bg-base-100 p-4 rounded-box">
        <div className=" mb-4 flex flex-col gap-5 md:flex-row">
          <div className="flex w-[100%] md:w-[50%] flex-col gap-2 items-center justify-between">
            <div className="group avatar placeholder flex justify-center items-center md:flex-none relative h-[100px] w-[100px] md:w-[250px] md:h-[250px] transition-all duration-300 ease-in-out hover:cursor-pointer lg:h-[310px] lg:w-[310px]">
              {userData?.data?.profilePicture || imageUrl ? (
                <Image
                  className=" rounded-full cursor-auto border border-black"
                  src={userData?.data?.profilePicture || imageUrl || ''}
                  alt="user avatar"
                  fill
                />
              ) : (
                <div className="h-full w-full cursor-auto rounded-full bg-neutral text-neutral-content">
                  <span className="text-[50px]">{userData?.data?.fullName?.charAt(0)}</span>
                </div>
              )}
              <button
                className={`absolute bottom-1 right-0  rounded-full p-1 text-[21px] ${userData?.data?.profilePicture || imageUrl ? 'text-black' : 'text-primary'} lg:bottom-[5px] lg:right-[24px]`}
                onClick={() => setOpenProfilePictureModal(true)}>
                <FaCamera />
              </button>
            </div>
          </div>
          <div className="flex-grow ">
            <div className='flex flex-col sm:flex-col-reverse gap-2'>
              <div className='flex flex-col sm:flex-row justify-between items-center mt-3 gap-2'>
                <div className='flex  gap-2'>
                <div className='flex  justify-center items-center'>
                  {
                    verificationStatus.map((status, index) => (
                      <div key={index} className={`rounded-md p-1 px-3  ${status.show ? "block" : "hidden"} ${status.className}`}>
                        <span className='text-white'>{status.label}</span>
                      </div>
                    ))
                  }
                </div>
                <div className='flex gap-2 items-center p-1 px-3 rounded-md bg-primary text-white'>
                  <span>Hostel Owner</span>
                </div>
                </div>
                <div className='flex justify-center w-full sm:w-fit gap-2 items-center p-1 px-3 rounded-md bg-slate-50 cursor-pointer' onClick={() => setOpenPersonalModal(true)}>
                  <FaEdit />
                  <span>Edit Profile</span>
                </div>
              </div>
              <div>
              {
                personalDetails.map((detail, index) => (
                  <div key={index} className='flex flex-col sm:flex-row justify-between border-b border-gray-300 p-2'>
                    <span className='text-gray-700 font-medium'>{detail.label}</span>
                    <span className=" text-gray-700 text-base font-bold break-words">{detail.value}</span>
                  </div>
                ))
                }
                </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {true&& (
          <div className=" w-min cursor-pointer  md:fixed bottom-10 mt-10" onClick={handleLogout}>
            <span className=" relative text-[25px] text-primary flex ">
              <b className='text-red-500 text-xl'>Logout</b><LogoutIcon />
            </span>
          </div>
        )}
      </div>
      <Modal
        open={openPersonalModal}
        handleClose={() => setOpenPersonalModal(false)}
        onSave={handleSubmit(onSubmitPersonal)}
        title="Edit Personal Details"
        actionLabel="Save">
        <form className="space-y-4">
          <TextInput
            name="fullName"
            control={control}
            label="Full Name"
            required
            error={!!errors.fullName}
            helpertext={errors.fullName ? 'Full name is required' : ''}
            type="text"
            customType="name"
            minLength={0}
            maxLength={50}
          />
          <TextInput
            name="city"
            type="text"
            control={control}
            label="City"
            customType="name"
            minLength={0}
            maxLength={50}
            required
            error={!!errors.city}
            helpertext={errors.city ? 'City is required' : ''}
          />
          <TextInput
            name="phoneNumber"
            control={control}
            label="Phone Number"
            required
            error={!!errors.phoneNumber}
            helpertext={errors.phoneNumber?.message}
            type="tel"
            customType="tel"
          />
          <TextInput
            name="altPhoneNumber"
            control={control}
            label="Alternative Phone Number"
            error={!!errors.altPhoneNumber}
            helpertext={errors.altPhoneNumber?.message}
            type="tel"
            customType="tel"
            pattern="\d{10}"
          />
          <ReactSelect
            name="gender"
            control={control}
            label="Gender"
            options={genderOptions}
            required
            error={!!errors.gender}
            helperText={errors.gender ? 'Gender is required' : ''}
          />
          <DatePicker name="dateOfBirth" control={control} label="Date of Birth" />
        </form>
      </Modal>
      <Modal
        open={openProfilePictureModal}
        handleClose={() => setOpenProfilePictureModal(false)}
        title="Edit Profile Picture"
        actionLabel="Save"
        onSave={handleSubmitProfilePicture(onSubmitProfilePicture)}>
        <form>
          {loading ? (
            <div>Uploading...</div>
          ) : (
            <input type="file" {...registerProfilePicture('profilePicture')} accept="image/*" />
          )}
        </form>
      </Modal>
    </div>
  );
};
