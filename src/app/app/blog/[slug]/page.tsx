import BlogContainer from './BlogContainer';

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full ">
      <BlogContainer params={params} />
    </div>
  );
}
