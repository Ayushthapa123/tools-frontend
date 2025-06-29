import Image from 'next/image';

interface Iprops {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
}

const BlogCard = ({ date, description, image, title, slug }: Iprops) => {
  return (
    <>
      <div className="w-full h-full px-4 pt-3  rounded-lg  card">
        <div className="w-full mb-10">
          <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded ">
            <Image src={image} alt="" className="w-full" fill />
          </div>
          <div>
            {date && (
              <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
                {date}
              </span>
            )}
            <h3>
              <a
                href={`/blogs/` + slug}
                className="inline-block mb-4 text-xl font-semibold line-clamp-2 text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                {title}
              </a>
            </h3>
            <p className="text-lg font-normal text-body-color line-clamp-3">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
