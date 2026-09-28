export interface MarketIndex {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  price: number;
  priceFormatted: string;
  change: number;
  changeFormatted: string;
  changePercent: number;
  changePercentFormatted: string;
  badge: {
    text: string;
    bg: string;
    textColor?: string;
    isSymbol?: boolean;
  };
  sparkline: {
    isUp: boolean;
    points: string;
    fillArea: string;
  };
  details?: {
    high52: string;
    low52: string;
    open: string;
    dayHigh: string;
    dayLow: string;
    volume: string;
    description: string;
  };
}

export interface MarketItem {
  id: string;
  ticker: string;
  name: string;
  badge: {
    text: string;
    bg: string;
    textColor?: string;
    isSymbol?: boolean;
  };
  price: number;
  currency: string;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  categoryTag: 'active' | 'gainers' | 'losers';
  // Extra detailed data for TradingView Chart view
  details: {
    sector: string;
    exchange: string;
    high52: string;
    low52: string;
    open: string;
    dayHigh: string;
    dayLow: string;
    avgVolume: string;
    peRatio?: string;
    divYield?: string;
    beta?: string;
    targetPrice?: string;
    analystRating?: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
    ratingScore?: number; // 1 to 5
    description: string;
  };
}

export interface CategoryData {
  id: string;
  label: string;
  heroHeadline: string;
  heroSubtitle: string;
  indicesTitle: string;
  indices: MarketIndex[];
  tableTitle: string;
  tableSubtitle: string;
  items: MarketItem[];
}

export const CATEGORIES_CONFIG: CategoryData[] = [
  {
    id: 'us-stocks',
    label: 'US stocks',
    heroHeadline: 'Markets, everywhere',
    heroSubtitle: 'Track US equity benchmarks, mega-cap earnings, and real-time market movements',
    indicesTitle: 'Indices',
    indices: [
      {
        id: 'spx',
        name: 'S&P 500',
        symbol: 'SPX',
        exchange: 'S&P',
        price: 5983.25,
        priceFormatted: '5,983.25',
        change: 25.10,
        changeFormatted: '+25.10',
        changePercent: 0.42,
        changePercentFormatted: '(+0.42%)',
        badge: { text: '500', bg: '#E50914' },
        sparkline: {
          isUp: true,
          points: 'M0,35 Q20,32 35,22 T70,18 T100,5',
          fillArea: 'M0,35 Q20,32 35,22 T70,18 T100,5 L100,40 L0,40 Z',
        },
        details: {
          high52: '6,025.50',
          low52: '4,682.11',
          open: '5,961.40',
          dayHigh: '5,992.10',
          dayLow: '5,958.80',
          volume: '2.48B',
          description: 'Standard and Poor\'s 500 is a stock market index tracking the stock performance of 500 of the largest companies listed on stock exchanges in the United States.'
        }
      },
      {
        id: 'ndx',
        name: 'Nasdaq 100',
        symbol: 'NDX',
        exchange: 'NASDAQ',
        price: 21120.50,
        priceFormatted: '21,120.50',
        change: 178.40,
        changeFormatted: '+178.40',
        changePercent: 0.85,
        changePercentFormatted: '(+0.85%)',
        badge: { text: '100', bg: '#0052FE' },
        sparkline: {
          isUp: true,
          points: 'M0,30 Q25,28 45,15 T80,12 T100,4',
          fillArea: 'M0,30 Q25,28 45,15 T80,12 T100,4 L100,40 L0,40 Z',
        },
        details: {
          high52: '21,380.00',
          low52: '16,973.94',
          open: '20,985.30',
          dayHigh: '21,154.20',
          dayLow: '20,950.10',
          volume: '5.12B',
          description: 'The Nasdaq-100 includes 100 of the largest domestic and international non-financial companies listed on The Nasdaq Stock Market based on market capitalization.'
        }
      },
      {
        id: 'dji',
        name: 'Dow 30',
        symbol: 'DJI',
        exchange: 'DJ',
        price: 43450.80,
        priceFormatted: '43,450.80',
        change: -52.30,
        changeFormatted: '-52.30',
        changePercent: -0.12,
        changePercentFormatted: '(-0.12%)',
        badge: { text: '30', bg: '#00A3E0' },
        sparkline: {
          isUp: false,
          points: 'M0,10 Q25,12 50,22 T80,26 T100,34',
          fillArea: 'M0,10 Q25,12 50,22 T80,26 T100,34 L100,40 L0,40 Z',
        },
        details: {
          high52: '44,486.07',
          low52: '36,714.40',
          open: '43,510.20',
          dayHigh: '43,620.10',
          dayLow: '43,390.40',
          volume: '345.1M',
          description: 'The Dow Jones Industrial Average is a price-weighted measurement stock market index of 30 prominent companies listed on stock exchanges in the United States.'
        }
      },
      {
        id: 'rut',
        name: 'Russell 2000',
        symbol: 'RUT',
        exchange: 'FTSE',
        price: 2342.15,
        priceFormatted: '2,342.15',
        change: 14.80,
        changeFormatted: '+14.80',
        changePercent: 0.64,
        changePercentFormatted: '(+0.64%)',
        badge: { text: '2K', bg: '#7B1FA2' },
        sparkline: {
          isUp: true,
          points: 'M0,28 Q30,30 45,20 T75,18 T100,8',
          fillArea: 'M0,28 Q30,30 45,20 T75,18 T100,8 L100,40 L0,40 Z',
        },
        details: {
          high52: '2,442.74',
          low52: '1,920.80',
          open: '2,328.60',
          dayHigh: '2,348.90',
          dayLow: '2,322.10',
          volume: '1.82B',
          description: 'The Russell 2000 Index is a small-cap stock market index of the bottom 2,000 stocks in the Russell 3000 Index, representing American small business health.'
        }
      }
    ],
    tableTitle: 'Trending US Stocks',
    tableSubtitle: 'Real-time overview of the most watched market movers',
    items: [
      {
        id: 'nvda',
        ticker: 'NVDA',
        name: 'NVIDIA Corporation',
        badge: { text: 'N', bg: '#76B900', textColor: '#ffffff' },
        price: 142.60,
        currency: 'USD',
        change: 4.12,
        changePercent: 2.97,
        marketCap: '3.49T',
        volume: '54.21M',
        categoryTag: 'gainers',
        details: {
          sector: 'Semiconductors & AI Hardware',
          exchange: 'NASDAQ',
          high52: '149.77',
          low52: '45.11',
          open: '139.10',
          dayHigh: '143.20',
          dayLow: '138.80',
          avgVolume: '48.90M',
          peRatio: '58.4',
          divYield: '0.03%',
          beta: '1.68',
          targetPrice: '165.00',
          analystRating: 'Strong Buy',
          ratingScore: 4.8,
          description: 'NVIDIA pioneered GPU-accelerated computing and leads modern artificial intelligence enterprise computing, datacenter infrastructure, and autonomous machines.'
        }
      },
      {
        id: 'aapl',
        ticker: 'AAPL',
        name: 'Apple Inc.',
        badge: { text: '', bg: '#000000', textColor: '#ffffff', isSymbol: true },
        price: 228.45,
        currency: 'USD',
        change: 1.30,
        changePercent: 0.57,
        marketCap: '3.46T',
        volume: '38.92M',
        categoryTag: 'active',
        details: {
          sector: 'Consumer Electronics & Software',
          exchange: 'NASDAQ',
          high52: '237.23',
          low52: '164.08',
          open: '227.15',
          dayHigh: '229.10',
          dayLow: '226.80',
          avgVolume: '42.10M',
          peRatio: '34.2',
          divYield: '0.44%',
          beta: '1.12',
          targetPrice: '250.00',
          analystRating: 'Buy',
          ratingScore: 4.4,
          description: 'Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, along with a wide variety of related cloud and digital services.'
        }
      },
      {
        id: 'tsla',
        ticker: 'TSLA',
        name: 'Tesla, Inc.',
        badge: { text: 'T', bg: '#E82127', textColor: '#ffffff' },
        price: 338.74,
        currency: 'USD',
        change: -3.26,
        changePercent: -0.95,
        marketCap: '1.08T',
        volume: '78.14M',
        categoryTag: 'losers',
        details: {
          sector: 'Automotive & Clean Energy',
          exchange: 'NASDAQ',
          high52: '361.20',
          low52: '138.80',
          open: '342.00',
          dayHigh: '344.80',
          dayLow: '335.20',
          avgVolume: '82.40M',
          peRatio: '92.1',
          divYield: '0.00%',
          beta: '2.34',
          targetPrice: '380.00',
          analystRating: 'Hold',
          ratingScore: 3.6,
          description: 'Tesla designs, develops, manufactures, sells, and leases fully electric vehicles, energy storage generation systems, and solar installations worldwide.'
        }
      },
      {
        id: 'msft',
        ticker: 'MSFT',
        name: 'Microsoft Corporation',
        badge: { text: 'M', bg: '#00A4EF', textColor: '#ffffff' },
        price: 428.15,
        currency: 'USD',
        change: 2.40,
        changePercent: 0.56,
        marketCap: '3.18T',
        volume: '21.43M',
        categoryTag: 'active',
        details: {
          sector: 'Enterprise Software & Cloud',
          exchange: 'NASDAQ',
          high52: '468.35',
          low52: '366.50',
          open: '426.00',
          dayHigh: '429.50',
          dayLow: '425.20',
          avgVolume: '23.80M',
          peRatio: '32.8',
          divYield: '0.78%',
          beta: '1.24',
          targetPrice: '495.00',
          analystRating: 'Strong Buy',
          ratingScore: 4.7,
          description: 'Microsoft develops and supports software, services, devices, and solutions worldwide, including Azure Cloud, Microsoft 365, Copilot AI, GitHub, and Windows.'
        }
      },
      {
        id: 'amzn',
        ticker: 'AMZN',
        name: 'Amazon.com, Inc.',
        badge: { text: 'a', bg: '#FF9900', textColor: '#000000' },
        price: 202.88,
        currency: 'USD',
        change: 2.84,
        changePercent: 1.42,
        marketCap: '2.12T',
        volume: '29.80M',
        categoryTag: 'gainers',
        details: {
          sector: 'E-commerce & Cloud Services',
          exchange: 'NASDAQ',
          high52: '215.90',
          low52: '144.05',
          open: '200.50',
          dayHigh: '203.40',
          dayLow: '199.80',
          avgVolume: '36.50M',
          peRatio: '41.2',
          divYield: '0.00%',
          beta: '1.38',
          targetPrice: '235.00',
          analystRating: 'Strong Buy',
          ratingScore: 4.9,
          description: 'Amazon focuses on retail sale of consumer products, subscriptions, web services (AWS), digital streaming, and cloud artificial intelligence.'
        }
      },
      {
        id: 'googl',
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        badge: { text: 'G', bg: '#4285F4', textColor: '#ffffff' },
        price: 182.20,
        currency: 'USD',
        change: 1.95,
        changePercent: 1.08,
        marketCap: '2.25T',
        volume: '24.12M',
        categoryTag: 'active',
        details: {
          sector: 'Interactive Media & Services',
          exchange: 'NASDAQ',
          high52: '191.75',
          low52: '130.67',
          open: '180.40',
          dayHigh: '183.10',
          dayLow: '179.90',
          avgVolume: '28.10M',
          peRatio: '24.6',
          divYield: '0.44%',
          beta: '1.09',
          targetPrice: '210.00',
          analystRating: 'Buy',
          ratingScore: 4.5,
          description: 'Alphabet offers web-based search, advertisements, maps, YouTube video sharing, cloud infrastructure, Android operating system, and Gemini AI technologies.'
        }
      },
      {
        id: 'meta',
        ticker: 'META',
        name: 'Meta Platforms, Inc.',
        badge: { text: '∞', bg: '#0668E1', textColor: '#ffffff', isSymbol: true },
        price: 588.60,
        currency: 'USD',
        change: 6.30,
        changePercent: 1.08,
        marketCap: '1.48T',
        volume: '16.80M',
        categoryTag: 'gainers',
        details: {
          sector: 'Social Media & Virtual Reality',
          exchange: 'NASDAQ',
          high52: '602.95',
          low52: '296.80',
          open: '582.40',
          dayHigh: '591.20',
          dayLow: '581.00',
          avgVolume: '14.90M',
          peRatio: '28.9',
          divYield: '0.34%',
          beta: '1.22',
          targetPrice: '640.00',
          analystRating: 'Buy',
          ratingScore: 4.6,
          description: 'Meta develops technologies that help people connect, find communities, and grow businesses across Instagram, Facebook, WhatsApp, Threads, and Meta Quest.'
        }
      },
      {
        id: 'pltr',
        ticker: 'PLTR',
        name: 'Palantir Technologies',
        badge: { text: 'P', bg: '#111827', textColor: '#ffffff' },
        price: 64.10,
        currency: 'USD',
        change: 3.45,
        changePercent: 5.69,
        marketCap: '142.3B',
        volume: '98.42M',
        categoryTag: 'gainers',
        details: {
          sector: 'Enterprise Software & AI Data',
          exchange: 'NYSE',
          high52: '66.50',
          low52: '15.72',
          open: '60.80',
          dayHigh: '64.80',
          dayLow: '60.50',
          avgVolume: '72.30M',
          peRatio: '118.2',
          divYield: '0.00%',
          beta: '2.65',
          targetPrice: '70.00',
          analystRating: 'Buy',
          ratingScore: 4.1,
          description: 'Palantir builds and deploys software platforms for the intelligence community and private enterprises to assist with counter-terrorism, data orchestration, and AI operations.'
        }
      },
      {
        id: 'amd',
        ticker: 'AMD',
        name: 'Advanced Micro Devices',
        badge: { text: 'A', bg: '#ED1C24', textColor: '#ffffff' },
        price: 156.40,
        currency: 'USD',
        change: -2.15,
        changePercent: -1.36,
        marketCap: '253.2B',
        volume: '45.10M',
        categoryTag: 'losers',
        details: {
          sector: 'Semiconductors & Processors',
          exchange: 'NASDAQ',
          high52: '227.30',
          low52: '131.40',
          open: '158.20',
          dayHigh: '159.10',
          dayLow: '155.80',
          avgVolume: '51.20M',
          peRatio: '112.5',
          divYield: '0.00%',
          beta: '1.74',
          targetPrice: '180.00',
          analystRating: 'Buy',
          ratingScore: 4.3,
          description: 'AMD operates as a semiconductor company offering x86 microprocessors, graphics processing units (GPUs), data center accelerators, and embedded processors.'
        }
      }
    ]
  },
  {
    id: 'world-stocks',
    label: 'World stocks',
    heroHeadline: 'World stocks, everywhere',
    heroSubtitle: 'Explore international stock markets, European equities, and Asian trading powerhouses',
    indicesTitle: 'Global Indices',
    indices: [
      {
        id: 'dax',
        name: 'DAX 40',
        symbol: 'DAX',
        exchange: 'XETRA',
        price: 19642.30,
        priceFormatted: '19,642.30',
        change: 84.15,
        changeFormatted: '+84.15',
        changePercent: 0.43,
        changePercentFormatted: '(+0.43%)',
        badge: { text: 'DAX', bg: '#002B49' },
        sparkline: {
          isUp: true,
          points: 'M0,32 Q25,29 45,18 T75,14 T100,6',
          fillArea: 'M0,32 Q25,29 45,18 T75,14 T100,6 L100,40 L0,40 Z',
        }
      },
      {
        id: 'ftse',
        name: 'FTSE 100',
        symbol: 'UKX',
        exchange: 'LSE',
        price: 8328.70,
        priceFormatted: '8,328.70',
        change: 18.20,
        changeFormatted: '+18.20',
        changePercent: 0.22,
        changePercentFormatted: '(+0.22%)',
        badge: { text: 'UK', bg: '#00247D' },
        sparkline: {
          isUp: true,
          points: 'M0,28 Q30,26 50,18 T80,15 T100,9',
          fillArea: 'M0,28 Q30,26 50,18 T80,15 T100,9 L100,40 L0,40 Z',
        }
      },
      {
        id: 'nikkei',
        name: 'Nikkei 225',
        symbol: 'NI225',
        exchange: 'TSE',
        price: 38650.00,
        priceFormatted: '38,650.00',
        change: -340.50,
        changeFormatted: '-340.50',
        changePercent: -0.87,
        changePercentFormatted: '(-0.87%)',
        badge: { text: 'JP', bg: '#BC002D' },
        sparkline: {
          isUp: false,
          points: 'M0,8 Q20,10 45,24 T75,28 T100,36',
          fillArea: 'M0,8 Q20,10 45,24 T75,28 T100,36 L100,40 L0,40 Z',
        }
      },
      {
        id: 'hsi',
        name: 'Hang Seng',
        symbol: 'HSI',
        exchange: 'HKEX',
        price: 19825.40,
        priceFormatted: '19,825.40',
        change: 215.80,
        changeFormatted: '+215.80',
        changePercent: 1.10,
        changePercentFormatted: '(+1.10%)',
        badge: { text: 'HK', bg: '#DE2910' },
        sparkline: {
          isUp: true,
          points: 'M0,35 Q25,30 50,16 T80,12 T100,5',
          fillArea: 'M0,35 Q25,30 50,16 T80,12 T100,5 L100,40 L0,40 Z',
        }
      }
    ],
    tableTitle: 'Trending Global Equities',
    tableSubtitle: 'International market titans across European, Asian, and emerging exchanges',
    items: [
      {
        id: 'tsm',
        ticker: 'TSM',
        name: 'Taiwan Semiconductor Mfg.',
        badge: { text: 'T', bg: '#003366', textColor: '#ffffff' },
        price: 194.20,
        currency: 'USD',
        change: 4.80,
        changePercent: 2.53,
        marketCap: '1.01T',
        volume: '18.40M',
        categoryTag: 'gainers',
        details: {
          sector: 'Semiconductor Foundry',
          exchange: 'NYSE / TWSE',
          high52: '205.84',
          low52: '85.40',
          open: '190.10',
          dayHigh: '195.40',
          dayLow: '189.60',
          avgVolume: '16.20M',
          peRatio: '31.4',
          targetPrice: '220.00',
          analystRating: 'Strong Buy',
          description: 'TSMC is the world\'s largest dedicated semiconductor foundry, fabricating chips for Apple, NVIDIA, AMD, Qualcomm, and MediaTek.'
        }
      },
      {
        id: 'asml',
        ticker: 'ASML',
        name: 'ASML Holding N.V.',
        badge: { text: 'A', bg: '#002855', textColor: '#ffffff' },
        price: 724.50,
        currency: 'EUR',
        change: 14.20,
        changePercent: 2.00,
        marketCap: '286.4B',
        volume: '2.14M',
        categoryTag: 'gainers',
        details: {
          sector: 'Semiconductor Lithography',
          exchange: 'Euronext Amsterdam',
          high52: '1,021.00',
          low52: '630.00',
          open: '712.00',
          dayHigh: '728.00',
          dayLow: '710.00',
          avgVolume: '1.95M',
          peRatio: '38.2',
          targetPrice: '850.00',
          analystRating: 'Buy',
          description: 'ASML is the sole global manufacturer of extreme ultraviolet (EUV) photolithography machines required to manufacture the world\'s most advanced computer chips.'
        }
      },
      {
        id: 'mc',
        ticker: 'MC',
        name: 'LVMH Moët Hennessy',
        badge: { text: 'L', bg: '#8B4513', textColor: '#ffffff' },
        price: 642.10,
        currency: 'EUR',
        change: -6.40,
        changePercent: -0.99,
        marketCap: '321.8B',
        volume: '1.18M',
        categoryTag: 'losers',
        details: {
          sector: 'Luxury Goods & Fashion',
          exchange: 'Euronext Paris',
          high52: '886.40',
          low52: '584.20',
          open: '648.50',
          dayHigh: '651.00',
          dayLow: '640.20',
          avgVolume: '1.30M',
          peRatio: '21.5',
          targetPrice: '710.00',
          analystRating: 'Hold',
          description: 'LVMH is a French multinational luxury goods conglomerate comprising Louis Vuitton, Christian Dior, Tiffany & Co., Moët & Chandon, and Sephora.'
        }
      },
      {
        id: 'novo',
        ticker: 'NOVO-B',
        name: 'Novo Nordisk A/S',
        badge: { text: 'N', bg: '#0055A5', textColor: '#ffffff' },
        price: 785.40,
        currency: 'DKK',
        change: 9.60,
        changePercent: 1.24,
        marketCap: '524.1B',
        volume: '4.82M',
        categoryTag: 'active',
        details: {
          sector: 'Pharmaceuticals & Healthcare',
          exchange: 'Nasdaq Copenhagen',
          high52: '1,032.00',
          low52: '670.00',
          open: '778.00',
          dayHigh: '788.50',
          dayLow: '775.00',
          avgVolume: '5.10M',
          peRatio: '36.8',
          targetPrice: '920.00',
          analystRating: 'Strong Buy',
          description: 'Novo Nordisk is a global healthcare company with decades of innovation in diabetes care and breakthrough GLP-1 obesity treatments Ozempic and Wegovy.'
        }
      }
    ]
  },
  {
    id: 'crypto',
    label: 'Crypto',
    heroHeadline: 'Crypto, everywhere',
    heroSubtitle: 'Live cryptocurrency prices, layer-1 blockchains, DeFi tokens, and market dominance metrics',
    indicesTitle: 'Crypto Benchmarks',
    indices: [
      {
        id: 'total',
        name: 'Total Crypto Cap',
        symbol: 'TOTAL',
        exchange: 'CRYPTO',
        price: 3420000000000,
        priceFormatted: '$3.42T',
        change: 68000000000,
        changeFormatted: '+$68.0B',
        changePercent: 2.03,
        changePercentFormatted: '(+2.03%)',
        badge: { text: 'CAP', bg: '#F7931A' },
        sparkline: {
          isUp: true,
          points: 'M0,32 Q25,30 45,18 T75,12 T100,4',
          fillArea: 'M0,32 Q25,30 45,18 T75,12 T100,4 L100,40 L0,40 Z',
        }
      },
      {
        id: 'btcd',
        name: 'Bitcoin Dominance',
        symbol: 'BTC.D',
        exchange: 'CRYPTO',
        price: 57.82,
        priceFormatted: '57.82%',
        change: 0.34,
        changeFormatted: '+0.34%',
        changePercent: 0.59,
        changePercentFormatted: '(+0.59%)',
        badge: { text: 'BTC', bg: '#F7931A' },
        sparkline: {
          isUp: true,
          points: 'M0,28 Q30,25 50,18 T75,16 T100,6',
          fillArea: 'M0,28 Q30,25 50,18 T75,16 T100,6 L100,40 L0,40 Z',
        }
      },
      {
        id: 'ethbtc',
        name: 'ETH / BTC Ratio',
        symbol: 'ETHBTC',
        exchange: 'CRYPTO',
        price: 0.0354,
        priceFormatted: '0.0354',
        change: -0.0004,
        changeFormatted: '-0.0004',
        changePercent: -1.12,
        changePercentFormatted: '(-1.12%)',
        badge: { text: 'ETH', bg: '#627EEA' },
        sparkline: {
          isUp: false,
          points: 'M0,10 Q25,12 50,22 T80,26 T100,35',
          fillArea: 'M0,10 Q25,12 50,22 T80,26 T100,35 L100,40 L0,40 Z',
        }
      },
      {
        id: 'defi',
        name: 'DeFi Index',
        symbol: 'DEFI',
        exchange: 'CRYPTO',
        price: 1148.60,
        priceFormatted: '1,148.60',
        change: 32.40,
        changeFormatted: '+32.40',
        changePercent: 2.90,
        changePercentFormatted: '(+2.90%)',
        badge: { text: 'DEFI', bg: '#8B5CF6' },
        sparkline: {
          isUp: true,
          points: 'M0,34 Q20,30 45,19 T75,12 T100,4',
          fillArea: 'M0,34 Q20,30 45,19 T75,12 T100,4 L100,40 L0,40 Z',
        }
      }
    ],
    tableTitle: 'Trending Cryptocurrencies',
    tableSubtitle: '24-hour volume and price action across global crypto spot and derivative exchanges',
    items: [
      {
        id: 'btc',
        ticker: 'BTC/USD',
        name: 'Bitcoin',
        badge: { text: '₿', bg: '#F7931A', textColor: '#ffffff', isSymbol: true },
        price: 98450.00,
        currency: 'USD',
        change: 2140.00,
        changePercent: 2.22,
        marketCap: '1.94T',
        volume: '46.80B',
        categoryTag: 'gainers',
        details: {
          sector: 'Decentralized Store of Value',
          exchange: 'Global Crypto Spot',
          high52: '104,800.00',
          low52: '38,500.00',
          open: '96,310.00',
          dayHigh: '99,150.00',
          dayLow: '96,100.00',
          avgVolume: '42.50B',
          analystRating: 'Strong Buy',
          description: 'Bitcoin is the first decentralized digital currency enabling instant peer-to-peer payments secured by proof-of-work cryptographic hashing.'
        }
      },
      {
        id: 'eth',
        ticker: 'ETH/USD',
        name: 'Ethereum',
        badge: { text: 'Ξ', bg: '#627EEA', textColor: '#ffffff', isSymbol: true },
        price: 3480.20,
        currency: 'USD',
        change: 45.80,
        changePercent: 1.33,
        marketCap: '418.5B',
        volume: '24.10B',
        categoryTag: 'active',
        details: {
          sector: 'Smart Contract Platform',
          exchange: 'Global Crypto Spot',
          high52: '4,090.00',
          low52: '2,150.00',
          open: '3,434.40',
          dayHigh: '3,510.00',
          dayLow: '3,415.00',
          avgVolume: '21.80B',
          analystRating: 'Buy',
          description: 'Ethereum is a decentralized open-source blockchain with smart contract functionality, serving as the foundational settlement layer for DeFi and NFTs.'
        }
      },
      {
        id: 'sol',
        ticker: 'SOL/USD',
        name: 'Solana',
        badge: { text: 'S', bg: '#14F195', textColor: '#000000' },
        price: 218.40,
        currency: 'USD',
        change: 11.20,
        changePercent: 5.41,
        marketCap: '103.2B',
        volume: '8.42B',
        categoryTag: 'gainers',
        details: {
          sector: 'High-Throughput Layer 1',
          exchange: 'Global Crypto Spot',
          high52: '260.00',
          low52: '51.20',
          open: '207.20',
          dayHigh: '221.80',
          dayLow: '205.50',
          avgVolume: '7.90B',
          analystRating: 'Strong Buy',
          description: 'Solana is a blockchain designed for mass adoption, combining Proof of History with Proof of Stake to process thousands of transactions per second with sub-cent fees.'
        }
      },
      {
        id: 'doge',
        ticker: 'DOGE/USD',
        name: 'Dogecoin',
        badge: { text: 'Ð', bg: '#C2A633', textColor: '#ffffff', isSymbol: true },
        price: 0.384,
        currency: 'USD',
        change: -0.018,
        changePercent: -4.48,
        marketCap: '56.2B',
        volume: '5.10B',
        categoryTag: 'losers',
        details: {
          sector: 'Meme Currency & Micro-payments',
          exchange: 'Global Crypto Spot',
          high52: '0.480',
          low52: '0.072',
          open: '0.402',
          dayHigh: '0.408',
          dayLow: '0.375',
          avgVolume: '6.20B',
          analystRating: 'Hold',
          description: 'Dogecoin is an open-source peer-to-peer cryptocurrency created in 2013 featuring a Shiba Inu on its logo, recognized for rapid microtransactions.'
        }
      }
    ]
  },
  {
    id: 'futures',
    label: 'Futures',
    heroHeadline: 'Futures, everywhere',
    heroSubtitle: 'Energy, metals, agricultural commodities, and index derivatives contracts',
    indicesTitle: 'Commodity Benchmarks',
    indices: [
      {
        id: 'cl',
        name: 'Crude Oil WTI',
        symbol: 'CL1!',
        exchange: 'NYMEX',
        price: 69.84,
        priceFormatted: '$69.84',
        change: -0.72,
        changeFormatted: '-0.72',
        changePercent: -1.02,
        changePercentFormatted: '(-1.02%)',
        badge: { text: 'WTI', bg: '#2E7D32' },
        sparkline: {
          isUp: false,
          points: 'M0,12 Q25,14 50,24 T80,28 T100,36',
          fillArea: 'M0,12 Q25,14 50,24 T80,28 T100,36 L100,40 L0,40 Z',
        }
      },
      {
        id: 'gc',
        name: 'Gold (COMEX)',
        symbol: 'GC1!',
        exchange: 'COMEX',
        price: 2712.50,
        priceFormatted: '$2,712.50',
        change: 16.40,
        changeFormatted: '+16.40',
        changePercent: 0.61,
        changePercentFormatted: '(+0.61%)',
        badge: { text: 'AU', bg: '#D4AF37' },
        sparkline: {
          isUp: true,
          points: 'M0,32 Q25,28 50,18 T75,14 T100,6',
          fillArea: 'M0,32 Q25,28 50,18 T75,14 T100,6 L100,40 L0,40 Z',
        }
      },
      {
        id: 'ng',
        name: 'Natural Gas',
        symbol: 'NG1!',
        exchange: 'NYMEX',
        price: 3.245,
        priceFormatted: '$3.245',
        change: 0.112,
        changeFormatted: '+0.112',
        changePercent: 3.57,
        changePercentFormatted: '(+3.57%)',
        badge: { text: 'NG', bg: '#0288D1' },
        sparkline: {
          isUp: true,
          points: 'M0,36 Q25,32 45,18 T75,12 T100,4',
          fillArea: 'M0,36 Q25,32 45,18 T75,12 T100,4 L100,40 L0,40 Z',
        }
      },
      {
        id: 'si',
        name: 'Silver (COMEX)',
        symbol: 'SI1!',
        exchange: 'COMEX',
        price: 31.85,
        priceFormatted: '$31.85',
        change: 0.42,
        changeFormatted: '+0.42',
        changePercent: 1.34,
        changePercentFormatted: '(+1.34%)',
        badge: { text: 'AG', bg: '#9E9E9E' },
        sparkline: {
          isUp: true,
          points: 'M0,30 Q30,28 50,18 T80,14 T100,6',
          fillArea: 'M0,30 Q30,28 50,18 T80,14 T100,6 L100,40 L0,40 Z',
        }
      }
    ],
    tableTitle: 'Active Futures Contracts',
    tableSubtitle: 'Most active energy, metals, indices, and agricultural derivative markets',
    items: [
      {
        id: 'es',
        ticker: 'ES1!',
        name: 'E-mini S&P 500 Futures',
        badge: { text: 'ES', bg: '#1565C0', textColor: '#ffffff' },
        price: 5998.75,
        currency: 'USD',
        change: 28.50,
        changePercent: 0.48,
        marketCap: '-',
        volume: '1.42M',
        categoryTag: 'active',
        details: {
          sector: 'Equity Index Derivative',
          exchange: 'CME',
          high52: '6,042.00',
          low52: '4,690.00',
          open: '5,970.25',
          dayHigh: '6,004.50',
          dayLow: '5,968.00',
          avgVolume: '1.60M',
          description: 'The E-mini S&P 500 contract is the most liquid equity index derivative in the world.'
        }
      },
      {
        id: 'brent',
        ticker: 'BZ1!',
        name: 'Brent Crude Oil',
        badge: { text: 'BZ', bg: '#1B5E20', textColor: '#ffffff' },
        price: 73.40,
        currency: 'USD',
        change: -0.65,
        changePercent: -0.88,
        marketCap: '-',
        volume: '342.1K',
        categoryTag: 'losers',
        details: {
          sector: 'Energy Commodity',
          exchange: 'ICE',
          high52: '92.40',
          low52: '68.50',
          open: '74.05',
          dayHigh: '74.30',
          dayLow: '73.10',
          avgVolume: '380.0K',
          description: 'Brent Crude serves as a major benchmark price for purchases of oil worldwide extracted from the North Sea.'
        }
      },
      {
        id: 'copper',
        ticker: 'HG1!',
        name: 'Copper Futures',
        badge: { text: 'HG', bg: '#D84315', textColor: '#ffffff' },
        price: 4.168,
        currency: 'USD',
        change: 0.054,
        changePercent: 1.31,
        marketCap: '-',
        volume: '88.4K',
        categoryTag: 'gainers',
        details: {
          sector: 'Industrial Metal',
          exchange: 'COMEX',
          high52: '5.19',
          low52: '3.65',
          open: '4.114',
          dayHigh: '4.185',
          dayLow: '4.102',
          avgVolume: '95.0K',
          description: 'Known as "Doctor Copper" for its ability to assess the overall health of the world economy due to its ubiquitous industrial use.'
        }
      }
    ]
  },
  {
    id: 'forex',
    label: 'Forex',
    heroHeadline: 'Forex, everywhere',
    heroSubtitle: 'Global foreign exchange rates, cross-currency pairings, and currency strength indices',
    indicesTitle: 'Currency Indices',
    indices: [
      {
        id: 'dxy',
        name: 'US Dollar Index',
        symbol: 'DXY',
        exchange: 'ICE',
        price: 106.82,
        priceFormatted: '106.82',
        change: 0.28,
        changeFormatted: '+0.28',
        changePercent: 0.26,
        changePercentFormatted: '(+0.26%)',
        badge: { text: '$', bg: '#2E7D32', isSymbol: true },
        sparkline: {
          isUp: true,
          points: 'M0,32 Q25,28 50,18 T75,14 T100,5',
          fillArea: 'M0,32 Q25,28 50,18 T75,14 T100,5 L100,40 L0,40 Z',
        }
      },
      {
        id: 'eurusd-idx',
        name: 'EUR / USD',
        symbol: 'EURUSD',
        exchange: 'FX',
        price: 1.0458,
        priceFormatted: '1.0458',
        change: -0.0032,
        changeFormatted: '-0.0032',
        changePercent: -0.31,
        changePercentFormatted: '(-0.31%)',
        badge: { text: '€', bg: '#003399', isSymbol: true },
        sparkline: {
          isUp: false,
          points: 'M0,12 Q25,15 50,24 T80,28 T100,35',
          fillArea: 'M0,12 Q25,15 50,24 T80,28 T100,35 L100,40 L0,40 Z',
        }
      },
      {
        id: 'usdjpy-idx',
        name: 'USD / JPY',
        symbol: 'USDJPY',
        exchange: 'FX',
        price: 154.25,
        priceFormatted: '154.25',
        change: 0.65,
        changeFormatted: '+0.65',
        changePercent: 0.42,
        changePercentFormatted: '(+0.42%)',
        badge: { text: '¥', bg: '#BC002D', isSymbol: true },
        sparkline: {
          isUp: true,
          points: 'M0,28 Q30,26 50,18 T75,15 T100,7',
          fillArea: 'M0,28 Q30,26 50,18 T75,15 T100,7 L100,40 L0,40 Z',
        }
      },
      {
        id: 'gbpusd-idx',
        name: 'GBP / USD',
        symbol: 'GBPUSD',
        exchange: 'FX',
        price: 1.2582,
        priceFormatted: '1.2582',
        change: -0.0018,
        changeFormatted: '-0.0018',
        changePercent: -0.14,
        changePercentFormatted: '(-0.14%)',
        badge: { text: '£', bg: '#C8102E', isSymbol: true },
        sparkline: {
          isUp: false,
          points: 'M0,15 Q25,18 50,25 T80,28 T100,34',
          fillArea: 'M0,15 Q25,18 50,25 T80,28 T100,34 L100,40 L0,40 Z',
        }
      }
    ],
    tableTitle: 'Major & Minor Forex Pairs',
    tableSubtitle: 'Interbank currency rates with live bid/ask spreads',
    items: [
      {
        id: 'eurusd',
        ticker: 'EUR/USD',
        name: 'Euro / US Dollar',
        badge: { text: 'EU', bg: '#003399', textColor: '#ffffff' },
        price: 1.0458,
        currency: 'USD',
        change: -0.0032,
        changePercent: -0.31,
        marketCap: '-',
        volume: '118.4B',
        categoryTag: 'active',
        details: {
          sector: 'Major Currency Pair',
          exchange: 'Interbank Forex',
          high52: '1.1215',
          low52: '1.0410',
          open: '1.0490',
          dayHigh: '1.0505',
          dayLow: '1.0442',
          avgVolume: '120.0B',
          description: 'EUR/USD is the most heavily traded currency pair globally, accounting for nearly a quarter of all daily foreign exchange turnover.'
        }
      },
      {
        id: 'usdjpy',
        ticker: 'USD/JPY',
        name: 'US Dollar / Japanese Yen',
        badge: { text: 'UJ', bg: '#BC002D', textColor: '#ffffff' },
        price: 154.25,
        currency: 'JPY',
        change: 0.65,
        changePercent: 0.42,
        marketCap: '-',
        volume: '84.2B',
        categoryTag: 'gainers',
        details: {
          sector: 'Major Currency Pair',
          exchange: 'Interbank Forex',
          high52: '161.95',
          low52: '140.25',
          open: '153.60',
          dayHigh: '154.55',
          dayLow: '153.40',
          avgVolume: '90.0B',
          description: 'USD/JPY represents the exchange rate between the United States dollar and the Japanese yen, reflecting central bank rate differentials.'
        }
      },
      {
        id: 'gbpusd',
        ticker: 'GBP/USD',
        name: 'British Pound / US Dollar',
        badge: { text: 'GU', bg: '#C8102E', textColor: '#ffffff' },
        price: 1.2582,
        currency: 'USD',
        change: -0.0018,
        changePercent: -0.14,
        marketCap: '-',
        volume: '56.1B',
        categoryTag: 'losers',
        details: {
          sector: 'Major Currency Pair',
          exchange: 'Interbank Forex',
          high52: '1.3434',
          low52: '1.2480',
          open: '1.2600',
          dayHigh: '1.2625',
          dayLow: '1.2570',
          avgVolume: '60.0B',
          description: 'Historically known as "Cable", GBP/USD is one of the oldest and most established forex trading markets.'
        }
      }
    ]
  },
  {
    id: 'gov-bonds',
    label: 'Government bonds',
    heroHeadline: 'Government bonds, everywhere',
    heroSubtitle: 'Sovereign debt yield curves, treasury yields, and interest rate expectations',
    indicesTitle: 'Sovereign Yields',
    indices: [
      {
        id: 'us10y',
        name: 'US 10Y Yield',
        symbol: 'US10Y',
        exchange: 'BOND',
        price: 4.412,
        priceFormatted: '4.412%',
        change: 0.038,
        changeFormatted: '+0.038',
        changePercent: 0.87,
        changePercentFormatted: '(+0.87%)',
        badge: { text: '10Y', bg: '#1E3A8A' },
        sparkline: {
          isUp: true,
          points: 'M0,30 Q25,28 50,18 T75,14 T100,5',
          fillArea: 'M0,30 Q25,28 50,18 T75,14 T100,5 L100,40 L0,40 Z',
        }
      },
      {
        id: 'us02y',
        name: 'US 2Y Yield',
        symbol: 'US02Y',
        exchange: 'BOND',
        price: 4.285,
        priceFormatted: '4.285%',
        change: 0.024,
        changeFormatted: '+0.024',
        changePercent: 0.56,
        changePercentFormatted: '(+0.56%)',
        badge: { text: '2Y', bg: '#2563EB' },
        sparkline: {
          isUp: true,
          points: 'M0,28 Q30,26 50,18 T75,15 T100,6',
          fillArea: 'M0,28 Q30,26 50,18 T75,15 T100,6 L100,40 L0,40 Z',
        }
      },
      {
        id: 'us30y',
        name: 'US 30Y Yield',
        symbol: 'US30Y',
        exchange: 'BOND',
        price: 4.594,
        priceFormatted: '4.594%',
        change: 0.042,
        changeFormatted: '+0.042',
        changePercent: 0.92,
        changePercentFormatted: '(+0.92%)',
        badge: { text: '30Y', bg: '#1D4ED8' },
        sparkline: {
          isUp: true,
          points: 'M0,32 Q25,28 50,16 T75,12 T100,4',
          fillArea: 'M0,32 Q25,28 50,16 T75,12 T100,4 L100,40 L0,40 Z',
        }
      },
      {
        id: 'bund10y',
        name: 'Germany 10Y Bund',
        symbol: 'DE10Y',
        exchange: 'BOND',
        price: 2.348,
        priceFormatted: '2.348%',
        change: -0.015,
        changeFormatted: '-0.015',
        changePercent: -0.63,
        changePercentFormatted: '(-0.63%)',
        badge: { text: 'DE', bg: '#002B49' },
        sparkline: {
          isUp: false,
          points: 'M0,10 Q25,14 50,22 T80,26 T100,34',
          fillArea: 'M0,10 Q25,14 50,22 T80,26 T100,34 L100,40 L0,40 Z',
        }
      }
    ],
    tableTitle: 'Sovereign Debt Rates',
    tableSubtitle: 'Key national government bond yields across maturities',
    items: [
      {
        id: 'us10y-item',
        ticker: 'US10Y',
        name: 'United States 10-Year Treasury Note',
        badge: { text: 'US', bg: '#1E3A8A', textColor: '#ffffff' },
        price: 4.412,
        currency: '%',
        change: 0.038,
        changePercent: 0.87,
        marketCap: '-',
        volume: '5.2M Contracts',
        categoryTag: 'active',
        details: {
          sector: 'US Sovereign Debt',
          exchange: 'US Treasury',
          high52: '4.740%',
          low52: '3.620%',
          open: '4.374%',
          dayHigh: '4.425%',
          dayLow: '4.368%',
          avgVolume: '4.8M',
          description: 'The 10-year Treasury note is the benchmark debt instrument utilized to value mortgage rates, corporate bonds, and long-term capital costs.'
        }
      },
      {
        id: 'uk10y-item',
        ticker: 'GB10Y',
        name: 'United Kingdom 10-Year Gilt',
        badge: { text: 'UK', bg: '#00247D', textColor: '#ffffff' },
        price: 4.428,
        currency: '%',
        change: 0.012,
        changePercent: 0.27,
        marketCap: '-',
        volume: '840K Contracts',
        categoryTag: 'gainers',
        details: {
          sector: 'UK Sovereign Debt',
          exchange: 'Debt Management Office UK',
          high52: '4.650%',
          low52: '3.750%',
          open: '4.416%',
          dayHigh: '4.440%',
          dayLow: '4.402%',
          avgVolume: '900K',
          description: 'British government gilts denominated in pounds sterling, serving as the benchmark cost of borrowing for the UK public sector.'
        }
      },
      {
        id: 'jp10y-item',
        ticker: 'JP10Y',
        name: 'Japan 10-Year JGB',
        badge: { text: 'JP', bg: '#BC002D', textColor: '#ffffff' },
        price: 1.065,
        currency: '%',
        change: -0.008,
        changePercent: -0.75,
        marketCap: '-',
        volume: '420K Contracts',
        categoryTag: 'losers',
        details: {
          sector: 'Japan Sovereign Debt',
          exchange: 'Bank of Japan',
          high52: '1.110%',
          low52: '0.680%',
          open: '1.073%',
          dayHigh: '1.075%',
          dayLow: '1.062%',
          avgVolume: '450K',
          description: 'Japanese Government Bonds reflecting Bank of Japan interest rate policy shifts away from negative interest rate territory.'
        }
      }
    ]
  },
  {
    id: 'corp-bonds',
    label: 'Corporate bonds',
    heroHeadline: 'Corporate bonds, everywhere',
    heroSubtitle: 'High yield spreads, investment grade corporate debt, and credit default metrics',
    indicesTitle: 'Credit Indices',
    indices: [
      {
        id: 'hyg-idx',
        name: 'High Yield Corp',
        symbol: 'HYG',
        exchange: 'NYSE ARCA',
        price: 79.45,
        priceFormatted: '79.45',
        change: 0.18,
        changeFormatted: '+0.18',
        changePercent: 0.23,
        changePercentFormatted: '(+0.23%)',
        badge: { text: 'HY', bg: '#DC2626' },
        sparkline: {
          isUp: true,
          points: 'M0,30 Q25,28 50,18 T75,15 T100,8',
          fillArea: 'M0,30 Q25,28 50,18 T75,15 T100,8 L100,40 L0,40 Z',
        }
      },
      {
        id: 'lqd-idx',
        name: 'Investment Grade',
        symbol: 'LQD',
        exchange: 'NYSE ARCA',
        price: 108.20,
        priceFormatted: '108.20',
        change: -0.35,
        changeFormatted: '-0.35',
        changePercent: -0.32,
        changePercentFormatted: '(-0.32%)',
        badge: { text: 'IG', bg: '#2563EB' },
        sparkline: {
          isUp: false,
          points: 'M0,12 Q25,15 50,22 T80,26 T100,34',
          fillArea: 'M0,12 Q25,15 50,22 T80,26 T100,34 L100,40 L0,40 Z',
        }
      },
      {
        id: 'jnk-idx',
        name: 'SPDR Junk Bond',
        symbol: 'JNK',
        exchange: 'NYSE ARCA',
        price: 95.80,
        priceFormatted: '95.80',
        change: 0.22,
        changeFormatted: '+0.22',
        changePercent: 0.23,
        changePercentFormatted: '(+0.23%)',
        badge: { text: 'JNK', bg: '#EA580C' },
        sparkline: {
          isUp: true,
          points: 'M0,28 Q30,26 50,18 T75,15 T100,8',
          fillArea: 'M0,28 Q30,26 50,18 T75,15 T100,8 L100,40 L0,40 Z',
        }
      },
      {
        id: 'emb-idx',
        name: 'EM USD Bond',
        symbol: 'EMB',
        exchange: 'NASDAQ',
        price: 89.65,
        priceFormatted: '89.65',
        change: 0.38,
        changeFormatted: '+0.38',
        changePercent: 0.43,
        changePercentFormatted: '(+0.43%)',
        badge: { text: 'EM', bg: '#059669' },
        sparkline: {
          isUp: true,
          points: 'M0,32 Q25,28 50,18 T75,14 T100,7',
          fillArea: 'M0,32 Q25,28 50,18 T75,14 T100,7 L100,40 L0,40 Z',
        }
      }
    ],
    tableTitle: 'Corporate Credit Funds',
    tableSubtitle: 'Liquid exchange-traded corporate debt securities and credit benchmarks',
    items: [
      {
        id: 'hyg',
        ticker: 'HYG',
        name: 'iShares iBoxx $ High Yield Corporate Bond ETF',
        badge: { text: 'HY', bg: '#DC2626', textColor: '#ffffff' },
        price: 79.45,
        currency: 'USD',
        change: 0.18,
        changePercent: 0.23,
        marketCap: '17.4B',
        volume: '24.8M',
        categoryTag: 'gainers',
        details: {
          sector: 'High Yield Corporate Debt',
          exchange: 'NYSE ARCA',
          high52: '80.60',
          low52: '74.20',
          open: '79.27',
          dayHigh: '79.55',
          dayLow: '79.20',
          avgVolume: '28.1M',
          description: 'HYG tracks a market-weighted index of US dollar-denominated high-yield corporate bonds.'
        }
      },
      {
        id: 'lqd',
        ticker: 'LQD',
        name: 'iShares iBoxx $ Investment Grade Corporate Bond ETF',
        badge: { text: 'LQ', bg: '#2563EB', textColor: '#ffffff' },
        price: 108.20,
        currency: 'USD',
        change: -0.35,
        changePercent: -0.32,
        marketCap: '32.8B',
        volume: '16.2M',
        categoryTag: 'losers',
        details: {
          sector: 'Investment Grade Corporate Debt',
          exchange: 'NYSE ARCA',
          high52: '113.40',
          low52: '104.10',
          open: '108.55',
          dayHigh: '108.70',
          dayLow: '108.05',
          avgVolume: '18.4M',
          description: 'LQD holds a basket of over 2,500 investment-grade corporate bonds issued by leading multinational corporations.'
        }
      }
    ]
  },
  {
    id: 'etfs',
    label: 'ETFs',
    heroHeadline: 'ETFs, everywhere',
    heroSubtitle: 'Leading index funds, thematic tech baskets, dividend aristocrats, and commodities',
    indicesTitle: 'Flagship ETFs',
    indices: [
      {
        id: 'spy',
        name: 'SPDR S&P 500',
        symbol: 'SPY',
        exchange: 'NYSE ARCA',
        price: 597.45,
        priceFormatted: '597.45',
        change: 2.50,
        changeFormatted: '+2.50',
        changePercent: 0.42,
        changePercentFormatted: '(+0.42%)',
        badge: { text: 'SPY', bg: '#1E40AF' },
        sparkline: {
          isUp: true,
          points: 'M0,35 Q20,32 35,22 T70,18 T100,5',
          fillArea: 'M0,35 Q20,32 35,22 T70,18 T100,5 L100,40 L0,40 Z',
        }
      },
      {
        id: 'qqq',
        name: 'Invesco QQQ',
        symbol: 'QQQ',
        exchange: 'NASDAQ',
        price: 512.80,
        priceFormatted: '512.80',
        change: 4.35,
        changeFormatted: '+4.35',
        changePercent: 0.86,
        changePercentFormatted: '(+0.86%)',
        badge: { text: 'QQQ', bg: '#0284C7' },
        sparkline: {
          isUp: true,
          points: 'M0,30 Q25,28 45,15 T80,12 T100,4',
          fillArea: 'M0,30 Q25,28 45,15 T80,12 T100,4 L100,40 L0,40 Z',
        }
      },
      {
        id: 'smh',
        name: 'VanEck Semiconductor',
        symbol: 'SMH',
        exchange: 'NASDAQ',
        price: 258.90,
        priceFormatted: '258.90',
        change: 4.90,
        changeFormatted: '+4.90',
        changePercent: 1.93,
        changePercentFormatted: '(+1.93%)',
        badge: { text: 'SMH', bg: '#0D9488' },
        sparkline: {
          isUp: true,
          points: 'M0,34 Q20,30 45,16 T75,12 T100,3',
          fillArea: 'M0,34 Q20,30 45,16 T75,12 T100,3 L100,40 L0,40 Z',
        }
      },
      {
        id: 'tlt',
        name: 'iShares 20+ Year Treasury',
        symbol: 'TLT',
        exchange: 'NASDAQ',
        price: 90.15,
        priceFormatted: '90.15',
        change: -0.68,
        changeFormatted: '-0.68',
        changePercent: -0.75,
        changePercentFormatted: '(-0.75%)',
        badge: { text: 'TLT', bg: '#7C3AED' },
        sparkline: {
          isUp: false,
          points: 'M0,12 Q25,15 50,24 T80,28 T100,36',
          fillArea: 'M0,12 Q25,15 50,24 T80,28 T100,36 L100,40 L0,40 Z',
        }
      }
    ],
    tableTitle: 'Most Traded ETFs',
    tableSubtitle: 'Highest daily liquidity equity, thematic, and fixed-income ETFs',
    items: [
      {
        id: 'spy-item',
        ticker: 'SPY',
        name: 'SPDR S&P 500 ETF Trust',
        badge: { text: 'SP', bg: '#1E40AF', textColor: '#ffffff' },
        price: 597.45,
        currency: 'USD',
        change: 2.50,
        changePercent: 0.42,
        marketCap: '612.4B',
        volume: '44.8M',
        categoryTag: 'active',
        details: {
          sector: 'Large Cap Blend',
          exchange: 'NYSE ARCA',
          high52: '601.50',
          low52: '468.20',
          open: '595.20',
          dayHigh: '598.30',
          dayLow: '594.80',
          avgVolume: '48.2M',
          description: 'The oldest and largest exchange-traded fund in the US, providing broad exposure to 500 leading large-cap companies.'
        }
      },
      {
        id: 'qqq-item',
        ticker: 'QQQ',
        name: 'Invesco QQQ Trust Series 1',
        badge: { text: 'QQ', bg: '#0284C7', textColor: '#ffffff' },
        price: 512.80,
        currency: 'USD',
        change: 4.35,
        changePercent: 0.86,
        marketCap: '304.8B',
        volume: '36.2M',
        categoryTag: 'gainers',
        details: {
          sector: 'Large Cap Tech & Growth',
          exchange: 'NASDAQ',
          high52: '519.80',
          low52: '412.00',
          open: '509.50',
          dayHigh: '513.60',
          dayLow: '508.90',
          avgVolume: '38.0M',
          description: 'QQQ tracks the Nasdaq-100 Index, offering exposure to the transformative tech giants reshaping the global economy.'
        }
      },
      {
        id: 'arkk-item',
        ticker: 'ARKK',
        name: 'ARK Innovation ETF',
        badge: { text: 'AK', bg: '#06B6D4', textColor: '#ffffff' },
        price: 52.30,
        currency: 'USD',
        change: 1.85,
        changePercent: 3.67,
        marketCap: '6.4B',
        volume: '18.9M',
        categoryTag: 'gainers',
        details: {
          sector: 'Disruptive Innovation',
          exchange: 'NYSE ARCA',
          high52: '55.40',
          low52: '36.80',
          open: '50.60',
          dayHigh: '52.60',
          dayLow: '50.40',
          avgVolume: '15.2M',
          description: 'Actively managed ETF seeking long-term growth by investing in companies focused on genomics, robotics, and blockchain.'
        }
      }
    ]
  },
  {
    id: 'economy',
    label: 'Economy',
    heroHeadline: 'Economy, everywhere',
    heroSubtitle: 'Macroeconomic indicators, central bank policies, inflation statistics, and labor data',
    indicesTitle: 'Macro Indicators',
    indices: [
      {
        id: 'cpi',
        name: 'US CPI Inflation Rate',
        symbol: 'CPI YoY',
        exchange: 'MACRO',
        price: 2.6,
        priceFormatted: '2.6%',
        change: 0.2,
        changeFormatted: '+0.2%',
        changePercent: 8.33,
        changePercentFormatted: '(+0.20%)',
        badge: { text: 'CPI', bg: '#D97706' },
        sparkline: {
          isUp: true,
          points: 'M0,28 Q30,26 50,18 T75,15 T100,6',
          fillArea: 'M0,28 Q30,26 50,18 T75,15 T100,6 L100,40 L0,40 Z',
        }
      },
      {
        id: 'fedfunds',
        name: 'Federal Funds Rate',
        symbol: 'FEDFUNDS',
        exchange: 'FED',
        price: 4.75,
        priceFormatted: '4.75%',
        change: -0.25,
        changeFormatted: '-0.25%',
        changePercent: -5.00,
        changePercentFormatted: '(-0.25%)',
        badge: { text: 'FED', bg: '#059669' },
        sparkline: {
          isUp: false,
          points: 'M0,10 Q25,12 50,22 T80,26 T100,34',
          fillArea: 'M0,10 Q25,12 50,22 T80,26 T100,34 L100,40 L0,40 Z',
        }
      },
      {
        id: 'unemp',
        name: 'US Unemployment Rate',
        symbol: 'UNRATE',
        exchange: 'BLS',
        price: 4.1,
        priceFormatted: '4.1%',
        change: 0.0,
        changeFormatted: '0.0%',
        changePercent: 0.00,
        changePercentFormatted: '(0.00%)',
        badge: { text: 'JOBS', bg: '#2563EB' },
        sparkline: {
          isUp: true,
          points: 'M0,22 Q30,22 50,20 T75,21 T100,20',
          fillArea: 'M0,22 Q30,22 50,20 T75,21 T100,20 L100,40 L0,40 Z',
        }
      },
      {
        id: 'gdp',
        name: 'US GDP Growth (Annual)',
        symbol: 'GDP YoY',
        exchange: 'BEA',
        price: 2.8,
        priceFormatted: '2.8%',
        change: 0.1,
        changeFormatted: '+0.1%',
        changePercent: 3.70,
        changePercentFormatted: '(+0.10%)',
        badge: { text: 'GDP', bg: '#7C3AED' },
        sparkline: {
          isUp: true,
          points: 'M0,30 Q25,28 50,18 T75,14 T100,6',
          fillArea: 'M0,30 Q25,28 50,18 T75,14 T100,6 L100,40 L0,40 Z',
        }
      }
    ],
    tableTitle: 'Upcoming & Recent Macro Releases',
    tableSubtitle: 'Crucial central bank decisions, consumer health, and economic calendar prints',
    items: [
      {
        id: 'core-pce',
        ticker: 'CORE-PCE',
        name: 'Core PCE Price Index YoY',
        badge: { text: 'PC', bg: '#D97706', textColor: '#ffffff' },
        price: 2.8,
        currency: '%',
        change: 0.1,
        changePercent: 3.70,
        marketCap: '-',
        volume: 'Monthly Print',
        categoryTag: 'active',
        details: {
          sector: 'Inflation Metric',
          exchange: 'Bureau of Economic Analysis',
          high52: '3.6%',
          low52: '2.6%',
          open: '2.7%',
          dayHigh: '2.8%',
          dayLow: '2.7%',
          avgVolume: '-',
          description: 'The Federal Reserve\'s preferred gauge of underlying consumer inflation, stripping out volatile food and energy costs.'
        }
      },
      {
        id: 'nfp',
        ticker: 'NFP',
        name: 'Nonfarm Payrolls (Monthly Change)',
        badge: { text: 'NF', bg: '#059669', textColor: '#ffffff' },
        price: 227.0,
        currency: 'K Jobs',
        change: 77.0,
        changePercent: 51.33,
        marketCap: '-',
        volume: 'Monthly Print',
        categoryTag: 'gainers',
        details: {
          sector: 'Labor Market Metric',
          exchange: 'Bureau of Labor Statistics',
          high52: '310K',
          low52: '12K',
          open: '150K Exp',
          dayHigh: '227K',
          dayLow: '150K Exp',
          avgVolume: '-',
          description: 'Measurement of the number of paid workers in the US, excluding farm employees and government workers.'
        }
      },
      {
        id: 'retail-sales',
        ticker: 'RETAIL',
        name: 'US Retail Sales MoM',
        badge: { text: 'RS', bg: '#2563EB', textColor: '#ffffff' },
        price: 0.4,
        currency: '%',
        change: -0.4,
        changePercent: -50.00,
        marketCap: '-',
        volume: 'Monthly Print',
        categoryTag: 'losers',
        details: {
          sector: 'Consumer Spending',
          exchange: 'US Census Bureau',
          high52: '1.2%',
          low52: '-0.3%',
          open: '0.8%',
          dayHigh: '0.8%',
          dayLow: '0.3%',
          avgVolume: '-',
          description: 'Key monthly metric measuring consumer demand for finished goods at retail outlets across the United States.'
        }
      }
    ]
  }
];
