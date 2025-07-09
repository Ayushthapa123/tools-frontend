

import { useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Footer from 'src/features/Footer';
import {
  BlogPostData,
} from 'src/gql/graphql';
import MainContent from './MainContent';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import LoadingSpinner from 'src/components/Loading';
export function CityBlogPage({
  slug,
  cityBlogData,
}: {
  slug: string;
  cityBlogData: BlogPostData;
}) {


  if (!cityBlogData) {
    return (
      <>
        <div className="flex min-h-[100vh] items-center justify-center">
          <div>
            <LoadingSpinner size="lg" color="primary" />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <CommonNav />
      <div className="w-full ">
        <div>
          <div>
            {cityBlogData && (
              <MainContent
                cityBlogData={cityBlogData}
             
              />
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
