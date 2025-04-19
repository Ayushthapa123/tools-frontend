interface Iprops {
  title: string;
  description: string;
  icon: JSX.Element;
}

export const ProcessCard = (props: Iprops) => {
  const { description, title, icon } = props;
  return (
    <div className=" flex h-full w-full gap-4 bg-gray-600 p-5 rounded-lg bg-opacity-90">
      <div className=" h-auto w-10 text-[40px] text-blue-100 relative mt-3">{icon}</div>
      <div>
        <h3 className=" font-semibold text-xl">{title}</h3>
        <p className=" text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
};
