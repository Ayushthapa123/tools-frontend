
import { CiLocationOn } from 'react-icons/ci';
import { BreadCrumbs } from 'src/app/detail-page/BreadCrumbs';
import Image from 'next/image';
import { BlogPostData } from 'src/gql/graphql';
import Button from 'src/components/Button';
import { TextArea } from 'src/components/TextArea';

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

          <div className="mb-6">
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Comments</h2>
              {/* 
                TODO: 
                - Display list of comments (if any)
                - Add a form for users to submit a new comment
                - Show loading/error states as needed
                - Optionally, allow replies to comments (threaded)
                - Optionally, require login/authentication to comment
                - Optionally, moderate/filter inappropriate content
                - Optionally, show comment count
                - Optionally, allow upvotes/likes on comments
                - Optionally, show commenter avatar and name
                - Optionally, sort comments (newest/oldest/top)
                - Optionally, paginate or lazy-load comments
                - Optionally, notify users of replies
                - Optionally, integrate with backend or third-party comment system
                - Optionally, support markdown or rich text in comments
                - Optionally, show timestamps for each comment
                - Optionally, allow editing/deleting own comments
                - Optionally, handle spam prevention (captcha, rate limit, etc.)
                - Optionally, show placeholder if no comments yet
              */}
              <div className="text-gray-500 italic">
                {/* Placeholder for comment list */}
                No comments yet. Be the first to comment!
              </div>
              <form className="mt-4 flex flex-col gap-2">
                <TextArea
                  className="w-full rounded  p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={3}
                  placeholder="Write your comment here..."
                  disabled
                />
                <Button
                  type="button"
                  className="self-end rounded bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition"
                  disabled 
                  label="Post Comment"
                  /
                >
                  
              
                <div className="text-xs text-gray-400">
                  {/* 
                    NOTE: Commenting is disabled in this demo. 
                    To enable, implement backend integration and authentication.
                  */}
                  Commenting is currently disabled.
                </div>
              </form>
            </div>
          </div>
     
        </div>
      </div>
    </div>
  );
}
