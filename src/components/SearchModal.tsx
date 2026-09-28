import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { CATEGORIES_CONFIG, MarketItem, MarketIndex } from '../data/marketsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MarketItem | MarketIndex) => void;
  watchlist: string[];
  onToggleWatchlist: (ticker: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  watchlist,
  onToggleWatchlist
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'stocks' | 'crypto' | 'forex' | 'indices'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Aggregate all items & indices for search
  const allSearchable = React.useMemo(() => {
    const list: Array<{
      id: string;
      ticker: string;
      name: string;
      badge: { text: string; bg: string; textColor?: string };
      priceFormatted: string;
      changeFormatted: string;
      isUp: boolean;
      type: 'stocks' | 'crypto' | 'forex' | 'indices';
      rawItem: MarketItem | MarketIndex;
    }> = [];

    CATEGORIES_CONFIG.forEach(cat => {
      // Add indices
      cat.indices.forEach(idx => {
        list.push({
          id: idx.id,
          ticker: idx.symbol,
          name: idx.name,
          badge: idx.badge,
          priceFormatted: idx.priceFormatted,
          changeFormatted: `${idx.changeFormatted} ${idx.changePercentFormatted}`,
          isUp: idx.change >= 0,
          type: 'indices',
          rawItem: idx
        });
      });

      // Add items
      cat.items.forEach(stock => {
        let type: 'stocks' | 'crypto' | 'forex' | 'indices' = 'stocks';
        if (cat.id === 'crypto') type = 'crypto';
        else if (cat.id === 'forex') type = 'forex';
        else if (cat.id === 'us-stocks' || cat.id === 'world-stocks') type = 'stocks';

        list.push({
          id: stock.id,
          ticker: stock.ticker,
          name: stock.name,
          badge: stock.badge,
          priceFormatted: `${stock.price.toLocaleString()} ${stock.currency}`,
          changeFormatted: `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%)`,
          isUp: stock.change >= 0,
          type,
          rawItem: stock
        });
      });
    });

    // Remove duplicates by ticker
    const seen = new Set<string>();
    return list.filter(item => {
      if (seen.has(item.ticker)) return false;
      seen.add(item.ticker);
      return true;
    });
  }, []);

  const filteredResults = React.useMemo(() => {
    let results = allSearchable;
    if (filterType !== 'all') {
      results = results.filter(item => item.type === filterType);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(
        item => item.ticker.toLowerCase().includes(q) || item.name.toLowerCase().includes(q)
      );
    }
    return results;
  }, [allSearchable, filterType, query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredResults.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredResults.length) % (filteredResults.length || 1));
      } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        e.preventDefault();
        onSelectItem(filteredResults[selectedIndex].rawItem);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose, onSelectItem]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#1E222D] rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#2A2E39] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
          <Search className="w-5 h-5 text-[#6A6D78] dark:text-[#848E9C] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search markets, stocks, crypto, indices... (e.g. NVDA, BTC, S&P 500)"
            className="w-full bg-transparent text-[#131722] dark:text-white placeholder-[#6A6D78] dark:placeholder-[#848E9C] text-base outline-none border-none focus:ring-0 p-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#6A6D78] hover:text-[#131722] dark:hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs text-[#6A6D78] bg-[#F0F3FA] dark:bg-[#2A2E39] dark:text-[#848E9C] rounded border border-[#E0E3EB] dark:border-[#363A45]">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F8FAFD] dark:bg-[#181B22] border-b border-[#E0E3EB] dark:border-[#2A2E39] overflow-x-auto no-scrollbar">
          {(['all', 'stocks', 'crypto', 'forex', 'indices'] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                setFilterType(type);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                filterType === type
                  ? 'bg-[#2962FF] text-white'
                  : 'text-[#6A6D78] dark:text-[#848E9C] hover:bg-[#E0E3EB]/60 dark:hover:bg-[#2A2E39]'
              }`}
            >
              {type}
            </button>
          ))}
          <span className="text-xs text-[#6A6D78] dark:text-[#848E9C] ml-auto shrink-0">
            {filteredResults.length} matches
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto flex-1 p-2 divide-y divide-transparent">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-[#6A6D78] dark:text-[#848E9C]">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No market results found for "{query}"</p>
              <p className="text-xs mt-1 text-[#6A6D78]/70">Try searching NVDA, Apple, Bitcoin, or S&P 500</p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              const isSaved = watchlist.includes(item.ticker);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item.rawItem);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#F0F3FA] dark:bg-[#2A2E39]'
                      : 'hover:bg-[#F8FAFD] dark:hover:bg-[#232733]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 text-white"
                      style={{ backgroundColor: item.badge.bg, color: item.badge.textColor || '#ffffff' }}
                    >
                      {item.badge.text}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#131722] dark:text-white">
                          {item.ticker}
                        </span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded uppercase font-medium bg-[#E0E3EB]/50 dark:bg-[#1E222D] text-[#6A6D78] dark:text-[#848E9C]">
                          {item.type}
                        </span>
                      </div>
                      <div className="text-xs text-[#6A6D78] dark:text-[#848E9C] truncate">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right shrink-0">
                    <div>
                      <div className="text-sm font-semibold text-[#131722] dark:text-white tabular-nums">
                        {item.priceFormatted}
                      </div>
                      <div className={`text-xs font-medium tabular-nums ${item.isUp ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                        {item.changeFormatted}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(item.ticker);
                      }}
                      className="p-1.5 rounded-lg text-[#6A6D78] hover:text-[#FF9900] transition"
                      title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    >
                      <Star className={`w-4 h-4 ${isSaved ? 'fill-[#FF9900] text-[#FF9900]' : ''}`} />
                    </button>

                    <ArrowRight className="w-4 h-4 text-[#6A6D78] opacity-50" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#F8FAFD] dark:bg-[#181B22] border-t border-[#E0E3EB] dark:border-[#2A2E39] text-[11px] text-[#6A6D78] dark:text-[#848E9C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-[#2A2E39] rounded border border-[#E0E3EB] dark:border-[#363A45]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#2A2E39] rounded border border-[#E0E3EB] dark:border-[#363A45]">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-[#2A2E39] rounded border border-[#E0E3EB] dark:border-[#363A45]">↵</kbd> to view chart</span>
          </div>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#089981]" /> Real-time feed
          </span>
        </div>
      </div>
    </div>
  );
};
