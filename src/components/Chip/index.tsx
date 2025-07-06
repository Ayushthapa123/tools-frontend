'use client';

import React from 'react';
import Button from '../Button';
import DeleteIcon from '../icons/Delete';

interface ChipProps {
  label: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'outline';
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantClasses = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green text-white',
  error: 'bg-error text-white',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
  outline: 'border border-gray-300 text-gray-800',
};

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'default',
  icon,
  removable = false,
  onRemove,
  className = '',
}) => {
  return (
    <div
      role="status"
      className={`badge badge-success badge-sm w-full sm:w-fit sm:min-w-[120px] sm:badge-md gap-0 sm:gap-1 flex-shrink-0 p-4 !px-2 ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span className='inline font-semibold text-base'>{label}</span>

      {removable && (
        <span>
          <DeleteIcon className='w-6 h-6 text-error'/>
        </span>
      )}
    </div>
  );
};
