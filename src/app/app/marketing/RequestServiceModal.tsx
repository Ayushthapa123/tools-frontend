import { Modal } from "src/components/Modal";
import Select from "src/features/react-hook-form/Select";
import { useForm } from "react-hook-form";
import { Input } from "src/components/Input";
import TextInput from "src/features/react-hook-form/TextField";
import TextArea from "src/features/react-hook-form/TextArea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateHostelServiceMutation, CreateHostelServiceMutationVariables, GetHostelServicesById, GetHostelServicesByIdQuery, GetHostelServicesByIdQueryVariables, UpdateHostelServicesById, UpdateHostelServicesByIdMutation, UpdateHostelServicesByIdMutationVariables } from "src/gql/graphql";
import { CreateHostelService } from "src/gql/graphql";
import { useGraphqlClientRequest } from "src/hooks/useGraphqlClientRequest";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export default function RequestServiceModal({ hostelId, isOpen, onClose, serviceName, serviceId }: { hostelId: number|null, isOpen: boolean, onClose: () => void, serviceName: string, serviceId: number|null }) {
  const serviceTypes = [
    {
      label: 'Facebook Marketing',
      value: 'FACEBOOK_MARKETING'
    },
    { 
      label: 'Google Marketing',
      value: 'GOOGLE_MARKETING'
    },
    {
      label: "Employee",
      value: "EMPLOYEE"
    },
    {
      label: "Real Estate",
      value: "REAL_ESTATE"
    },
    {
      label: "Furniture",
      value: "FURNITURE"
    },
    {
      label: "Other",
      value: "OTHER"
    },
  ]
  const priorities = [
    {
      label: 'High',
      value: 'HIGH'
    },
    {
      label: 'Medium',
      value: 'MID'
    },
    {
      label: 'Low',
      value: 'LOW'
    }
  ]

  const mutateCreateHostelService = useGraphqlClientRequest<
    CreateHostelServiceMutation,
    CreateHostelServiceMutationVariables
  >(CreateHostelService.loc?.source.body!);

  const { mutateAsync: createHostelService, isPending: isLoading } = useMutation({ mutationFn: mutateCreateHostelService });
  const hostelServiceType = serviceTypes.find(type => type.label === serviceName)?.value;

  //get service details by id
  const queryHostelServices = useGraphqlClientRequest<GetHostelServicesByIdQuery, GetHostelServicesByIdQueryVariables>(
    GetHostelServicesById.loc?.source?.body!,
  );

  const fetchHostelServices = async () => {
    if (!hostelId) {
      throw new Error('Hostel ID not found');
    }
    const res = await queryHostelServices({ id: Number(serviceId) ?? 0 });
    return res.getHostelServiceById;
  };

  const { data: hostelServices, isLoading:hostelServiceByIdLoading, error } = useQuery({
    queryKey: ['getHostelServicesById',],
    queryFn: fetchHostelServices,
    enabled: !!serviceId,
  });


  //update service from id
  const mutateUpdateHostelService = useGraphqlClientRequest<UpdateHostelServicesByIdMutation, UpdateHostelServicesByIdMutationVariables>(
    UpdateHostelServicesById.loc?.source?.body!,
  );
  const { mutateAsync: updateHostelService, isPending: isUpdating } = useMutation({ mutationFn: mutateUpdateHostelService });
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      hostelServiceType: hostelServiceType,
      title: '',
      description: '',
      budget: 0,
      priority: 'HIGH',
    }
  });

  // Reset form when hostelServices data is loaded
  useEffect(() => {
    if (hostelServices?.data) {
      reset({
        hostelServiceType: hostelServiceType,
        title: hostelServices.data.title || '',
        description: hostelServices.data.description || '',
        budget: hostelServices.data.budget || 0,
        priority: hostelServices.data.priority || 'HIGH',
      });
    }
  }, [hostelServices, hostelServiceType, reset]);
  
  const onSubmit = async (data: any) => {
    try {
      if (!serviceId) {
        const res = await createHostelService({
          data: {
            ...data,
            budget: Number(data.budget),
            hostelId: hostelId,
            status: 'PENDING',
          }
        });
        console.log(res);
        if (res?.createHostelService?.data?.id) {
          console.log(res);
          enqueueSnackbar('Service requested successfully.', { variant: 'success' });
          onClose();
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
        }
      } else {
        const res = await updateHostelService({
          input: {
            ...data,
            id: Number(serviceId),
          }
        });
        console.log(res);
        if (res?.updateHostelService?.data?.id) {
          enqueueSnackbar('Service updated successfully.', { variant: 'success' });
          onClose();
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
        }
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
      console.log(error);
    }
  }
  
  return (
    <>
      <Modal open={isOpen} handleClose={onClose} title={serviceId ? "Edit Service" : "Request Service"} onSave={handleSubmit(onSubmit)} className="w-[70%]" >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-full bg-transparent">
            <div className="flex flex-col gap-4">
              <TextInput
                name="title"
                placeholder="Enter Service Name"
                control={control}
                label="Service Name"
                required
                helpertext={errors.title?.type === 'required' ? 'Service Name Is Required' : ''}
                error={!!errors.title}
              />
            </div>
            <div className="flex flex-col gap-4">
              <TextArea
                name="description"
                placeholder="Enter Service Description"
                control={control}
                rows={5}
                label="Service Description"
                required
                helpertext={errors.description?.type === 'required' ? 'Service Description Is Required' : ''}
                error={!!errors.description}
              />
            </div>
            <div className="flex flex-col gap-4 bg-transparent">
              <Select
                control={control}
                name="hostelServiceType"
                label="Service Type"
                options={serviceTypes}
                error={!!errors.hostelServiceType}
              />
            </div>
            <div className="flex flex-col gap-4 bg-transparent">
              <TextInput
                name="budget"
                placeholder="Enter Budget"
                control={control}
                label="Budget"
                helpertext={errors.budget?.type === 'required' ? 'Budget Is Required' : ''}
                error={!!errors.budget}
              />
            </div>
            <div className="flex flex-col gap-4 bg-transparent">
              <Select
                control={control}
                name="priority"
                label="Priority"
                options={priorities}
                error={!!errors.priority}
              />
            </div>
            {/* <div className="flex flex-col gap-4 bg-transparent">
              <DatePicker
                control={control}
                name="dueDate"
                label="Due Date"
              />
            </div> */}

          </div>
        </form>
    </Modal>
    </>
  );
}