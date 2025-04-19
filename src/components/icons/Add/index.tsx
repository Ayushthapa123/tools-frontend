// AddIcon.tsx
import React from 'react';
import { GrStar } from 'react-icons/gr';

interface IconProps {
  className?: string;
}

const StarIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <GrStar className={`text-blue-700 ${className}`} />;
};

export default StarIcon;
