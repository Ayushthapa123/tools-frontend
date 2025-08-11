import { graphqlClient } from "src/client/graphqlClient";
import Footer from "src/features/Footer";
import { BlogPost, BlogPostData, GetBlogPostBySlug } from "src/gql/graphql";
import DestinationFinder from "./destination-finder/calculator";

export const metadata = {
  title: 'Travel Destination Finder',
  description: 'Find the best travel destinations for your next trip.',
  openGraph: {
    title: 'Travel Destination Finder',
    description: 'Find the best travel destinations for your next trip.',
    images: [
      {
        url: 'https://www.hostelpilot.com/images/tbc.png',
        type: 'image/png',
        alt: 'Travel Destination Finder',
        width: 1200,
        height: 630,
      },
    ],
  },
  authors: [{ name: 'Ayush Thapa' }],
  manifest: '/manifest.json',
};

export default async function TravelDestinationFinderPage() {
  const data:any= await graphqlClient.request(GetBlogPostBySlug, { slug: 'travel-destination' }) 

  const blogData = data?.getBlogPostBySlug

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-primary">{blogData?.data?.title}</h1>
        {/* <p className=" text-gray-700">
          {blogData?.data.metaDescription}
        </p> */}  
        <DestinationFinder/>
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


