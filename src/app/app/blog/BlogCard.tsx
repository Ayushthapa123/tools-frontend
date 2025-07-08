import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import Link from 'next/link';
import Image from 'next/image';
import { FiEdit } from 'react-icons/fi';
import { BlogPost, BlogPostData, UserType } from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';
import Button from 'src/components/Button';

export const BlogCard = ({
  blogPost,
  setShowDeleteModal,
  setDeletedBlogPostId,
  isviewonly,
}: {
  blogPost: Partial<BlogPostData> | undefined | null;
  setShowDeleteModal: (state: boolean) => void;
  setDeletedBlogPostId: (val: number | string | null) => void;
  isviewonly: boolean;
}) => {
  const onClickDelete = () => {
    setDeletedBlogPostId(blogPost?.id ?? null);
    setShowDeleteModal(true);
  };

  const { user } = useUserStore();

  return (
    <div className=" relative flex overflow-hidden rounded-md border border-gray-100 bg-white  shadow-lg transition-all duration-300 hover:shadow-xl gap-3 ">
      {/* Image Section */}
      <div className="relative h-48 w-48">
        <Image
          src={blogPost?.coverImageUrl || '/placeholder-room.jpg'}
          alt={blogPost?.title ?? ''}
          fill
          className="rounded-t-md object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex min-h-[130px] gap-3 px-2 py-4">
        <div className="flex w-full flex-col ">
          <div className="flex flex-col items-start justify-start gap-0 pb-1 lg:flex-row lg:items-start lg:justify-between lg:gap-2 ">
            <h3 className="mb-0 text-lg font-bold text-gray-900" title={blogPost?.title ?? ''}>
              {blogPost?.title ?? ''}
            </h3>
          </div>
          <div>
            <div className="flex w-full items-center justify-between ">
              {blogPost?.metaDescription}
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="absolute right-3 top-2 z-20 flex gap-2">
          {!isviewonly && (
            <Link href={`/app/blog/${blogPost?.slug}`} passHref legacyBehavior>
              <a aria-label="Edit Room">
                <IconButton
                  size="small"
                color="primary"
                className="bg-white/80 shadow-md backdrop-blur hover:bg-primary/70 hover:text-white">
                <FiEdit className="h-6 w-6" />
              </IconButton>
            </a>
          </Link>
          )}
          {user?.userType === UserType.Superadmin && (
            <IconButton
              onClick={onClickDelete}
              size="small"
              color="error"
              className="bg-white/80 shadow-md backdrop-blur"
              aria-label="Delete Room">
              <DeleteIcon className="h-5 w-5 hover:text-error" />
            </IconButton>
          )}

          <div className="flex gap-2">
            {isviewonly && (
              <Link href={`/citys/${blogPost?.slug}`} passHref legacyBehavior>
                <Button
                  variant="outlined"
                  color="primary"
                  label="View Blog"
                  className="bg-white/80 shadow-md backdrop-blur">
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
