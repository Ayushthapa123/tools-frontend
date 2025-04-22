import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import {
  Homestay,
  UserType,
  VerifyHomestay,
  VerifyHomestayMutation,
  VerifyHomestayMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import Image from 'next/image';
import RichTextEditor from 'src/components/RichTextEditor';
import { useRef } from 'react';
import { useUserStore } from 'src/store/userStore';

interface Iprops {
  homestay: Homestay | null | undefined;
}

export const HomeStayCard = (props: Iprops) => {
  const { homestay } = props;

  const editorRef = useRef(homestay?.description)

const {user}=useUserStore()

  
  const mutateCreateNearbyPlace = useGraphqlClientRequest<
    VerifyHomestayMutation,
    VerifyHomestayMutationVariables
  >(VerifyHomestay.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateNearbyPlace });
  const queryClient = useQueryClient();
  const { setMessage, setRole, setShowToast } = useToastStore();

 

  const handleVerification = async (status: boolean) => {
    mutateAsync({ homestayId: Number(homestay?.id), status }).then(res => {
      if (res?.verifyHomestay) {
        setShowToast(true);
        setMessage(`Homestay ${status ? 'Verified' : 'Unverified'}!`);
        setRole('success');
        queryClient.invalidateQueries({ queryKey: ['getAllHomestays'] });
      } else {
        setShowToast(true);
        setMessage('Something went wrong!');
        setRole('error');
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

  const firstRoom = homestay?.rooms?.[0];
  const location = homestay?.address ? 
    `${homestay?.address.city || ''}${homestay?.address.subCity ? `, ${homestay?.address.subCity}` : ''}` : 
    'Location not specified';

  const isVerified = user.userType===UserType.Superadmin?homestay?.moderatedBySuperAdmin:homestay?.moderatedByCommunityOwner


  return (
    <div className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[280px]">
      {/* Image Section */}
      <figure className="w-1/3 relative group">
        <Image
          src={homestay?.image?.[0]?.url || '/default-image.png'}
          alt={homestay?.name || ''}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </figure>

      {/* Content Section */}
      <div className="card-body w-2/3 p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="card-title text-2xl font-bold text-gray-800">{homestay?.name || ''}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{location}</span>
              </div>
              {firstRoom?.status && (
                <div className={`badge ${getStatusColor(firstRoom.status)}`}>
                  {firstRoom.status}
                </div>
              )}
            </div>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <span className="label-text font-medium">Verified</span>
              <input 
                type="checkbox" 
                className="toggle toggle-primary" 
                checked={isVerified}
                onChange={(e) => handleVerification(e.target.checked)}
              />
            </label>
          </div>
        </div>

        <div className="divider my-2"></div>

        <div className="space-y-4">
          {/* Description */}
          {homestay?.description && (
           <RichTextEditor editorRef={editorRef}  readOnly={true} />
          )}

          {/* Price */}
          {firstRoom?.price && (
            <div className="flex items-center justify-between bg-base-200 p-3 rounded-lg">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="text-2xl font-bold text-primary">
                    {firstRoom.price.currency} {firstRoom.price.baseAmount?.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">/night</span>
                </div>
              </div>
              {firstRoom.capacity && (
                <div className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Capacity: {firstRoom.capacity}</span>
                </div>
              )}
            </div>
          )}

          {/* Contact Information */}
          {homestay?.contact && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center p-2 bg-base-200 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">{homestay?.contact?.email}</span>
              </div>
              <div className="flex items-center p-2 bg-base-200 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700">{homestay?.contact?.phone}</span>
              </div>
            </div>
          )}

          {/* Amenities */}
          {homestay?.amenities && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(homestay?.amenities || {}).map(([key, value]) => {
                  if (value) {
                    return (
                      <div key={key} className="badge badge-primary badge-outline">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
