// DeleteIcon.tsx
import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteIconProps {
  className?: string;
}

const DeleteIcon = (props: DeleteIconProps) => {
  const { className } = props;

  return <FaTrash className={`text-error ${className}`} />;
};

export default DeleteIcon;
