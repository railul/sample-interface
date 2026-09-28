import React, { useState } from 'react';
import { X, CheckCircle, Shield, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; email: string } | null;
  onLogin: (user: { name: string; email: string }) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: email.split('@')[0] || 'Roy Ong',
      email: email || 'royongyt123@gmail.com'
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  const handleQuickLogin = () => {
    onLogin({
      name: 'Roy Ong',
      email: 'royongyt123@gmail.com'
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white dark:bg-[#1E222D] rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#2A2E39] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
          <div className="flex items-center gap-2">
            <svg className="w-7 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 36 24">
              <path d="M0 20.8V3.2H4.8V20.8H0ZM9.6 20.8V0.8H14.4V20.8H9.6ZM19.2 20.8V6.8H24V20.8H19.2ZM28.8 20.8V11.2H33.6V20.8H28.8Z" fill="currentColor" />
            </svg>
            <span className="font-bold text-sm text-[#131722] dark:text-white">
              TradingView Account
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#6A6D78] hover:text-[#131722] dark:hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentUser ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0052FE] text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-md">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#131722] dark:text-white">
                {currentUser.name}
              </h3>
              <p className="text-sm text-[#6A6D78] dark:text-[#848E9C]">
                {currentUser.email}
              </p>
            </div>
            <div className="p-3 bg-[#E8F5EE] dark:bg-[#089981]/20 rounded-xl text-xs text-[#089981] font-semibold flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              TradingView Pro Account Active
            </div>
            <div className="pt-2 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#131722] dark:text-white rounded-xl text-xs font-semibold hover:bg-[#E0E3EB] transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 bg-[#FDECEE] text-[#F23645] rounded-xl text-xs font-semibold hover:bg-red-100 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-[#089981] mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-[#131722] dark:text-white">
                  Welcome to TradingView!
                </h4>
                <p className="text-xs text-[#6A6D78]">Signing in to your workspace...</p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#131722] dark:text-white">
                    {isSignUp ? 'Create your account' : 'Welcome back'}
                  </h3>
                  <p className="text-xs text-[#6A6D78] dark:text-[#848E9C] mt-1">
                    Join 60M+ traders and investors sharing real-time market data
                  </p>
                </div>

                {/* 1-Click Quick Demo Sign In */}
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="w-full py-2.5 px-4 border border-[#2962FF] text-[#2962FF] hover:bg-[#2962FF]/10 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <span>Quick Sign in as Roy Ong</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-[#E0E3EB] dark:border-[#2A2E39] w-full"></div>
                  <span className="bg-white dark:bg-[#1E222D] px-2 text-[11px] text-[#6A6D78] absolute uppercase">
                    or continue with
                  </span>
                </div>

                <form onSubmit={handleSimulatedSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#6A6D78] dark:text-[#848E9C] mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 rounded-xl text-sm border border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8FAFD] dark:bg-[#181B22] text-[#131722] dark:text-white focus:outline-none focus:border-[#2962FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#6A6D78] dark:text-[#848E9C] mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 rounded-xl text-sm border border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8FAFD] dark:bg-[#181B22] text-[#131722] dark:text-white focus:outline-none focus:border-[#2962FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 tv-btn-gradient text-white rounded-xl text-xs font-semibold shadow-sm hover:brightness-105 transition"
                  >
                    {isSignUp ? 'Create Free Account' : 'Sign In'}
                  </button>
                </form>

                <div className="text-center text-xs text-[#6A6D78] dark:text-[#848E9C]">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-[#2962FF] font-semibold hover:underline"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
