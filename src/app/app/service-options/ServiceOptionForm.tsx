'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import IconButton from 'src/components/IconButton';

import { Modal } from 'src/components/Modal';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import TextInput from 'src/features/react-hook-form/TextField';
import {

  CreateServiceOptionMutationVariables,
  CreateServiceOption,
  CreateServiceOptionMutation,
  ServiceOptionData,
  UpdateServiceOption,
  UpdateServiceOptionMutation,
  UpdateServiceOptionMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { useUserStore } from 'src/store/userStore';
import EditIcon from 'src/components/icons/Edit';
export const ServiceOptionForm = ({ serviceData }: { serviceData?: ServiceOptionData }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {serviceData ?<IconButton onClick={() => setOpen(true)}> 
        <EditIcon/>
      </IconButton>:<Button label="Add Service Option" onClick={() => setOpen(true)} />}
      {open && <ServiceForm open handleClose={handleClose} serviceData={serviceData} />}
    </div>
  );
};

const ServiceForm = ({
  handleClose,
  open,
  serviceData,
}: {
  handleClose: () => void;
  open: boolean;
  serviceData?: ServiceOptionData;
}) => {
  const { user } = useUserStore();
  const { setRole, setShowToast, setMessage } = useToastStore();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ServiceOptionData>({ defaultValues: { ...serviceData } });

  const mutateCreateServiceOption = useGraphqlClientRequest<
    CreateServiceOptionMutation,
    CreateServiceOptionMutationVariables
  >(CreateServiceOption.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateServiceOption });

  const mutateUpdateServiceOption = useGraphqlClientRequest<
    UpdateServiceOptionMutation,
    UpdateServiceOptionMutationVariables
  >(UpdateServiceOption.loc?.source.body!);

  const { mutateAsync: mutateUpdateServiceOptionAsync } = useMutation({
    mutationFn: mutateUpdateServiceOption,
  });

  const onSubmit = async (data: ServiceOptionData) => {
    const { id, ...input } = data;
    if (serviceData) {
      mutateUpdateServiceOptionAsync({ 
        id: Number(serviceData.id),
        updateServiceOptionInput: input,
      }).then(res => {
        if (res?.updateServiceOption?.data?.id) {
          enqueueSnackbar('Service Option Updated!', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getServiceOptions'] });
          handleClose();
        } else {
          enqueueSnackbar(res?.updateServiceOption?.error?.message || 'Something went wrong!', {
            variant: 'error',
          });
        }
      });
    } else {
      mutateAsync({ createServiceOptionInput: input }).then(res => {
        if (res?.createServiceOption?.data?.id) {
          enqueueSnackbar('Service Option Created!', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getServiceOptions'] });
          // handleClose();
        }
      });
    }
  };

 

  return (
    <div>
      <Modal
        open={open}
        handleClose={handleClose}
        onSave={handleSubmit(onSubmit)}
        title={serviceData ? 'Edit Service Option' : 'Add Service Option'}
        actionLabel="Save"
      >
        <div className="bg-red-300 ">
          <form className="bg-white text-left ">
            <div className="w-full py-3 ">
              <div className="">
                <TextInput
                  name="name"
                  placeholder="Service Name"
                  control={control}
                  label="Service Name"
                  required
                  helpertext={errors.name?.type === 'required' ? 'Service Name Is Required' : ''}
                  error={!!errors.name}
                />
              </div>

              <div className="mt-3 ">
                <TextArea
                  name="description"
                  placeholder="Describe it with distance,direction and other info"
                  type="text"
                  control={control}
                  label="Service Description"
                  // required
                  error={!!errors.description}
                  rows={3}
                />
              </div>
          
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
