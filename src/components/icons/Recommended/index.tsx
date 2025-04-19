// AddIcon.tsx
import React from 'react';
import { FaPlus, FaStar } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

interface IconProps {
  className?: string;
}

const RecommendedIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FcLike className={`text-success ${className}`} />;
};

export default RecommendedIcon;
