export const TestSkeleton = () => {
  return (
    <div>
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton flex h-32 w-full gap-7 p-10">
          <div className="skeleton h-16 w-16  shrink-0"></div>
          <div className="skeleton h-16 flex-grow "></div>
        </div>
      </div>
    </div>
  );
};
