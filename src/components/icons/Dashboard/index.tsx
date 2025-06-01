// SettingsIcon.tsx
import React from 'react';
import { FaChartBar } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const DashboardIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaChartBar className={`text-primary ${className}`} />;
};

export default DashboardIcon;
