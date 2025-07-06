import TextInput from 'src/features/react-hook-form/TextField';
import { BlogStatus, RoomStatus } from 'src/gql/graphql';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import { useFormState } from 'react-hook-form';
import { useEffect } from 'react';
export const BlogCreateForm = ({ control, errors, setIsStepOneDirty }: { control: any; errors: any; setIsStepOneDirty: (isDirty: boolean) => void }) => {
  const { isDirty ,dirtyFields} = useFormState({ control });
  useEffect(() => {
    setIsStepOneDirty(isDirty);
  }, [isDirty, dirtyFields]);
  const blogStatus = [
    { label: 'Draft', value: BlogStatus.Draft },
    {label:"Published",value:BlogStatus.Published},
    {label:"Archived",value:BlogStatus.Archived}
    
  ];



  

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
      <div className="mb-2">
        <TextInput
          name="title"
          type="text"
          placeholder="Blog Title"
          control={control}
          label="Blog Title"
          required
          helpertext={errors.title?.type === 'required' ? 'Title is Required' : ''}
          error={!!errors.title}
        />
      </div>
      <div className="mb-2">
        <TextInput
          name="slug"
          placeholder="Slug"
          control={control}
          label="Slug"
          required
          helpertext={errors.slug?.type === 'required' ? 'Slug is Required' : ''}
          error={!!errors.slug}
        />
      </div>

      <div className="mb-2">
        <ReactSelect
          name="status"
          placeholder="Blog Status"
          options={blogStatus}
          defaultValue={blogStatus[0]}
          control={control}
          label="Blog Status"
          error={!!errors.status}
        />
      </div>
    
      <div className="mb-2">
        <TextArea
          name="description"
          placeholder="Description"
          control={control}
          label="Description"
          error={!!errors.description}
          rows={2}
        />
      </div>

      <div className="mb-2">
        <TextInput
          name="metaTitle"
          placeholder="Meta Title"
          control={control}
          label="Meta Title"
        />
      </div>

      <div className="mb-2">
        <TextInput
          name="metaDescription"
          placeholder="Meta Description"
          control={control}
          label="Meta Description"
        />
      </div>

      <div className="mb-2">
        <TextInput
          name="metaKeywords"
          placeholder="Meta Keywords"
          control={control}
          label="Meta Keywords"
        />
      </div>

      <div className="mb-2">
        <TextInput
          name="metaImageUrl"
          placeholder="Meta Image URL"
          control={control}
          label="Meta Image URL"
        />
      </div>

    </div>
  );
};
