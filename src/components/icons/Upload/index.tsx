// UploadIcon.tsx
import React from 'react';
import { FaUpload } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const UploadIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaUpload className={`text-warning ${className}`} />;
};

export default UploadIcon;
