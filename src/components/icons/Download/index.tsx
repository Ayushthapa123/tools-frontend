// DownloadIcon.tsx
import React from 'react';
import { FaDownload } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const DownloadIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaDownload className={`text-info ${className}`} />;
};

export default DownloadIcon;
