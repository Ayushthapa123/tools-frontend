import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from 'src/components/Badge';
import { ToolData } from 'src/gql/graphql';
import EditIcon from 'src/components/icons/Edit';

export const ToolCard = ({ tool, setShowDeleteModal, setDeletedToolId }: { 
  tool: ToolData | undefined | null, 
  setShowDeleteModal: (state: boolean) => void, 
  setDeletedToolId: (val: number | string | null) => void 
}) => {
  const onClickDelete = () => {
    setDeletedToolId(tool?.id ?? null);
    setShowDeleteModal(true);
  };

  const getToolTypeColor = (toolType: string) => {
    switch (toolType) {
      case 'IO':
        return '!bg-blue-500';
      case 'CURD':
        return '!bg-green-500';
      default:
        return '!bg-gray-500';
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'PUBLIC':
        return '!bg-green-500';
      case 'PRIVATE':
        return '!bg-yellow-500';
      case 'RESTRICTED':
        return '!bg-red-500';
      default:
        return '!bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-md border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl lg:!min-h-48">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={tool?.thumbnailUrl || '/default-image.png'}
          alt={tool?.name ?? 'Tool thumbnail'}
          fill
          className="rounded-t-md object-cover"
          priority
        />
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-2">
          <Badge className={`px-3 py-1 !text-xs uppercase tracking-wide font-bold text-white ${getToolTypeColor(tool?.toolType ?? '')} !rounded-md`}>
            {tool?.toolType ?? ''}
          </Badge>
          <Badge className={`px-3 py-1 !text-xs uppercase tracking-wide font-bold text-white ${getVisibilityColor(tool?.visibility ?? '')} !rounded-md`}>
            {tool?.visibility ?? ''}
          </Badge>
        </div>
        {tool?.verifiedBySuperAdmin && (
          <div className="absolute right-2 top-2 z-10">
            <Badge className="px-3 py-1 !text-xs uppercase tracking-wide font-bold text-white !bg-green-500 !rounded-md">
              Verified
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex min-h-[130px] gap-3 py-4 px-2">
        <div className='w-full flex flex-col justify-between'>
          <div className="flex flex-col items-start justify-start gap-0 lg:gap-2 lg:flex-row lg:items-start lg:justify-between pb-1">
            <h3 className="mb-0 text-lg font-bold text-gray-900" title={tool?.name ?? ''}>
              {tool?.name ?? ""}
            </h3>
            {tool?.ranking && (
              <div>
                <p className="m-0 text-base text-nowrap bg-slate-200 rounded-md p-1 px-3 font-extrabold text-primary">
                  Rank #{tool.ranking}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <p className='text-sm font-semibold my-0 text-gray-500 pt-1 border-t border-gray-200'>
              {tool?.shortDescription || tool?.description || 'No description available'}
            </p>
            
            <div className='w-full flex items-center justify-between mt-2'>
              <p className="m-0 text-sm font-extrabold text-gray-400">
                Created: <span className='text-primary'>{formatDate(tool?.createdAt ?? '')}</span>
              </p>
              <p className="m-0 text-sm font-extrabold text-gray-400">
                Handle: <span className='text-primary'>{tool?.handle ?? ''}</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute right-3 top-2 z-20 flex gap-2">
          <Link href={`/app/tool/${tool?.slug}`} passHref legacyBehavior>
            <a aria-label="Edit Tool">
              <IconButton
                size="small"
                color="primary"
                className="bg-white/80 shadow-md backdrop-blur hover:bg-primary/70 hover:text-white"
              >
                <EditIcon className="h-6 w-6" />
              </IconButton>
            </a>
          </Link>
          <IconButton
            onClick={onClickDelete}
            size="small"
            color="error"
            className="bg-white/80 shadow-md backdrop-blur"
            aria-label="Delete Tool"
          >
            <DeleteIcon className="h-5 w-5 hover:text-error" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
