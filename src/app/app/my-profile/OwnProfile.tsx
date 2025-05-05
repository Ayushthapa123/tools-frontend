import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCamera, FaEdit } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { GetUserById, GetUserByIdQuery, GetUserByIdQueryVariables, LogOut, LogOutMutation, LogOutMutationVariables, UpdateUser, UpdateUserMutation, UpdateUserMutationVariables } from 'src/gql/graphql';
import LogoutIcon from 'src/components/icons/LogOut';
import { useUserStore } from 'src/store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Modal } from 'src/components/Modal';
import TextInput from 'src/features/react-hook-form/TextField';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import { useForm } from 'react-hook-form';
import DatePicker from 'src/features/react-hook-form/DatePicker';
import { useToastStore } from 'src/store/toastStore';

export const OwnProfile = (props: { userType: string }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const mutateLogOutRequest = useGraphqlClientRequest<LogOutMutation, LogOutMutationVariables>(
    LogOut.loc?.source.body!,
  );
  const mutateUpdateUser = useGraphqlClientRequest<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUser.loc?.source.body!
  );
  const { mutateAsync } = useMutation({ mutationFn: mutateLogOutRequest });
  const { mutateAsync: updateUser } = useMutation({ mutationFn: mutateUpdateUser });
  const { setShowToast, setMessage, setRole } = useToastStore();
  const [ openPersonalModal, setOpenPersonalModal ] = useState(false);
  const [ openProfilePictureModal, setOpenProfilePictureModal ] = useState(false);
  // Form for personal details
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      fullName: user.userName || '',
      city: '',
      altPhoneNumber: '',
      phoneNumber: '',
      gender: '',
      dateOfBirth: '',
    },
  });
  
  const { control: controlProfilePicture, register: registerProfilePicture, handleSubmit: handleSubmitProfilePicture, formState: { errors: errorsProfilePicture }, reset: resetProfilePicture } = useForm({
    defaultValues: {
      profilePicture: '',
    },
  });

  // Fetch user profile by userId
  const queryUser = useGraphqlClientRequest<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserById.loc?.source.body!);
  const fetchUser = async () => {
    const res = await queryUser({ id: Number(user.userId) });
    return res.getUserById;
  };
  const { data: userData } = useQuery({
    queryKey: [ 'getUser' ],
    queryFn: fetchUser,
    enabled: !!user.userId && user.userId !== null,
  });

  // Update form values when userData changes
  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData.fullName || '',
        city: userData.city || '',
        altPhoneNumber: userData.altPhoneNumber || '',
        phoneNumber: userData.phoneNumber || '',
        gender: userData.gender || '',
        dateOfBirth: userData.dateOfBirth || '',
      });
    }
  }, [ userData, reset ]);

  const genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
  ];

  const onSubmitPersonal = async (data: any) => {
    try {
      const res = await updateUser({
        input: {
          ...data,
          id: user.userId,
        }
      });
      if (res?.updateUser?.id) {
        setShowToast(true);
        setMessage('Profile updated successfully!');
        setRole('success');
      } else {
        setShowToast(true);
        setMessage('Something went wrong!');
        setRole('error');
      }
    } catch (err) {
      setShowToast(true);
      setMessage('Something went wrong!');
      setRole('error');
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

  const onSubmitProfilePicture = async (data: any) => {
    console.log('edit profile picture');
    console.log(data);
  }
  return (
    <div>
      <div className=" w-full mt-[100px] min-h-[calc(100vh-400px)]">
        <div className=" mb-4 flex gap-5 flex-col lg:flex-row">
          <div className='flex items-center justify-center'>
            <div className="avatar placeholder relative h-[80px] w-[80px] lg:h-[130px] lg:w-[130px]">

              {
                userData?.profilePicture ? (
                  <Image className=" rounded-full border-3" src={userData.profilePicture} alt="user avatar" fill />
                ) : (
                  <div className="w-full h-full rounded-full bg-neutral text-neutral-content">
                    <span className="text-[50px]">{user.userName.charAt(0)}</span>
                  </div>
                )
              }
              <button
                className="absolute bottom-1 right-0 rounded-full p-1 text-[21px] text-secondary lg:bottom-[5px] lg:right-[14px]"
                onClick={() => setOpenProfilePictureModal(true)}>
                <FaCamera />
              </button>
            </div>
          </div>
          <div className="flex-grow ">
            <div className="relative top-[10px] lg:top-[30px]">
              <h2 className=" font-bold text-[25px] ">{user.userName}<span className='text-xs md:text-base text-secondary'> ({user.userType})</span></h2>{' '}
              <h2 className="  font-medium text-[20px] text-secondary">{user.userEmail}</h2>
            </div>
          </div>
          <div className=" relative">
            <div className=" relative top-[30px] flex gap-5 text-[21px] text-primary lg:top-[50px] lg:text-[30px]">
              <div className=" cursor-pointer" onClick={() => setOpenPersonalModal(true)}>
                <FaEdit />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {props.userType === 'GUEST' && (
          <div className=" cursor-pointer w-min" onClick={handleLogout}>
            <span className=" relative text-[25px] text-primary ">
              <LogoutIcon />
            </span>
          </div>
        )}
      </div>
      <Modal
        open={openPersonalModal}
        handleClose={() => setOpenPersonalModal(false)}
        onSave={handleSubmit(onSubmitPersonal)}
        title="Edit Personal Details"
        actionLabel="Save"
      >
        <form className="space-y-4">
          <TextInput
            name="fullName"
            control={control}
            label="Full Name"
            required
            error={!!errors.fullName}
            helpertext={errors.fullName ? 'Full name is required' : ''}
          />
          <TextInput
            name="city"
            control={control}
            label="City"
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
            helpertext={errors.phoneNumber ? 'Phone number is required' : ''}
          />
          <TextInput
            name="altPhoneNumber"
            control={control}
            label="Alternative Phone Number"
            error={!!errors.altPhoneNumber}
            helpertext={errors.altPhoneNumber ? 'Alternative phone number is required' : ''}
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
          <DatePicker
            name="dateOfBirth"
            control={control}
            label="Date of Birth"
          />
        </form>
      </Modal>
      <Modal
        open={openProfilePictureModal}
        handleClose={() => setOpenProfilePictureModal(false)}
        title="Edit Profile Picture"
        actionLabel="Save"
        onSave={handleSubmitProfilePicture(onSubmitProfilePicture)}
      >
        <form>
          <input type="file" {...registerProfilePicture('profilePicture')} />
        </form>
      </Modal>
    </div>
  );
};
