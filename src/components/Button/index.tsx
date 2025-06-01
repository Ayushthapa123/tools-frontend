import React, { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import LoadingSpinner from '../Loading';

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined' | 'teal';
  label: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  height?: 'sm' | 'lg';
  loading?: boolean;
}

const Button: FC<ButtonComponentProps> = ({
  variant = 'primary',
  label,
  startAdornment,
  endAdornment,
  className,
  loading,
  height,

  ...restProps
}) => {
  let buttonStyle = '';

  switch (variant) {
    case 'primary':
      buttonStyle = 'bg-primary  text-white';
      break;
    case 'secondary':
      buttonStyle = 'bg-secondary  text-black';
      break;
    case 'danger':
      buttonStyle = 'bg-red-600 text-white';
      break;
    case 'outlined':
      buttonStyle = 'bg-transparent text-primary border border-primary';
      break;
    case 'teal': // New variant for nepal-teal
      buttonStyle = 'bg-nepal-teal text-white';
      break;
  }
  return (
    <button
      className={`${height === 'lg' ? 'h-[3rem]' : 'h-[2.7rem]'}  relative flex w-full min-w-max items-center justify-center space-x-2 rounded-lg border   px-4 py-2 align-middle transition duration-300 ease-in-out ${buttonStyle} ${className}`}
      {...restProps}
    >
      {startAdornment && <span>{startAdornment}</span>}
      <span>{label}</span>
      {loading && (
        <span className="relative  h-[2rem] w-[2rem]">
          <LoadingSpinner color="white" />
        </span>
      )}
      {endAdornment && <span className="relative top-[2px] ">{endAdornment}</span>}
    </button>
  );
};

export default Button;
