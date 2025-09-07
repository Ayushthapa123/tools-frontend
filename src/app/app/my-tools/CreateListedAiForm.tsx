'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import TextInput from 'src/features/react-hook-form/TextField';
import { useUserStore } from 'src/store/userStore';
import { useRouter } from 'next/navigation';
import {
  CreateListedAiToolInput,
  CreateListedAiToolMutation,
  CreateListedAiToolMutationVariables,
  AiType,
  Modality,
  PlatformType,
  PricingType,
  Delivery,
  IntegrationOption,
  CreateListedAiTool,
  Domain,
  ToolUserType,
  ListedAiToolData,
  AiCapability,
  UpdateListedAiTool,
  UpdateListedAiToolMutationVariables,
  UpdateListedAiToolMutation,
  ProductType,
  CreateListedAiToolAnonymousMutation,
  CreateListedAiToolAnonymous,
  CreateListedAiToolAnonymousMutationVariables,
  ListedBy,
} from 'src/gql/graphql';
import Checklist from 'src/components/CheckList';
import { enumToOptions } from 'src/utils/enumToArray';
import TextArea from 'src/features/react-hook-form/TextArea';

import AddableList from 'src/components/AddableList';
import ImageUploader from 'src/features/ImageUploader';

export const CreateListedAiForm = ({ tool, isPublic=false }: { tool: ListedAiToolData | undefined, isPublic?: boolean }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [logoUrl, setLogoUrl] = useState(tool?.logoUrl || '');


  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateListedAiToolInput>({
    defaultValues: {
      name: tool?.name || '',
      shortDescription: tool?.shortDescription || '',
      websiteUrl: tool?.websiteUrl || '',
      videoUrl: tool?.videoUrl || '',
      logoUrl: tool?.logoUrl || '',
      aiType: tool?.aiType || [],
      aiCapabilities: tool?.aiCapabilities || [],
      modalities: tool?.modalities || [],
      platforms: tool?.platforms || [],
      pricingType: tool?.pricingType || [],
      delivery: tool?.delivery || [],
      integrationOptions: tool?.integrationOptions || [],
      keywords: tool?.keywords || [],
      domains: tool?.domains || [],
      useCases: tool?.useCases || [],
      toolUserTypes: tool?.toolUserTypes || [],
      featured: tool?.featured || false,
      verified: tool?.verified || false,
      popularityScore: tool?.popularityScore || 33,
      productType: tool?.productType || [], 
      features: tool?.features || [], 
      usps: tool?.usps || [],
    },
  });


  const mutateCreateAiTool = useGraphqlClientRequest<
    CreateListedAiToolMutation,
    CreateListedAiToolMutationVariables
  >(CreateListedAiTool.loc?.source?.body!);

  const { mutateAsync: createAiTool, isPending: isLoading } = useMutation({
    mutationFn: mutateCreateAiTool,
  }); 
  // anonymous mutation 
  const mutateCreateAiToolAnonymous = useGraphqlClientRequest<
  CreateListedAiToolAnonymousMutation,
  CreateListedAiToolAnonymousMutationVariables
>(CreateListedAiToolAnonymous.loc?.source?.body!);

const { mutateAsync: createAiToolAnonymous, isPending: isLoadingAnonymous } = useMutation({
  mutationFn: mutateCreateAiToolAnonymous,
}); 

  const mutateUpdateAiTool = useGraphqlClientRequest<
    UpdateListedAiToolMutation,
    UpdateListedAiToolMutationVariables
  >(UpdateListedAiTool.loc?.source?.body!);

  const { mutateAsync: updateAiTool, isPending: isUpdating } = useMutation({
    mutationFn: mutateUpdateAiTool,
  });

  const handleSubmit = async (data: CreateListedAiToolInput) => {

    try {
      if(!tool?.id){
        alert('calling create mutation');
      // if user logged in
      if(user?.userId){
      const res = await createAiTool({
        data: {
          ...data,
          logoUrl: logoUrl || data.logoUrl,
        },
      });

      if (res?.createListedAiTool?.data?.id) {
        enqueueSnackbar('AI Tool listed successfully.', { variant: 'success' });
        router.push('/app/my-tools');
        queryClient.refetchQueries();
      } else {
        enqueueSnackbar('Something went wrong.', { variant: 'error' });
      } 

    }else {
      alert('calling anonymous mutation');
      // if user not logged in 
      // call different mutation createAiToolAnonymous
      const resAnonymous = await createAiToolAnonymous({
        data: {
          ...data,
          logoUrl: logoUrl || data.logoUrl,
        },
      });

      if (resAnonymous?.createListedAiToolAnonymously?.data?.id) {
        enqueueSnackbar('AI Tool listed successfully.', { variant: 'success' });
        // after 3 seconds redirect to login
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        enqueueSnackbar('Something went wrong.', { variant: 'error' });
      }
    }
    }else{
      const res = await updateAiTool({
        toolId: Number(tool.id),
        data: {
          ...data, 
          id: Number(tool.id),
          logoUrl: logoUrl || data.logoUrl,
        },
      });
      if (res?.updateListedAiTool?.data?.id) {
        enqueueSnackbar('AI Tool updated successfully.', { variant: 'success' });
        router.push('/app/my-tools');
        queryClient.refetchQueries();
      } else {
        enqueueSnackbar('Something went wrong.', { variant: 'error' });
      }
    }
    } catch (err) {
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  
  };


  return (
    <div>
      <form className=" w-full flex-col" onSubmit={handleSubmitForm(handleSubmit)}>
        <div className="hide-scrollbar flex-grow overflow-y-auto">
          { !isPublic && <div className="my-8 flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold text-gray-500">List Your AI Tool</h3>
            <p className="mt-2 text-center text-gray-600">
              Share your AI tool with the community and help others discover innovative solutions
            </p>
          </div>}

          <div className="grid w-full gap-6">
            {/* Core Identity - Most Important */}
            <div className="grid w-full gap-4 md:grid-cols-2">
              <div>
                <TextInput
                  name="name"
                  type="text"
                  placeholder="AI Tool Name"
                  control={control}
                  label="Tool Name"
                  required
                  helpertext={errors.name?.type === 'required' ? 'Tool name is required' : ''}
                  error={!!errors.name}
                />
              </div>
              <div>
                <TextInput
                  name="websiteUrl"
                  type="url"
                  placeholder="https://your-tool.com"
                  control={control}
                  label="Website URL"
                  required
                  helpertext={
                    errors.websiteUrl?.type === 'required' ? 'Website URL is required' : ''
                  }
                  error={!!errors.websiteUrl}
                />
              </div>
            </div>
            <div>
              <Checklist
                label="Select Product Type"
                items={enumToOptions(ProductType)}
                onChange={selected => {
                  if (selected.length > 0) {
                    setValue('productType', selected as ProductType[]);
                  }
                }}
                defaultValue={watch('productType')}
              />
            </div>

            {/* AI Type Selection - Critical for categorization */}
            <div>
              <Checklist
                label="Select AI Type"
                items={enumToOptions(AiType)}
                onChange={selected => {
                  if (selected.length > 0) {
                    setValue('aiType', selected as AiType[]);
                  }
                }}
                defaultValue={watch('aiType')}
              />
            </div>

            {/* Description - Essential for understanding the tool */}
            <div>
              <TextArea
                name="shortDescription"
                placeholder="Enter a short description of your AI tool (max 30 words)"

                error={!!errors.shortDescription}

                control={control} 
                required
                label="Short Description" 
                rows={2}
               
             
              />
            </div>
            <div>
                <TextInput
                  name="videoUrl"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  control={control}
                  label="Demo Video URL(Youtube)"
                  // required
                  helpertext={
                    errors.videoUrl?.type === 'required' ? 'Video URL is required' : ''
                  }
                  error={!!errors.videoUrl}
                />
              </div>

            {/* Core Functionality - High Importance */}
            <div className="grid w-full gap-6">
              <div>
                <Checklist
                  label="Select Platforms"
                  items={enumToOptions(PlatformType)}
                  onChange={selected => setValue('platforms', selected as PlatformType[])}
                  defaultValue={watch('platforms')}
                />
              </div>
              <div>
                <Checklist
                  label="Select Modalities"
                  items={enumToOptions(Modality)}
                  onChange={selected => setValue('modalities', selected as Modality[])}
                  defaultValue={watch('modalities')}
                />
              </div>
            </div>

            {/* Business Model - Important for users */}
            <div className="grid w-full gap-6">
              <div>
                <Checklist
                  label="Select Pricing Model"
                  items={enumToOptions(PricingType)}
                  onChange={selected => {
                    if (selected.length > 0) {
                      setValue('pricingType', selected as PricingType[]);
                    }
                  }}
                  defaultValue={watch('pricingType')}
                />
              </div>
              <div>
                <Checklist
                  label="Select Delivery Methods"
                  items={enumToOptions(Delivery)}
                  onChange={selected => setValue('delivery', selected as Delivery[])}
                  defaultValue={watch('delivery')}
                />
              </div>
            </div>

            {/* Integration Options - Technical Details */}
            <div>
              <Checklist
                label="Select Integration Options"
                items={enumToOptions(IntegrationOption)}
                onChange={selected =>
                  setValue('integrationOptions', selected as IntegrationOption[])
                }
                defaultValue={watch('integrationOptions')}
              />
            </div>
            {/* Visual Identity - Medium Importance */}
         
            <div>
              <Checklist
                label="What are the domains of your AI tool?"
                items={enumToOptions(Domain)}
                onChange={selected =>
                  setValue(
                    'domains',
                    selected as Domain[]
                    
                  )
                } 
                defaultValue={watch('domains')}
              />
            </div>
            <div>
              <Checklist
                label="What are the capabilities of your AI tool?"
                items={enumToOptions(AiCapability)}
                onChange={selected =>
                  setValue(
                    'aiCapabilities',
                    selected as AiCapability[]
                    
                  )
                } 
                defaultValue={watch('aiCapabilities')}
              />
            </div>
            <div>
              <Checklist
                label="Who are the target users of your AI tool?"
                items={enumToOptions(ToolUserType)}
                onChange={selected =>
                  setValue(
                    'toolUserTypes',
                    selected as ToolUserType[]
                  )
                }
                defaultValue={watch('toolUserTypes')}
              />
            </div>
            <div>
              <AddableList
                label="Best Use Cases"
                items={[]}
                onChange={selected =>
                  setValue(
                    'useCases',
                    selected as string[]
                  )
                }
                defaultValues={watch('useCases')}
              />
            </div>
            <div className="w-full bg-base-100 p-4 rounded-lg">
              <p className="text-lg font-semibold">Logo/Thumbnail</p>
              <ImageUploader
                handleImageUrl={url => setLogoUrl(url || '')}
                imageUrl={logoUrl || ''}
              />
            </div>
            {!user.userId && <div>
                <TextInput
                  name="ownerEmail"
                  type="text"
                  placeholder="owner@example.com"
                  control={control}
                  label="Owner Email" 
                  defaultValue={user.userEmail}
                  required
                  helpertext={errors.ownerEmail?.type === 'required' ? 'Owner email is required' : ''}
                  error={!!errors.ownerEmail} 

                />
              </div>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Button
            label="Cancel"
            variant="outlined"
            className="w-min text-gray-700"
            onClick={() => {
              // @ts-ignore
              document.getElementById('my_modal_4')?.close();
              router.push('/app/my-tools');
            }}
            type="button"
          />
          <Button label={tool?.id ? "Update AI Tool" : "List my AI Tool"} type="submit" loading={isLoading || isUpdating || isLoadingAnonymous} className="w-min" />
        </div>
      </form>
    </div>
  );
};
