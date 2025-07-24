import { graphqlClient } from 'src/client/graphqlClient';

import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';
import { gql } from 'graphql-request';
import BookingPage from './BookingPage';
import { Form } from 'react-hook-form';
type Props = {
  params: { id: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params

  const res = await graphqlClient
    .request(
      gql`
        query GetHostelBySlug($slug: String!) {
          getHostelBySlug(slug: $slug) {
            data {
              name
              slug
              description
            }
          }
        }
      `,
      { slug: params.slug },
    )
    .then((data: any) => {
      return data.getHostelBySlug; // Returning the fetched data
    })
    .catch(error => {
      return null; // Return null in case of an error
    });

  return {
    title: res?.data?.name ? res?.data?.name + ' Application Form' : 'Application Form',
    description: res?.data?.description ?? '',
    openGraph: {
      title: res?.data?.name ? res?.data?.name + ' Application Form' : 'Application Form',
      description: res?.data?.description ?? '',
      images: res?.data?.coverphoto?.url
        ? 'https:' + res?.data?.coverphoto?.url
        : `/assets/fallback-image.svg`,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-gray-50 ">
      <BookingPage slug={params.slug} />
    </div>
  );
}
