// components/Tooltip.tsx

import React from 'react';

interface TooltipProps {
  className?: string;
  children: React.ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ className, children, content }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="tooltip">{children}</div>
      <div className="absolute left-0 z-10 -mt-8 w-32 rounded-lg bg-gray-800 p-2 text-sm text-white shadow-lg">
        {content}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 top-full h-2 w-full text-gray-800"
          viewBox="0 0 255 255"
          fill="currentColor"
        >
          <path d="M127.5 0c70.396 0 127.5 57.104 127.5 127.5 0 70.396-57.104 127.5-127.5 127.5-70.396 0-127.5-57.104-127.5-127.5C0 57.104 57.104 0 127.5 0zm0 38.25c-28.025 0-51 22.975-51 51 0 9.31 2.53 18.21 7.336 26.038 2.42 4.31.837 9.81-3.473 12.967-4.31 2.42-9.81.83-12.967-3.473C59.295 101.6 51 114.015 51 127.5c0 35.915 29.085 65 65 65s65-29.085 65-65c0-3.485-.285-6.936-.844-10.313-1.227-7.29-7.607-12.967-15.438-12.967-8.71 0-15.75 7.04-15.75 15.75 0 13.332-10.832 24.165-24.165 24.165s-24.165-10.833-24.165-24.165c0-5.182-4.18-9.375-9.375-9.375-5.183 0-9.375 4.192-9.375 9.375 0 23.523 19.133 42.656 42.656 42.656s42.656-19.133 42.656-42.656c0-26.183-21.317-47.5-47.5-47.5z" />
        </svg>
      </div>
    </div>
  );
};

export default Tooltip;
