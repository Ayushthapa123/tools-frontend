

import Footer from 'src/features/Footer';
import {
  Tool,
} from 'src/gql/graphql';
import MainContent from './MainContent';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import LoadingSpinner from 'src/components/Loading';
import { notFound } from 'next/navigation';
import AdsenseAd from 'src/components/AdsenseAd';
export function ToolPage({

  toolData,
}: {
  slug: string;
  toolData: Tool;
}) {


  if (!toolData) {
    return notFound()
  }
  return (
    <>
      <CommonNav />
      <div className="w-full ">
        <div>
          <div>
            {toolData && (
              <MainContent
                tool={toolData as Tool}
             
              />
            )}
          </div>
          <AdsenseAd />
          <Footer />
        </div>
      </div>
    </>
  );
}
