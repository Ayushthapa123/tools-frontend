// SettingsIcon.tsx
import React from 'react';
import { FiLogOut } from 'react-icons/fi';

interface IconProps {
  className?: string;
}

const LogoutIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FiLogOut className={`text-primary ${className}`} />;
};

export default LogoutIcon;
