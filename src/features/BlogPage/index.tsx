import Footer from 'src/features/Footer';
import { ListedAiToolData, ListedAiToolList } from 'src/gql/graphql';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { notFound } from 'next/navigation';
import { ListedAiToolCardPublicSSR } from 'src/features/ListedAiToolCardPublicSSR';
import BlogPageHeader from './BlogPageHeader';
import ExploreMore from 'src/features/ExploreMore';
export function BlogPage({ toolData, slug }: { slug: string; toolData: ListedAiToolList }) {
  if (!toolData) {
    return notFound();
  }
  return (
    <>
    
      <div className="w-full p-5 max-w-[1800px] mx-auto ">
        <div>
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
