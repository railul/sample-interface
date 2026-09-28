import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, User, Moon, Sun, Star, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  onOpenAuth: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  isDarkMode,
  onToggleTheme,
  watchlistCount,
  onOpenWatchlist,
  onOpenAuth,
  onSelectCategory,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'EN', label: 'English (US)' },
    { code: 'ES', label: 'Español' },
    { code: 'DE', label: 'Deutsch' },
    { code: 'FR', label: 'Français' },
    { code: 'JA', label: '日本語' },
    { code: 'ZH', label: '简体中文' },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border-b border-[#E0E3EB] dark:border-[#2A2E39] transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Global Search Bar */}
        <div className="flex items-center gap-6 flex-1 max-w-xl">
          {/* TradingView Geometric Logo */}
          <a
            aria-label="TradingView Home"
            className="flex items-center gap-2 group flex-shrink-0 cursor-pointer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <svg
              className="w-9 h-6 text-black dark:text-white transition-colors"
              fill="currentColor"
              viewBox="0 0 36 24"
            >
              {/* Iconic TradingView stylized mark */}
              <path
                d="M0 20.8V3.2H4.8V20.8H0ZM9.6 20.8V0.8H14.4V20.8H9.6ZM19.2 20.8V6.8H24V20.8H19.2ZM28.8 20.8V11.2H33.6V20.8H28.8Z"
                fill="currentColor"
              />
            </svg>
          </a>

          {/* Search Input with Keyboard Shortcut Pill */}
          <div
            className="relative w-full max-w-xs md:max-w-sm hidden sm:block cursor-pointer group"
            data-purpose="global-search"
            onClick={onOpenSearch}
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6A6D78] dark:text-[#848E9C]">
              <Search className="w-4 h-4 transition-colors group-hover:text-[#2962FF]" />
            </div>
            <input
              className="w-full bg-[#F0F3FA] dark:bg-[#1E222D] text-[#131722] dark:text-white text-sm rounded-full pl-10 pr-12 py-2 border-transparent focus:border-[#2962FF] focus:bg-white dark:focus:bg-[#2A2E39] focus:ring-1 focus:ring-[#2962FF] transition-all cursor-pointer placeholder-[#6A6D78] dark:placeholder-[#848E9C]"
              placeholder="Search (Ctrl+K)"
              readOnly
              type="text"
            />
            <kbd className="absolute right-3 top-2.5 px-1.5 py-0.5 text-[10px] font-semibold text-[#6A6D78] dark:text-[#848E9C] bg-white dark:bg-[#2A2E39] rounded border border-[#E0E3EB] dark:border-[#363A45] pointer-events-none shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Navigation Links */}
        <nav
          ref={menuRef}
          className="hidden lg:flex items-center gap-7 text-[15px] font-medium relative"
          data-purpose="primary-navigation"
        >
          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === 'products' ? null : 'products')}
              className="flex items-center gap-1 text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] dark:hover:text-[#2962FF] transition-colors py-2"
            >
              Products
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeMenu === 'products' && (
              <div className="absolute top-full left-0 w-56 mt-1 bg-white dark:bg-[#1E222D] rounded-xl shadow-xl border border-[#E0E3EB] dark:border-[#2A2E39] py-2 z-50 animate-in fade-in slide-in-from-top-1">
                <a
                  href="#supercharts"
                  onClick={(e) => { e.preventDefault(); setActiveMenu(null); onOpenSearch(); }}
                  className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
                >
                  <div className="font-semibold">Supercharts</div>
                  <div className="text-xs text-[#6A6D78] dark:text-[#848E9C]">Interactive charting platform</div>
                </a>
                <a
                  href="#screeners"
                  onClick={(e) => { e.preventDefault(); setActiveMenu(null); onSelectCategory('us-stocks'); }}
                  className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
                >
                  <div className="font-semibold">Screeners</div>
                  <div className="text-xs text-[#6A6D78] dark:text-[#848E9C]">Stock & crypto filtering</div>
                </a>
                <a
                  href="#heatmaps"
                  onClick={(e) => { e.preventDefault(); setActiveMenu(null); onSelectCategory('etfs'); }}
                  className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
                >
                  <div className="font-semibold">Market Heatmaps</div>
                  <div className="text-xs text-[#6A6D78] dark:text-[#848E9C]">Visual sector heatmaps</div>
                </a>
              </div>
            )}
          </div>

          {/* Community Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === 'community' ? null : 'community')}
              className="flex items-center gap-1 text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] dark:hover:text-[#2962FF] transition-colors py-2"
            >
              Community
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeMenu === 'community' && (
              <div className="absolute top-full left-0 w-52 mt-1 bg-white dark:bg-[#1E222D] rounded-xl shadow-xl border border-[#E0E3EB] dark:border-[#2A2E39] py-2 z-50 animate-in fade-in slide-in-from-top-1">
                <a
                  href="#ideas"
                  onClick={(e) => { e.preventDefault(); setActiveMenu(null); }}
                  className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
                >
                  Trading Ideas
                </a>
                <a
                  href="#scripts"
                  onClick={(e) => { e.preventDefault(); setActiveMenu(null); }}
                  className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
                >
                  Pine Script™ Library
                </a>
                <a
                  href="#streams"
                  onClick={(e) => { e.preventDefault(); setActiveMenu(null); }}
                  className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
                >
                  Live Trader Streams
                </a>
              </div>
            )}
          </div>

          {/* Markets Link (Active) */}
          <a
            className="text-[#2962FF] font-semibold flex items-center gap-1 relative py-2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Markets
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2962FF] rounded-full"></span>
          </a>

          {/* Brokers Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === 'brokers' ? null : 'brokers')}
              className="flex items-center gap-1 text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] dark:hover:text-[#2962FF] transition-colors py-2"
            >
              Brokers
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeMenu === 'brokers' && (
              <div className="absolute top-full left-0 w-52 mt-1 bg-white dark:bg-[#1E222D] rounded-xl shadow-xl border border-[#E0E3EB] dark:border-[#2A2E39] py-2 z-50 animate-in fade-in slide-in-from-top-1">
                <a
                  href="#brokers-list"
                  onClick={(e) => { e.preventDefault(); setActiveMenu(null); }}
                  className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
                >
                  Broker Awards 2025
                </a>
                <a
                  href="#connect"
                  onClick={(e) => { e.preventDefault(); setActiveMenu(null); }}
                  className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
                >
                  Connect Your Broker
                </a>
              </div>
            )}
          </div>

          {/* More Link */}
          <button
            onClick={() => setActiveMenu(activeMenu === 'more' ? null : 'more')}
            className="flex items-center gap-1 text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] dark:hover:text-[#2962FF] transition-colors py-2"
          >
            More
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>
          {activeMenu === 'more' && (
            <div className="absolute top-full right-0 w-52 mt-1 bg-white dark:bg-[#1E222D] rounded-xl shadow-xl border border-[#E0E3EB] dark:border-[#2A2E39] py-2 z-50 animate-in fade-in slide-in-from-top-1">
              <a
                href="#desktop"
                onClick={(e) => { e.preventDefault(); setActiveMenu(null); }}
                className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
              >
                Desktop App
              </a>
              <a
                href="#mobile"
                onClick={(e) => { e.preventDefault(); setActiveMenu(null); }}
                className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
              >
                Mobile Apps (iOS/Android)
              </a>
              <a
                href="#help"
                onClick={(e) => { e.preventDefault(); setActiveMenu(null); }}
                className="block px-4 py-2 text-sm text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
              >
                Help Center & Docs
              </a>
            </div>
          )}
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:hidden text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] rounded-lg transition"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] rounded-lg transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-[#131722]" />
            )}
          </button>

          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative p-2 text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] rounded-lg transition-colors"
            title="View Watchlist"
          >
            <Star className="w-5 h-5" />
            {watchlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#2962FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Language Selector Dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] rounded-lg transition-colors"
              title="Select Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{selectedLang}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white dark:bg-[#1E222D] rounded-xl shadow-xl border border-[#E0E3EB] dark:border-[#2A2E39] py-1.5 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] text-left transition"
                  >
                    <span>{lang.label}</span>
                    {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-[#2962FF]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar Icon */}
          <button
            onClick={onOpenAuth}
            className="p-2 text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] rounded-full transition-colors"
            title="Account profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Call to Action Button */}
          <button
            onClick={onOpenAuth}
            className="tv-btn-gradient text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm cursor-pointer whitespace-nowrap"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
