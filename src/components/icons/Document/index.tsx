// DocumentIcon.tsx
import React from 'react';
import { FaFileAlt } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const DocumentIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaFileAlt className={`text-gray-500 ${className}`} />;
};

export default DocumentIcon;
