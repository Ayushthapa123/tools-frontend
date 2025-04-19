// SettingsIcon.tsx
import React from 'react';
import { MdOutlineBook } from 'react-icons/md';

interface IconProps {
  className?: string;
}

const BookingIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <MdOutlineBook className={`text-primary ${className}`} />;
};

export default BookingIcon;
