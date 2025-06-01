import React from 'react';

export const MoreWavyBackground = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="h-full w-screen">
        <svg
          className="text-blue-300/50 inline-block h-auto w-full fill-current"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,202.7C672,181,768,139,864,133.3C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default MoreWavyBackground;
