// WarningIcon.tsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const WarningIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaExclamationTriangle className={`text-warning ${className}`} />;
};

export default WarningIcon;
