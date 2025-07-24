import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {

  UserType,
  HostelApplicationFormData,
  UpdateHostelApplicationFormMutationVariables,
  UpdateHostelApplicationForm,
  UpdateHostelApplicationFormMutation,
  Status,
} from 'src/gql/graphql';

import { useUserStore } from 'src/store/userStore';
import { enqueueSnackbar } from 'notistack';
import CustomEmailModal from 'src/features/CustomEmailModal';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import { Select } from 'src/components/Select';

interface Iprops {
  form: HostelApplicationFormData;
}

export const FormsCard = (props: Iprops) => {
  const { form } = props;

  const {user} = useUserStore()



  const mutateUpdateHostelApplicationForm = useGraphqlClientRequest<
    UpdateHostelApplicationFormMutation,
    UpdateHostelApplicationFormMutationVariables
  >(UpdateHostelApplicationForm.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateUpdateHostelApplicationForm });
  const queryClient = useQueryClient();

  const handleVerification = async (status: Status) => {
    mutateAsync({ data: { id: Number(form?.id), status:status } }).then(res => {
      if (res?.updateHostelApplicationForm) {
        enqueueSnackbar(`Form Status Changed to ${status}!`, { variant: 'success' });
        queryClient.invalidateQueries({ queryKey: ['getAllHostelApplicationFormsByHostelId'] });
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    });
  };

  const handleDiscount = async (discount: number) => {
    mutateAsync({ data: { id: Number(form?.id), discountPercentage:Number(discount) } }).then(res => {
      if (res?.updateHostelApplicationForm) {
        enqueueSnackbar(`Discount Percentage Changed to ${discount}%!`, { variant: 'success' });
        queryClient.invalidateQueries({ queryKey: ['getAllHostelApplicationFormsByHostelId'] });
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    });
  };


  const applicationStatus=[
    {label:"",value:""},

    {label:"Approved",value:Status.Approved},
    {label:"Rejected",value:Status.Rejected},
  ]

  const discountPrecentage=[
    {label:"",value:"0"},
    {label:"10%",value:"10"},
    {label:"20%",value:"20"},
    {label:"30%",value:"30"},
    {label:"40%",value:"40"},
    {label:"50%",value:"50"},
    {label:"60%",value:"60"},
    {label:"70%",value:"70"},
    {label:"80%",value:"80"},
    {label:"90%",value:"90"},
    {label:"100%",value:"100"},
  ]


  return (
    <div className="card card-side min-h-[180px] w-full overflow-hidden bg-base-100 shadow transition-all duration-300 hover:shadow-2xl">
      {/* Content Section */}
      <div className="card-body w-full p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <h2 className="card-title text-lg font-bold text-gray-800 leading-tight">{form.fullName || ''}</h2>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-0.5 h-3 w-3"
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
              <span className="label-text font-medium">{form.permanentAddress}</span>
            </div>
          </div>
          <div className="form-control items-end">
            <label className="label cursor-pointer gap-1 min-h-0 p-0">
              <span className="label-text font-medium text-xs">Status:</span>
              <span className={`${form.status === Status.Approved ? 'text-green-500' : 'text-red-500'} text-xs font-semibold`}>{form.status}</span>
            </label>
            {user.userType === UserType.Superadmin && (
              <div className="mt-1">
                <CustomEmailModal
                  name={form.fullName}
                  email={form.email ?? ""}
                  hostelId={form.id}
                />
              </div>
            )}
          </div>
        </div>

        <div className="divider my-1 h-1" style={{marginTop: 4, marginBottom: 4}}></div>

        <div className="space-y-2">
          {/* Personal Info */}
          <div>
            <h3 className="font-semibold text-gray-700 text-sm mb-1">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-600">
              {form.fullName && (
                <div><span className="font-medium">Full Name:</span> {form.fullName}</div>
              )}
              {form.email && (
                <div><span className="font-medium">Email:</span> {form.email}</div>
              )}
              {form.phoneNumber && (
                <div><span className="font-medium">Phone Number:</span> {form.phoneNumber}</div>
              )}
              {form.institutionName && (
                <div><span className="font-medium">Institution Name:</span> {form.institutionName}</div>
              )}
              {form.permanentAddress && (
                <div><span className="font-medium">Permanent Address:</span> {form.permanentAddress}</div>
              )}
            </div>
          </div>

          {/* Room Capacity */}
          {form.roomCapacity && (
            <div>
              <h3 className="font-semibold text-gray-700 text-sm mt-2 mb-0.5">Room Type</h3>
              <div className="text-xs text-gray-600">{form.roomCapacity}</div>
            </div>
          )}

          {/* Dates */}
          <div>
            <h3 className="font-semibold text-gray-700 text-sm mt-2 mb-1">Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-600">
              {form.checkinDate && (
                <div><span className="font-medium">Check-in:</span> {new Date(form.checkinDate).toLocaleDateString()}</div>
              )}
              {form.checkoutDate && (
                <div><span className="font-medium">Check-out:</span> {new Date(form.checkoutDate).toLocaleDateString()}</div>
              )}
              {form.createdAt && (
                <div><span className="font-medium">Created:</span> {new Date(form.createdAt).toLocaleString()}</div>
              )}
              {form.updatedAt && (
                <div><span className="font-medium">Updated:</span> {new Date(form.updatedAt).toLocaleString()}</div>
              )}
            </div>
          </div>

          {/* Discount Info */}
          <div>
            <h3 className="font-semibold text-gray-700 text-sm mt-2 mb-1">Discount Information</h3>
            <div className="text-xs text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
              <div><span className="font-medium text-red-500">Asked For Discount:</span> {form.askForDiscount ? 'Yes' : 'No'}</div>
              <div><span className="font-medium">Discount Percentage:</span> {form.discountPercentage}%</div>
            </div>
          </div>

          {/* Notes */}
          {form.notes && (
            <div>
              <h3 className="font-semibold text-gray-700 text-sm mt-2 mb-1">Notes</h3>
              <div className="text-xs">{form.notes}</div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-2 mt-1">
            <div className="w-full md:w-1/2">
              <Select
                options={discountPrecentage}
                value={form.discountPercentage !== undefined && form.discountPercentage !== null ? String(form.discountPercentage) : '0'}
                label="Discount %"
                // size="sm"
                className="min-h-0 h-8 text-xs"
                onChange={e => {
                  const val = Number(e.target.value);
                  if (val !== 0) handleDiscount(val);
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Select
                options={applicationStatus}
                value={(form.status as string | number) || ''}
                label="Change Status"
                // size="sm"
                className="min-h-0 h-8 text-xs"
                onChange={e => handleVerification(e.target.value as Status)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
