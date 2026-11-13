import React from 'react';
import { useCatering } from '../context/CateringContext';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CateringMenuSection } from '../components/CateringMenuSection';
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
    <div className="min-h-screen bg-[#fcfaf6] text-[#0b1a30] flex flex-col justify-between selection:bg-[#dfc17b] selection:text-[#0b1a30]">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* Brand Information Hero */}
            <Hero />
            
            {/* Authentic Catering Menu Book Section with Categories & Dish Options */}
            <CateringMenuSection />
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="animate-fadeIn">
            <CateringMenuSection />
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
