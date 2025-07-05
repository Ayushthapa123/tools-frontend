import React from 'react';
import { FcGoogle } from 'react-icons/fc';

interface IconProps {
  className?: string;
}

const GoogleIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FcGoogle className={`text-primary ${className}`} />;
};

export default GoogleIcon;