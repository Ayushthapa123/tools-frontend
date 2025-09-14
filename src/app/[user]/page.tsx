// import { SearchBox } from 'src/features/Header/SearchBox';
import Footer from 'src/features/Footer';

import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';

import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
import { GetToolBySlug, GetUserByUsername, ToolData } from 'src/gql/graphql';
import { Tool } from 'src/gql/graphql';



type Props = {
  params: { id: string; user: string };
  searchParams: { [key: string]: string | string[] | undefined };
};


import { CommonNav } from 'src/features/NavBar/CommonNav';
import { ToolCard } from './cards/ToolCard';

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params


  const res = await graphqlClient
  .request(
    gql`
      query GetUserByUsername($username: String!) {
        getUserByUsername(username: $username) {
          data {
            
            username  
            fullName 
            profilePicture 
            isVerified 

           
         
          }
        }
      }
    `,
    { username: params.user }
  )
  .then((data: any) => {
    return data.getUserByUsername; // Returning the fetched data
  })
  .catch(error => {
    return null; // Return null in case of an error
  });


  return {
    title: res?.data?.fullName??"Toolsland.ai",
    authors: [{ name: 'Ayush Thapa' }],
    manifest: '/manifest.json', 
    
    openGraph: {
      title: res?.data?.fullName??"",
      description: res?.data?.fullName??"",
      images: res?.data?.profilePicture
        ? 'https:' + res?.data?.profilePicture
        : `/assets/fallback-image.svg`,
    },
  };
}

export default async function Home({params}: {params: {user: string}}) {
  const username = params?.user;

  const data:any = await graphqlClient.request(GetUserByUsername, { username }) 

  const userData = data?.getUserByUsername;

  return (
    <div className="w-full ">
      <CommonNav/>
      <div className="mx-auto h-full max-w-[1800px] border-b bg-white py-3 shadow-md">
        <div className="px-4">
          {/* User Profile Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
            Tools by  {userData?.data?.fullName || username} 
            </h1>
            <p className="text-gray-600">@{username}</p>
          </div>
          
          {/* User Tools */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Tools</h2>
            {userData?.data?.tool && userData.data.tool.length > 0 ? (
              <div className="space-y-4">
                {userData.data.tool.map((tool: ToolData) => (
                  <ToolCard tool={tool} username={username} key={tool.id} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No tools available</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full py-10 md:px-10"></div>
      <Footer />
    </div>
  );
}
