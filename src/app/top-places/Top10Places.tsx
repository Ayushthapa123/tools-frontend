
  import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { CityCard } from '../cities/CityCard';
import {

  GetBlogPosts,
  BlogTags,
  BlogPostList
} from 'src/gql/graphql';

import { graphqlClient } from 'src/client/graphqlClient';

export const Top10Places = async() => {


  const city:any=await graphqlClient.request(GetBlogPosts, {blogTags: [BlogTags.TopTenPlaces]}) 
  const cities:BlogPostList=city?.getAllBlogPosts




  return (
    <div className="w-full ">
     
      <div className="grid  gap-[1rem] px-2 ">
        {cities?.data?.map(city => (
          <div key={city.id} className="md:mb-4 lg:min-h-48">
            <CityCard
             city={city}
             subRoute="top-places"
            />
          </div>
        ))}
     
      </div>
    </div>
  );
};
