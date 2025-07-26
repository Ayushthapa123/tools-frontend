import React, { FC, forwardRef, SelectHTMLAttributes } from 'react';

interface OptionType {
  value: string | number | null;
  label: string;
}

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  height?: 'lg' | 'sm';
  options: OptionType[];
}

const Select = forwardRef<HTMLSelectElement, SelectComponentProps>(({ label, name, options, height, className, required, ...restProps }, ref) => {
  return (
    <div className="relative flex flex-col space-y-1 ">
      <div className=' text-start'>
        {label && (
          <label htmlFor={name} className="text-base font-semibold text-gray-600 relative text-start ">
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}
      </div>
      <select
        ref={ref}
        className={`border border-[#959eb4] ${height === 'lg' ? 'h-[3rem]' : 'h-14'} appearance-none rounded-xl px-3 py-2 pr-10 focus:border-[#484beb] focus:outline-none placeholder:text-[16px] `}
        {...restProps}
      >
        {options.map((option, index) => (
          <option key={index} value={option?.value??""}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-1 top-4  flex items-center px-2 pointer-events-none">
        <svg className="w-7 h-7 text-gray-700 border-l border-gray-300 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
});

Select.displayName = 'SelectField';

export { Select };