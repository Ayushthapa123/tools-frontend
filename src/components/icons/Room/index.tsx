// SettingsIcon.tsx
import React from 'react';
import { MdBedroomParent } from 'react-icons/md';

interface IconProps {
  className?: string;
}

const RoomIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <MdBedroomParent className={`text-primary ${className}`} />;
};

export default RoomIcon;
