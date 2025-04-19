// AddIcon.tsx
import React from 'react';
import {GrMapLocation } from 'react-icons/gr';

interface IconProps {
  className?: string;
}

const MapIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <GrMapLocation className={`text-primary ${className}`} />;
};

export default MapIcon;
