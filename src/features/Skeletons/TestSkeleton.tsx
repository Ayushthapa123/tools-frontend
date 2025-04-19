

export const TestSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 w-full">
        <div className="skeleton h-32 w-full flex p-10 gap-7">
          <div className="skeleton w-16 h-16  shrink-0"></div>
          <div className="skeleton flex-grow h-16 "></div>
        </div>
      </div>
    </div>
  );
 }
