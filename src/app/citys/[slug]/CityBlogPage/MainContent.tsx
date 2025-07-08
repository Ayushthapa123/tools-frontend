
import { CiLocationOn } from 'react-icons/ci';
import { BreadCrumbs } from 'src/app/detail-page/BreadCrumbs';
import Image from 'next/image';
import { BlogPostData } from 'src/gql/graphql';

interface Iprops {
  cityBlogData: BlogPostData | undefined | null;
}

export default function MainContent(props: Iprops) {
  const { cityBlogData } = props;

  if (!cityBlogData) {
    return (
      <div className="container mx-auto py-10 text-center text-gray-500">
        Blog post not found.
      </div>
    );
  }

  const {
    title,
    content,
    coverImageUrl,
    metaDescription,
    excerpt,
    metaTitle,
    metaKeywords,
    status,
    views,
    publishedAt,
    createdAt,
    updatedAt,
    tags,
    authorId,
    slug,
  } = cityBlogData;

  // Format date
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : '';

  return (
    <div className="bg-gray-50 pb-4 min-h-screen">
      <div className="container mx-auto max-w-7xl px-2 md:px-0">
        {/* <BreadCrumbs name={title ?? ''} slug={slug ?? ''} /> */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-4 md:p-8">
          {/* Blog Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-2">
              {formattedDate && <span>Published: {formattedDate}</span>}
              {/* {views !== undefined && <span>• {views} views</span>} */}
              {tags && tags.length > 0 && (
                <span className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">{tag}</span>
                  ))}
                </span>
              )}
            </div>
          </div>
          {/* Cover Image */}
          {coverImageUrl && (
            <div className="relative mb-6 h-96 w-full overflow-hidden rounded-2xl bg-gray-200">
              <Image
                src={coverImageUrl.startsWith('http') ? coverImageUrl : `https:${coverImageUrl}`}
                alt={title ?? 'Blog cover'}
                fill
                className="object-cover"
                quality={90}
                priority
              />
            </div>
          )}
          {/* Excerpt */}
          {excerpt && (
            <div className="mb-6 text-lg text-gray-700 italic border-l-4 border-blue-200 pl-4">{excerpt}</div>
          )}
          {/* Blog Content */}
          <div className="mb-6">
            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: content ?? '' }} />
          </div>
     
        </div>
      </div>
    </div>
  );
}
