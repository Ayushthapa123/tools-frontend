// FilterIcon.tsx
import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

const FilterIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top slider line */}
      <line x1="4" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="6" r="2" fill="currentColor"/>
      <line x1="14" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      
      {/* Middle slider line */}
      <line x1="4" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="18" cy="12" r="2" fill="currentColor"/>
      <line x1="20" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      
      {/* Bottom slider line */}
      <line x1="4" y1="18" x2="8" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="10" cy="18" r="2" fill="currentColor"/>
      <line x1="12" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

export default FilterIcon;
