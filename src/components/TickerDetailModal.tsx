import React, { useState, useMemo } from 'react';
import { X, Star, TrendingUp, TrendingDown, BarChart2, Activity, ShieldCheck, Share2, Bell } from 'lucide-react';
import { MarketItem, MarketIndex } from '../data/marketsData';

interface TickerDetailModalProps {
  item: MarketItem | MarketIndex | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (ticker: string) => void;
}

export const TickerDetailModal: React.FC<TickerDetailModalProps> = ({
  item,
  onClose,
  isWatchlisted,
  onToggleWatchlist
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'ALL'>('1D');
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  if (!item) return null;

  const isStock = 'ticker' in item;
  const ticker = isStock ? item.ticker : item.symbol;
  const name = item.name;
  const price = item.price;
  const currency = isStock ? item.currency : 'USD';
  const change = item.change;
  const changePercent = item.changePercent;
  const isUp = change >= 0;
  const exchangeName = isStock ? item.details?.exchange : item.exchange;
  const peRatio = isStock ? item.details?.peRatio : undefined;
  const analystRating = isStock ? item.details?.analystRating : undefined;
  const targetPrice = isStock ? item.details?.targetPrice : undefined;

  // Generate deterministic chart data points based on timeframe and current price
  const chartPoints = useMemo(() => {
    let count = 40;
    let volatility = 0.015;
    let trendFactor = isUp ? 0.002 : -0.002;

    switch (timeframe) {
      case '1D':
        count = 48;
        volatility = 0.008;
        break;
      case '5D':
        count = 60;
        volatility = 0.015;
        break;
      case '1M':
        count = 60;
        volatility = 0.025;
        break;
      case '6M':
        count = 70;
        volatility = 0.04;
        break;
      case '1Y':
        count = 80;
        volatility = 0.06;
        break;
      case '5Y':
        count = 90;
        volatility = 0.12;
        break;
      case 'ALL':
        count = 100;
        volatility = 0.18;
        break;
    }

    const basePrice = isUp ? price * (1 - changePercent / 100) : price * (1 + Math.abs(changePercent) / 100);
    const data: Array<{
      time: string;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    }> = [];

    let current = basePrice;
    for (let i = 0; i < count; i++) {
      const step = (Math.sin(i / 3) * 0.5 + (Math.random() - 0.48) + trendFactor) * (price * volatility * 0.1);
      const open = current;
      const close = i === count - 1 ? price : Math.max(open + step, price * 0.5);
      const high = Math.max(open, close) + Math.random() * (price * 0.004);
      const low = Math.min(open, close) - Math.random() * (price * 0.004);
      const volume = Math.floor(Math.random() * 500000 + 100000);

      const timeLabel = timeframe === '1D'
        ? `${Math.floor(9 + (i * 7) / count)}:${String(Math.floor((i * 15) % 60)).padStart(2, '0')}`
        : `Day ${i + 1}`;

      data.push({ time: timeLabel, open, high, low, close, volume });
      current = close;
    }
    return data;
  }, [timeframe, price, changePercent, isUp]);

  // Chart dimensions & scaling
  const minVal = Math.min(...chartPoints.map(d => d.low));
  const maxVal = Math.max(...chartPoints.map(d => d.high));
  const range = maxVal - minVal || 1;
  const chartWidth = 720;
  const chartHeight = 240;

  const pointsString = chartPoints
    .map((d, i) => {
      const x = (i / (chartPoints.length - 1)) * chartWidth;
      const y = chartHeight - ((d.close - minVal) / range) * (chartHeight - 30) - 15;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,${chartHeight} ${pointsString} ${chartWidth},${chartHeight}`;

  const activePoint = hoverIndex !== null && chartPoints[hoverIndex]
    ? chartPoints[hoverIndex]
    : chartPoints[chartPoints.length - 1];

  const handleNotify = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-white dark:bg-[#1E222D] rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#2A2E39] overflow-hidden my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-sm"
              style={{ backgroundColor: item.badge.bg, color: item.badge.textColor || '#ffffff' }}
            >
              {item.badge.text}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#131722] dark:text-white leading-tight">
                  {ticker}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded font-semibold bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#6A6D78] dark:text-[#848E9C]">
                  {exchangeName || 'Global Market'}
                </span>
                <span className="text-xs text-[#089981] flex items-center gap-1 font-medium bg-[#E8F5EE] dark:bg-[#089981]/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#089981] animate-pulse"></span>
                  Real-time
                </span>
              </div>
              <p className="text-xs text-[#6A6D78] dark:text-[#848E9C]">
                {name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(ticker)}
              className={`p-2 rounded-xl border transition-all ${
                isWatchlisted
                  ? 'border-[#FF9900] bg-[#FFF8E7] text-[#FF9900] dark:bg-[#FF9900]/10'
                  : 'border-[#E0E3EB] dark:border-[#2A2E39] text-[#6A6D78] hover:text-[#131722] dark:hover:text-white'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Star className={`w-5 h-5 ${isWatchlisted ? 'fill-[#FF9900]' : ''}`} />
            </button>

            <button
              onClick={() => handleNotify(`Price alert set for ${ticker}`)}
              className="p-2 rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] text-[#6A6D78] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] transition"
              title="Set Alert"
            >
              <Bell className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                handleNotify('Link copied to clipboard!');
              }}
              className="p-2 rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] text-[#6A6D78] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] transition"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#6A6D78] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Price & Summary Ribbon */}
        <div className="px-6 py-4 bg-[#F8FAFD] dark:bg-[#181B22] border-b border-[#E0E3EB] dark:border-[#2A2E39] flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-[#131722] dark:text-white tabular-nums tracking-tight">
              {activePoint.close.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
            </span>
            <div className={`flex items-center text-sm font-bold gap-1 px-2.5 py-1 rounded-md tabular-nums ${
              isUp 
                ? 'text-[#089981] bg-[#E8F5EE] dark:bg-[#089981]/20' 
                : 'text-[#F23645] bg-[#FDECEE] dark:bg-[#F23645]/20'
            }`}>
              {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isUp ? '+' : ''}{change.toFixed(2)}</span>
              <span>({isUp ? '+' : ''}{changePercent.toFixed(2)}%)</span>
            </div>
            {hoverIndex !== null && (
              <span className="text-xs text-[#6A6D78] dark:text-[#848E9C]">
                {activePoint.time}
              </span>
            )}
          </div>

          {/* Timeframe & Chart Type Controls */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-[#F0F3FA] dark:bg-[#2A2E39] rounded-xl text-xs font-semibold">
              {(['1D', '5D', '1M', '6M', '1Y', '5Y', 'ALL'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    timeframe === tf
                      ? 'bg-white dark:bg-[#1E222D] text-[#131722] dark:text-white shadow-sm'
                      : 'text-[#6A6D78] dark:text-[#848E9C] hover:text-[#131722] dark:hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="inline-flex p-1 bg-[#F0F3FA] dark:bg-[#2A2E39] rounded-xl text-xs">
              <button
                onClick={() => setChartType('area')}
                className={`p-1.5 rounded-lg transition ${
                  chartType === 'area'
                    ? 'bg-white dark:bg-[#1E222D] text-[#2962FF] shadow-sm'
                    : 'text-[#6A6D78] dark:text-[#848E9C]'
                }`}
                title="Area Chart"
              >
                <Activity className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChartType('candles')}
                className={`p-1.5 rounded-lg transition ${
                  chartType === 'candles'
                    ? 'bg-white dark:bg-[#1E222D] text-[#2962FF] shadow-sm'
                    : 'text-[#6A6D78] dark:text-[#848E9C]'
                }`}
                title="Candlestick Chart"
              >
                <BarChart2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Chart Canvas */}
        <div className="p-6 relative select-none">
          <div className="relative w-full h-[260px] bg-white dark:bg-[#1E222D] rounded-xl border border-[#E0E3EB]/50 dark:border-[#2A2E39] p-2 flex flex-col justify-end">
            {/* Gridlines */}
            <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between opacity-15">
              <div className="border-b border-[#6A6D78] w-full"></div>
              <div className="border-b border-[#6A6D78] w-full"></div>
              <div className="border-b border-[#6A6D78] w-full"></div>
              <div className="border-b border-[#6A6D78] w-full"></div>
            </div>

            {/* Price scale on right */}
            <div className="absolute right-2 top-2 bottom-6 flex flex-col justify-between text-[11px] text-[#6A6D78] dark:text-[#848E9C] tabular-nums pointer-events-none">
              <span>{maxVal.toFixed(2)}</span>
              <span>{((maxVal + minVal) / 2).toFixed(2)}</span>
              <span>{minVal.toFixed(2)}</span>
            </div>

            {/* SVG Chart Rendering */}
            <svg
              className="w-full h-[210px] overflow-visible cursor-crosshair"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
                const index = Math.round(ratio * (chartPoints.length - 1));
                setHoverIndex(index);
              }}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id="chartGradientUp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#089981" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#089981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="chartGradientDown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F23645" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#F23645" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {chartType === 'area' ? (
                <>
                  <polygon
                    points={areaPoints}
                    fill={isUp ? 'url(#chartGradientUp)' : 'url(#chartGradientDown)'}
                  />
                  <polyline
                    fill="none"
                    stroke={isUp ? '#089981' : '#F23645'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={pointsString}
                  />
                </>
              ) : (
                /* Candlestick Mode */
                chartPoints.map((d, i) => {
                  const x = (i / (chartPoints.length - 1)) * chartWidth;
                  const candleWidth = Math.max(2, chartWidth / chartPoints.length - 2);
                  const isCandleGreen = d.close >= d.open;
                  const color = isCandleGreen ? '#089981' : '#F23645';

                  const yHigh = chartHeight - ((d.high - minVal) / range) * (chartHeight - 30) - 15;
                  const yLow = chartHeight - ((d.low - minVal) / range) * (chartHeight - 30) - 15;
                  const yOpen = chartHeight - ((d.open - minVal) / range) * (chartHeight - 30) - 15;
                  const yClose = chartHeight - ((d.close - minVal) / range) * (chartHeight - 30) - 15;

                  const yTop = Math.min(yOpen, yClose);
                  const candleHeight = Math.max(2, Math.abs(yClose - yOpen));

                  return (
                    <g key={i}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      {/* Body */}
                      <rect
                        x={x - candleWidth / 2}
                        y={yTop}
                        width={candleWidth}
                        height={candleHeight}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })
              )}

              {/* Hover Crosshair */}
              {hoverIndex !== null && (
                <>
                  {(() => {
                    const x = (hoverIndex / (chartPoints.length - 1)) * chartWidth;
                    const y = chartHeight - ((activePoint.close - minVal) / range) * (chartHeight - 30) - 15;
                    return (
                      <g>
                        <line
                          x1={x}
                          y1="0"
                          x2={x}
                          y2={chartHeight}
                          stroke="#2962FF"
                          strokeDasharray="3 3"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="5"
                          fill="#2962FF"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      </g>
                    );
                  })()}
                </>
              )}
            </svg>

            {/* Volume indicator bars at bottom */}
            <div className="h-8 flex items-end gap-[2px] mt-2 opacity-40">
              {chartPoints.map((d, i) => {
                const maxVol = Math.max(...chartPoints.map(p => p.volume));
                const barH = (d.volume / maxVol) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${barH}%`,
                      backgroundColor: d.close >= d.open ? '#089981' : '#F23645'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Stats & Overview Grid */}
        <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm border-t border-[#E0E3EB] dark:border-[#2A2E39] pt-6">
          {/* Key Metrics */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A6D78] dark:text-[#848E9C]">
              Key Statistics
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#E0E3EB]/60 dark:border-[#2A2E39]">
                <span className="text-[#6A6D78] dark:text-[#848E9C]">Day's Range</span>
                <span className="font-semibold text-[#131722] dark:text-white tabular-nums">
                  {'details' in item && item.details ? `${item.details.dayLow || minVal.toFixed(2)} - ${item.details.dayHigh || maxVal.toFixed(2)}` : `${minVal.toFixed(2)} - ${maxVal.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E0E3EB]/60 dark:border-[#2A2E39]">
                <span className="text-[#6A6D78] dark:text-[#848E9C]">52 Week Range</span>
                <span className="font-semibold text-[#131722] dark:text-white tabular-nums">
                  {'details' in item && item.details ? `${item.details.low52 || '—'} - ${item.details.high52 || '—'}` : '—'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E0E3EB]/60 dark:border-[#2A2E39]">
                <span className="text-[#6A6D78] dark:text-[#848E9C]">Volume</span>
                <span className="font-semibold text-[#131722] dark:text-white tabular-nums">
                  {'volume' in item ? item.volume : 'details' in item && item.details ? item.details.volume : '—'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E0E3EB]/60 dark:border-[#2A2E39]">
                <span className="text-[#6A6D78] dark:text-[#848E9C]">Market Cap</span>
                <span className="font-semibold text-[#131722] dark:text-white tabular-nums">
                  {'marketCap' in item ? item.marketCap : '—'}
                </span>
              </div>
              {peRatio && (
                <div className="flex justify-between py-1 border-b border-[#E0E3EB]/60 dark:border-[#2A2E39]">
                  <span className="text-[#6A6D78] dark:text-[#848E9C]">P/E Ratio</span>
                  <span className="font-semibold text-[#131722] dark:text-white tabular-nums">
                    {peRatio}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Analyst Consensus / Target Price */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A6D78] dark:text-[#848E9C]">
              Analyst Rating
            </h3>
            <div className="p-3.5 bg-[#F8FAFD] dark:bg-[#181B22] rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6A6D78] dark:text-[#848E9C]">Consensus</span>
                <span className="text-xs font-bold text-[#089981] bg-[#E8F5EE] dark:bg-[#089981]/20 px-2 py-0.5 rounded">
                  {analystRating || 'Buy'}
                </span>
              </div>

              {/* Rating bar */}
              <div className="h-2 w-full bg-[#E0E3EB] dark:bg-[#2A2E39] rounded-full overflow-hidden flex">
                <div className="bg-[#089981] w-[65%]" title="Buy (65%)"></div>
                <div className="bg-[#FF9900] w-[25%]" title="Hold (25%)"></div>
                <div className="bg-[#F23645] w-[10%]" title="Sell (10%)"></div>
              </div>

              <div className="flex justify-between text-[11px] text-[#6A6D78] dark:text-[#848E9C]">
                <span>Buy 65%</span>
                <span>Hold 25%</span>
                <span>Sell 10%</span>
              </div>

              {targetPrice && (
                <div className="pt-2 border-t border-[#E0E3EB] dark:border-[#2A2E39] flex justify-between text-xs">
                  <span className="text-[#6A6D78] dark:text-[#848E9C]">1Y Target Price</span>
                  <span className="font-bold text-[#131722] dark:text-white tabular-nums">
                    ${targetPrice}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* About / Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A6D78] dark:text-[#848E9C]">
              About {ticker}
            </h3>
            <p className="text-xs leading-relaxed text-[#6A6D78] dark:text-[#848E9C] line-clamp-4">
              {'details' in item && item.details?.description
                ? item.details.description
                : `${name} is traded on major public exchanges. Track live bid/ask spreads, interactive technical indicators, and order flow volume.`}
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleNotify(`Simulated market order placed for ${ticker}!`)}
                className="w-full py-2.5 px-4 bg-[#2962FF] hover:bg-[#1E53E5] text-white rounded-xl font-semibold text-xs transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Place Simulated Trade
              </button>
            </div>
          </div>
        </div>

        {/* Floating toast notification */}
        {showNotification && (
          <div className="fixed bottom-6 right-6 bg-[#131722] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-white/10 flex items-center gap-2 animate-bounce">
            <div className="w-2 h-2 rounded-full bg-[#089981]"></div>
            {showNotification}
          </div>
        )}
      </div>
    </div>
  );
};
