import Image from 'next/image';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import { getOnlyDay, getOnlyMonth, getOnlyYear } from 'src/utils/date';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BiLink } from 'react-icons/bi';
// import { LinkedEntry } from './LinkedEntry';
// import { BannerAd } from 'src/features/Drawer/BannerAd';
import BlogCard from 'src/features/BlogCard';
// import { CustomChip } from 'src/components/Chip';

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
    <div>
      <div className=" mt-10 h-[10px] w-full">
        {/* <BannerAd /> */}
      </div>
      <div className="h-auto w-full scroll-smooth px-6 pt-[60px] lg:px-[70px] ">
        <h1 className=" py-3  text-[20px] font-bold text-primary md:text-[32px] lg:text-[36px]">
          {article?.fields?.title}
        </h1>
        {/* <h2 className=" text-text-black-default text-[14px] italic md:text-[20px] lg:text-[24px]">
          {article?.fields?.description && <q>{article?.fields?.description}</q>}
        </h2> */}

        <div className="">
          <div className="mt-3 flex h-auto w-full gap-1 ">
            <div className="relative max-h-6 min-h-6 min-w-[24px] max-w-[24px] rounded-full">
              <Image
                src={
                  article.fields?.author?.fields?.avatar?.fields?.file.url
                    ? 'https:' + article.fields?.author?.fields?.avatar?.fields?.file.url
                    : '/assets/logo512.svg'
                }
                alt="author"
                loading="eager"
                fill
                className="rounded-full"
              />
            </div>
            <div className="flex  justify-center align-middle font-medium  text-[#1A1A1A]">
              <span className="">{article.fields?.author?.fields?.name}</span>
              <span className=" px-1">
                {' '}
                |{/* <PiDotOutlineFill className="  relative top-1 text-2xl text-[#999999]" /> */}
              </span>
              <span className=" px-1">Published On: </span>
              <span>
                {/* {t('Published')} */}
                {getOnlyDay(article.fields?.publishedDate)}{' '}
                {getOnlyMonth(article.fields?.publishedDate)}{' '}
                {getOnlyYear(article.fields?.publishedDate)}
              </span>
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

      <div className="relative flex h-auto  w-full gap-[48px] px-6  pt-[40px] lg:px-[70px]   ">
        <div className="flex-grow">
          <div>
            <div className="mt-5 w-full md:flex lg:hidden">
              <div className="flex-grow text-[16px] font-bold">{'Table Of Contents'}</div>
            </div>
          </div>
          {documentToReactComponents(
            article?.fields?.body,

            {
              renderNode: {
                [BLOCKS.HEADING_1]: (node, children) => (
                  <h1 className="text-[32px]  font-bold leading-[48px]">{children}</h1>
                ),
                [BLOCKS.HEADING_2]: (node, children) => {
                  return (
                    <div
                      className="relative  my-0 mt-[40px] "
                      id={convertToId(children?.toString() ?? '')}>
                      <div className="relative flex gap-3 ">
                        <h2
                          className="relative top-[1px] text-[16px] font-bold capitalize text-dark md:text-[24px] md:leading-[32px]"
                          // onClick={IncreaseId()}
                        >
                          {children}
                        </h2>
                      </div>
                      <div className="pb-1 pt-4">
                        <hr className=" text-text-ascent-50" />
                      </div>
                    </div>
                  );
                },
                [BLOCKS.HEADING_3]: (node, children) => (
                  <h3 className={` text-[15px] font-bold md:text-[23px] md:leading-[24px] `}>
                    {children}
                  </h3>
                ),
                [BLOCKS.HEADING_4]: (node, children) => (
                  <h4 className={`text-[14px] font-bold md:text-[21px] md:leading-[24px] `}>
                    {children}
                  </h4>
                ),
                [BLOCKS.HEADING_5]: (node, children) => (
                  <h5 className={`text-[14px] font-bold md:text-[18px] md:leading-[24px] `}>
                    {children}
                  </h5>
                ),
                [BLOCKS.HEADING_6]: (node, children) => (
                  <h6 className={`text-[12px] font-bold md:text-[14px] md:leading-[24px]  `}>
                    {children}
                  </h6>
                ),
                [BLOCKS.PARAGRAPH]: (node, children) => (
                  <p
                    className={`  my-1 text-[16px] font-normal  text-blue-gray-900 md:text-[18px]  `}>
                    {children}
                  </p>
                ),
                [BLOCKS.QUOTE]: (node, children) => <q className={``}>{children}</q>,
                [BLOCKS.UL_LIST]: (node, children) => (
                  <ul className={` list-disc pl-7 `}>{children}</ul>
                ),
                [BLOCKS.OL_LIST]: (node, children) => (
                  <ol className={` list-decimal pl-7`}>{children}</ol>
                ),
                [BLOCKS.LIST_ITEM]: (node, children) => <li className={` `}>{children}</li>,
                [BLOCKS.EMBEDDED_ENTRY]: node => {
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

                [INLINES.HYPERLINK]: (node, children) => {
                  return (
                    <a className={` text-colorPrimary underline`} href={node.data.uri}>
                      {children}
                    </a>
                  );
                },
                [INLINES.ENTRY_HYPERLINK]: (node, children) => {
                  const { id } = node.data.target.sys;
                  // You should resolve the id to the actual URL or title

                  return (
                    <>
                      {/* <LinkedEntry id={id} text={children?.toString() ?? ''} /> */}
                    </>
                  );
                },
                [BLOCKS.HR]: text => <hr className={``} />,
              },
              renderMark: {
                [MARKS.BOLD]: text => <b className={``}>{text}</b>,
                [MARKS.ITALIC]: text => <i className={``}>{text}</i>,
              },
            },
          )}
        </div>
        <div className=" hide-scrollbar sticky top-[80px] hidden card-bordered  h-[90vh] min-w-[400px] max-w-[400px] overflow-y-auto rounded-lg bg-gray-50   p-6 pt-[40px] tracking-[0.16px] lg:block">
          <h2 className=" mb-5 text-3xl font-semibold text-primary">Related Blogs</h2>
          <div className=" grid h-auto w-full gap-5">
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
        </div>
      </div>
      <div className="mt-6 flex w-full flex-col items-center justify-center align-middle">
        {/* <Socials /> */}
        <div className="mt-9 w-full px-6 md:my-[44px] md:px-[80px] ">
          <hr className=" text-text-ascent-50" />
        </div>
      </div>
    </div>
  );
};
