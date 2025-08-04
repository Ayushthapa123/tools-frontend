import { graphqlClient } from "src/client/graphqlClient";
import Footer from "src/features/Footer";
import { BlogPost, BlogPostData, GetBlogPostBySlug } from "src/gql/graphql";
import BudgetCalculator from "./budget-calculator/calculator";

export const metadata = {
  title: 'Travel Budget Calculator',
  description: 'Easily estimate your travel expenses for hostel trips, including transportation, accommodation, food, and more.',
  openGraph: {
    title: 'Travel Budget Calculator',
    description: 'Easily estimate your travel expenses for hostel trips, including transportation, accommodation, food, and more.',
    images: '/images/tbc.png',
  },
  authors: [{ name: 'Ayush Thapa' }],
  manifest: '/manifest.json',
};

export default async function TravelBudgetCalculatorPage() {
  const data:any= await graphqlClient.request(GetBlogPostBySlug, { slug: 'travel-budget-calculator' }) 

  const blogData = data.getBlogPostBySlug

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-primary">{blogData?.data.title}</h1>
        {/* <p className=" text-gray-700">
          {blogData?.data.metaDescription}
        </p> */}  
        <BudgetCalculator/>
        <div>
          <div className="mb-6">
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: blogData?.data.content ?? '' }}
            
            />


       
          </div>
          <Footer/>
        </div>
      </div>
    </main>
  );
};


