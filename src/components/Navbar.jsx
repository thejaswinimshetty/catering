import React, { useState } from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Lock, 
  ChevronRight 
} from 'lucide-react';

export const Navbar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsAdminMode, 
    cart, 
    setIsCartOpen, 
    setInquiryModalOpen
  } = useCatering();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Packages' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'products', label: 'Artisanal Products' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d2e24] text-[#faf5ea] border-b-2 border-[#d4af37]/60 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-[#d4af37] shadow-md group-hover:scale-105 transition-transform duration-300 ring-2 ring-[#d4af37]/40 bg-[#082019]">
              <img 
                src="/logo.jpg" 
                alt="South Delicious Catering Logo" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-royal text-xl sm:text-2xl font-bold tracking-wide text-[#fffdf7] group-hover:text-[#f3d37a] transition-colors">
                South Delicious Catering
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer relative ${
                    isActive 
                      ? 'text-[#0d2e24] bg-[#faf5eb] border border-[#d4af37] shadow-md' 
                      : 'text-[#f0e7d8] hover:text-[#f3d37a] hover:bg-[#134234]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#d4af37] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-[#f3d37a] hover:bg-[#144436] border border-[#d4af37]/40 transition-all cursor-pointer bg-[#0a261e]"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Request Quote Button */}
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="gold-button-gradient font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-[#d4af37]/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book Catering</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Admin Portal Toggle (Discreet) */}
            <button
              onClick={() => setIsAdminMode(true)}
              className="p-2 text-stone-300 hover:text-[#f3d37a] hover:bg-[#144436] rounded-full border border-stone-600/50 transition-all cursor-pointer"
              title="Admin Portal (Management)"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu & Cart Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#f3d37a]"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#faf5ea] hover:text-[#f3d37a] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a261e] border-b border-[#d4af37]/40 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                  isActive 
                    ? 'text-[#0d2e24] bg-[#faf5eb] border-l-4 border-[#d4af37]' 
                    : 'text-[#f0e7d8] hover:bg-[#134234]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-[#0d2e24]" />}
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-emerald-900/50 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setInquiryModalOpen(true);
              }}
              className="w-full gold-button-gradient font-bold py-3 rounded-lg text-center"
            >
              Book Catering / Get Quote
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminMode(true);
              }}
              className="w-full text-center text-xs text-stone-300 hover:text-[#f3d37a] py-2 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
