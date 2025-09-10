import Footer from 'src/features/Footer';
import { ListedAiToolData, ListedAiToolList, ProductType, Tool } from 'src/gql/graphql';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import LoadingSpinner from 'src/components/Loading';
import { notFound } from 'next/navigation';
import BlogCard from 'src/features/BlogCard';
import { ListedAiToolCardPublicSSR } from 'src/features/ListedAiToolCardPublicSSR';
import BlogPageHeader from './BlogPageHeader';
import EnumLister from 'src/features/EnumLister';
import { enumToOptions } from 'src/utils/enumToArray';
import ExploreMore from 'src/features/ExploreMore';
export function BlogPage({ toolData, slug }: { slug: string; toolData: ListedAiToolList }) {
  if (!toolData) {
    return notFound();
  }
  return (
    <>
      <CommonNav />
      <div className="w-full p-5 max-w-[1800px] mx-auto ">
        <div>
          <BlogPageHeader title={`Top 30 AI ${slug?.split('-')?.pop()}`} />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {toolData?.data?.map((item: ListedAiToolData) => (
              <ListedAiToolCardPublicSSR key={item.id} tool={item} />
            ))}
          </div>
          <div>
            {/* <EnumLister enums={enumToOptions(ProductType)} /> */}
          </div>
          <ExploreMore />

          <Footer />
        </div>
      </div>
    </>
  );
}
