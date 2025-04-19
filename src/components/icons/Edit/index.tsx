// EditIcon.tsx
import React from 'react';
import { FaEdit } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const EditIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaEdit className={`text-primary ${className}`} />;
};

export default EditIcon;
