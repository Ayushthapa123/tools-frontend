
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { CityCard } from './CityCard';
import {
  DeleteBlogPost,
  DeleteBlogPostMutation,
  DeleteBlogPostMutationVariables,
   
  GetBlogPosts,
  GetBlogPostsQuery,
  GetBlogPostsQueryVariables,
  BlogTags,
  BlogPost,
  BlogPostData,
  BlogPostList,
} from 'src/gql/graphql';
import { graphqlClient } from 'src/client/graphqlClient';

export const AllCities = async() => {


  const city: any = await graphqlClient.request(GetBlogPosts, { blogTags: [ BlogTags.City ] }) 
  const cities:BlogPostList=city?.getAllBlogPosts




  return (
    <div className="w-full ">
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[1rem] px-2 ">
        {cities?.data?.map(city => (
          <div key={city.id} className="md:mb-4 lg:min-h-48">
            <CityCard
             city={city}
            />
          </div>
        ))}
     
      </div>
    </div>
  );
};
