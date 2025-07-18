import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {

  HostelSearchFormData,
  UpdateHostelSearchForm,
  UpdateHostelSearchFormMutation,
  UpdateHostelSearchFormMutationVariables,
  UserType,

} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import Image from 'next/image';
import RichTextEditor from 'src/components/RichTextEditor';
import { useRef } from 'react';
import { useUserStore } from 'src/store/userStore';
import { enqueueSnackbar } from 'notistack';
import CustomEmailModal from 'src/features/CustomEmailModal';

interface Iprops {
  form: HostelSearchFormData;
}

export const FormsCard = (props: Iprops) => {
  const { form } = props;

  const {user} = useUserStore()



  const mutateUpdateHostelSearchForm = useGraphqlClientRequest<
    UpdateHostelSearchFormMutation,
    UpdateHostelSearchFormMutationVariables
  >(UpdateHostelSearchForm.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateUpdateHostelSearchForm });
  const queryClient = useQueryClient();

  const handleVerification = async (status: boolean) => {
    mutateAsync({ data: { id: Number(form?.id), isActive: status } }).then(res => {
      if (res?.updateHostelSearchForm) {
        enqueueSnackbar(`Form ${status ? 'Actively Looking' : 'Not Actively Looking'}!`, { variant: 'success' });
        queryClient.invalidateQueries({ queryKey: ['getAllHostelSearchForms'] });
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    });
  };




  const isActive = form?.isActive
  return (
    <div className="card card-side min-h-[280px] overflow-hidden bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
 

      {/* Content Section */}
      <div className="card-body w-2/3 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="card-title text-2xl font-bold text-gray-800">{form.fullName || ''}</h2>
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
              </div>
              <div className="label-text font-medium"> {form.address?.country}, {form.address?.city}, {form.address?.subCity}, {form.address?.street}</div>
          
            </div>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <span className="label-text font-medium">Actively Looking</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={Boolean(form?.isActive)}
                onChange={e => handleVerification(e.target.checked)}
              />
            </label>
            {user.userType ===UserType.Superadmin && (
            <div>
              <CustomEmailModal
                name={form.fullName}
                email={form.email ?? ""}
                hostelId={form.id}
              />
            </div>
            )}
          </div>
        </div>

        <div className="divider my-2"></div>

        <div className="space-y-4">
          {/* Personal Info */}
          <div>
            <h3 className="font-semibold text-gray-700">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-600">
              {form.fullName && (
                <div><span className="font-medium">Full Name:</span> {form.fullName}</div>
              )}
              {form.email && (
                <div><span className="font-medium">Email:</span> {form.email}</div>
              )}
              {form.phoneNumber && (
                <div><span className="font-medium">Phone Number:</span> {form.phoneNumber}</div>
              )}
              {form.occupation && (
                <div><span className="font-medium">Occupation:</span> {form.occupation}</div>
              )}
            </div>
          </div>

          {/* Hostel Details */}
          <div>
            <h3 className="font-semibold text-gray-700 mt-4">Hostel Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-600">
              {form.hostelType && (
                <div><span className="font-medium">Hostel Type:</span> {form.hostelType}</div>
              )}
              {form.hostelGenderType && (
                <div><span className="font-medium">Hostel Gender Type:</span> {form.hostelGenderType}</div>
              )}
              {form.roomCapacity && (
                <div><span className="font-medium">Room Capacity:</span> {form.roomCapacity}</div>
              )}
            </div>
          </div>

          {/* Address */}
          {form.address && (
            <div>
              <h3 className="font-semibold text-gray-700 mt-4">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-600">
                {form.address.country && (
                  <div><span className="font-medium">Country:</span> {form.address.country}</div>
                )}
                {form.address.city && (
                  <div><span className="font-medium">City:</span> {form.address.city}</div>
                )}
                {form.address.subCity && (
                  <div><span className="font-medium">Sub City:</span> {form.address.subCity}</div>
                )}
                {form.address.street && (
                  <div><span className="font-medium">Street:</span> {form.address.street}</div>
                )}
                {form.address.latitude && (
                  <div><span className="font-medium">Latitude:</span> {form.address.latitude}</div>
                )}
                {form.address.longitude && (
                  <div><span className="font-medium">Longitude:</span> {form.address.longitude}</div>
                )}
              </div>
            </div>
          )}

          {/* Dates */}
          <div>
            <h3 className="font-semibold text-gray-700 mt-4">Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-600">
              {form.checkinDate && (
                <div><span className="font-medium">Check-in Date:</span> {new Date(form.checkinDate).toLocaleDateString()}</div>
              )}
              {form.checkoutDate && (
                <div><span className="font-medium">Check-out Date:</span> {new Date(form.checkoutDate).toLocaleDateString()}</div>
              )}
              {form.createdAt && (
                <div><span className="font-medium">Created At:</span> {new Date(form.createdAt).toLocaleString()}</div>
              )}
              {form.updatedAt && (
                <div><span className="font-medium">Updated At:</span> {new Date(form.updatedAt).toLocaleString()}</div>
              )}
            </div>
          </div>

          {/* Notes */}
          {form.notes && (
            <div>
              <h3 className="font-semibold text-gray-700 mt-4">Notes</h3>
            {form.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
