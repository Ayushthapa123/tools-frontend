interface Iprops {
  title: string;
  description: string;
  icon: JSX.Element;
}

export const ProcessCard = (props: Iprops) => {
  const { description, title, icon } = props;
  return (
    <div className=" flex h-full w-full gap-4 rounded-lg bg-gray-600 bg-opacity-90 p-5">
      <div className=" text-blue-100 relative mt-3 h-auto w-10 text-[40px]">{icon}</div>
      <div>
        <h3 className=" text-xl font-semibold">{title}</h3>
        <p className=" text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
};
