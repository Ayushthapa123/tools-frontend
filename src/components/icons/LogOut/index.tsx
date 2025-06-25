// SettingsIcon.tsx
import React from 'react';
import { IoLogOut } from 'react-icons/io5';

interface IconProps {
  className?: string;
}

const LogoutIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <IoLogOut  className={`text-primary text-2xl ${className}`} />;
};

export default LogoutIcon;
