import { graphqlClient } from "src/client/graphqlClient";
import Footer from "src/features/Footer";
import { BlogPost, BlogPostData, GetBlogPostBySlug } from "src/gql/graphql";
import ChecklistGenerator from "./checklist-generator/calculator";
import CommonCheckList from "./CommonCheckList";
export const metadata = {
  title: 'Checklist for Travelling',
  description: 'Generate a checklist for your next trip.',
  openGraph: {
    title: 'Checklist for Travelling',
    description: 'Generate a checklist for your next trip.',
    images: [
      {
        url: 'https://www.hostelpilot.com/images/tbc.png',
        type: 'image/png',
        alt: 'Checklist for Travelling',
        width: 1200,
        height: 630,
      },
    ],
  },
  authors: [{ name: 'Ayush Thapa' }],
  manifest: '/manifest.json',
};

export default async function TravelDestinationFinderPage() {
  const data:any= await graphqlClient.request(GetBlogPostBySlug, { slug: 'checklist-for-travelling' }) 

  const blogData = data?.getBlogPostBySlug 
  console.log(blogData)

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-primary">{blogData?.data?.title}</h1>
        {/* <p className=" text-gray-700">
          {blogData?.data.metaDescription}
        </p> */}  
        <ChecklistGenerator/>
        <div className="mb-6"> 
          <CommonCheckList/>
        </div>
        <div>
          <div className="mb-6">
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: blogData?.data?.content ?? '' }}
            
            />
          </div>
          <Footer/>
        </div>
      </div>
    </main>
  );
};


