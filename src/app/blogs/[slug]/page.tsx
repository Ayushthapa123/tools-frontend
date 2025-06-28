import { createClient } from 'contentful';

import safeJsonStringify from 'safe-json-stringify';

import { PageContents } from '../PageContent';
import { Metadata, ResolvingMetadata } from 'next';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import envConfig from 'src/config/envConfig';

const space = envConfig.contentfulSpaceId;
const accessToken = envConfig.contentfulAccessToken;

const client = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
});

type Props = {
  params: { id: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params

  const rawData = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug,
  });

  const stringifiedRawData = safeJsonStringify(rawData);
  const article = JSON.parse(stringifiedRawData).items[0];

  return {
    title: article.fields.title,
    description: article.fields.description,
    openGraph: {
      title: article.fields.title,
      description: article.fields.description,
      images: article.fields?.coverphoto?.fields?.file.url
        ? 'https:' + article.fields?.coverphoto?.fields?.file.url
        : `/assets/fallback-image.svg`,
    },
  };
}

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  const rawData = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug,
  });

  const stringifiedRawData = safeJsonStringify(rawData);
  const article = JSON.parse(stringifiedRawData);

  return (
    <>
    <CommonNav />
      {article && (
        <div className="">
          <div className=" container-group">
            <PageContents article={article.items[0]} />
          </div>

        </div>
      )}
    </>
  );
};

export default DetailPage;
