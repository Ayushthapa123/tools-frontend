import RoomContainer from './ToolContainer';

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full ">
      <RoomContainer params={params} />
    </div>
  );
}
