import React, { useRef, useEffect } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/marketsData';

interface MarketsEverywhereDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const MarketsEverywhereDropdown: React.FC<MarketsEverywhereDropdownProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 sm:w-96 bg-white dark:bg-[#1E222D] rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#2A2E39] py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="px-4 py-2 border-b border-[#E0E3EB]/70 dark:border-[#2A2E39] mb-1">
        <span className="text-[11px] font-bold text-[#6A6D78] dark:text-[#848E9C] uppercase tracking-wider">
          Explore Global Market Segments
        </span>
      </div>

      <div className="max-h-[360px] overflow-y-auto p-1.5 space-y-1">
        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = cat.id === selectedCategory;
          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors ${
                isSelected
                  ? 'bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#2962FF] font-semibold'
                  : 'text-[#131722] dark:text-white hover:bg-[#F8FAFD] dark:hover:bg-[#232733]'
              }`}
            >
              <div>
                <div className="font-semibold">{cat.label}</div>
                <div className="text-xs text-[#6A6D78] dark:text-[#848E9C] truncate max-w-[240px]">
                  {cat.indices.map(i => i.name).slice(0, 3).join(', ')}
                </div>
              </div>

              {isSelected ? (
                <Check className="w-4 h-4 text-[#2962FF]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#6A6D78] opacity-40" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
