// RemoveIcon.tsx
import React from 'react';
import { FaMinus } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const RemoveIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaMinus className={`text-danger ${className}`} />;
};

export default RemoveIcon;
