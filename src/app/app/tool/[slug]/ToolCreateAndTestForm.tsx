'use client';
import TextInput from 'src/features/react-hook-form/TextField';
import TextArea from 'src/features/react-hook-form/TextArea';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
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
} from 'src/gql/graphql';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from 'src/store/userStore';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

// it takes dynamic fields and gives response based on the fields

export const ToolCreateAndTestForm = ({
  isEdit = false,
  tool,
}: {
  isEdit?: boolean;
  tool?: Tool;
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
      shortDescription: tool?.data?.shortDescription ?? '',
      description: tool?.data?.description ?? '',
      handle: tool?.data?.handle ?? '',
      custom_prompt:
        JSON.parse(tool?.data?.inputSchema?.schema ?? '[]')?.find(
          (item: any) => item.name === 'custom_prompt',
        )?.placeholder ?? '',
      response_format:
        JSON.parse(tool?.data?.inputSchema?.schema ?? '[]')?.find(
          (item: any) => item.name === 'response_format',
        )?.placeholder ?? '',
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

  const { mutateAsync, isPending } = useMutation({ mutationFn: mutateProcessGenericIo });

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

  const prev = [
    {
      name: 'custom_prompt',
      label: 'Custom Prompt',
      placeholder: 'Enter your custom prompt',
      type: 'textarea',
    },
    {
      name: 'response_format',
      label: 'Response Format Guide',
      placeholder: 'Enter your response format',
      type: 'textarea',
    },
  ];
  const onSubmit = (data: any) => {
    mutateAsync({
      input: {
        schema: [...customFields, ...prev],
        data: data,
      },
    }).then(res => {
      setHtmlResponse(res.processGenericIO.data?.htmlResponse || '');
    });
  };

  const handleSave = () => {
    if (isEdit) {
      mutateUpdateToolAsync({
        toolId: Number(tool?.data?.id) || 0,
        data: {
          id: Number(tool?.data?.id) || 0,
          name: getValues('name'),
          shortDescription: getValues('shortDescription'),
          description: getValues('description'),
          handle: getValues('handle'),
        },
      }).then(res => {
        enqueueSnackbar('Tool updated successfully', { variant: 'success' });
        mutateUpdateInputSchemaAsync({
          data: {
            id: Number(tool?.data?.inputSchema?.id) || 0,
            schema: JSON.stringify([...customFields, ...prev]),
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
            schema: JSON.stringify([...customFields, ...prev]),
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
    <div className=" p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
            <TextArea
              name="shortDescription"
              control={control}
              label="Short Description"
              placeholder="Enter your short description"
              error={false}
              rows={3}
            />
          </div>
        </div>
        <div className="border-b-1 my-4 w-full border-gray-300" />
        <h2>Users Input Fields</h2>
        <div className="flex  w-min">
          <Button
            label="Add New Field"
            type="button"
            onClick={() => {
              setIsAddFieldModalOpen(true);
            }}
          />
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
        <div className="grid grid-cols-1">
          {customFields
            ?.filter(field => field.name !== 'custom_prompt' && field.name !== 'response_format')
            ?.map((field, index) => (
              <div key={index} className="flex  w-full">
                <div className="w-full">
                  <TextInput
                    name={field.name}
                    control={control}
                    label={field.label}
                    placeholder={field.placeholder}
                    error={false}
                    type={field.type}
                    // type="number"
                  />
                </div>
                <div className="flex w-10 items-center justify-center  ">
                  <IconButton
                    onClick={() => {
                      
                      setCustomFields(customFields.filter((_, i) => i !== index));
                    }}>
                    <FaTrash className="text-red" />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-8">
          <h2>Creators Guides For Better Response</h2>
        </div>
        <div className="grid grid-cols-1">
          <TextArea
            name="custom_prompt"
            control={control}
            label="Custom Prompt"
            placeholder="Enter your custom prompt"
            error={false}
            rows={3}
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
        <Button label="Test Response" type="submit" loading={isPending} />
      </form>
      <div>
        <h2>Output</h2>
        <div>
          <div>
            <h3>HTML Response</h3>
          </div>
          <div dangerouslySetInnerHTML={{ __html: htmlResponse }} />
        </div>
      </div>
      <div>
        <Button label="Save" type="button" onClick={handleSave} />
      </div>
    </div>
  );
};
