// AddIcon.tsx
import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const AddIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaPlus className={`text-success ${className}`} />;
};

export default AddIcon;
