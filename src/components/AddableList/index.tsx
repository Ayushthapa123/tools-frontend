"use client";

import React, { useState } from "react";

interface AddableListProps {
  items?: string[]; // optional predefined items
  defaultValues?: string[];
  placeholder?: string;
  label?: string;
  onChange?: (selectedItems: string[]) => void;
}

const AddableList: React.FC<AddableListProps> = ({
  items = [],
  defaultValues = [],
  placeholder = "Type something...",
  label,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([...defaultValues]);

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (selectedItems.includes(trimmed)) {
      setInputValue("");
      return;
    }

    const updatedItems = [...selectedItems, trimmed];
    setSelectedItems(updatedItems);
    setInputValue("");
    onChange?.(updatedItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or page reload
      addItem();
    }
  };

  const removeItem = (value: string) => {
    const updatedItems = selectedItems.filter((i) => i !== value);
    setSelectedItems(updatedItems);
    onChange?.(updatedItems);
  };

  return (
    <div className="w-full p-4 bg-base-100 rounded-lg shadow-md">
      {label && <p className="mb-3 font-semibold text-lg">{label}</p>}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input input-bordered w-full rounded-lg shadow-sm focus:ring focus:ring-primary"
        />
        <button
          className="btn btn-primary rounded-lg shadow-md hover:btn-primary-focus"
          onClick={addItem}
          type="button"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1"
          >
            <span className="text-sm font-medium">{item}</span>
            <button
              onClick={() => removeItem(item)}
              className="text-white bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-primary-focus"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddableList;
