
import { HostelPage } from './HostelPage';


export default function Home({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const checkinDate = "";
  const checkoutDate = "";

  return (
    <div className="w-full ">
      <HostelPage slug={slug} checkInDat={checkinDate} checkOutDat={checkoutDate} />
    </div>
  );
}
