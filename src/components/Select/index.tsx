import React, { FC, SelectHTMLAttributes } from 'react';

interface OptionType {
  value: string | number;
  label: string;
}

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  height?:'lg' |'sm'
  options: OptionType[];
}

const Select: FC<SelectComponentProps> = ({
  label,
  options,
  height,
  className,
  ...restProps
}) => {
  return (
    <div className="relative flex flex-col w-full space-y-2 min-w-max">
      <label
        htmlFor={restProps.name}
        className={`text-sm font-semibold text-gray-600 ${className}`}
      >
        {label}
      </label>
      <select
        className={`px-3 py-2 border border-[#1a1a1a] ${height==='lg'?"h-[3rem]":"h-[2.7rem]"} rounded-md focus:outline-none focus:border-indigo-500`}
        {...restProps}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Select };
