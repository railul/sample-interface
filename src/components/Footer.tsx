import React, { useState } from 'react';
import { X, ShieldAlert, FileText, HelpCircle, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'terms' | 'privacy' | 'disclaimer' | 'help' | null>(null);

  return (
    <>
      <footer className="border-t border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8FAFD] dark:bg-[#131722] py-8 mt-12 text-[#6A6D78] dark:text-[#848E9C] text-xs transition-colors">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-4 text-black dark:text-white transition-colors" fill="currentColor" viewBox="0 0 36 24">
              <path d="M0 20.8V3.2H4.8V20.8H0ZM9.6 20.8V0.8H14.4V20.8H9.6ZM19.2 20.8V6.8H24V20.8H19.2ZM28.8 20.8V11.2H33.6V20.8H28.8Z" fill="currentColor" />
            </svg>
            <span>© 2025 TradingView. Look first / Then leap.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-[#131722] dark:hover:text-white transition"
            >
              Terms of use
            </button>
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-[#131722] dark:hover:text-white transition"
            >
              Privacy policy
            </button>
            <button
              onClick={() => setModalType('disclaimer')}
              className="hover:text-[#131722] dark:hover:text-white transition"
            >
              Disclaimer
            </button>
            <button
              onClick={() => setModalType('help')}
              className="hover:text-[#131722] dark:hover:text-white transition"
            >
              Help Center
            </button>
          </div>
        </div>
      </footer>

      {/* Info Dialog Modal */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setModalType(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#1E222D] rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#2A2E39] p-6 text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
              <div className="flex items-center gap-2 font-bold text-base text-[#131722] dark:text-white">
                {modalType === 'terms' && <FileText className="w-5 h-5 text-[#2962FF]" />}
                {modalType === 'privacy' && <Lock className="w-5 h-5 text-[#089981]" />}
                {modalType === 'disclaimer' && <ShieldAlert className="w-5 h-5 text-[#FF9900]" />}
                {modalType === 'help' && <HelpCircle className="w-5 h-5 text-[#2962FF]" />}
                <span className="capitalize">{modalType === 'terms' ? 'Terms of Use' : modalType === 'privacy' ? 'Privacy Policy' : modalType === 'disclaimer' ? 'Financial Risk Disclaimer' : 'Help & Support Center'}</span>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="p-1.5 text-[#6A6D78] hover:text-[#131722] dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 text-xs leading-relaxed text-[#6A6D78] dark:text-[#848E9C] space-y-3">
              {modalType === 'terms' && (
                <>
                  <p>
                    TradingView is an open platform where traders and investors view real-time market data, interactive financial charts, and technical indicators.
                  </p>
                  <p>
                    By accessing or using our services, you agree not to scrape, redistribute, or commercially reproduce financial data feeds without authorized licensing agreements.
                  </p>
                </>
              )}
              {modalType === 'privacy' && (
                <>
                  <p>
                    We value your privacy. TradingView respects individual financial confidentiality. All user preferences, local watchlists, and chart settings are secured locally.
                  </p>
                  <p>
                    We do not sell personal browsing behavior or private portfolio metrics to unauthorized third-party advertising brokers.
                  </p>
                </>
              )}
              {modalType === 'disclaimer' && (
                <>
                  <p className="font-semibold text-[#131722] dark:text-white">
                    Important Notice on Market Risk:
                  </p>
                  <p>
                    Information provided on this platform is for educational and analytical purposes only and should not be construed as investment, tax, or legal advice.
                  </p>
                  <p>
                    Trading stocks, futures, forex, and cryptocurrencies carries significant risk of capital loss. Historical price performance does not guarantee future results.
                  </p>
                </>
              )}
              {modalType === 'help' && (
                <>
                  <p>
                    Welcome to TradingView Help Center. Need assistance with keyboard shortcuts or chart features?
                  </p>
                  <div className="bg-[#F0F3FA] dark:bg-[#181B22] p-3 rounded-xl space-y-1.5">
                    <p className="font-semibold text-[#131722] dark:text-white">Quick Tips:</p>
                    <p>• Press <kbd className="bg-white dark:bg-[#2A2E39] px-1 py-0.5 rounded border border-[#E0E3EB] dark:border-[#363A45]">Ctrl+K</kbd> to open Global Market Search.</p>
                    <p>• Click any stock or index row to open the interactive chart.</p>
                    <p>• Star tickers to add them to your persistent Watchlist.</p>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-[#2962FF] hover:bg-[#1E53E5] text-white rounded-xl text-xs font-semibold transition"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
