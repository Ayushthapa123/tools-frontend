import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  ServiceOptionData,
  DeleteServiceOption,
  DeleteServiceOptionMutation,
  DeleteServiceOptionMutationVariables,
} from 'src/gql/graphql';

import { enqueueSnackbar } from 'notistack';
import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import EditIcon from 'src/components/icons/Edit';
import { ServiceOptionForm } from './ServiceOptionForm';

interface Iprops {
  service: ServiceOptionData;
}

export const ServiceOptionCard = (props: Iprops) => {
  const { service } = props;

  const deleteService = useGraphqlClientRequest<
    DeleteServiceOptionMutation,
    DeleteServiceOptionMutationVariables
  >(DeleteServiceOption.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: deleteService });
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    mutateAsync({ id: Number(service?.id) }).then(res => {
      if (res?.deleteServiceOption) {
        enqueueSnackbar(`Service Deleted!`, { variant: 'success' });
        queryClient.invalidateQueries({ queryKey: ['getServiceOptions'] });
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 ">
      {/* Content Section */}
      <div className="card-body w-2/3 p-6">
        {service?.name}
        <p>{service?.description}</p>
      </div>
      <div className="card-actions justify-end">
        <div className="flex gap-2" >
        <ServiceOptionForm serviceData={service}  />
        </div>

        <IconButton className="" onClick={() => handleDelete()}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
