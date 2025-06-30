interface Iprops {
  name: string;
  slug?: string;
}
export const BreadCrumbs = (props: Iprops) => {
  return (
    <>
      <div className="ml-2 md:ml-[30px] pt-2">
        <div className="breadcrumbs line-clamp-1 w-full text-sm lg:w-auto">
          <ul className="text-sm">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/search">Hostel</a>
            </li>
            <li>{props.name}</li>
          </ul>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <hr className="-mt-4 mb-8 w-full border" />
      </div>
    </>
  );
};
