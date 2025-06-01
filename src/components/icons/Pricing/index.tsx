// SettingsIcon.tsx
import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const PriceIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaDollarSign className={`text-primary ${className}`} />;
};

export default PriceIcon;
