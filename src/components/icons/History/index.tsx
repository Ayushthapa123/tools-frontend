// HistoryIcon.tsx
import React from 'react';
import { FaHistory } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const HistoryIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaHistory className={`text-gray-500 ${className}`} />;
};

export default HistoryIcon;
