import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, ArrowRight, ArrowUp, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C0E1A] text-[#FAF7F2] pt-16 pb-10 border-t border-[#3B1637]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#3B1637]/70">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo light size="lg" />
            <p className="text-xs sm:text-sm text-[#D1BDCA] leading-relaxed max-w-sm pt-2">
              Timeless sarees. Modern you. Discover elegance, culture and craftsmanship in every drape.
            </p>
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-full bg-[#2E182B] flex items-center justify-center text-[#D1BDCA] hover:text-white hover:bg-[#581C4E] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-full bg-[#2E182B] flex items-center justify-center text-[#D1BDCA] hover:text-white hover:bg-[#581C4E] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-full bg-[#2E182B] flex items-center justify-center text-[#D1BDCA] hover:text-white hover:bg-[#581C4E] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#C4B2BF]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stores')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Boutique Stores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-sans">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#C4B2BF]">
              <li>
                <button
                  onClick={() => onNavigate('policy', 'shipping')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', 'returns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Return & Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', 'size-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size & Blouse Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', 'faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', 'terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', 'privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Join Our Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-sans">
              Join Our Newsletter
            </h4>
            <p className="text-xs text-[#C4B2BF] leading-relaxed">
              Be the first to know about new arrivals, exclusive offers and more.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-[#2A1527] border border-[#4D2447] text-white placeholder-[#8F728A] px-4 py-2.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] pr-12 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#581C4E] hover:bg-[#722465] text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-300" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-2">
                  Welcome to the SareeAura inner circle! 10% coupon code: WELCOME10
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8F7788] gap-4">
          <p>© 2026 SareeAura. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Silk Mark Certified Pure Silks</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-[#4D2447] bg-[#2A1527] flex items-center justify-center text-[#C4B2BF] hover:text-white hover:border-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
