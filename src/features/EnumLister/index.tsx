import Link from 'next/link';
import React from 'react';

type EnumListerProps = {
  enums: { value: string; label: string }[];
};

const EnumLister: React.FC<EnumListerProps> = ({ enums }) => {


  return (
    <div className="card bg-base shadow-xl border border-base-200 mb-10">
      <div className="card-body p-6">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {enums?.map((item) => (
            <Link href={`/search?query=${item.label.toLowerCase()}`} key={item.value}>
                <button
              key={item.value}
              type="button"
              className="btn btn-sm sm:btn-md hover:btn-primary hover:scale-105 active:scale-95 transition-all duration-200 ease-out min-h-[2.5rem] sm:min-h-[3rem]"
            >
              <span className="flex items-center ">
                <span className="truncate">{item.label}</span>
              </span>
            </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnumLister;
