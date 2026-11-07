import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ShieldCheck, ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useShop } from '../context/ShopContext';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onSearchOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onSearchOpen }) => {
  const { cart, wishlist, setIsCartOpen, user, toggleUserRole, categories } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]/60 transition-all duration-200">
      {/* Top Announcement Bar */}
      <div className="bg-[#3B1637] text-[#FAF7F2] py-2 px-4 text-xs font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-center sm:text-left">
          <div className="flex-1 flex items-center justify-center sm:justify-start gap-4">
            <span className="hidden sm:inline text-[#D4AF37] font-medium">SPECIAL OFFER</span>
            <span className="text-xs sm:text-sm font-light">
              Free Express Shipping on Orders Above ₹3,000 &nbsp;·&nbsp; Use code <strong className="text-[#D4AF37] font-semibold tracking-wider">WELCOME10</strong> for 10% off
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-[11px] text-[#E8D4C8]">
            <button
              onClick={() => onNavigate('stores')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Find a Boutique
            </button>
            <span className="text-[#845377]">|</span>
            <button
              onClick={() => onNavigate('track-order')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Track Order
            </button>
            <span className="text-[#845377]">|</span>
            {/* Quick Admin Toggle for tester */}
            <button
              onClick={toggleUserRole}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#581C4E] text-[#F3E5AB] hover:bg-[#6E2462] transition-colors text-[11px] font-medium cursor-pointer"
              title="Click to toggle between Customer & Admin view"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Role: {user.role === 'admin' ? 'Admin' : 'Customer'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3B1637] hover:text-[#581C4E] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo Zone */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer text-left focus:outline-none"
          >
            <BrandLogo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                currentView === 'home'
                  ? 'text-[#581C4E] font-semibold'
                  : 'text-[#4A3E47] hover:text-[#581C4E]'
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#581C4E] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                currentView === 'shop'
                  ? 'text-[#581C4E] font-semibold'
                  : 'text-[#4A3E47] hover:text-[#581C4E]'
              }`}
            >
              Shop All
              {currentView === 'shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#581C4E] rounded-full" />
              )}
            </button>

            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsDropdownOpen(true)}
              onMouseLeave={() => setCollectionsDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('shop')}
                className="flex items-center gap-1 text-sm font-medium text-[#4A3E47] hover:text-[#581C4E] transition-colors py-1 cursor-pointer"
              >
                Collections
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {collectionsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 shadow-xl animate-in fade-in slide-in-from-top-1 z-50">
                  <div className="bg-[#FAF7F2] border border-[#E8DEC8] rounded-xl shadow-lg p-2 divide-y divide-[#EFE5D5]">
                    <div className="py-1">
                      {categories.slice(0, 5).map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setCollectionsDropdownOpen(false);
                            onNavigate('shop', cat.name);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-[#3B1637] hover:bg-[#F2ECE1] rounded-lg transition-colors flex items-center justify-between"
                        >
                          <span className="font-medium">{cat.name}</span>
                          <span className="text-[10px] text-[#845377]">{cat.subtitle}</span>
                        </button>
                      ))}
                    </div>
                    <div className="pt-2 px-3 pb-1">
                      <button
                        onClick={() => {
                          setCollectionsDropdownOpen(false);
                          onNavigate('shop');
                        }}
                        className="text-xs font-semibold text-[#581C4E] hover:underline flex items-center gap-1"
                      >
                        View All Collections →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('about')}
              className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                currentView === 'about'
                  ? 'text-[#581C4E] font-semibold'
                  : 'text-[#4A3E47] hover:text-[#581C4E]'
              }`}
            >
              About
              {currentView === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#581C4E] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('stores')}
              className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                currentView === 'stores'
                  ? 'text-[#581C4E] font-semibold'
                  : 'text-[#4A3E47] hover:text-[#581C4E]'
              }`}
            >
              Boutiques
              {currentView === 'stores' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#581C4E] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                currentView === 'contact'
                  ? 'text-[#581C4E] font-semibold'
                  : 'text-[#4A3E47] hover:text-[#581C4E]'
              }`}
            >
              Contact
              {currentView === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#581C4E] rounded-full" />
              )}
            </button>

            {user.role === 'admin' && (
              <button
                onClick={() => onNavigate('admin')}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer border ${
                  currentView === 'admin'
                    ? 'bg-[#581C4E] text-white border-[#581C4E]'
                    : 'text-[#581C4E] border-[#581C4E] hover:bg-[#581C4E]/10'
                }`}
              >
                Admin Panel
              </button>
            )}
          </nav>

          {/* Right Action Icons (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button */}
            <button
              onClick={onSearchOpen}
              className="p-2 text-[#3B1637] hover:text-[#581C4E] transition-colors rounded-full hover:bg-[#F2ECE1] cursor-pointer"
              aria-label="Search sarees"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2 text-[#3B1637] hover:text-[#581C4E] transition-colors rounded-full hover:bg-[#F2ECE1] cursor-pointer"
                aria-label="User Account"
              >
                <User className="w-5 h-5 stroke-[1.75]" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 bg-[#FAF7F2] border border-[#E8DEC8] rounded-xl shadow-xl py-2 z-50 text-left animate-in fade-in"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#EFE5D5]">
                    <p className="text-xs text-[#845377]">Signed in as</p>
                    <p className="text-sm font-semibold text-[#3B1637] truncate">{user.name}</p>
                    <span className="text-[10px] inline-block px-1.5 py-0.5 mt-0.5 rounded bg-[#F2ECE1] text-[#581C4E] font-medium capitalize">
                      {user.role} mode
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('account')}
                    className="w-full text-left px-4 py-2 text-xs text-[#3B1637] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                  >
                    My Orders & Addresses
                  </button>

                  <button
                    onClick={() => onNavigate('track-order')}
                    className="w-full text-left px-4 py-2 text-xs text-[#3B1637] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                  >
                    Track Shipment
                  </button>

                  {user.role === 'admin' ? (
                    <button
                      onClick={() => onNavigate('admin')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-[#581C4E] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                    >
                      Open Admin Dashboard
                    </button>
                  ) : null}

                  <div className="border-t border-[#EFE5D5] mt-1 pt-1">
                    <button
                      onClick={toggleUserRole}
                      className="w-full text-left px-4 py-2 text-xs text-[#581C4E] hover:bg-[#F2ECE1] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>Switch to {user.role === 'customer' ? 'Admin' : 'Customer'}</span>
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="p-2 text-[#3B1637] hover:text-[#581C4E] transition-colors rounded-full hover:bg-[#F2ECE1] relative cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#581C4E] text-[#FAF7F2] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#3B1637] hover:text-[#581C4E] transition-colors rounded-full hover:bg-[#F2ECE1] relative cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#581C4E] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-50">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DEC8] bg-[#FAF7F2] px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="text-left font-serif text-lg text-[#3B1637]"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('shop');
              }}
              className="text-left font-serif text-lg text-[#3B1637]"
            >
              Shop All Sarees
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('about');
              }}
              className="text-left font-serif text-lg text-[#3B1637]"
            >
              About Our Heritage
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('stores');
              }}
              className="text-left font-serif text-lg text-[#3B1637]"
            >
              Store Locations
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className="text-left font-serif text-lg text-[#3B1637]"
            >
              Contact Concierge
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('account');
              }}
              className="text-left font-serif text-lg text-[#3B1637]"
            >
              My Account & Orders
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('admin');
              }}
              className="text-left font-serif text-lg text-[#581C4E] font-semibold"
            >
              Admin Dashboard
            </button>
          </div>

          <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between text-xs text-[#845377]">
            <span>Current Role: {user.role}</span>
            <button
              onClick={toggleUserRole}
              className="text-[#581C4E] font-semibold underline"
            >
              Switch Role
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
