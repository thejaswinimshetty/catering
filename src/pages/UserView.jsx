import React from 'react';
import { useCatering } from '../context/CateringContext';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { PackagesSection } from '../components/PackagesSection';
import { ProductsSection } from '../components/ProductsSection';
import { GallerySection } from '../components/GallerySection';
import { PortfolioSection } from '../components/PortfolioSection';
import { Footer } from '../components/Footer';
import { InquiryModal } from '../components/InquiryModal';
import { CartDrawer } from '../components/CartDrawer';

export const UserView = () => {
  const { activeTab } = useCatering();

  return (
    <div className="min-h-screen bg-[#faf6ee] text-[#1c2e26] flex flex-col justify-between selection:bg-[#d4af37] selection:text-[#0d2e24]">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* Brand Information Hero */}
            <Hero />
            
            {/* About Section is kept right on the homepage as requested */}
            <AboutSection />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="animate-fadeIn">
            <PackagesSection />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="animate-fadeIn">
            <GallerySection />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="animate-fadeIn">
            <ProductsSection />
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="animate-fadeIn">
            <PortfolioSection />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <InquiryModal />
      <CartDrawer />
    </div>
  );
};
