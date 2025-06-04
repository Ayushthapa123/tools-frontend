'use client';
import React from 'react';

export interface Tab {
  label: string;
  content: React.ReactNode;
  id?: string; // optional for accessibility
}

interface TabsProps {
  tabs: Tab[];
  value?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  defaultIndex = 0,
  onChange,
  className = '',
  tabClassName = '',
  contentClassName = '',
}) => {
  const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
  const activeIndex = value !== undefined ? value : internalIndex;

  const handleChange = (index: number) => {
    if (onChange) onChange(index);
    else setInternalIndex(index);
  };

  return (
    <div className={`inline-block w-full ${className}`}>
      <div role="tablist" className="tabs tabs-boxed w-fit">
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <a
              key={tab.label}
              id={`tab-${index}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${index}`}
              className={`tab w-full ${isActive ? 'tab-active' : ''} ${tabClassName}`}
              onClick={(e) => {
                e.preventDefault();
                handleChange(index);
              }}
              href={`#panel-${index}`}
            >
              {tab.label}
            </a>
          );
        })}
      </div>

      <div className="inline-block w-full">
        {tabs.map((tab, index) => (
          <div
            key={tab.label}
            id={`panel-${index}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
          hidden={activeIndex !== index}
          className={`mt-4 p-4 bg-base-200 rounded-box shadow ${contentClassName}`}
        >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
