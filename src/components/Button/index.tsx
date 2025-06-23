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
      buttonStyle = 'btn text-white/90 hover:text-white bg-primary hover:bg-[#156153]';
      break;
    case 'secondary':
      buttonStyle = 'bg-secondary  text-black';
      break;
    case 'danger':
      buttonStyle = 'bg-red text-white';
      break;
    case 'outlined':
      buttonStyle = ' bg-transparent text-primary border-[2px] border-primary';
      break;
    case 'teal': // New variant for nepal-teal
      buttonStyle = 'bg-nepal-teal text-white';
      break;
  }
  return (
    <button
      className={`${height === 'lg' ? 'h-[4rem]' : 'h-14'} relative flex w-full min-w-max items-center justify-center rounded-lg border px-6 py-3 align-middle transition-all duration-150 ease-in-out ${buttonStyle} ${className}`}
      {...restProps}
    >
      {startAdornment && <span>{startAdornment}</span>}
      <span className="text-base font-semibold">{label}</span>
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
