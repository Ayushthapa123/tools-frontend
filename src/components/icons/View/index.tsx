// ViewIcon.tsx
import React from 'react';
import { FaEye } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const ViewIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaEye className={`text-info ${className}`} />;
};

export default ViewIcon;
