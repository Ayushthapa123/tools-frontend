import { ConfirmDialog } from "src/components/ConfirmDialog";
import { DeleteHostelServicesById } from "src/gql/graphql";
import { DeleteHostelServicesByIdMutationVariables } from "src/gql/graphql";
import { useGraphqlClientRequest } from "src/hooks/useGraphqlClientRequest";
import { DeleteHostelServicesByIdMutation } from "src/gql/graphql";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export default function DeleteServiceModal({serviceId,isOpen,onClose,serviceName}:{serviceId:number,isOpen:boolean,onClose:()=>void,serviceName:string}) {
  console.log("serviceId", serviceId);
  const mutateDeleteHostelService = useGraphqlClientRequest<DeleteHostelServicesByIdMutation, DeleteHostelServicesByIdMutationVariables>(
    DeleteHostelServicesById.loc?.source?.body!,
  );
  const { mutateAsync: deleteHostelService, isPending: isDeleting } = useMutation({ mutationFn: mutateDeleteHostelService });
  
  const handleDeleteService = async () => {
    const res = await deleteHostelService({ id: Number(serviceId) });
    console.log("res", res);
    if (res?.deleteHostelService?.data?.id) {
      enqueueSnackbar('Service deleted successfully.', { variant: 'success' });
      onClose();
    } else {
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  }
  return (
    <>
      <ConfirmDialog
        open={isOpen}
        title="Delete Service"
        handleClose={onClose}
        onSave={()=>handleDeleteService()}
        type="delete"
        actionLabel="Delete"
      >
        <p>Are you sure you want to delete this service for {serviceName}?</p>
      </ConfirmDialog>
    </>
  );
}