// ExportIcon.tsx
import React from 'react';
import { FaFileExport } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const ExportIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaFileExport className={`btn- text-gray-500 ${className}`} />;
};

export default ExportIcon;
