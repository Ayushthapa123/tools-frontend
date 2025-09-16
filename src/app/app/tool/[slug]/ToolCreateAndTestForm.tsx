'use client';
import TextInput from 'src/features/react-hook-form/TextField';
import TextArea from 'src/features/react-hook-form/TextArea';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Button from 'src/components/Button';
import { Modal } from 'src/components/Modal';
import { Input } from 'src/components/Input';
import { Select } from 'src/components/Select';
import IconButton from 'src/components/IconButton';
import { FaTrash } from 'react-icons/fa';
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
  CreateToolInput,
  ToolType,
  ProcessGenericIoTextToImageGeminiMutation,
  ProcessGenericIoTextToImageGeminiMutationVariables,
  ProcessGenericIoTextToImageGemini,
} from 'src/gql/graphql';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from 'src/store/userStore';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { enumToOptions } from 'src/utils/enumToArray';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';

// it takes dynamic fields and gives response based on the fields

const toolTypeOptions= enumToOptions(ToolType)

export const ToolCreateAndTestForm = ({
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
  } = useForm<CreateToolInput & {custom_prompt: string, response_format: string}>({
    defaultValues: {
      name: tool?.data?.name ?? '',
      slug: tool?.data?.slug ?? '',
      shortDescription: tool?.data?.shortDescription ?? '',
      description: tool?.data?.description ?? '',
      handle: tool?.data?.handle ?? '',
      toolType: tool?.data?.toolType ?? '',

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

  const { mutateAsync:MutateAsyncProcessGenericIo, isPending:IsPendingProcessGenericIo } = useMutation({ mutationFn: mutateProcessGenericIo });

  const mutateProcessGenericIOTextToImageGemini = useGraphqlClientRequest<
    ProcessGenericIoTextToImageGeminiMutation,
    ProcessGenericIoTextToImageGeminiMutationVariables
  >(ProcessGenericIoTextToImageGemini.loc?.source.body!);

  const { mutateAsync:MutateAsyncProcessGenericIOTextToImageGemini, isPending:IsPendingProcessGenericIOTextToImageGemini } = useMutation({ mutationFn: mutateProcessGenericIOTextToImageGemini });


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
      // Prefer content-length if present (faster)
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
    
    const dataWithoutDescription = { ...data, description: '',name:"",slug:"", }; 
    const tooltype = data.toolType as ToolType; 
    if(!tooltype){
      enqueueSnackbar('Tool type is required', { variant: 'error' });
      return;
    }
    if(tooltype === ToolType.Io){
    MutateAsyncProcessGenericIo({
      input: {
        schema: [...customFields, ...prev],
        data: dataWithoutDescription,
      },
    }).then(res => {
      setHtmlResponse(res.processGenericIO.data?.htmlResponse || '');
    });
  }else if(tooltype === ToolType.IoTextToImage) {
    MutateAsyncProcessGenericIOTextToImageGemini({
      input: {
        schema: [...customFields, ...prev],
        data: dataWithoutDescription,
      },
    }).then(res => {
      setLowResolutionImage(res.processGenericIOTextToImageGemini.data?.lowResolutionImage || '');
      setMediumResolutionImage(res.processGenericIOTextToImageGemini.data?.mediumResolutionImage || '');
      setHighResolutionImage(res.processGenericIOTextToImageGemini.data?.highResolutionImage || '');
    });
  }
}

  const handleSave = () => {
    if (isEdit) {
      mutateUpdateToolAsync({
        toolId: Number(tool?.data?.id) || 0,
        data: {
          id: Number(tool?.data?.id) || 0,
          name: getValues('name'),
          slug: getValues('slug'), 
          toolType: getValues('toolType'),
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
          toolType: getValues('toolType'),
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

  return (
    <div className=" ">
      <form onSubmit={handleSubmit(onSubmit)}>
        {!viewOnly && <div>
          <div className="w-full">
            <TextInput
              name="name"
              control={control}
              label="Tool Name"
              placeholder="Enter Tool Name"
              error={false}
              type="text"
              required
              // type="number"
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
              // type="number"
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
          <div>
            <ReactSelect
              name="toolType"
              control={control}
              label="Tool Type"
              options={toolTypeOptions}
              error={false}
            />
          </div>
        </div>}
        <div className="border-b-1  w-full border-gray-300" />
       {!viewOnly && <h2>Users Input Fields</h2>}
        <div className="flex  w-min">
          {!viewOnly && <Button
            label="Add New Field"
            type="button"
            onClick={() => {
              setIsAddFieldModalOpen(true);
            }}
          />}
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
                    // here no space allowed
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
        </div>
        <div className="grid grid-cols-1 my-4">
          {customFields
            ?.filter(field => field.name !== 'custom_prompt' && field.name !== 'response_format')
            ?.map((field, index) => (
              <div key={index} className="flex  w-full">
                <div className="w-full">
                  <TextInput
                    name={field.name as keyof CreateToolInput} // fix this issue
                    control={control}
                    label={field.label}
                    placeholder={field.placeholder}
                    error={false}
                    type={field.type}
                    // type="number"
                  />
                </div>
               {!viewOnly && <div className="flex w-10 items-center justify-center  ">
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

        {!viewOnly && <div className="mt-8">
          <h2>Creators Guides For Better Response</h2>
          
        </div>}
        { !viewOnly && <div className="grid grid-cols-1">
          <TextArea
            name="custom_prompt"
            control={control}
            label="Custom Prompt"
            placeholder="Enter your custom prompt"
            error={false}
            rows={8}
          />
          <TextArea
            name="response_format"
            placeholder="Enter your response format"
            error={false}
            control={control}
            label="Response Format Guide"
            rows={3}
          />
        </div>}
        <Button label={viewOnly ? "Submit" : "Test Response"} type="submit" loading={IsPendingProcessGenericIo || IsPendingProcessGenericIOTextToImageGemini} />
      </form>
      <div className='mt-4 min-h-[300px]  shadow-lg rounded-lg p-2'>
        <h2>Output</h2>
        <div className='min-h-[300px] bg-slate-100'>
         
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
      <div>
        {!viewOnly && <Button label="Save" type="button" onClick={handleSave} />}
      </div>
    </div>
  );
};
