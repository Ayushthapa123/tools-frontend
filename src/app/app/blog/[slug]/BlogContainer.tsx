'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';

import TextInput from 'src/features/react-hook-form/TextField';
import { BlogStatus, BlogTags, UserType } from 'src/gql/graphql';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';

import {
  BlogPost,
  CreateBlogPost,
  CreateBlogPostMutationVariables,
  CreateBlogPostMutation,
  CreateBlogPostInput,
  GetBlogPostBySlug,
  GetBlogPostBySlugQuery,
  GetBlogPostBySlugQueryVariables,
  UpdateBlogPostMutation,
  UpdateBlogPost,
  UpdateBlogPostMutationVariables,
} from 'src/gql/graphql';
import { enqueueSnackbar } from 'notistack';

import { useUserStore } from 'src/store/userStore';
import { Suspense, useEffect, useRef, useState } from 'react';

import Button from 'src/components/Button';
import ImageUploader from 'src/features/ImageUploader';
import TinyMceRichTextEditor from 'src/components/RichTextEditor/TinyMceRichTextEditor';

export default function BlogContainer({ params }: { params: { slug: string } }) {
  const isEdit = params?.slug !== 'new';
  const queryClient = useQueryClient();

  const queryBlogPost = useGraphqlClientRequest<
    GetBlogPostBySlugQuery,
    GetBlogPostBySlugQueryVariables
  >(GetBlogPostBySlug.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryBlogPost({ slug: params?.slug });
    return res.getBlogPostBySlug;
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['getBlogPostBySlug'] });
  }, [params.slug, queryClient]);

  const { data: blogPost, isLoading } = useQuery({
    queryKey: ['getBlogPostBySlug'],
    queryFn: fetchData,
    enabled: isEdit,
  });
  return (
    <Suspense>
      <div>
        {!isLoading && <BlogForm params={params} blogPost={blogPost as BlogPost | undefined} />}
      </div>
    </Suspense>
  );
}

function BlogForm({
  params,
  blogPost,
}: {
  params: { slug: string };
  blogPost: BlogPost | undefined | null;
}) {
  const slug = params?.slug;
  const isEdit = slug !== 'new';

  const [coverImage, setCoverImage] = useState<string | null>(null);

  const tinyMceRef = useRef(null);

  const handleCoverImage = (url: string | null) => {
    setCoverImage(url);
  };

  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const blogStatus = [
    { label: 'Draft', value: BlogStatus.Draft },
    { label: 'Published', value: BlogStatus.Published },
    { label: 'Archived', value: BlogStatus.Archived },
  ];

  const blogTags = [
    { label: 'City', value: BlogTags.City },
    { label: 'Top Ten Places', value: BlogTags.TopTenPlaces },

  ];



  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateBlogPostInput & { tag: BlogTags }>({
    defaultValues: {
      ...blogPost?.data,
      title: blogPost?.data?.title,
      slug: blogPost?.data?.slug,
      excerpt: blogPost?.data?.excerpt,
      coverImageUrl: blogPost?.data?.coverImageUrl,
      content: blogPost?.data?.content,
      // tags: blogPost?.data?.tags[0],
      tag: blogPost?.data?.tags[0],
      metaDescription: blogPost?.data?.metaDescription ?? '',
      metaTitle: blogPost?.data?.metaTitle ?? '',
      metaKeywords: blogPost?.data?.metaKeywords ?? '',
       authorId: blogPost?.data?.authorId,
       status: blogPost?.data?.status as BlogStatus,
       videoUrl: blogPost?.data?.videoUrl,
       oneLiner: blogPost?.data?.oneLiner,
      //  views: blogPost?.data?.views,
    },
  });

  useEffect(() => {
    if (blogPost) {
      reset({
        title: blogPost.data?.title,
        slug: blogPost.data?.slug,
        excerpt: blogPost.data?.excerpt,
        coverImageUrl: blogPost.data?.coverImageUrl,
        content: blogPost.data?.content,
        metaDescription: blogPost.data?.metaDescription,
        metaTitle: blogPost.data?.metaTitle ?? '',
        metaKeywords: blogPost.data?.metaKeywords,
        status: blogPost.data?.status as BlogStatus,

       
      });
      setCoverImage(blogPost.data?.coverImageUrl ?? null);
    }
  }, [reset, blogPost]);
  //This ensures the form updates when room is fetched from the backend.

  const mutateCreateBlogPost = useGraphqlClientRequest<
    CreateBlogPostMutation,
    CreateBlogPostMutationVariables
  >(CreateBlogPost.loc?.source.body!);

  const { mutateAsync: mutateCreateBlogPostAsync } = useMutation({
    mutationFn: mutateCreateBlogPost,
  });

  const mutateUpdateBlogPost = useGraphqlClientRequest<
    UpdateBlogPostMutation,
    UpdateBlogPostMutationVariables
  >(UpdateBlogPost.loc?.source.body!);

  const { mutateAsync: mutateUpdateBlogPostAsync } = useMutation({
    mutationFn: mutateUpdateBlogPost,
  });

  const onSubmit = async (data: CreateBlogPostInput & { tag: BlogTags }) => {
    // delete the tag from the data
    const { tag, ...input } = data;
    if (!isEdit) {
      mutateCreateBlogPostAsync({
        createBlogPostInput: { ...input, authorId: Number(user.userId),coverImageUrl: coverImage ,tags: [data.tag] },
      }).then(res => {
        if (res?.createBlogPost?.data?.id) {
          enqueueSnackbar('Blog post created successfully.', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getBlogPostBySlug'] });
          router.push(`/app/blog/`);
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
        }
      });
    } else {
      mutateUpdateBlogPostAsync({
        updateBlogPostInput: { ...input, id: Number(blogPost?.data?.id),coverImageUrl: coverImage ,tags: [data.tag] },
      }).then(res => {
        if (res?.updateBlogPost?.data?.id) {
          enqueueSnackbar('Blog post updated successfully.', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getBlogPostBySlug'] });
          router.push(`/app/blog/${res?.updateBlogPost?.data.slug}`);
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
        }
      });
    }
  };

  // also handle the if it is isEdit then the button text should be 'Update'
  const buttonText = isEdit ? 'Update' : 'Create Blog';
  return (
    <div className="w-full">
      <div className="rounded-lg bg-white p-6 shadow">
    

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
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
                  disabled={isEdit && user.userType !== UserType.Superadmin}
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
                <ReactSelect
                  name="tag"
                  placeholder="Blog Tags"
                  options={blogTags}
                  defaultValue={blogTags[0]}
                  control={control}
                  label="Blog Tags"
                  error={!!errors.tag}
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
                <TextArea
                  name="metaDescription"
                  placeholder="Meta Description" 
                  error={!!errors.metaDescription}
                  control={control}
                  label="Meta Description"
                  rows={2}
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
                  name="videoUrl"
                  placeholder="Video URL"
                  control={control}
                  label="Video URL"
                />
              </div>

              <div className="mb-2">
                <TextInput
                  name="oneLiner"
                  placeholder="One Liner"
                  control={control}
                  label="One Liner"
                />
              </div>

              <div className="mb-2">
                <h3 className="text-lg font-semibold">Cover Image</h3>
                <div className="  w-full ">
                  <ImageUploader handleImageUrl={handleCoverImage} imageUrl={coverImage} />
                </div>
              </div>

              <div className="mb-2">
                <TextArea
                  name="excerpt"
                  placeholder="Summary"
                  control={control}
                  label="Summary"
                  error={!!errors.excerpt}
                  rows={4}
                />
              </div>
              <div className="mb-2">
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <TinyMceRichTextEditor
                      ref={tinyMceRef}
                      readOnly={false}
                      value={field.value}
                      onChange={content => field.onChange(content)}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="mt-6 flex justify-end gap-2 ">
              {
                <Button
                  type={ 'submit'}
                  className={`btn btn-primary  w-min`}
                  label={buttonText}
                />
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
