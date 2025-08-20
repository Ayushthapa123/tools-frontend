'use client';
import { useRef, useState } from 'react';

import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { Tool, UpdateToolMutation, UpdateToolMutationVariables, UpdateTool, UpdateToolMetaData, UpdateToolMetaDataMutation, UpdateToolMetaDataMutationVariables } from 'src/gql/graphql';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Button from 'src/components/Button';
import TinyMceRichTextEditor from 'src/components/RichTextEditor/TinyMceRichTextEditor';
import { enqueueSnackbar } from 'notistack';
import ImageUploader from 'src/features/ImageUploader';

// it takes dynamic fields and gives response based on the fields

export const UploadImagesForm = ({ isEdit = false, tool }: { isEdit?: boolean; tool?: Tool }) => {
  const mutateUpdateTool = useGraphqlClientRequest<UpdateToolMutation, UpdateToolMutationVariables>(
    UpdateTool.loc?.source.body!,
  );

  const { mutateAsync: mutateUpdateToolAsync, isPending: isUpdateToolPending } = useMutation({
    mutationFn: mutateUpdateTool,
  });

  const mutateUpdateToolMetadata = useGraphqlClientRequest<UpdateToolMetaDataMutation, UpdateToolMetaDataMutationVariables>(
    UpdateToolMetaData.loc?.source.body!,
  );

  const { mutateAsync: mutateUpdateToolMetadataAsync, isPending: isUpdateToolMetadataPending } = useMutation({
    mutationFn: mutateUpdateToolMetadata,
  });


  const queryClient = useQueryClient();
  const [thumbnailUrl, setThumbnailUrl] = useState(tool?.data?.thumbnailUrl || '');
  const [ogImageUrl, setOgImageUrl] = useState(tool?.data?.toolMetadata?.ogImageUrl || '');
 

  const handleSaveThumbnail = () => {
    mutateUpdateToolAsync({
      toolId: Number(tool?.data?.id),
      data: {
        id: Number(tool?.data?.id),
        thumbnailUrl: thumbnailUrl,
     
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

  const handleSaveOgImage = () => {
    mutateUpdateToolMetadataAsync({
      
      updateToolMetaDataInput: {
        id: Number(tool?.data?.toolMetadata?.id),
        ogImageUrl: ogImageUrl,
     
      },
    }).then(res => {
      if (res.updateToolMetaData.data?.id) {
        enqueueSnackbar('Tool updated successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Tool updated failed', { variant: 'error' });
        queryClient.invalidateQueries({ queryKey: ['getToolBySlug', tool?.data?.slug] });
      }
    });
  };

  




  const handleThumbnailUrl = (url: string | null) => {
    setThumbnailUrl(url || '');
  };

  const handleOgImageUrl = (url: string | null) => {
    setOgImageUrl(url || '');
  };

  return (
    <div>
    <div className=" p-8">
      <div className="flex justify-start">
        <h2 className="text-2xl font-bold">Upload Thumbnail Image(300*300)</h2>
      </div>
      <div className="mt-4 h-auto w-full">
        <ImageUploader handleImageUrl={handleThumbnailUrl} imageUrl={thumbnailUrl} />
      </div>
      <div className="flex justify-end">
        <Button label="Save" type="button" onClick={handleSaveThumbnail} />
      </div>
    </div>
    <div className=" p-8">
      <div className="flex justify-start">
        <h2 className="text-2xl font-bold">Upload Og Image(1200*630)</h2>
      </div>
      <div className="mt-4 h-auto w-full">
        <ImageUploader handleImageUrl={handleOgImageUrl} imageUrl={ogImageUrl} />
      </div>
      <div className="flex justify-end">
        <Button label="Save" type="button" onClick={handleSaveOgImage} />
      </div>
    </div>
    </div>
  );
};
