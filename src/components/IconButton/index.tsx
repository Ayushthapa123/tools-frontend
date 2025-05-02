import React from 'react';

const combineClasses = (...classes: (string | Record<string, boolean> | undefined)[]): string => {
  return classes
    .map((item) => {
      if (!item) return '';
      if (typeof item === 'string') return item;
      return Object.entries(item)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(' ');
    })
    .filter(Boolean)
    .join(' ');
};

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'default' | 'primary' | 'secondary' | 'error';
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  size = 'medium',
  color = 'default',
}) => {
  const baseStyles = 'flex items-center justify-center rounded-full ';
  const sizeStyles = {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-3',
  };

  const colorStyles = {
    default: ' ',
    primary: 'text-primary hover:bg-primary-light ',
    secondary: 'text-secondary hover:bg-secondary-light ',
    error: 'text-error hover:bg-red-200',
  };

  const disabledStyles = 'text-gray-400 bg-gray-100 cursor-not-allowed';

  const combinedClassName = combineClasses(
    baseStyles,
    sizeStyles[size],
    colorStyles[color],
    { [disabledStyles]: disabled },
    className
  );

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-disabled={disabled}>
      {children}
    </button>
  );
};

export default IconButton;
