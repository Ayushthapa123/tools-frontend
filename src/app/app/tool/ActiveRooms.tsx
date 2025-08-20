import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { ToolCard } from './ToolCard';
import {
  GetToolsByUserToken,
  GetToolsByUserTokenQuery,
  GetToolsByUserTokenQueryVariables,
  DeleteTool,
  DeleteToolMutation,
  DeleteToolMutationVariables,
  ToolData,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';
import { useEffect, useState } from 'react';
import { Modal } from 'src/components/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

export const ActiveTools = ({ setActiveToolCount }: { setActiveToolCount: (count: number) => void }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedToolId, setDeletedToolId] = useState<number | string | null>(null);
  const [deleteTool, setDeleteTool] = useState(false);  //delete tool
  const queryGetAllTools = useGraphqlClientRequest<GetToolsByUserTokenQuery, GetToolsByUserTokenQueryVariables>(
    GetToolsByUserToken.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryGetAllTools();
    setActiveToolCount(res.getToolsByUserToken.data?.length || 0);
    return res.getToolsByUserToken;
  };

  const { data: tools, isLoading } = useQuery({
    queryKey: ['getToolsByUserToken'],
    queryFn: fetchData,
  });

  // deleted tool
  const mutateDeleteTool = useGraphqlClientRequest<
    DeleteToolMutation,
    DeleteToolMutationVariables
  >(DeleteTool.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateDeleteTool });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (deleteTool) {
      mutateAsync({ toolId: Number(deletedToolId) }).then(res => {
        if (res?.deleteTool) {
          enqueueSnackbar('Tool deleted.', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getToolsByUserToken'] });
        } else {
          enqueueSnackbar("Couldn't delete tool.", { variant: 'error' });
        }
      });
      setShowDeleteModal(false);
    }
  }, [deleteTool]);

  return (
    <div className="w-full ">
      {isLoading && (
        <div>
          {' '}
          <LoadingSpinner />
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-[1rem] px-2 md:grid-cols-3">
        {tools?.data?.map(tool => (
          <div key={tool.id} className="md:mb-4 lg:min-h-48">
            <ToolCard
             tool={tool as ToolData}
              setShowDeleteModal={setShowDeleteModal}
              setDeletedToolId={setDeletedToolId}
            />
          </div>
        ))}
        {showDeleteModal && (
          <Modal
            open={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            title="Are you sure to delete this tool?"
            onSave={() => setDeleteTool(true)} 
            actionLabel="Delete"


          >
            Disclaimer: you will not be able to see the details of this tool after you delete it.
          </Modal>
        )}
      </div>
    </div>
  );
};
