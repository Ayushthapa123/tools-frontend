// components/LoadingSpinner.tsx

import React from 'react';

const LoadingSpinner = ({
  className,
  color='primary',
  size,
}: {
  className?: string;
  color?: 'primary' | 'white';
  size?: 'lg' | 'sm';
}) => {
  return (
    <div className=" relative flex h-full w-full flex-col items-center justify-center align-middle">
      {' '}
      <span
        className={`loading loading-spinner ${color === 'primary' ? 'text-primary' : 'text-white'} ${size === 'lg' ? 'h-16 w-16' : ''} ${className}`}
      ></span>
    </div>
  );
};

export default LoadingSpinner;
