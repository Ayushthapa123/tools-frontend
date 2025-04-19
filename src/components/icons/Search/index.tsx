// SearchIcon.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface IconProps {
  className?: string;
}

const SearchIcon: React.FC<IconProps> = ({ className = '' }) => {
  return <FaSearch className={`text-primary ${className}`} />;
};

export default SearchIcon;
