'use client';

import React, { useState, useRef, useEffect } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label?: string;
  className?: string;
  showValues?: boolean;
  formatValue?: (value: number) => string;
  disabled?: boolean;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  className = '',
  showValues = true,
  formatValue = (val) => val.toString(),
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPercentage = (percentage: number) => {
    const value = (percentage / 100) * (max - min) + min;
    return Math.round(value / step) * step;
  };

  const handleMouseDown = (e: React.MouseEvent, type: 'min' | 'max') => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = getValueFromPercentage(percentage);

    if (isDragging === 'min') {
      const newMin = Math.min(newValue, value[1] - step);
      onChange([newMin, value[1]]);
    } else {
      const newMax = Math.max(newValue, value[0] + step);
      onChange([value[0], newMax]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, value]);

  const minPercentage = getPercentage(value[0]);
  const maxPercentage = getPercentage(value[1]);

  return (
    <div className={`w-full ${className} `}>
      {label && (
        <label className="block text-base font-semibold text-gray-600 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative w-full px-2">
        {/* Track */}
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer  "
          onMouseDown={(e) => {
            const rect = sliderRef.current?.getBoundingClientRect();
            if (!rect) return;
            
            const percentage = ((e.clientX - rect.left) / rect.width) * 100;
            const newValue = getValueFromPercentage(percentage);
            
            // Determine which thumb to move based on which is closer
            const minDistance = Math.abs(newValue - value[0]);
            const maxDistance = Math.abs(newValue - value[1]);
            
            if (minDistance < maxDistance) {
              const newMin = Math.min(newValue, value[1] - step);
              onChange([newMin, value[1]]);
            } else {
              const newMax = Math.max(newValue, value[0] + step);
              onChange([value[0], newMax]);
            }
          }}
        >
          {/* Selected range */}
          <div
            className="absolute h-full bg-blue/80 rounded-full"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />
          
          {/* Min thumb */}
          <div
            className="absolute top-1/2 w-5 h-5 bg-blue/80 border-2 border-blue-500 rounded-full cursor-pointer transform -translate-y-1/2 -translate-x-1/2 shadow-md hover:shadow-lg transition-shadow"
            style={{ left: `${minPercentage}%` }}
            onMouseDown={(e) => handleMouseDown(e, 'min')}
          />
          
          {/* Max thumb */}
          <div
            className="absolute top-1/2 w-5 h-5 bg-blue/80 border-2 border-blue-500 rounded-full cursor-pointer transform -translate-y-1/2 -translate-x-1/2 shadow-md hover:shadow-lg transition-shadow"
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={(e) => handleMouseDown(e, 'max')}
          />
        </div>
        
        {/* Value labels */}
        {showValues && (
          <div className="flex justify-between mt-2 text-sm text-gray-700">
            <span>{formatValue(value[0])}</span>
            <span>{formatValue(value[1])}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RangeSlider; 