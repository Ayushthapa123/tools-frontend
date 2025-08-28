"use client";
import React, { useState } from "react";

interface ChecklistItem {
  label: string;
  value: string;
}

interface ChecklistProps {
  label: string; // New prop
  items: ChecklistItem[];
  onChange: (selected: any[]) => void; // Returns selected values 
  defaultValue?: string[];
}

const Checklist: React.FC<ChecklistProps> = ({ label, items, onChange, defaultValue }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultValue || []);

  const handleToggle = (value: string) => {
    let updated: string[];
    if (selectedItems.includes(value)) {
      updated = selectedItems.filter((v) => v !== value);
    } else {
      updated = [...selectedItems, value];
    }
    setSelectedItems(updated);
    onChange(updated);
  };

  return (
    <div className="p-6 bg-base-200 rounded-xl shadow-lg">
      {/* Question */}
      <h2 className="text-xl font-semibold mb-4">{label}</h2>

      {/* Checklist Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <label
            key={item.value}
            className="flex items-center gap-3 p-3 bg-base-100 rounded-lg shadow hover:bg-base-300 cursor-pointer transition"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={selectedItems.includes(item.value)}
              onChange={() => handleToggle(item.value)}
            />
            <span className="text-sm font-medium">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
