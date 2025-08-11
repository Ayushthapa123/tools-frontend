import Image from 'next/image';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import { getOnlyDay, getOnlyMonth, getOnlyYear } from 'src/utils/date';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BiLink } from 'react-icons/bi';
// import { LinkedEntry } from './LinkedEntry';
// import { BannerAd } from 'src/features/Drawer/BannerAd';
import BlogCard from 'src/features/BlogCard';
import { GoDotFill } from 'react-icons/go';
import Link from 'next/link';
import Button from 'src/components/Button';
// import { CustomChip } from 'src/components/Chip';
import { domainConfig } from 'src/config/domainConfig';
interface Iprops {
  article: any;
}

export const PageContents = (props: Iprops) => {
  const { article } = props;

  // const router = useRouter();

  function convertToId(str: string) {
    const idd: string = str
      .toLowerCase()
      .replace(/[\s_]+/g, '-') // Replace spaces and underscores with dashes
      .replace(/[^\w-]+/g, '') // Remove any non-word characters (except dashes)
      .replace(/--+/g, '-') // Replace multiple dashes with a single dash
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
    return idd;
  }

  return (
    <div className='w-[90%] mx-auto '>
      {/* <div className=" mt-4 h-[10px] w-full">
        <BannerAd />  
      </div> */}
      <div className="h-auto scroll-smooth px-6 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Blog</span>
          <GoDotFill className="text-sm text-[#999999]" />
          <span className="text-sm font-medium text-gray-500">{article?.fields?.key ?? article?.fields?.key2 ?? ""}</span>
          
        </div>
        <h1 className=" py-3 font-bold text-primary">
          {article?.fields?.title}
        </h1>
        {/* <h2 className=" text-text-black-default text-[14px] italic md:text-[20px] lg:text-[24px]">
          {article?.fields?.description && <q>{article?.fields?.description}</q>}
        </h2> */}

        <div className="">
          <div className="mt-3 flex h-auto w-full gap-3 ">
            <div className="relative h-14 w-14 rounded-full">
              <Image
                src={domainConfig.logo}
                alt="author"
                loading="eager"
                fill
                className="rounded-full"
              />
            </div>
            <div className="flex items-start flex-col justify-center align-middle font-medium  text-[#1A1A1A]">
              {/* <span className="">{article.fields?.author?.fields?.name}</span> */}
              <div>
                <span className="font-semibold text-gray-800">Hostel Admin</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <div>
                <span className="">
                  posted on 2025-06-29
                </span>
                </div>
                <div className="flex items-center gap-1">
                  <GoDotFill className="text-sm text-gray-500" />
                  <span>5 min read</span>
                </div>
              </div>
              {/* <span className=" px-1">Published On: </span>
              <span>
                {t('Published')}
                {getOnlyDay(article.fields?.publishedDate)}{' '}
                {getOnlyMonth(article.fields?.publishedDate)}{' '}
                {getOnlyYear(article.fields?.publishedDate)}
              </span> */}
            </div>
          </div>
        </div>
        {/* <div className=''><CustomChip label='Category'/></div> */}
        <div className="relative mt-9 h-[250px] w-full rounded-md  md:h-[500px] md:object-cover">
          <Image
            src={
              article.fields?.coverphoto?.fields?.file.url
                ? 'https:' + article.fields?.coverphoto?.fields?.file.url
                : `/assets/fallback-image.svg`
            }
            alt="cover image"
            fill
            loading="eager"
            className="rounded-md "
          />
        </div>
      </div>

      <div className="relative flex h-auto gap-[48px] px-6  pt-[40px] ">
        <div className="flex-grow">
          <div>
            <div className="mt-5 w-full md:flex lg:hidden">
              <div className="flex-grow text-gray-800 text-[16px] font-bold">{'Table Of Contents'}</div>
            </div>
          </div>
          {documentToReactComponents(
            article?.fields?.body,

            {
              renderNode: {
                [ BLOCKS.HEADING_1 ]: (node, children) => (
                  <h1 className="text-[32px] font-bold leading-[48px]">{children}</h1>
                ),
                [ BLOCKS.HEADING_2 ]: (node, children) => {
                  return (
                    <div
                      className="relative  my-0 mt-[40px] "
                      id={convertToId(children?.toString() ?? '')}>
                      <div className="relative flex gap-3 ">
                        <h2
                          className="relative top-[1px] text-[16px] font-bold capitalize text-dark md:text-[28px] md:leading-[32px]"
                        // onClick={IncreaseId()}
                        >
                          {children}
                        </h2>
                      </div>
                      <div className="">
                        <hr className=" text-text-ascent-50" />
                      </div>
                    </div>
                  );
                },
                [ BLOCKS.HEADING_3 ]: (node, children) => (
                  <h3 className={` text-[15px] font-bold md:text-[23px] md:leading-[24px] `}>
                    {children}
                  </h3>
                ),
                [ BLOCKS.HEADING_4 ]: (node, children) => (
                  <h4 className={`text-[14px] font-bold md:text-[21px] md:leading-[24px] `}>
                    {children}
                  </h4>
                ),
                [ BLOCKS.HEADING_5 ]: (node, children) => (
                  <h5 className={`text-[14px] font-bold md:text-[18px] md:leading-[24px] `}>
                    {children}
                  </h5>
                ),
                [ BLOCKS.HEADING_6 ]: (node, children) => (
                  <h6 className={`text-[12px] font-bold md:text-[14px] md:leading-[24px]  `}>
                    {children}
                  </h6>
                ),
                [ BLOCKS.PARAGRAPH ]: (node, children) => (
                  <p
                    className={`  my-1 text-[16px] font-normal  text-gray-700 md:text-[16px]  `}>
                    {children}
                  </p>
                ),
                [ BLOCKS.QUOTE ]: (node, children) => <q className={``}>{children}</q>,
                [ BLOCKS.UL_LIST ]: (node, children) => (
                  <ul className={` list-disc pl-7 `}>{children}</ul>
                ),
                [ BLOCKS.OL_LIST ]: (node, children) => (
                  <ol className={` list-decimal pl-7`}>{children}</ol>
                ),
                [ BLOCKS.LIST_ITEM ]: (node, children) => <li className={` `}>{children}</li>,
                [ BLOCKS.EMBEDDED_ENTRY ]: node => {
                  return (
                    <div
                      className={`relative my-9   h-[250px] w-[100%] object-cover md:h-[500px] `}>
                      {node.data.target?.fields?.image?.fields?.file.url && (
                        <Image
                          alt="post"
                          src={'https:' + node.data.target.fields?.image?.fields?.file.url}
                          className=""
                          fill
                        />
                      )}
                    </div>
                  );
                },

                [ INLINES.HYPERLINK ]: (node, children) => {
                  return (
                    <a className={` text-colorPrimary underline`} href={node.data.uri}>
                      {children}
                    </a>
                  );
                },
                [ INLINES.ENTRY_HYPERLINK ]: (node, children) => {
                  const { id } = node.data.target.sys;
                  // You should resolve the id to the actual URL or title

                  return (
                    <>
                      {/* <LinkedEntry id={id} text={children?.toString() ?? ''} /> */}
                    </>
                  );
                },
                [ BLOCKS.HR ]: text => <hr className={``} />,
              },
              renderMark: {
                [ MARKS.BOLD ]: text => <b className={``}>{text}</b>,
                [ MARKS.ITALIC ]: text => <span className={``}>{text}</span>,
              },
            },
          )}
        </div>
        
      </div>
      <div className="mt-2 mx-2 flex items-center justify-center md:justify-end">
          <Link href="/blogs" className='w-full md:w-fit text-blue'>
            <Button label="Read other blogs" className='w-full md:w-fit' />
          </Link>
      </div>

      <div className="mt-2 flex w-full flex-col items-center justify-center align-middle">
        {/* <Socials /> */}
        <div className=" w-full p-6 ">
          <hr className=" text-text-ascent-50" />
        </div>
      </div>
{/* <div className=" hide-scrollbar sticky top-[80px] hidden card-bordered  h-auto min-w-[400px] max-w-[400px] overflow-y-auto rounded-lg bg-gray-50   p-6 pt-[40px] tracking-[0.16px] lg:block">
          <h2 className=" mb-5 text-3xl font-semibold text-primary">Related Blogs</h2>
          <div className=" grid  h-full w-auto gap-5">
            {article.fields?.relatedBlogs?.map((blog: any, index: number) => (
              <div key={index}>
                <BlogCard
                  title={blog.fields.title}
                  date={`${getOnlyDay(article.fields?.publishedDate)}
               ${getOnlyMonth(article.fields?.publishedDate)}
                ${getOnlyYear(article.fields?.publishedDate)}`}
                  description={blog.fields.description}
                  slug={blog.fields.slug}
                  image={
                    blog.fields?.coverphoto?.fields?.file.url
                      ? 'https:' + blog.fields?.coverphoto?.fields?.file.url
                      : `/assets/fallback-image.svg`
                  }
                />
              </div>
            ))}
          </div>
        </div> */}
      
    </div>
  );
};
