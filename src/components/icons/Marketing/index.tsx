// SettingsIcon.tsx
import React from 'react';
import { BsMegaphoneFill } from 'react-icons/bs';

interface IconProps {
  className?: string;
}

const MarketingIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <BsMegaphoneFill className={`text-primary ${className}`} />;
};

export default MarketingIcon;
