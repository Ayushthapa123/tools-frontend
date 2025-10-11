'use client';
import TextInput from 'src/features/react-hook-form/TextField';
import TextArea from 'src/features/react-hook-form/TextArea';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import { Modal } from 'src/components/Modal';
import { Input } from 'src/components/Input';
import { Select } from 'src/components/Select';
import IconButton from 'src/components/IconButton';
import { FaTrash, FaCopy, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaLink, FaSave } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  CreateTool,
  CreateToolMutation,
  CreateToolMutationVariables,
  ProcessGenericIo,
  ProcessGenericIoMutation,
  ProcessGenericIoMutationVariables,
  CreateInputSchemaMutation,
  CreateInputSchemaMutationVariables,
  CreateInputSchema,
  Tool,
  UpdateToolMutation,
  UpdateToolMutationVariables,
  UpdateTool,
  UpdateInputSchemaMutation,
  UpdateInputSchemaMutationVariables,
  UpdateInputSchema,
  ToolType,
  ProcessGenericIoTextToImageGemini,
  ProcessGenericIoTextToImageGeminiMutation,
  ProcessGenericIoTextToImageGeminiMutationVariables,
  UserType,
  CreateSavedToolMutationVariables,
  CreateSavedTool,
  CreateSavedToolMutation,
} from 'src/gql/graphql';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from 'src/store/userStore';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

// it takes dynamic fields and gives response based on the fields

export const ToolExecuteForm = ({
  isEdit = false,
  tool,
  viewOnly = false,
}: {
  isEdit?: boolean;
  tool?: Tool;
  viewOnly?: boolean;
}) => {
  const { user } = useUserStore();
  const router = useRouter();
  // half input and half output
  const {
    handleSubmit,
    control,
    getValues,
  } = useForm<any>({
    defaultValues: {
      name: tool?.data?.name ?? '',
      slug: tool?.data?.slug ?? '',
      shortDescription: tool?.data?.shortDescription ?? '',
      description: tool?.data?.description ?? '',
      handle: tool?.data?.handle ?? '',
      custom_prompt:
        JSON.parse(tool?.data?.inputSchema?.schema ?? '[]')?.find(
          (item: any) => item.name === 'custom_prompt',
        )?.value ?? '',
      response_format:
        JSON.parse(tool?.data?.inputSchema?.schema ?? '[]')?.find(
          (item: any) => item.name === 'response_format',
        )?.value ?? '',
    },
  });

  type Field = {
    name: string;
    label: string;
    placeholder: string;
    type:
      | 'text'
      | 'number'
      | 'email'
      | 'phone'
      | 'date'
      | 'time'
      | 'checkbox'
      | 'radio'
      | 'select'
      | 'textarea';
  };

  const [customFields, setCustomFields] = useState<Field[]>(
    isEdit ? (JSON.parse(tool?.data?.inputSchema?.schema ?? '[]') as Field[]).filter(field => field.name !== 'custom_prompt' && field.name !== 'response_format') : [],
  );
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [executeCount, setExecuteCount] = useState(0);



  const handleAddField = (field: Field) => {
    setCustomFields([...customFields, field]);
    setIsAddFieldModalOpen(false);
  };
  const [currentField, setCurrentField] = useState<Field>({
    name: '',
    label: '',
    placeholder: '',
    type: 'text',
  });
  const mutateProcessGenericIo = useGraphqlClientRequest<
    ProcessGenericIoMutation,
    ProcessGenericIoMutationVariables
  >(ProcessGenericIo.loc?.source.body!);

  const { mutateAsync, isPending } = useMutation({ mutationFn: mutateProcessGenericIo });

  const mutateProcessGenericIOTextToImageGemini = useGraphqlClientRequest<
    ProcessGenericIoTextToImageGeminiMutation,
    ProcessGenericIoTextToImageGeminiMutationVariables
  >(ProcessGenericIoTextToImageGemini.loc?.source.body!);

  const { mutateAsync: mutateAsyncTextToImage, isPending: isPendingTextToImage } = useMutation({ mutationFn: mutateProcessGenericIOTextToImageGemini });

  const mutateCreateTool = useGraphqlClientRequest<CreateToolMutation, CreateToolMutationVariables>(
    CreateTool.loc?.source.body!,
  );

  const { mutateAsync: mutateCreateToolAsync, isPending: isCreateToolPending } = useMutation({
    mutationFn: mutateCreateTool,
  });

  const mutateUpdateTool = useGraphqlClientRequest<UpdateToolMutation, UpdateToolMutationVariables>(
    UpdateTool.loc?.source.body!,
  );

  const { mutateAsync: mutateUpdateToolAsync, isPending: isUpdateToolPending } = useMutation({
    mutationFn: mutateUpdateTool,
  });

  const mutateCreateInputSchema = useGraphqlClientRequest<
    CreateInputSchemaMutation,
    CreateInputSchemaMutationVariables
  >(CreateInputSchema.loc?.source.body!);

  const { mutateAsync: mutateCreateInputSchemaAsync, isPending: isCreateInputSchemaPending } =
    useMutation({ mutationFn: mutateCreateInputSchema });

  const mutateUpdateInputSchema = useGraphqlClientRequest<
    UpdateInputSchemaMutation,
    UpdateInputSchemaMutationVariables
  >(UpdateInputSchema.loc?.source.body!);

  const { mutateAsync: mutateUpdateInputSchemaAsync, isPending: isUpdateInputSchemaPending } =
    useMutation({ mutationFn: mutateUpdateInputSchema });

  const mutateCreateSavedTool = useGraphqlClientRequest<CreateSavedToolMutation, CreateSavedToolMutationVariables>(
    CreateSavedTool.loc?.source.body!);

  const { mutateAsync: mutateCreateSavedToolAsync, isPending: isCreateSavedToolPending } = useMutation({ mutationFn: mutateCreateSavedTool });

const createSavedTool = () => {
  mutateCreateSavedToolAsync({
    createSavedToolInput: {
      toolId: Number(tool?.data?.id) || 0,
      userId: user?.userId || 0,
    },
  }).then(res => {
    enqueueSnackbar(' tool saved successfully', { variant: 'success' });
  }).catch(err => {
    enqueueSnackbar('Failed to save saved tool', { variant: 'error' });
  });
};

  const [htmlResponse, setHtmlResponse] = useState<string>('');
  const [lowResolutionImage, setLowResolutionImage] = useState<string>('');
  const [mediumResolutionImage, setMediumResolutionImage] = useState<string>('');
  const [highResolutionImage, setHighResolutionImage] = useState<string>('');

  const [imageMetaByUrl, setImageMetaByUrl] = useState<Record<string, { width: number; height: number; bytes: number }>>({});

  const formatBytes = (bytes: number): string => {
    if (!bytes || bytes < 0) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let idx = 0;
    while (size >= 1024 && idx < units.length - 1) {
      size /= 1024;
      idx++;
    }
    return `${size.toFixed(size < 10 && idx > 0 ? 2 : 0)} ${units[idx]}`;
  };

  const loadImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
      img.src = url;
    });
  };

  const fetchImageBytes = async (url: string): Promise<number> => {
    try {
      const response = await fetch(url, { method: 'GET', cache: 'no-store' });
      if (!response.ok) return 0;
      const contentLength = response.headers.get('content-length');
      if (contentLength) return Number(contentLength) || 0;
      const blob = await response.blob();
      return blob.size || 0;
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    const urls = [lowResolutionImage, mediumResolutionImage, highResolutionImage].filter(Boolean) as string[];
    if (urls.length === 0) return;

    let isCancelled = false;

    (async () => {
      const results = await Promise.all(
        urls.map(async (url) => {
          try {
            const [dims, bytes] = await Promise.all([
              loadImageDimensions(url),
              fetchImageBytes(url),
            ]);
            return { url, width: dims.width, height: dims.height, bytes };
          } catch {
            return { url, width: 0, height: 0, bytes: 0 };
          }
        })
      );

      if (isCancelled) return;
      setImageMetaByUrl(prev => {
        const next = { ...prev };
        for (const r of results) {
          next[r.url] = { width: r.width, height: r.height, bytes: r.bytes };
        }
        return next;
      });
    })();

    return () => {
      isCancelled = true;
    };
  }, [lowResolutionImage, mediumResolutionImage, highResolutionImage]);

  // Function to copy API response to clipboard
  const copyToClipboard = async () => {
    try {
      // Create a temporary div to extract text content from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlResponse;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      if (textContent.trim()) {
        await navigator.clipboard.writeText(textContent);
        enqueueSnackbar('Response copied to clipboard!', { variant: 'success' });
      } else {
        enqueueSnackbar('No response to copy', { variant: 'warning' });
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
      enqueueSnackbar('Failed to copy response', { variant: 'error' });
    }
  };

  // Function to copy tool link to clipboard
  const copyToolLink = async () => {
    try {
      const toolUrl = `${window.location.origin}/app/tool/${tool?.data?.slug}`;
      await navigator.clipboard.writeText(toolUrl);
      enqueueSnackbar('Tool link copied to clipboard!', { variant: 'success' });
      setIsShareModalOpen(false);
    } catch (err) {
      console.error('Failed to copy link: ', err);
      enqueueSnackbar('Failed to copy link', { variant: 'error' });
    }
  };

  // Function to share on Twitter
  const shareOnTwitter = () => {
    const toolUrl = `${window.location.origin}/app/tool/${tool?.data?.slug}`;
    const text = `Check out this AI tool: ${tool?.data?.name}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(toolUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setIsShareModalOpen(false);
  };

  // Function to share on Facebook
  const shareOnFacebook = () => {
    const toolUrl = `${window.location.origin}/app/tool/${tool?.data?.slug}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(toolUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setIsShareModalOpen(false);
  };

  // Function to share on LinkedIn
  const shareOnLinkedIn = () => {
    const toolUrl = `${window.location.origin}/app/tool/${tool?.data?.slug}`;
    const text = `Check out this AI tool: ${tool?.data?.name}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(toolUrl)}&title=${encodeURIComponent(text)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
    setIsShareModalOpen(false);
  };

  const prev = [
    {
      name: 'custom_prompt',
      label: 'Custom Prompt',
      placeholder: 'Enter your custom prompt',
      type: 'textarea',
      value:getValues('custom_prompt')
    },
    {
      name: 'response_format',
      label: 'Response Format Guide',
      placeholder: 'Enter your response format',
      type: 'textarea',
      value:getValues('response_format')
    },
  ];
  const onSubmit = (data: any) => {
    const dataWithoutDescription = { ...data, description: '',name:"" };
    const toolType = tool?.data?.toolType as ToolType | undefined;
    if (!toolType) {
      enqueueSnackbar('Tool type is missing for this tool', { variant: 'error' });
      return;
    }
    // set expires date 24 hours from now
    const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem('expiresAt', expiresAt.toString());
    localStorage.setItem('executeCount', (executeCount + 1).toString());
    if (toolType === ToolType.Io) {
      mutateAsync({
        input: {
          schema: [...customFields, ...prev],
          data: dataWithoutDescription,
        },
      }).then(res => {
        setHtmlResponse(res.processGenericIO.data?.htmlResponse || '');
        setLowResolutionImage('');
        setMediumResolutionImage('');
        setHighResolutionImage('');
      });
    } else if (toolType === ToolType.IoTextToImage) {
      mutateAsyncTextToImage({
        input: {
          schema: [...customFields, ...prev],
          data: dataWithoutDescription,
        },
      }).then(res => {
        setHtmlResponse('');
        setLowResolutionImage(res.processGenericIOTextToImageGemini.data?.lowResolutionImage || '');
        setMediumResolutionImage(res.processGenericIOTextToImageGemini.data?.mediumResolutionImage || '');
        setHighResolutionImage(res.processGenericIOTextToImageGemini.data?.highResolutionImage || '');
      });
    }
  };

  const handleSave = () => {
    if (isEdit) {
      mutateUpdateToolAsync({
        toolId: Number(tool?.data?.id) || 0,
        data: {
          id: Number(tool?.data?.id) || 0,
          name: getValues('name'),
          slug: getValues('slug'),
          shortDescription: getValues('shortDescription'),
          description: getValues('description'),
          handle: getValues('handle'),
        },
      }).then(res => {
        enqueueSnackbar('Tool updated successfully', { variant: 'success' });
        mutateUpdateInputSchemaAsync({
          data: {
            id: Number(tool?.data?.inputSchema?.id) || 0,
            schema: JSON.stringify([...customFields, {name:'custom_prompt',value:getValues('custom_prompt')}, {name:'response_format',value:getValues('response_format')}]),
          },
        }).then(res => {
          enqueueSnackbar('Input schema updated successfully', { variant: 'success' });
        });
        router.push(`/app/tool/${tool?.data?.slug}`);
      });
    } else {
      mutateCreateToolAsync({
        data: {
          name: getValues('name'),
          slug: getValues('slug'),
          shortDescription: getValues('shortDescription'),
          ownerId: user?.userId || 0,
          description: '',
        },
      }).then(res => {
        if (res.createTool.error) {
          enqueueSnackbar(res.createTool.error.message, { variant: 'error' });
          return;
        } else {
          enqueueSnackbar('Tool created successfully', { variant: 'success' });
        }

        mutateCreateInputSchemaAsync({
          data: {
            toolId: Number(res.createTool.data?.id) || 0,
            schema: JSON.stringify([...customFields, {name:'custom_prompt',value:getValues('custom_prompt')}, {name:'response_format',value:getValues('response_format')}]),
          },
        }).then(ress => {
          // snackbar success
          enqueueSnackbar('Input schema created successfully', { variant: 'success' });

          // then redirect it to the slug
          router.push(`/app/tool/${res.createTool.data?.slug}`);
        });
      });
    }
  };


  useEffect(() => {
    const executeCount = localStorage.getItem('executeCount'); 
    const expiresAt = localStorage.getItem('expiresAt'); 
    const currentTime = new Date().getTime(); 
    if(expiresAt && currentTime > Number(expiresAt)) {
      localStorage.removeItem('executeCount');
      localStorage.removeItem('expiresAt');
      setExecuteCount(0);
    }
    if (executeCount) {
      setExecuteCount(Number(executeCount));
    }
  }, [executeCount]);

  const isDisabled = (isPending || isPendingTextToImage || executeCount > 0) && (tool?.data?.toolType === ToolType.IoTextToImage) && (tool.data?.ownerId === 1) ;

  return (
    <div className="w-full  px-4 md:px-6 bg-gray-50">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-96px)] relative ">
        <div className='md:col-span-4 h-full'>
          <div className="h-[calc(100vh-96px)] rounded-xl border border-gray-200 bg-white shadow-sm md:pr-3 overflow-y-auto ">
          <div className="flex items-start justify-between gap-3 p-4 pb-0">
            <div className="min-w-0">
              <h1 className="text-lg font-semibold truncate">{tool?.data?.name || 'Execute Tool'}</h1>
              {tool?.data?.shortDescription && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tool?.data?.shortDescription}</p>
              )}
            </div>
            {!viewOnly && (
              <Button label="Save" type="button" onClick={handleSave} />
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='relative space-y-4 h-full p-4'>
            {!viewOnly && <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="w-full">
                <TextInput
                  name="name"
                  control={control}
                  label="Tool Name"
                  placeholder="Enter Tool Name"
                  error={false}
                  type="text"
                  required
                />
              </div>
              <div className="w-full">
                <TextInput
                  name="slug"
                  control={control}
                  label="Slug"
                  placeholder="Enter Tool Slug"
                  error={false}
                  type="text"
                  required
                />
              </div>
              <div className="w-full">
                <TextArea
                  name="shortDescription"
                  control={control}
                  label="Short Description"
                  placeholder="Enter your short description"
                  error={false}
                  rows={3}
                />
              </div>
            </div>}

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
             {!viewOnly && <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-medium">Users Input Fields</h2>
                <Button
                  label="Add Field"
                  type="button"
                  onClick={() => setIsAddFieldModalOpen(true)}
                />
              </div>}

              <div>
                <Modal
                  open={isAddFieldModalOpen}
                  onSave={() => {
                    handleAddField(currentField);
                  }}
                  handleClose={() => {
                    setIsAddFieldModalOpen(false);
                    setCurrentField({
                      name: '',
                      label: '',
                      placeholder: '',
                      type: 'text',
                    });
                  }}>
                  <div>
                    <h2>Add New Field</h2>
                    <div>
                      <Input
                        name="name"
                        label="Field Name"
                        placeholder="Enter field name"
                        error={false}
                        value={currentField.name}
                        onChange={e => {
                          const value = e.target.value.replace(/\s/g, '');
                          setCurrentField({
                            ...currentField,
                            name: value,
                          });
                        }}
                      />
                      <Input
                        name="label"
                        label="Field Label"
                        placeholder="Enter field label"
                        value={currentField.label}
                        error={false}
                        onChange={e => {
                          setCurrentField({
                            ...currentField,
                            label: e.target.value,
                          });
                        }}
                      />
                      <Input
                        name="placeholder"
                        label="Field Placeholder"
                        placeholder="Enter field placeholder"
                        value={currentField.placeholder}
                        error={false}
                        onChange={e => {
                          setCurrentField({
                            ...currentField,
                            placeholder: e.target.value,
                          });
                        }}
                      />
                      <Select
                        name="type"
                        label="Field Type"
                        value={currentField.type}
                        options={[
                          { label: 'Text', value: 'text' },
                          { label: 'Number', value: 'number' },
                        ]}
                        onChange={e => {
                          setCurrentField({
                            ...currentField,
                            type: e.target.value as
                              | 'text'
                              | 'number'
                              | 'email'
                              | 'phone'
                              | 'date'
                              | 'time'
                              | 'checkbox'
                              | 'radio'
                              | 'select'
                              | 'textarea',
                          });
                        }}
                      />
                    </div>
                  </div>
                </Modal>
              </div>

              {/* Share Modal */}
              <div>
                <Modal
                  open={isShareModalOpen}
                  onSave={() => {}}
                  handleClose={() => {
                    setIsShareModalOpen(false);
                  }}
                  title="Share Tool"
                  showSaveButton={false}
                >
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Share &quot;{tool?.data?.name}&quot;
                      </h3>
                      <p className="text-sm text-gray-500">
                        Choose how you&apos;d like to share this tool
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-primary">
                      <button
                        onClick={copyToolLink} 
                        type="button"
                        className="flex items-center justify-center gap-2 p-3 border  text-primary rounded-lg  hover:bg-gray-50  "
                      >
                        <FaLink className="" />
                        <span className="text-sm font-medium">Copy Link</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={shareOnTwitter}
                        className="flex items-center justify-center gap-2 p-3 border  text-primary rounded-lg hover:bg-gray-50  "
                      >
                        <FaTwitter className="text-blue-400" />
                        <span className="text-sm font-medium">Twitter</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={shareOnFacebook}
                        className="flex items-center justify-center gap-2 p-3 border  text-primary  rounded-lg hover:bg-gray-50  "
                      >
                        <FaFacebook className="text-blue-600" />
                        <span className="text-sm font-medium">Facebook</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={shareOnLinkedIn}
                        className="flex items-center justify-center gap-2 p-3 border  text-primary rounded-lg hover:bg-gray-50  "
                      >
                        <FaLinkedin className="text-blue-700" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>

              <div className="grid grid-cols-1 gap-3 my-2">
                {customFields
                  ?.filter(field => field.name !== 'custom_prompt' && field.name !== 'response_format')
                  ?.map((field, index) => (
                    <div key={index} className="flex w-full">
                      <div className="w-full">
                        <TextInput
                          name={field.name}
                          control={control}
                          label={field.label}
                          placeholder={field.placeholder}
                          error={false}
                          type={field.type}
                        />
                      </div>
                     {!viewOnly && <div className="flex w-10 items-center justify-center">
                        <IconButton
                          onClick={() => {
                            setCustomFields(customFields.filter((_, i) => i !== index));
                          }}>
                          <FaTrash className="text-red" />
                        </IconButton>
                      </div>}
                    </div>
                  ))}
              </div>
            </div>

            {!viewOnly && <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-base font-medium mb-3">Creator Guides</h2>
              <div className="grid grid-cols-1 gap-4">
                <TextArea
                  name="custom_prompt"
                  control={control}
                  label="Custom Prompt"
                  placeholder="Enter your custom prompt"
                  error={false}
                  rows={6}
                />
                <TextArea
                  name="response_format"
                  placeholder="Enter your response format"
                  error={false}
                  control={control}
                  label="Response Format Guide"
                  rows={3}
                />
              </div>
            </div>}

            <div className="flex items-center gap-3 pt-2 pb-1 sticky bottom-0 bg-white">
              <Button label={viewOnly ? "Submit" : "Test Response"} type="submit" loading={isPending || isPendingTextToImage} disabled={isDisabled} />
            </div>
            <div>
             {executeCount > 1 && !user.userId && <p className="text-sm text-gray-500">Please Login/Signup for more credits.</p>}
            </div>
          </form>
          </div>
        </div>

        <div className='md:col-span-8  overflow-y-scroll bg-white border border-gray-200 rounded-xl'>
          <div className=' rounded-xl  p-4 shadow-sm md:pl-3 '>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 w-full'>
                <div className=' flex-grow'>
                <h2 className="text-base font-medium">Output</h2> 
                </div>
                <div className="flex items-center gap-2">
                <IconButton
                    onClick={() => createSavedTool()}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaSave className="text-lg" />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsShareModalOpen(true)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaShare className="text-lg" />
                  </IconButton>
                  {htmlResponse && (
                    <IconButton
                      onClick={copyToClipboard}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <FaCopy className="text-lg" />
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
            <div className='relative h-full'>
              <div className='  bg-slate-50 rounded-md p-3  h-full'>
                <div dangerouslySetInnerHTML={{ __html: htmlResponse }} />
                {(lowResolutionImage || mediumResolutionImage || highResolutionImage) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                    {[
                      { url: lowResolutionImage, label: 'Low' },
                      { url: mediumResolutionImage, label: 'Medium' },
                      { url: highResolutionImage, label: 'High' },
                    ]
                      .filter(item => !!item.url)
                      .map(item => (
                        <div key={item.label} className="bg-white rounded-lg border shadow-sm p-2 flex flex-col">
                          <a href={item.url as string} target="_blank" rel="noreferrer" className="block">
                            <img
                              src={item.url as string}
                              alt={`${item.label} Resolution Image`}
                              className="w-full h-64 object-contain rounded-md bg-gray-50"
                            />
                          </a>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-600">
                              {item.label} Resolution
                              {imageMetaByUrl[item.url as string] && (
                                <>
                                  {' '}
                                  <span className="text-gray-400">•</span>{' '}
                                  <span>
                                    {imageMetaByUrl[item.url as string].width}×{imageMetaByUrl[item.url as string].height}
                                  </span>
                                  {' '}
                                  <span className="text-gray-400">•</span>{' '}
                                  <span>
                                    {formatBytes(imageMetaByUrl[item.url as string].bytes)}
                                  </span>
                                </>
                              )}
                            </span>
                            <a
                              href={item.url as string}
                              download
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
