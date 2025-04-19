// AddIcon.tsx
import React from 'react';
import { FaPeopleCarry } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const CommunityIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaPeopleCarry className={`text-primary ${className}`} />;
};

export default CommunityIcon;
