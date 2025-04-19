// ExportIcon.tsx
import React from 'react';
import { FaFileExport } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const ExportIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaFileExport className={`text-gray-500 btn- ${className}`} />;
};

export default ExportIcon;
