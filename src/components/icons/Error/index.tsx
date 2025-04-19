// ErrorIcon.tsx
import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const ErrorIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaExclamationCircle className={`text-danger ${className}`} />;
};

export default ErrorIcon;
