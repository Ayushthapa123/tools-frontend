// SettingsIcon.tsx
import React from 'react';
import { MdBedroomParent, MdCleaningServices } from 'react-icons/md';

interface IconProps {
  className?: string;
}

const ServiceIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <MdCleaningServices className={`text-secondary ${className}`} />;
};

export default ServiceIcon;
