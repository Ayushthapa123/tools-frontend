// SettingsIcon.tsx
import React from 'react';
import { GrGallery } from 'react-icons/gr';
import { MdPayment } from 'react-icons/md';

interface IconProps {
  className?: string;
}

const GalleryIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <GrGallery className={`text-primary ${className}`} />;
};

export default GalleryIcon;
