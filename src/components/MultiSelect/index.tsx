"use client";

import React, { useState } from "react";

interface Item {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Item[];               // predefined selectable options
  defaultValues?: Item[];        // initial selected options
  placeholder?: string;
  label?: string;
  onChange?: (selectedItems: Item[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  defaultValues = [],
  placeholder = "Select options...",
  label,
  onChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>(defaultValues);
  const [showOptions, setShowOptions] = useState(false);

  const toggleSelect = (item: Item) => {
    const exists = selectedItems.some((i) => i.value === item.value);
    let updatedItems: Item[];
    if (exists) {
      updatedItems = selectedItems.filter((i) => i.value !== item.value);
    } else {
      updatedItems = [...selectedItems, item];
    }
    setSelectedItems(updatedItems);
    onChange?.(updatedItems);
  };

  return (
    <div className="w-full p-4 bg-base-100 rounded-lg shadow-md relative">
      {label && <p className="mb-3 font-semibold text-lg">{label}</p>}

      <div
        className="input input-bordered w-full rounded-lg shadow-sm cursor-pointer flex justify-between items-center"
        onClick={() => setShowOptions(!showOptions)}
      >
        <span>
          {selectedItems.length > 0
            ? selectedItems.map((i) => i.label).join(", ")
            : placeholder}
        </span>
        <span className="ml-2">{showOptions ? "▲" : "▼"}</span>
      </div>

      {showOptions && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-primary hover:text-white rounded-md ${
                selectedItems.some((i) => i.value === option.value)
                  ? "bg-primary text-white"
                  : ""
              }`}
              onClick={() => toggleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedItems.map((item) => (
            <div
              key={item.value}
              className="badge badge-primary badge-outline flex items-center gap-2 px-3 py-1"
            >
              {item.label}
              <button
                onClick={() => toggleSelect(item)}
                className="ml-1 btn btn-xs btn-circle btn-error text-white p-0"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
