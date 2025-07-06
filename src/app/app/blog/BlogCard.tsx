import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import Link from 'next/link';
import Image from 'next/image';
import { FiEdit } from 'react-icons/fi';
import { BlogPost, BlogPostData, UserType  } from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';



export const BlogCard = ({ blogPost, setShowDeleteModal, setDeletedBlogPostId }: { blogPost: Partial<BlogPostData> | undefined | null, setShowDeleteModal: (state: boolean) => void, setDeletedBlogPostId: (val: number | string | null) => void }) => {


  const onClickDelete = () => {
    setDeletedBlogPostId(blogPost?.id ?? null);
    setShowDeleteModal(true);
  };

  const {user} = useUserStore();

  return (
    <div className="group relative overflow-hidden rounded-md border border-gray-100 bg-white shadow-lg  transition-all duration-300 hover:shadow-xl lg:!min-h-48">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={blogPost?.coverImageUrl || '/placeholder-room.jpg'}
          alt={blogPost?.title ?? ''}
          fill
          className="rounded-t-md object-cover"
          priority
        />
  
      </div>

      {/* Content Section */}
      <div className="flex min-h-[130px] gap-3 py-4 px-2">
        <div className='w-full flex flex-col justify-between'>
          <div className="flex flex-col items-start justify-start gap-0 lg:gap-2 lg:flex-row lg:items-start lg:justify-between pb-1 ">
            <h3 className="mb-0 text-lg font-bold text-gray-900" title={blogPost?.title ?? ''}>
              {blogPost?.title ?? ""}
            </h3>
       
          </div>
          <div>
  
           
            <div className='w-full flex items-center justify-between '>
         
            </div>
        </div>
          </div>
        {/* Action Buttons */}
        <div className="absolute right-3 top-2 z-20 flex gap-2">
          <Link href={`/app/blog/${blogPost?.slug}`} passHref legacyBehavior>
            <a aria-label="Edit Room">
              <IconButton
                size="small"
                color="primary"
                className="bg-white/80 shadow-md backdrop-blur hover:bg-primary/70 hover:text-white"
              >
                <FiEdit className="h-6 w-6" />
              </IconButton>
            </a>
          </Link>
          {user?.userType === UserType.Superadmin && <IconButton
            onClick={onClickDelete}
            size="small"
            color="error"
            className="bg-white/80 shadow-md backdrop-blur"
            aria-label="Delete Room"
          >
            <DeleteIcon className="h-5 w-5 hover:text-error" />
          </IconButton>}
        </div>
      </div>
    </div>
  );
};
