import GuestContainer from './GuestContainer';

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full ">
      <GuestContainer params={params} />
    </div>
  );
}
