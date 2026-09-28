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
  SlidersHorizontal,
  BookOpen,
  Phone,
  Search,
  CheckCircle2
} from 'lucide-react';
import { MenuCustomizerModal } from './MenuCustomizerModal';
import { MASTER_MENU } from '../data/initialData';

/* ─── Categorized Menu Definitions ─────────────────────────────────── */
const FULL_MENU_CATEGORIES = [
  {
    key: 'welcomeDrinks',
    number: '01',
    title: 'Welcome Drinks & Coolers',
    subtitle: 'Refreshing arrival beverages, herbal decoctions & traditional theerthams',
    icon: Wine,
    accent: '#2563eb',
    badgeBg: 'bg-blue-900/10 text-blue-900 border-blue-200',
    headerGradient: 'from-[#0d2e24] via-[#164436] to-[#0d2e24]',
    items: MASTER_MENU.welcomeDrinks
  },
  {
    key: 'starters',
    number: '02',
    title: 'Starters & Crispy Appetizers',
    subtitle: 'Freshly fried vadai, tawa roasts, cutlets & savory South Indian delicacies',
    icon: Utensils,
    accent: '#d97706',
    badgeBg: 'bg-amber-900/10 text-amber-900 border-amber-200',
    headerGradient: 'from-[#1a382b] via-[#224b3b] to-[#1a382b]',
    items: MASTER_MENU.starters
  },
  {
    key: 'mainCourse',
    number: '03',
    title: 'Main Course & Banana Leaf Delicacies',
    subtitle: 'Seeraga Samba pulao, arachivitta sambar, rasam, usili, poriyal, breads & live stations',
    icon: Soup,
    accent: '#059669',
    badgeBg: 'bg-emerald-900/10 text-emerald-900 border-emerald-200',
    headerGradient: 'from-[#0d2e24] via-[#1a4435] to-[#0d2e24]',
    items: MASTER_MENU.mainCourse
  },
  {
    key: 'desserts',
    number: '04',
    title: 'Desserts, Sweets & Brass Filter Kaapi',
    subtitle: 'Slow-cooked payasams, pure desi ghee halwas, traditional laddoos & degree filter coffee',
    icon: IceCream,
    accent: '#e11d48',
    badgeBg: 'bg-rose-900/10 text-rose-900 border-rose-200',
    headerGradient: 'from-[#1c2e25] via-[#2a4538] to-[#1c2e25]',
    items: MASTER_MENU.desserts
  }
];

/* ─── Full Menu View ───────────────────────────────────────────────── */
const FullMenuView = ({ onOpenCustomizer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const filteredCategories = FULL_MENU_CATEGORIES.map(cat => {
    if (activeCategoryFilter !== 'all' && activeCategoryFilter !== cat.key) {
      return { ...cat, items: [] };
    }
    const filteredItems = cat.items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    return { ...cat, items: filteredItems };
  }).filter(cat => cat.items.length > 0);

  const totalItemsCount = FULL_MENU_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="space-y-10">
      {/* Menu Showcase Banner */}
      <div className="bg-[#0d2e24] text-[#faf5ea] rounded-3xl border-2 border-[#d4af37] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#faf5ea]/10 border border-[#d4af37]/40 text-[#f5d77f] text-xs uppercase tracking-widest font-bold">
              <BookOpen className="w-3.5 h-3.5 text-[#e5c158]" />
              <span>South Delicious Authentic Master Menu • {totalItemsCount}+ Items</span>
            </div>
            <h3 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#fffdf7]">
              Complete Menu: <span className="gold-text-gradient">Welcome Drinks to Desserts</span>
            </h3>
            <p className="text-sm text-[#e2d8c3] max-w-2xl font-normal leading-relaxed">
              Explore our exhaustive repertoire of pure vegetarian culinary delights. Every dish is crafted with fresh native ingredients, pure desi ghee, and generational South Indian recipes.
            </p>
          </div>

          <button
            onClick={() => onOpenCustomizer(null)}
            className="gold-button-gradient font-bold px-7 py-3.5 rounded-2xl text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2.5 shrink-0 cursor-pointer text-[#0d2e24]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#0d2e24]" />
            <span>Customize & Pick Items</span>
          </button>
        </div>
      </div>

      {/* Search and Category Quick-Switch Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#d4af37]/40 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#996e14] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Payasam, Vada, Pulao)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#faf6ee] border border-[#d4af37]/50 rounded-xl text-xs sm:text-sm text-[#0d2e24] placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Quick Sub-Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#0d2e24] text-[#f5d77f] border border-[#d4af37]'
                  : 'bg-[#faf6ee] text-stone-700 hover:text-[#0d2e24] border border-stone-200'
              }`}
            >
              All Courses ({totalItemsCount})
            </button>
            {FULL_MENU_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategoryFilter(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === cat.key
                    ? 'bg-[#0d2e24] text-[#f5d77f] border border-[#d4af37]'
                    : 'bg-[#faf6ee] text-stone-700 hover:text-[#0d2e24] border border-stone-200'
                }`}
              >
                {cat.title.split('&')[0]} ({cat.items.length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categorized Dishes Cards */}
      <div className="space-y-8">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div 
              key={cat.key}
              className="bg-white rounded-3xl border-2 border-[#d4af37]/50 overflow-hidden shadow-xl"
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${cat.headerGradient} text-[#faf5ea] px-6 py-5 border-b-2 border-[#d4af37]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#faf5ea]/10 border border-[#d4af37] flex items-center justify-center text-[#f5d77f] shrink-0 shadow">
                    <Icon className="w-5 h-5 text-[#f5d77f]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#f5d77f] font-bold">
                      Course {cat.number}
                    </div>
                    <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-white">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-[#cfc5b0] hidden sm:block mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-[#ffffff]/10 border border-[#d4af37]/40 text-[#f5d77f] text-xs font-bold shrink-0">
                    {cat.items.length} Delicacies
                  </span>
                  <button
                    onClick={() => onOpenCustomizer(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#d4af37] hover:bg-[#c59b27] text-[#0d2e24] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Select</span>
                  </button>
                </div>
              </div>

              {/* Items Grid */}
              <div className="p-6 sm:p-8 bg-[#faf8f2]/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3.5 rounded-2xl border border-[#d4af37]/40 hover:border-[#d4af37] transition-all hover:shadow-md flex items-start gap-3 group"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#0d2e24] text-[#f5d77f] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-semibold text-[#1a2e26] group-hover:text-[#0d2e24] leading-snug">
                          {item}
                        </span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37]/50 group-hover:text-[#c59b27] shrink-0 mt-0.5 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-[#d4af37]/40 p-8 space-y-3">
            <Soup className="w-12 h-12 text-[#996e14] mx-auto opacity-60" />
            <h4 className="font-royal text-xl font-bold text-[#0d2e24]">No dishes matched "{searchTerm}"</h4>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Try searching with common terms like "Vada", "Payasam", "Rasam", "Pulao", or clear your search to view all {totalItemsCount}+ dishes.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategoryFilter('all'); }}
              className="mt-2 px-5 py-2 rounded-full text-xs font-bold text-[#0d2e24] bg-[#faf5eb] border border-[#d4af37] hover:bg-[#efe5d0] transition-colors cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom Customization Callout */}
      <div className="bg-gradient-to-r from-[#faf2e1] via-[#fff9ed] to-[#faf2e1] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#996e14]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Create Your Own Custom Feast?</span>
          </div>
          <h4 className="font-royal text-2xl font-extrabold text-[#0d2e24]">
            Select Your Preferred Items & Get Instant Quote
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 max-w-xl">
            Choose exactly what drinks, starters, main courses, and desserts you want served at your event. We will tailor the per-plate pricing specifically for you!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => onOpenCustomizer(null)}
            className="gold-button-gradient font-bold px-7 py-3.5 rounded-2xl text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer text-[#0d2e24]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Open Menu Builder</span>
          </button>
          <a
            href="tel:7795533507"
            className="px-6 py-3.5 rounded-2xl text-sm font-bold text-[#0d2e24] bg-white border-2 border-[#d4af37] hover:bg-[#fbf7ee] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#c59b27]" />
            <span>Call 77955 33507</span>
          </a>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Packages Section ────────────────────────────────────────── */
export const PackagesSection = () => {
  const { packages, openQuoteModalForPackage } = useCatering();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');
  const [customizerPkg, setCustomizerPkg] = useState(null); // null = closed

  // Filter tags including the requested Full Menu option
  const filterTags = [
    { id: 'all', label: 'All Packages' },
    { id: 'wedding', label: 'Weddings & Receptions' },
    { id: 'satvik', label: 'Pooja & Satvik' },
    { id: 'corporate', label: 'Corporate & High-Tea' },
    { id: 'full-menu', label: '🍽️ Full Menu (Drinks to Desserts)' },
  ];

  const filteredPackages = packages.filter(pkg => {
    if (selectedCategoryTab === 'all') return true;
    if (selectedCategoryTab === 'wedding') return pkg.tag?.toLowerCase().includes('wedding') || pkg.tag?.toLowerCase().includes('reception');
    if (selectedCategoryTab === 'satvik') return pkg.tag?.toLowerCase().includes('satvik') || pkg.name.toLowerCase().includes('pooja');
    if (selectedCategoryTab === 'corporate') return pkg.tag?.toLowerCase().includes('corporate') || pkg.name.toLowerCase().includes('high-tea');
    return true;
  });

  const isFullMenuTab = selectedCategoryTab === 'full-menu';

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#faf6ee] text-[#1c2e26] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0d2e24]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0d2e24] text-[#f5d77f] text-xs uppercase tracking-widest font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>Curated Culinary Experiences • Pure Veg Since 2014</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2e24]">
            {isFullMenuTab ? (
              <>Complete <span className="gold-text-gradient">Master Menu</span></>
            ) : (
              <>Royal South Indian <span className="gold-text-gradient">Catering Packages</span></>
            )}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            {isFullMenuTab ? (
              "Browse our full menu covering all courses from welcome drinks and starters to royal banana leaf main course and divine sweets. Pick items to customize your event."
            ) : (
              "Every package is meticulously designed to present an all-inclusive feast with authentic welcome drinks, crisp starters, rich main course banquets, and divine desserts."
            )}
          </p>
        </div>

        {/* Filter Badges — includes the Full Menu tab */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {filterTags.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategoryTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategoryTab === tab.id
                  ? 'bg-[#0d2e24] text-[#f5d77f] shadow-lg border-2 border-[#d4af37] scale-105'
                  : 'bg-[#ffffff] text-stone-700 hover:text-[#0d2e24] border-2 border-[#d4af37]/40 hover:border-[#d4af37] shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Conditional View: Full Menu or Packages Grid ── */}
        {isFullMenuTab ? (
          <FullMenuView onOpenCustomizer={(pkg) => setCustomizerPkg(pkg || {})} />
        ) : (
          <>
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
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  onClick={() => setSelectedCategoryTab('full-menu')}
                  className="px-6 py-3.5 rounded-full font-bold text-sm bg-white/10 hover:bg-white/20 text-[#f5d77f] border border-[#d4af37]/60 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#e5c158]" />
                  <span>Browse Full Menu</span>
                </button>
                <button
                  onClick={() => setCustomizerPkg({})}
                  className="px-8 py-3.5 rounded-full font-bold text-sm gold-button-gradient shadow-xl hover:scale-105 transition-transform cursor-pointer text-[#0d2e24]"
                >
                  Design Custom Menu
                </button>
              </div>
            </div>
          </>
        )}

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
