// AddIcon.tsx
import React from 'react';
import { FaWifi } from 'react-icons/fa';
import { GrStar } from 'react-icons/gr';

interface IconProps {
  className?: string;
}

const WifiIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaWifi className={`text-secondary ${className}`} />;
};

export default WifiIcon;
