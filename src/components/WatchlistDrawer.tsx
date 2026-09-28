import React from 'react';
import { X, Star, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MarketItem, MarketIndex, CATEGORIES_CONFIG } from '../data/marketsData';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: string[];
  onRemoveFromWatchlist: (ticker: string) => void;
  onSelectItem: (item: MarketItem | MarketIndex) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemoveFromWatchlist,
  onSelectItem
}) => {
  if (!isOpen) return null;

  // Find all items in watchlist
  const watchlistItems = React.useMemo(() => {
    const list: Array<{
      ticker: string;
      name: string;
      priceFormatted: string;
      changeFormatted: string;
      isUp: boolean;
      badge: { text: string; bg: string; textColor?: string };
      rawItem: MarketItem | MarketIndex;
    }> = [];

    watchlist.forEach(symbol => {
      for (const cat of CATEGORIES_CONFIG) {
        const foundStock = cat.items.find(s => s.ticker === symbol);
        if (foundStock) {
          list.push({
            ticker: foundStock.ticker,
            name: foundStock.name,
            priceFormatted: `${foundStock.price.toLocaleString()} ${foundStock.currency}`,
            changeFormatted: `${foundStock.change >= 0 ? '+' : ''}${foundStock.change.toFixed(2)} (${foundStock.changePercent >= 0 ? '+' : ''}${foundStock.changePercent.toFixed(2)}%)`,
            isUp: foundStock.change >= 0,
            badge: foundStock.badge,
            rawItem: foundStock
          });
          break;
        }

        const foundIndex = cat.indices.find(i => i.symbol === symbol);
        if (foundIndex) {
          list.push({
            ticker: foundIndex.symbol,
            name: foundIndex.name,
            priceFormatted: foundIndex.priceFormatted,
            changeFormatted: `${foundIndex.changeFormatted} ${foundIndex.changePercentFormatted}`,
            isUp: foundIndex.change >= 0,
            badge: foundIndex.badge,
            rawItem: foundIndex
          });
          break;
        }
      }
    });

    return list;
  }, [watchlist]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#1E222D] h-full shadow-2xl flex flex-col border-l border-[#E0E3EB] dark:border-[#2A2E39] animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#FF9900] fill-[#FF9900]" />
            <h2 className="text-base font-bold text-[#131722] dark:text-white">
              Watchlist
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#6A6D78] dark:text-[#848E9C]">
              {watchlistItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6A6D78] hover:text-[#131722] dark:hover:text-white rounded-lg hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Watchlist content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {watchlistItems.length === 0 ? (
            <div className="py-16 text-center text-[#6A6D78] dark:text-[#848E9C]">
              <Star className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#6A6D78]" />
              <p className="text-sm font-medium">Your watchlist is empty</p>
              <p className="text-xs mt-1 text-[#6A6D78]/70 px-8">
                Click the star icon on any stock, index, or cryptocurrency to track it in real time here.
              </p>
            </div>
          ) : (
            watchlistItems.map((item) => (
              <div
                key={item.ticker}
                onClick={() => {
                  onSelectItem(item.rawItem);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl border border-[#E0E3EB]/70 dark:border-[#2A2E39] hover:bg-[#F8FAFD] dark:hover:bg-[#232733] cursor-pointer transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0"
                    style={{ backgroundColor: item.badge.bg, color: item.badge.textColor || '#ffffff' }}
                  >
                    {item.badge.text}
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-sm text-[#131722] dark:text-white group-hover:text-[#2962FF] transition-colors">
                      {item.ticker}
                    </div>
                    <div className="text-xs text-[#6A6D78] dark:text-[#848E9C] truncate">
                      {item.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#131722] dark:text-white tabular-nums">
                      {item.priceFormatted}
                    </div>
                    <div className={`text-xs font-semibold flex items-center justify-end gap-0.5 tabular-nums ${item.isUp ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                      {item.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      <span>{item.changeFormatted}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromWatchlist(item.ticker);
                    }}
                    className="p-1.5 text-[#6A6D78] hover:text-[#F23645] hover:bg-[#FDECEE] dark:hover:bg-[#F23645]/20 rounded-lg transition"
                    title="Remove from Watchlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {watchlistItems.length > 0 && (
          <div className="p-4 border-t border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8FAFD] dark:bg-[#181B22] flex items-center justify-between text-xs text-[#6A6D78] dark:text-[#848E9C]">
            <span>Synced across devices</span>
            <button
              onClick={() => {
                watchlist.forEach(t => onRemoveFromWatchlist(t));
              }}
              className="text-[#F23645] hover:underline font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
