// SettingsIcon.tsx
import React from 'react';
import { FaCog } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const SettingsIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaCog className={`text-primary ${className}`} />;
};

export default SettingsIcon;
