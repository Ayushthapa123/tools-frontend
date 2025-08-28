

import Footer from 'src/features/Footer';
import {
  Tool,
} from 'src/gql/graphql';
import MainContent from './MainContent';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import LoadingSpinner from 'src/components/Loading';
import { notFound } from 'next/navigation';
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
          <Footer />
        </div>
      </div>
    </>
  );
}
