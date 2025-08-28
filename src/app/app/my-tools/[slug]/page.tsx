import ToolContainer from './ToolContainer';

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full ">
      <ToolContainer params={params} />
    </div>
  );
}
