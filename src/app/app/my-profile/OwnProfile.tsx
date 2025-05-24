import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCamera, FaEdit } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { GetUserById, GetUserByIdQuery, GetUserByIdQueryVariables, LogOut, LogOutMutation, LogOutMutationVariables, UpdateUser, UpdateUserMutation, UpdateUserMutationVariables } from 'src/gql/graphql';
import LogoutIcon from 'src/components/icons/LogOut';
import { useUserStore } from 'src/store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Modal } from 'src/components/Modal';
import TextInput from 'src/features/react-hook-form/TextField';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import { useForm } from 'react-hook-form';
import DatePicker from 'src/features/react-hook-form/DatePicker';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

export const OwnProfile = (props: { userType: string }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const [ loading, setLoading ] = useState(false);
  const mutateLogOutRequest = useGraphqlClientRequest<LogOutMutation, LogOutMutationVariables>(
    LogOut.loc?.source.body!,
  );
  const { mutateAsync } = useMutation({ mutationFn: mutateLogOutRequest });
  const mutateUpdateUser = useGraphqlClientRequest<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUser.loc?.source.body!
  );
  const { mutateAsync: updateUser } = useMutation({ mutationFn: mutateUpdateUser });
  const [ openPersonalModal, setOpenPersonalModal ] = useState(false);
  const [ openProfilePictureModal, setOpenProfilePictureModal ] = useState(false);
  // Form for personal details
  const { control,register, handleSubmit, formState: { errors }, reset } = useForm({
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
    queryKey: ["getUserById"],
    queryFn: fetchUser,
    enabled: !!user.userId && user.userId !== null,
  });

  // Update form values when userData changes
  useEffect(() => {
    if (userData?.data) {
      reset({
        fullName: userData.data.fullName || '',
        city: userData.data.city || '',
        altPhoneNumber: userData.data.altPhoneNumber || '',
        phoneNumber: userData.data.phoneNumber || '',
        gender: userData.data.gender || '',
        dateOfBirth: userData.data.dateOfBirth || '',
      });
    }
  }, [ userData, reset ]);

  const genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
  ];
  const queryClient = useQueryClient();

  const onSubmitPersonal = async (data: any) => {
    try {
      const res = await updateUser({
        input: {
          ...data,
          id: user.userId,
        }
      });
      if (res?.updateUser?.data?.id) {
        enqueueSnackbar('Profile updated successfully!',{variant:'success'})
        queryClient.invalidateQueries({ queryKey: ["getUserById"] });
      } else {
        enqueueSnackbar('Something went wrong!',{variant:'error'})
      }
    } catch (err) {
      enqueueSnackbar('Something went wrong!',{variant:'error'})
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

  const [imageUrl,setImageUrl] = useState(userData?.data?.profilePicture || '')
  const onSubmitProfilePicture = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (data.profilePicture && data.profilePicture[0]) {
        formData.append('image', data.profilePicture[0]);
      } else {
        enqueueSnackbar('Please select a file.',{variant:'warning'})
        setLoading(false);
        return;
      }
      let response;
      try {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL!}/upload/image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      } catch (err) {
        enqueueSnackbar('Image upload failed!',{variant:'error'})
        return;
      }
      setImageUrl(response.data.imageUrl);

      const imageUploaded = await updateUser({
        input: {
          id: Number(user.userId),
          profilePicture: response.data.imageUrl,
        }
      });

      if (imageUploaded?.updateUser?.data?.id) {
        enqueueSnackbar('Profile picture updated successfully!',{variant:'success'})
        setOpenProfilePictureModal(false); // Optionally close modal
      } else {
        enqueueSnackbar('Something went wrong during upload!',{ variant:'error'})
      }
    } catch (err) {
      enqueueSnackbar('Something went wrong file!',{variant:'error'})
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className=" w-full mt-[100px] min-h-[calc(100vh-400px)]">
        <div className=" mb-4 flex gap-5 flex-col lg:flex-row">
          <div className='flex items-center justify-center'>
            <div className="avatar placeholder relative h-[80px] w-[80px] lg:h-[130px] lg:w-[130px]">

              {
                userData?.data?.profilePicture || imageUrl ? (
                  <Image className=" rounded-full border border-black" src={userData?.data?.profilePicture || imageUrl || ""} alt="user avatar" fill />
                ) : (
                  <div className="w-full h-full rounded-full bg-neutral text-neutral-content">
                    <span className="text-[50px]">{userData?.data?.fullName?.charAt(0)}</span>
                  </div>
                )
              }
              <button
                className={`absolute bottom-1 right-0 rounded-full p-1 text-[21px] ${userData?.data?.profilePicture || imageUrl ? 'text-white' : 'text-primary'} lg:bottom-[5px] lg:right-[14px]`}
                onClick={() => setOpenProfilePictureModal(true)}>
                <FaCamera />
              </button>
            </div>
          </div>
          <div className="flex-grow ">
            <div className="relative top-[10px] lg:top-[30px]">
                <h2 className=" font-bold text-[25px] ">{userData?.data?.fullName}<span className='text-xs md:text-base text-secondary'> ({user.userType})</span></h2>{' '}
              <h2 className="  font-medium text-[20px] text-secondary">{userData?.data?.email}</h2>
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
            type="text"
            customType='name'
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
            helpertext={errors.phoneNumber?.message} 
            type="tel"
            customType='tel'
          />
          <TextInput
            name="altPhoneNumber"
            control={control}
            label="Alternative Phone Number"
            error={!!errors.altPhoneNumber}
            helpertext={errors.altPhoneNumber?.message}
            type="tel"
            customType='tel'
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
}
