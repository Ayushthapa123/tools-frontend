'use client';
import TextInput from 'src/features/react-hook-form/TextField';
import TextArea from 'src/features/react-hook-form/TextArea';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  CreateToolMetaData,
  CreateToolMetaDataMutation,
  CreateToolMetaDataMutationVariables,
  UpdateToolMetaData,
  UpdateToolMetaDataMutation,
  UpdateToolMetaDataMutationVariables,
  Tool,
  ToolMetadataData,
} from 'src/gql/graphql';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from 'src/store/userStore';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

export const SetMetadataForm = ({
  tool,
}: {
  tool?: Tool | null;
}) => {
  const { user } = useUserStore();
  const router = useRouter();

  const isEdit = tool?.data?.toolMetadata?.id ? true : false;
  
  const {
    handleSubmit,
    control,
    getValues,
  } = useForm<ToolMetadataData>({
    defaultValues: {
      title: tool?.data?.toolMetadata?.title ?? '',
      description: tool?.data?.toolMetadata?.description ?? '',
      keywords: tool?.data?.toolMetadata?.keywords ?? '',
      ogTitle: tool?.data?.toolMetadata?.ogTitle ?? '',
      ogDescription: tool?.data?.toolMetadata?.ogDescription ?? '',
      ogImageUrl: tool?.data?.toolMetadata?.ogImageUrl ?? '',
    },
  });

  const mutateCreateToolMetadata = useGraphqlClientRequest<
    CreateToolMetaDataMutation,
    CreateToolMetaDataMutationVariables
  >(CreateToolMetaData.loc?.source.body!);

  const { mutateAsync: mutateCreateToolMetadataAsync, isPending: isCreatePending } =
    useMutation({ mutationFn: mutateCreateToolMetadata });

  const mutateUpdateToolMetadata = useGraphqlClientRequest<
    UpdateToolMetaDataMutation,
    UpdateToolMetaDataMutationVariables
  >(UpdateToolMetaData.loc?.source.body!);

  const { mutateAsync: mutateUpdateToolMetadataAsync, isPending: isUpdatePending } =
    useMutation({ mutationFn: mutateUpdateToolMetadata });

  const handleSave = async (data:ToolMetadataData) => { 
    try {
      alert(JSON.stringify(data))
      const formData = getValues();
      alert(tool?.data?.id)
      
      if (isEdit && tool?.data?.id) {
        // Update existing tool metadata
        await mutateUpdateToolMetadataAsync({

          updateToolMetaDataInput: {
            id: Number(tool?.data?.toolMetadata?.id),
            title: formData.title || 'Untitled Tool',
            description: formData.description || '',
            keywords: formData.keywords || '',
            ogTitle: formData.ogTitle || formData.title || 'Untitled Tool',
            ogDescription: formData.ogDescription || formData.description || '',
            ogImageUrl: formData.ogImageUrl || '',

          },
        });
        
        enqueueSnackbar('Tool metadata updated successfully', { variant: 'success' });
        router.push(`/app/tool/${tool.data.slug}`);
      } else if (tool?.data?.id) {
        alert(tool.data.id)
        // Create new tool metadata for existing tool
        await mutateCreateToolMetadataAsync({
          createToolMetaDataInput: {
            title: formData.title || 'Untitled Tool',
            description: formData.description || '',
            keywords: formData.keywords || '',
            ogTitle: formData.ogTitle || formData.title || 'Untitled Tool',
            ogDescription: formData.ogDescription || formData.description || '',
            ogImageUrl: formData.ogImageUrl || '',
            toolId: Number(tool.data.id),
          },
        });
        
        enqueueSnackbar('Tool metadata created successfully', { variant: 'success' });
        router.push(`/app/tool/${tool.data.slug}`);
      } else {
        enqueueSnackbar('No tool found to associate metadata with', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error saving tool metadata:', error);
      enqueueSnackbar('An error occurred while saving', { variant: 'error' });
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tool Metadata</h3>
            
            <div className="w-full">
              <TextInput
                name="title"
                control={control}
                label="Tool Title"
                placeholder="Enter tool title"
                error={false}
                type="text"
                required
              />
            </div>
            
            <div className="w-full">
              <TextArea
                name="description"
                control={control}
                label="Description"
                placeholder="Enter tool description"
                error={false}
                rows={3}
                required
              />
            </div>
            
            <div className="w-full">
              <TextInput
                name="keywords"
                control={control}
                label="Keywords"
                placeholder="Enter keywords (comma separated)"
                error={false}
                type="text"
              />
            </div>
            
            <div className="w-full">
              <TextInput
                name="ogTitle"
                control={control}
                label="Open Graph Title"
                placeholder="Enter Open Graph title"
                error={false}
                type="text"
              />
            </div>
            
            <div className="w-full">
              <TextArea
                name="ogDescription"
                control={control}
                label="Open Graph Description"
                placeholder="Enter Open Graph description"
                error={false}
                rows={2}
              />
            </div>
            
            <div className="w-full">
              <TextInput
                name="ogImageUrl"
                control={control}
                label="Open Graph Image URL"
                placeholder="Enter Open Graph image URL"
                error={false}
                type="url"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button 
            label={isEdit ? "Update Metadata" : "Create Metadata"} 
            type="submit"
            loading={isEdit ? isUpdatePending : isCreatePending}
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
};
