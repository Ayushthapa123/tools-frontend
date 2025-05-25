// SettingsIcon.tsx
import React from 'react';
import { FaInfoCircle,} from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const HostelInfoIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaInfoCircle className={`text-primary ${className}`} />;
};

export default HostelInfoIcon;
