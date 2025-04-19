// AddIcon.tsx
import React from 'react';
import { FaFileContract } from 'react-icons/fa';
import { FcRules } from 'react-icons/fc';

interface IconProps {
  className?: string;
}

const RulesIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaFileContract className={`text-secondary ${className}`} />;
};

export default RulesIcon;
