import React, { useState } from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  Sparkles, 
  Users, 
  Wine, 
  Utensils, 
  Soup, 
  IceCream, 
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { MenuCustomizerModal } from './MenuCustomizerModal';

export const PackagesSection = () => {
  const { packages, openQuoteModalForPackage } = useCatering();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');
  const [customizerPkg, setCustomizerPkg] = useState(null); // null = modal closed

  const filterTags = [
    { id: 'all', label: 'All Packages' },
    { id: 'wedding', label: 'Weddings & Receptions' },
    { id: 'satvik', label: 'Pooja & Satvik' },
    { id: 'corporate', label: 'Corporate & High-Tea' },
  ];

  const filteredPackages = packages.filter(pkg => {
    if (selectedCategoryTab === 'all') return true;
    if (selectedCategoryTab === 'wedding') return pkg.tag?.toLowerCase().includes('wedding') || pkg.tag?.toLowerCase().includes('reception');
    if (selectedCategoryTab === 'satvik') return pkg.tag?.toLowerCase().includes('satvik') || pkg.name.toLowerCase().includes('pooja');
    if (selectedCategoryTab === 'corporate') return pkg.tag?.toLowerCase().includes('corporate') || pkg.name.toLowerCase().includes('high-tea');
    return true;
  });

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#faf6ee] text-[#1c2e26] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0d2e24]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0d2e24] text-[#f5d77f] text-xs uppercase tracking-widest font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>Curated Culinary Experiences</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2e24]">
            Royal South Indian <span className="gold-text-gradient">Catering Packages</span>
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Every package is meticulously designed to present an all-inclusive feast with authentic welcome drinks, crisp starters, rich main course banquets, and divine desserts.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {filterTags.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategoryTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategoryTab === tab.id
                  ? 'bg-[#0d2e24] text-[#f5d77f] shadow-md border-2 border-[#d4af37] scale-105'
                  : 'bg-[#ffffff] text-stone-700 hover:text-[#0d2e24] border-2 border-[#d4af37]/40 hover:border-[#d4af37]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Packages Cards Grid in Warm Cream & Gold */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`rounded-3xl overflow-hidden bg-[#ffffff] border-2 transition-all duration-300 flex flex-col shadow-xl relative ${
                pkg.popular 
                  ? 'border-[#d4af37] shadow-[0_10px_35px_rgba(212,175,55,0.25)] ring-2 ring-[#d4af37]/30' 
                  : 'border-[#d4af37]/50 hover:border-[#d4af37]'
              }`}
            >
              {/* Popular / Special Tag */}
              {pkg.tag && (
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#0d2e24] text-xs font-extrabold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#0d2e24]" />
                  <span>{pkg.tag}</span>
                </div>
              )}

              {/* Package Banner Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img 
                  src={pkg.image || "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=900&q=80"} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                {/* Price Tag Overlay in Warm Cream */}
                <div className="absolute bottom-4 right-4 bg-[#faf5ea]/95 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#d4af37] text-right shadow-lg">
                  <div className="text-[10px] uppercase tracking-wider text-stone-600 font-bold">Starting at</div>
                  <div className="font-royal text-xl sm:text-2xl font-extrabold text-[#0d2e24]">
                    ₹{pkg.pricePerPlate} <span className="text-xs font-medium text-stone-600">/ plate</span>
                  </div>
                </div>

                {/* Min Guests */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <Users className="w-3.5 h-3.5 text-[#f5d77f]" />
                  <span>Min {pkg.minGuests} Guests</span>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                
                <div>
                  <h3 className="font-royal text-2xl font-bold text-[#0d2e24] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#996e14] font-bold mb-3">
                    {pkg.subtitle}
                  </p>
                  <p className="text-sm text-stone-600 font-normal leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* 4 Pillars of Menu Items */}
                  <div className="space-y-4 pt-2 border-t border-[#d4af37]/30">
                    
                    {/* Welcome Drinks */}
                    {pkg.welcomeDrinks && pkg.welcomeDrinks.length > 0 && (
                      <div className="bg-[#fbf8f0] p-4 rounded-2xl border border-[#d4af37]/40">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d2e24] mb-2.5">
                          <Wine className="w-4 h-4 text-[#c59b27]" />
                          <span>1. Welcome Drinks & Coolers</span>
                          <span className="text-[10px] text-stone-500 font-normal">({pkg.welcomeDrinks.length} Items)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {pkg.welcomeDrinks.map((drink, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-stone-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                              <span>{drink}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Starters */}
                    {pkg.starters && pkg.starters.length > 0 && (
                      <div className="bg-[#fbf8f0] p-4 rounded-2xl border border-[#d4af37]/40">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d2e24] mb-2.5">
                          <Utensils className="w-4 h-4 text-[#c59b27]" />
                          <span>2. Starters & Sizzling Appetizers</span>
                          <span className="text-[10px] text-stone-500 font-normal">({pkg.starters.length} Items)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {pkg.starters.map((starter, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-stone-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                              <span>{starter}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Main Course */}
                    {pkg.mainCourse && pkg.mainCourse.length > 0 && (
                      <div className="bg-[#fbf8f0] p-4 rounded-2xl border border-[#d4af37]/40">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d2e24] mb-2.5">
                          <Soup className="w-4 h-4 text-[#c59b27]" />
                          <span>3. Main Course Banana Leaf / Buffet Spread</span>
                          <span className="text-[10px] text-stone-500 font-normal">({pkg.mainCourse.length} Delicacies)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {pkg.mainCourse.map((dish, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-stone-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1 shrink-0"></span>
                              <span>{dish}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Desserts & Filter Kaapi */}
                    {pkg.desserts && pkg.desserts.length > 0 && (
                      <div className="bg-[#fbf8f0] p-4 rounded-2xl border border-[#d4af37]/40">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d2e24] mb-2.5">
                          <IceCream className="w-4 h-4 text-[#c59b27]" />
                          <span>4. Desserts, Sweets & Filter Coffee</span>
                          <span className="text-[10px] text-stone-500 font-normal">({pkg.desserts.length} Sweets)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {pkg.desserts.map((dessert, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-stone-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                              <span>{dessert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => openQuoteModalForPackage(pkg)}
                    className="w-full sm:flex-1 gold-button-gradient font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <span>Book / Request Quote</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCustomizerPkg(pkg)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold text-[#0d2e24] bg-white border-2 border-[#d4af37] hover:bg-[#faf5eb] hover:border-[#c59b27] transition-all cursor-pointer shadow-sm"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-[#c59b27]" />
                    <span>Customize Menu</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Menu Requests in Deep Emerald & Gold */}
        <div className="mt-16 bg-[#0d2e24] text-[#faf5ea] p-8 sm:p-10 rounded-3xl border-2 border-[#d4af37] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-royal text-2xl font-bold text-[#fffdf7]">Need A Completely Tailored Menu?</h3>
            <p className="text-sm text-[#f0e7d8] max-w-xl">
              We specialize in custom curation! Tell us your family traditions, native regional items, or specific Brahminical / Jain satvik dietary preferences.
            </p>
          </div>
          <button
            onClick={() => setCustomizerPkg({})}
            className="px-8 py-3.5 rounded-full font-bold text-sm gold-button-gradient shadow-xl hover:scale-105 transition-transform shrink-0 cursor-pointer"
          >
            Design Custom Menu
          </button>
        </div>

      </div>

      {/* ── Menu Customizer Modal ── */}
      {customizerPkg !== null && (
        <MenuCustomizerModal
          pkg={Object.keys(customizerPkg).length === 0 ? null : customizerPkg}
          onClose={() => setCustomizerPkg(null)}
        />
      )}

    </section>
  );
};
