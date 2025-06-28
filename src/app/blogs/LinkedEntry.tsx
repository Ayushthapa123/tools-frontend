"use client"

import { subTagsListToSlug } from 'src/utils/subTagListToSlug';
import { tagsListToSlug } from 'src/utils/tagListsToSlug';
import { createClient } from 'contentful';
import { useEffect, useState } from 'react';

interface Iprops {
  id: string;
  text: string;
}

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
});
export const LinkedEntry = (props: Iprops) => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    const jptFun = async () => {
      const article = await client.getEntry(props.id);

      setUrl(
        `/resources/${tagsListToSlug(article.metadata.tags)}/${subTagsListToSlug(
          article.metadata.tags,
        )}/${article.fields.slug}`,
      );
    };
    jptFun();
  }, [props.id]);
  return (
    <>
      <a href={url} className="text-colorPrimary underline">
        {props.text}
      </a>
    </>
  );
};
