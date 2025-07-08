"use client"

import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { BlogCard } from './BlogCard';
import {
  DeleteBlogPost,
  DeleteBlogPostMutation,
  DeleteBlogPostMutationVariables,
   
  GetBlogPosts,
  GetBlogPostsQuery,
  GetBlogPostsQueryVariables,
  BlogTags
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';
import { useEffect, useState } from 'react';
import { Modal } from 'src/components/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

export const ActiveBlogs = ({ setActiveRoomCount ,isviewonly=false}: { setActiveRoomCount?: (count: number) => void ,isviewonly?:boolean}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedBlogPostId, setDeletedBlogPostId] = useState<number | string | null>(null);
  const [deleteBlogPost, setDeleteBlogPost] = useState(false);
  const queryBlogPosts = useGraphqlClientRequest<GetBlogPostsQuery, GetBlogPostsQueryVariables>(
    GetBlogPosts.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryBlogPosts({blogTags: [BlogTags.City]});
    if (setActiveRoomCount) {
      setActiveRoomCount(res.getAllBlogPosts.data?.length || 0);
    }
    return res.getAllBlogPosts;
  };

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['getBlogPosts'],
    queryFn: fetchData,
  });

  // deleted room
  const mutateDeleteBlogPost = useGraphqlClientRequest<
    DeleteBlogPostMutation,
    DeleteBlogPostMutationVariables
  >(DeleteBlogPost.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateDeleteBlogPost });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (deleteBlogPost) {
      mutateAsync({ id: Number(deletedBlogPostId) }).then(res => {
        if (res?.deleteBlogPost) {
          enqueueSnackbar('Blog post deleted.', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getBlogPosts'] });
        } else {
          enqueueSnackbar("Couldn't delete blog post.", { variant: 'error' });
        }
      });
      setShowDeleteModal(false);
    }
  }, [deleteBlogPost]);

  return (
    <div className="w-full ">
      {isLoading && (
        <div>
          {' '}
          <LoadingSpinner />
        </div>
      )}
      <div className="grid  gap-[1rem] px-2 ">
        {blogPosts?.data?.map(blogPost => (
          <div key={blogPost.id} className="md:mb-4 lg:min-h-48">
            <BlogCard
             blogPost={blogPost}
              setShowDeleteModal={setShowDeleteModal}
              setDeletedBlogPostId={setDeletedBlogPostId}
              isviewonly={isviewonly}
            />
          </div>
        ))}
        {showDeleteModal && (
          <Modal
            open={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            title="Are you sure to delete this blog post?"
            onSave={() => setDeleteBlogPost(true)} 
            actionLabel="Delete"


          >
            Disclaimer: you will not be able to see the details of this blog post after you delete it.
          </Modal>
        )}
      </div>
    </div>
  );
};
