/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronDown, ArrowUpDown, ArrowUp, ArrowDown, Radio } from 'lucide-react';
import { CATEGORIES_CONFIG, MarketIndex, MarketItem } from './data/marketsData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { TickerDetailModal } from './components/TickerDetailModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { AuthModal } from './components/AuthModal';
import { MarketsEverywhereDropdown } from './components/MarketsEverywhereDropdown';

type SortColumn = 'ticker' | 'price' | 'change' | 'changePercent' | 'marketCap' | 'volume';
type SortDirection = 'asc' | 'desc';

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('us-stocks');
  const [activeMoverTab, setActiveMoverTab] = useState<'all' | 'gainers' | 'losers'>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<MarketItem | MarketIndex | null>(null);
  const [liveTicksEnabled, setLiveTicksEnabled] = useState(true);
  const [flashTicker, setFlashTicker] = useState<{ ticker: string; isUp: boolean } | null>(null);

  // Sorting state for market movers table
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Watchlist stored in state
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      return saved ? JSON.parse(saved) : ['NVDA', 'AAPL', 'BTC/USD'];
    } catch {
      return ['NVDA', 'AAPL', 'BTC/USD'];
    }
  });

  // User state
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('tv_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Synchronize dark mode class on document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Persist watchlist
  useEffect(() => {
    try {
      localStorage.setItem('tv_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  const toggleWatchlist = (ticker: string) => {
    setWatchlist(prev =>
      prev.includes(ticker) ? prev.filter(t => t !== ticker) : [...prev, ticker]
    );
  };

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Current category data
  const currentCategory = useMemo(() => {
    return (
      CATEGORIES_CONFIG.find(c => c.id === selectedCategoryId) ||
      CATEGORIES_CONFIG[0]
    );
  }, [selectedCategoryId]);

  // Dynamic live simulated ticks
  const [categoryItems, setCategoryItems] = useState<MarketItem[]>(currentCategory.items);

  // When category changes, reset items
  useEffect(() => {
    setCategoryItems(currentCategory.items);
  }, [currentCategory]);

  // Realistic micro-tick simulation
  useEffect(() => {
    if (!liveTicksEnabled) return;

    const interval = setInterval(() => {
      setCategoryItems(prevItems => {
        if (!prevItems || prevItems.length === 0) return prevItems;
        const randomIndex = Math.floor(Math.random() * prevItems.length);
        const target = prevItems[randomIndex];
        const isUpTick = Math.random() > 0.48;
        const delta = (Math.random() * 0.003 + 0.0005) * target.price * (isUpTick ? 1 : -1);

        const newPrice = Math.max(0.01, +(target.price + delta).toFixed(2));
        const newChange = +(target.change + delta).toFixed(2);
        const newChangePercent = +(((newPrice - (target.price - target.change)) / (target.price - target.change)) * 100).toFixed(2);

        setFlashTicker({ ticker: target.ticker, isUp: isUpTick });
        setTimeout(() => setFlashTicker(null), 1200);

        const updated = [...prevItems];
        updated[randomIndex] = {
          ...target,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
        };
        return updated;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [liveTicksEnabled]);

  // Filter items by sub-tab: Most active / Gainers / Losers
  const filteredItems = useMemo(() => {
    let list = [...categoryItems];
    if (activeMoverTab === 'gainers') {
      list = list.filter(item => item.change >= 0);
      list.sort((a, b) => b.changePercent - a.changePercent);
    } else if (activeMoverTab === 'losers') {
      list = list.filter(item => item.change < 0);
      list.sort((a, b) => a.changePercent - b.changePercent);
    }

    // Apply column sorting if active
    if (sortColumn) {
      list.sort((a, b) => {
        let valA: any = a[sortColumn];
        let valB: any = b[sortColumn];

        if (sortColumn === 'marketCap') {
          const parseCap = (s: string) => {
            if (!s || s === '-') return 0;
            const num = parseFloat(s);
            if (s.endsWith('T')) return num * 1e12;
            if (s.endsWith('B')) return num * 1e9;
            if (s.endsWith('M')) return num * 1e6;
            return num;
          };
          valA = parseCap(a.marketCap);
          valB = parseCap(b.marketCap);
        } else if (sortColumn === 'volume') {
          const parseVol = (s: string) => {
            if (!s || s === '-') return 0;
            const num = parseFloat(s);
            if (s.endsWith('B')) return num * 1e9;
            if (s.endsWith('M')) return num * 1e6;
            if (s.endsWith('K')) return num * 1e3;
            return num;
          };
          valA = parseVol(a.volume);
          valB = parseVol(b.volume);
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [categoryItems, activeMoverTab, sortColumn, sortDirection]);

  const handleSort = (col: SortColumn) => {
    if (sortColumn === col) {
      if (sortDirection === 'desc') setSortDirection('asc');
      else {
        setSortColumn(null);
        setSortDirection('desc');
      }
    } else {
      setSortColumn(col);
      setSortDirection('desc');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#131722] text-[#131722] dark:text-[#D1D4DC] selection:bg-blue-100 selection:text-[#2962FF] transition-colors">
      {/* Top Main Navigation Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSelectCategory={(catId) => setSelectedCategoryId(catId)}
      />

      {/* Main Viewport Content */}
      <main className="flex-grow max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        {/* Hero Header / Title with Markets Dropdown */}
        <section className="text-center mb-10 md:mb-12 relative" data-purpose="hero-title-section">
          <div className="relative inline-block">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center justify-center gap-3 cursor-pointer group mb-6 hover:opacity-90 transition"
              title="Click to switch market segments"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#131722] dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                {currentCategory.heroHeadline}
              </h1>
              <ChevronDown className="w-8 h-8 md:w-10 md:h-10 text-[#131722] dark:text-white group-hover:translate-y-0.5 transition-transform stroke-[2.5]" />
            </button>

            {/* Markets Everywhere Dropdown Popover */}
            <MarketsEverywhereDropdown
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              selectedCategory={selectedCategoryId}
              onSelectCategory={(id) => {
                setSelectedCategoryId(id);
                setIsDropdownOpen(false);
              }}
            />
          </div>

          {/* Category Filter Pills Bar */}
          <nav
            aria-label="Market Categories"
            className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 pb-2"
          >
            {CATEGORIES_CONFIG.map((category) => {
              const isActive = category.id === selectedCategoryId;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setActiveMoverTab('all');
                  }}
                  className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'font-semibold bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-2xs'
                      : 'font-medium text-[#6A6D78] dark:text-[#848E9C] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </nav>
        </section>

        {/* Indices Section */}
        <section className="mb-14" data-purpose="indices-section">
          {/* Section Title & Link */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => {
                if (currentCategory.indices[0]) {
                  setSelectedDetailItem(currentCategory.indices[0]);
                }
              }}
              className="inline-flex items-center gap-1.5 text-2xl font-bold text-[#131722] dark:text-white hover:text-[#2962FF] dark:hover:text-[#2962FF] transition-colors group cursor-pointer"
            >
              <span>{currentCategory.indicesTitle}</span>
              <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
            </button>

            {/* Quick Live Data Indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiveTicksEnabled(!liveTicksEnabled)}
                className={`hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition ${
                  liveTicksEnabled
                    ? 'text-[#089981] bg-[#E8F5EE] dark:bg-[#089981]/20'
                    : 'text-[#6A6D78] bg-[#F0F3FA] dark:bg-[#2A2E39]'
                }`}
                title="Toggle live price tick simulation"
              >
                <Radio className={`w-3.5 h-3.5 ${liveTicksEnabled ? 'animate-pulse' : ''}`} />
                <span>{liveTicksEnabled ? 'Live Feed' : 'Paused'}</span>
              </button>
            </div>
          </div>

          {/* Indices Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentCategory.indices.map((index) => {
              const isUp = index.change >= 0;

              return (
                <div
                  key={index.id}
                  onClick={() => setSelectedDetailItem(index)}
                  className="bg-[#F0F3FA]/70 dark:bg-[#1E222D]/70 hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] border border-[#E0E3EB]/70 dark:border-[#2A2E39] rounded-2xl p-4 hover-card transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Circular Badge */}
                      <div
                        className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0"
                        style={{ backgroundColor: index.badge.bg, color: index.badge.textColor || '#ffffff' }}
                      >
                        {index.badge.text}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#131722] dark:text-white leading-snug">
                          {index.name}
                        </h3>
                        <span className="text-xs text-[#6A6D78] dark:text-[#848E9C] uppercase tracking-wider">
                          {index.symbol} • {index.exchange}
                        </span>
                      </div>
                    </div>

                    {/* Sparkline Chart */}
                    <svg className="w-20 h-9" viewBox="0 0 100 40">
                      <path
                        d={index.sparkline.points}
                        fill="none"
                        stroke={isUp ? '#089981' : '#F23645'}
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                      <path
                        d={index.sparkline.fillArea}
                        fill={isUp ? 'rgba(8, 153, 129, 0.08)' : 'rgba(242, 54, 69, 0.08)'}
                      />
                    </svg>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xl font-bold tracking-tight text-[#131722] dark:text-white tabular-nums">
                      {index.priceFormatted}
                    </span>
                    <div
                      className={`flex items-center text-xs font-semibold gap-1 px-2 py-0.5 rounded tabular-nums ${
                        isUp
                          ? 'text-[#089981] bg-[#E8F5EE] dark:bg-[#089981]/20'
                          : 'text-[#F23645] bg-[#FDECEE] dark:bg-[#F23645]/20'
                      }`}
                    >
                      <span>{index.changeFormatted}</span>
                      <span>{index.changePercentFormatted}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* BEGIN: MarketMoversTableSection */}
        <section className="mt-8 pt-8 border-t border-[#E0E3EB] dark:border-[#2A2E39]" data-purpose="market-movers-section">
          {/* Movers Header & Segment Control */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#131722] dark:text-white">
                {currentCategory.tableTitle}
              </h2>
              <p className="text-sm text-[#6A6D78] dark:text-[#848E9C] mt-0.5">
                {currentCategory.tableSubtitle}
              </p>
            </div>

            {/* Filter Sub-Tabs */}
            <div className="inline-flex p-1 bg-[#F0F3FA] dark:bg-[#1E222D] rounded-xl self-start sm:self-auto text-xs font-semibold">
              <button
                onClick={() => setActiveMoverTab('all')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeMoverTab === 'all'
                    ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-xs'
                    : 'text-[#6A6D78] dark:text-[#848E9C] hover:text-[#131722] dark:hover:text-white'
                }`}
              >
                Most active
              </button>
              <button
                onClick={() => setActiveMoverTab('gainers')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeMoverTab === 'gainers'
                    ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-xs'
                    : 'text-[#6A6D78] dark:text-[#848E9C] hover:text-[#131722] dark:hover:text-white'
                }`}
              >
                Gainers
              </button>
              <button
                onClick={() => setActiveMoverTab('losers')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeMoverTab === 'losers'
                    ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-xs'
                    : 'text-[#6A6D78] dark:text-[#848E9C] hover:text-[#131722] dark:hover:text-white'
                }`}
              >
                Losers
              </button>
            </div>
          </div>

          {/* Clean Financial Data Table */}
          <div className="overflow-x-auto rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39]">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8FAFD] dark:bg-[#181B22] text-xs font-semibold text-[#6A6D78] dark:text-[#848E9C] uppercase tracking-wider select-none">
                  <th
                    className="py-3.5 px-4 cursor-pointer hover:text-[#131722] dark:hover:text-white"
                    scope="col"
                    onClick={() => handleSort('ticker')}
                  >
                    <div className="flex items-center gap-1">
                      <span>Ticker / Company</span>
                      {sortColumn === 'ticker' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2962FF]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2962FF]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-[#131722] dark:hover:text-white"
                    scope="col"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Last Price</span>
                      {sortColumn === 'price' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2962FF]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2962FF]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-[#131722] dark:hover:text-white"
                    scope="col"
                    onClick={() => handleSort('change')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Change</span>
                      {sortColumn === 'change' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2962FF]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2962FF]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-[#131722] dark:hover:text-white"
                    scope="col"
                    onClick={() => handleSort('changePercent')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Chg %</span>
                      {sortColumn === 'changePercent' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2962FF]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2962FF]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3.5 px-4 text-right hidden sm:table-cell cursor-pointer hover:text-[#131722] dark:hover:text-white"
                    scope="col"
                    onClick={() => handleSort('marketCap')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Market Cap</span>
                      {sortColumn === 'marketCap' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2962FF]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2962FF]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3.5 px-4 text-right hidden md:table-cell cursor-pointer hover:text-[#131722] dark:hover:text-white"
                    scope="col"
                    onClick={() => handleSort('volume')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Volume</span>
                      {sortColumn === 'volume' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2962FF]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2962FF]" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39] bg-white dark:bg-[#131722]">
                {filteredItems.map((item) => {
                  const isUp = item.change >= 0;
                  const isFlashing = flashTicker?.ticker === item.ticker;

                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedDetailItem(item)}
                      className={`hover:bg-[#F0F3FA]/50 dark:hover:bg-[#1E222D]/60 transition-colors cursor-pointer group ${
                        isFlashing ? (flashTicker.isUp ? 'tick-up' : 'tick-down') : ''
                      }`}
                    >
                      {/* Ticker / Company */}
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs"
                          style={{
                            backgroundColor: item.badge.bg,
                            color: item.badge.textColor || '#ffffff'
                          }}
                        >
                          {item.badge.text}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[#131722] dark:text-white group-hover:text-[#2962FF] transition-colors truncate">
                            {item.ticker}
                          </div>
                          <div className="text-xs text-[#6A6D78] dark:text-[#848E9C] truncate">
                            {item.name}
                          </div>
                        </div>
                      </td>

                      {/* Last Price */}
                      <td className="py-3.5 px-4 text-right font-medium text-[#131722] dark:text-white tabular-nums">
                        {item.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 4,
                        })}{' '}
                        {item.currency}
                      </td>

                      {/* Change */}
                      <td
                        className={`py-3.5 px-4 text-right font-medium tabular-nums ${
                          isUp ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isUp ? '+' : ''}
                        {item.change.toFixed(2)}
                      </td>

                      {/* Change % */}
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-semibold tabular-nums ${
                            isUp
                              ? 'bg-[#E8F5EE] dark:bg-[#089981]/20 text-[#089981]'
                              : 'bg-[#FDECEE] dark:bg-[#F23645]/20 text-[#F23645]'
                          }`}
                        >
                          {isUp ? '+' : ''}
                          {item.changePercent.toFixed(2)}%
                        </span>
                      </td>

                      {/* Market Cap */}
                      <td className="py-3.5 px-4 text-right text-[#6A6D78] dark:text-[#848E9C] hidden sm:table-cell tabular-nums">
                        {item.marketCap}
                      </td>

                      {/* Volume */}
                      <td className="py-3.5 px-4 text-right text-[#6A6D78] dark:text-[#848E9C] hidden md:table-cell tabular-nums">
                        {item.volume}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        {/* END: MarketMoversTableSection */}
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Ticker Interactive Chart Detail Modal */}
      <TickerDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        isWatchlisted={selectedDetailItem ? watchlist.includes('ticker' in selectedDetailItem ? selectedDetailItem.ticker : selectedDetailItem.symbol) : false}
        onToggleWatchlist={toggleWatchlist}
      />

      {/* Global Search Dialog Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={(item) => setSelectedDetailItem(item)}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
      />

      {/* Watchlist Quick Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemoveFromWatchlist={toggleWatchlist}
        onSelectItem={(item) => setSelectedDetailItem(item)}
      />

      {/* Authentication / User Profile Dialog */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        onLogin={(newUser) => {
          setUser(newUser);
          try {
            localStorage.setItem('tv_user', JSON.stringify(newUser));
          } catch (e) {
            console.error(e);
          }
        }}
        onLogout={() => {
          setUser(null);
          try {
            localStorage.removeItem('tv_user');
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </div>
  );
}
