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
    { id: 'menu', label: 'Catering Menu' },
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
    <header className="sticky top-0 z-40 bg-[#0b1a30] text-[#fcfaf6] border-b-2 border-[#dfc17b]/60 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Logo — circular badge filled properly */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#dfc17b] shadow-lg group-hover:scale-105 transition-transform duration-300 ring-2 ring-[#dfc17b]/40 bg-white flex items-center justify-center shrink-0">
              <img 
                src="/logo.jpg" 
                alt="South Delicious Catering Logo" 
                className="w-full h-full object-cover scale-105"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-royal text-xl sm:text-2xl font-bold tracking-wide text-[#fcfaf6] group-hover:text-[#ebd5a7] transition-colors">
                South Delicious Catering
              </span>
              <span className="text-[11px] text-[#dfc17b] font-medium tracking-widest uppercase hidden sm:block">
                Pure Veg • Since 2014
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
                      ? 'text-[#0b1a30] bg-[#fcfaf6] border border-[#dfc17b] shadow-md' 
                      : 'text-[#e8dfce] hover:text-[#ebd5a7] hover:bg-[#132a48]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#dfc17b] rounded-full" />
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
              className="relative p-2.5 rounded-full text-[#ebd5a7] hover:bg-[#132a48] border border-[#dfc17b]/40 transition-all cursor-pointer bg-[#071224]"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Request Quote Button */}
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="gold-button-gradient font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book Catering</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu & Cart Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#ebd5a7]"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#fcfaf6] hover:text-[#ebd5a7] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071224] border-b border-[#dfc17b]/40 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                  isActive 
                    ? 'text-[#0b1a30] bg-[#fcfaf6] border-l-4 border-[#dfc17b]' 
                    : 'text-[#e8dfce] hover:bg-[#132a48]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-[#0b1a30]" />}
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-[#132a48] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setInquiryModalOpen(true);
              }}
              className="w-full gold-button-gradient font-bold py-3 rounded-lg text-center"
            >
              Book Catering / Get Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
