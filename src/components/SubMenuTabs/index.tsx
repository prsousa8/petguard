'use client';

import { useState } from 'react';

interface Tab {
  label: string;
  value: string;
}

interface SubmenuTabsProps {
  tabs: Tab[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function SubmenuTabs({ tabs, defaultValue, onChange }: SubmenuTabsProps) {
  const [active, setActive] = useState(defaultValue || tabs[0]?.value);

  function handleSelect(value: string) {
    setActive(value);
    onChange?.(value);
  }

  return (
    <div className="flex justify-center gap-8 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleSelect(tab.value)}
          className={`relative pb-2 text-lg font-medium transition ${
            active === tab.value
              ? 'text-indigo-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-indigo-600'
              : 'text-gray-500 hover:text-indigo-500'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
