// SaveIcon.tsx
import React from 'react';
import { FaSave } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const SaveIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaSave className={`text-success ${className}`} />;
};

export default SaveIcon;
