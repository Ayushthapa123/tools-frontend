'use client';
import { useRef, useState } from 'react';

import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { Tool, UpdateToolMutation, UpdateToolMutationVariables, UpdateTool } from 'src/gql/graphql';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Button from 'src/components/Button';
import TinyMceRichTextEditor from 'src/components/RichTextEditor/TinyMceRichTextEditor';
import { enqueueSnackbar } from 'notistack';

// it takes dynamic fields and gives response based on the fields

export const WriteArticleForm = ({ isEdit = false, tool }: { isEdit?: boolean; tool?: Tool }) => {
  const mutateUpdateTool = useGraphqlClientRequest<UpdateToolMutation, UpdateToolMutationVariables>(
    UpdateTool.loc?.source.body!,
  );

  const { mutateAsync: mutateUpdateToolAsync, isPending: isUpdateToolPending } = useMutation({
    mutationFn: mutateUpdateTool,
  });
  const [content, setContent] = useState(tool?.data?.description || ''); 
  const queryClient = useQueryClient();

  const handleSave = () => {
    mutateUpdateToolAsync({
      toolId: Number(tool?.data?.id),
      data: {
        id: Number(tool?.data?.id),
        description: content,
      },
    }).then(res => {
      if (res.updateTool.error) {
        enqueueSnackbar(res.updateTool.error.message, { variant: 'error' });
      } else {
        enqueueSnackbar('Tool updated successfully', { variant: 'success' });
        queryClient.invalidateQueries({ queryKey: ['getToolBySlug', tool?.data?.slug] });
      }
    });
  };
 

  return (
    <div className=" p-8">
      <div className="flex justify-start">
        <h2 className="text-2xl font-bold">Write Article/Guide For The Tool</h2>
      </div>
      <div className="mt-4 h-auto w-full">
        <TinyMceRichTextEditor value={content} onChange={setContent} />
      </div>
      <div className="flex justify-end">
        <Button label="Save" type="button" onClick={handleSave} />
      </div>
    </div>
  );
};
