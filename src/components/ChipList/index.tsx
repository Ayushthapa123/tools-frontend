"use client";
import React, { useEffect, useMemo, useState } from "react";

interface Item {
  label: string;
  value: string;
}

interface ChipListProps {
  question: string;
  items: Item[];
  onChange: (selected: string[]) => void;
  defaultValue?: string[]; // initial selected values (only used on mount)
  placeholder?: string;
  maxSuggestions?: number;
}

const ChipList: React.FC<ChipListProps> = ({
  question,
  items,
  onChange,
  defaultValue = [],
  placeholder = "Search...",
  maxSuggestions = 50,
}) => {
  // initialize selected once from defaultValue (avoid resetting on every render)
  const [selected, setSelected] = useState<string[]>(() =>
    defaultValue
      .map(String)
      .filter((d) => items.some((i) => String(i.value) === d))
  );

  const [search, setSearch] = useState("");

  // Inform parent about initial selection once on mount
  useEffect(() => {
    onChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    const available = items.filter((i) => !selected.includes(String(i.value)));
    if (!q) return available.slice(0, maxSuggestions);
    return available
      .filter((i) => i.label.toLowerCase().includes(q))
      .slice(0, maxSuggestions);
  }, [items, search, selected, maxSuggestions]);

  const handleSelect = (value: string) => {
    const v = String(value);
    if (selected.includes(v)) return;
    const next = [...selected, v];
    setSelected(next);
    onChange(next);
    setSearch("");
  };

  const handleRemove = (value: string) => {
    const v = String(value);
    const next = selected.filter((s) => s !== v);
    setSelected(next);
    onChange(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        handleSelect(filteredItems[0].value);
      }
    }
  };

  return (
    <div className="w-full bg-base-100 p-4 rounded-lg shadow-sm">
      <p className="text-lg font-semibold mb-2">{question}</p>

      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input input-bordered w-full pr-20"
        />
        {search ? (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="mt-2">
        {filteredItems.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {filteredItems.map((item) => (
              <li key={item.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(item.value)}
                  className="btn btn-outline btn-sm rounded-full hover:btn-primary transition"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-2">No results</p>
        )}
      </div>

      {selected.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Selected</span>
            <button
              type="button"
              className="text-sm btn btn-ghost btn-xs"
              onClick={() => {
                setSelected([]);
                onChange([]);
              }}
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selected.map((v) => {
              const label =
                items.find((i) => String(i.value) === String(v))?.label ?? v;
              return (
                <span
                  key={v}
                  className="badge badge-primary gap-2 px-3 py-2 rounded-full flex items-center"
                >
                  <span className="truncate max-w-[8rem]">{label}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(v)}
                    className="ml-2 btn btn-xs btn-circle btn-ghost"
                    aria-label={`Remove ${label}`}
                  >
                    ✕
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChipList;
