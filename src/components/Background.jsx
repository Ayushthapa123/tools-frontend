import React from 'react';

export const CloudBackground = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div className="h-screen w-screen">
        <svg
          className="inline-block h-auto w-full fill-current text-lime-200/40"
          viewBox="0 0 1440 450"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M1189.2 169.2H421H253.8C159.8 169.2 69.1 203.1 0 262.6V449.8C30.5 349.9 131.3 276.7 252 276.7H424.1H1187.4C1280.9 276.7 1371 243.2 1440 184.3V0C1408.1 97.9 1308.3 169.2 1189.2 169.2Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default CloudBackground;
