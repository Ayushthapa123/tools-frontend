import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  AmenityOptionData,
  DeleteAmenityOption,
  DeleteAmenityOptionMutation,
  DeleteAmenityOptionMutationVariables,
} from 'src/gql/graphql';

import { enqueueSnackbar } from 'notistack';
import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import EditIcon from 'src/components/icons/Edit';
import { AmenityOptionForm } from './AmenityOptionForm';

interface Iprops {
  amenity: AmenityOptionData;
}

export const AmenityCard = (props: Iprops) => {
  const { amenity } = props;

  const deleteAmenity = useGraphqlClientRequest<
    DeleteAmenityOptionMutation,
    DeleteAmenityOptionMutationVariables
  >(DeleteAmenityOption.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: deleteAmenity });
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    mutateAsync({ id: Number(amenity?.id) }).then(res => {
      if (res?.deleteAmenityOption) {
        enqueueSnackbar(`Amenity Deleted!`, { variant: 'success' });
        queryClient.invalidateQueries({ queryKey: ['getAmenityOptions'] });
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 ">
      {/* Content Section */}
      <div className="card-body w-2/3 p-6">
        {amenity?.name}({amenity?.hostelAmenityType})
        <p>{amenity?.description}</p>
      </div>
      <div className="card-actions justify-end">
        <div className="flex gap-2" >
        <AmenityOptionForm amenityData={amenity}  />
        </div>

        <IconButton className="" onClick={() => handleDelete()}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
