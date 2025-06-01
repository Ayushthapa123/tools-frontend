interface Iprops {
  title: string;
  subTitle: string;
  description: string;
}
export const FeaturesCard = (props: Iprops) => {
  const { title, subTitle, description } = props;
  return (
    <div className=" card my-36 grid gap-5 py-5 text-center ">
      <div>
        <h2 className=" text-primary">{title}</h2>
      </div>
      <div>
        <h3 className=" text-secondary md:text-[2rem] ">{subTitle}</h3>
      </div>
      <div className=" mx-auto max-w-screen-xl">
        <p className=" text-gray-500 md:text-[1rem] ">{description}</p>
      </div>
    </div>
  );
};
