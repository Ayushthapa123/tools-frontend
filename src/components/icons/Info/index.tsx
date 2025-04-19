// InfoIcon.tsx
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const InfoIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaInfoCircle className={`text-info ${className}`} />;
};

export default InfoIcon;
