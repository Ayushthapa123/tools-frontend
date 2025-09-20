'use client';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react'
import { CreateCommentMutationVariables, CreateCommentMutation, CreateComment, ToolType, CommentData } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useUserStore } from 'src/store/userStore';

export default function CommentSection({ comments, toolId,toolType }: { comments: CommentData[] | undefined, toolId: number,toolType: ToolType }) {
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { user } = useUserStore();

    const mutateCreateCommentRequest = useGraphqlClientRequest<CreateCommentMutation, CreateCommentMutationVariables>(
        CreateComment.loc?.source.body!,
      );
    
      const { mutateAsync } = useMutation({ mutationFn: mutateCreateCommentRequest });

      const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        
        try {
          await mutateAsync({ 
            createCommentInput: { 
              comment: comment.trim() ,
              toolType: toolType, 
              userId: Number(user.userId),
              toolId: Number(toolId),

            } 
          }).then(res => {
            if (res.createComment.data?.id) {
              enqueueSnackbar("Comment added successfully", { variant: 'success' });
              setIsSubmitted(true); // Show thank you message
              setComment(''); // Clear the form after successful submission
              // show success message 
              enqueueSnackbar('Thanks for your feedback!', { variant: 'success' });
            } else {
              enqueueSnackbar(res.createComment.error?.message || 'Something went wrong', { variant: 'error' });
              return;
            }
          });
        } catch (error) {
          console.error('Error creating comment:', error);
          // show error message
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
      }
    
  return (
    <div className='mt-10 w-full'>
        {isSubmitted ? (
          <div className='bg-green-50 border border-green-200 rounded-lg p-6 text-center'>
            <div className='text-green-600 text-lg font-semibold mb-2'>Thank you for your feedback!</div>
            <p className='text-green-700'>Your comment has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className='flex flex-col gap-4'>
              <textarea 
                name="comment"  
                className='w-full rounded-lg border border-gray-200 p-2'
                id="comment" 
                placeholder='Add a comment/Feedback'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
              <button type='submit' className='bg-primary text-white px-4 py-2 rounded-lg'>Submit Feedback</button>
          </form>
        )}
    </div>
  )
}
