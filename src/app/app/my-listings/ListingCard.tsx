import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  ChangeCurrentHostel,
  HostelData,

} from 'src/gql/graphql';
import Image from 'next/image';
import RichTextEditor from 'src/components/RichTextEditor';
import { useRef } from 'react';
import { useUserStore } from 'src/store/userStore';
import { enqueueSnackbar } from 'notistack';
import { ChangeCurrentHostelMutation, ChangeCurrentHostelMutationVariables } from 'src/gql/graphql';
import { useRouter } from 'next/navigation';
interface Iprops {
  hostel: HostelData;
}

export const HostelCard = (props: Iprops) => {
  const { hostel } = props;

  const editorRef = useRef(hostel?.description);

  const { user } = useUserStore();

  const mutateCreateNearbyPlace = useGraphqlClientRequest<
    ChangeCurrentHostelMutation,
    ChangeCurrentHostelMutationVariables
  >(ChangeCurrentHostel.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateNearbyPlace });
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleMakeActive = async (hostelId: number) => {
    mutateAsync({ hostelId: hostelId }).then(res => {
      if (res?.changeCurrentHostel) {
        enqueueSnackbar(`Active Listing Changed!`, { variant: 'success' });
        queryClient.invalidateQueries()
        router.push("/app/") 
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'badge-success';
      case 'occupied':
        return 'badge-error';
      case 'maintenance':
        return 'badge-warning';
      default:
        return 'badge-neutral';
    }
  };

  const firstRoom = hostel?.rooms?.[0];
  const location = hostel?.address
    ? `${hostel?.address.city || ''}${hostel?.address.subCity ? `, ${hostel?.address.subCity}` : ''}`
    : 'Location not specified';

  const isVerified =hostel.verifiedBySuperAdmin
  return (
    <div className="card card-side min-h-[280px] overflow-hidden bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Image Section */}
      <figure className="group relative w-1/3">
        <Image
          src={hostel?.gallery?.[0]?.url || '/default-image.png'}
          alt={hostel?.name || ''}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </figure>

      {/* Content Section */}
      <div className="card-body w-2/3 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="card-title text-2xl font-bold text-gray-800">{hostel?.name || ''}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{location}</span>
              </div>
                <div className={`badge ${getStatusColor(firstRoom?.status || '')}`}>
                  {isVerified ? 'Verified' : 'Not Verified'}
                </div>
            
            </div>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <span className="label-text font-medium">Actively Editing</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={Number(user.hostelId) == Number(hostel.id)}
                onChange={e => handleMakeActive(Number(hostel.id))}
              />
            </label>
    
          </div>
        </div>

        <div className="divider my-2"></div>

        <div className="space-y-4">
          {/* Description */}
          {hostel?.description && <RichTextEditor editorRef={editorRef} readOnly={true} />}

       
            <div className="flex items-center justify-between rounded-lg bg-base-200 p-3">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <span className="text-2xl font-bold text-primary">
                    Admission Fee: {hostel?.admissionFee}{' '}
                 
                  </span>
                  <span className="ml-1 text-sm text-gray-500">/night</span>
                </div>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <span className="text-2xl font-bold text-primary">
                    Deposit Fee: {hostel?.depositAmount}{' '}
                 
                  </span>
                  <span className="ml-1 text-sm text-gray-500">/night</span>
                </div>
              </div>
           
            </div>

          {/* Contact Information */}
          {hostel?.contact && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center rounded-lg bg-base-200 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-700">{hostel?.contact?.email}</span>
              </div>
              <div className="flex items-center rounded-lg bg-base-200 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-700">{hostel?.contact?.phone}</span>
              </div>
            </div>
          )}

         
        </div>
      </div>
    </div>
  );
};
