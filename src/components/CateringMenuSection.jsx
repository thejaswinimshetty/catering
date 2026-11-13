import React, { useState, useMemo } from 'react';
import { useCatering } from '../context/CateringContext';
import { CATERING_CATEGORIES } from '../data/cateringMenuData';
import { CATEGORY_IMAGES, getDishImage } from '../data/cateringMedia';
import { 
  Sparkles, 
  Search, 
  Check, 
  ChevronRight, 
  Plus, 
  X,
  BookOpen,
  MessageCircle
} from 'lucide-react';

export const CateringMenuSection = () => {
  const { 
    setInquiryModalOpen, 
    setSelectedPackageForQuote,
    categories,
    customDishes: selectedDishes, 
    setCustomDishes: setSelectedDishes, 
    toggleCustomDish: toggleDishSelection, 
    clearCustomDishes 
  } = useCatering();

  // Active Category State — null means nothing selected yet
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // All categories from dynamic context state
  const visibleCategories = categories || CATERING_CATEGORIES;

  // Active category — only set when user clicks one
  const activeCategory = useMemo(() => {
    if (!selectedCategoryId) return null;
    return (categories || CATERING_CATEGORIES).find(c => c.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  // Items to display (either matching active category or matching global search query)
  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const query = searchQuery.toLowerCase().trim();
    const results = [];
    (categories || CATERING_CATEGORIES).forEach(cat => {
      cat.items.forEach(dish => {
        if (dish.toLowerCase().includes(query) || cat.name.toLowerCase().includes(query)) {
          results.push({
            dish,
            categoryName: cat.name,
            categoryId: cat.id,
            page: cat.page
          });
        }
      });
    });
    return results;
  }, [searchQuery, isSearching]);

  // WhatsApp Inquiry with selected items
  const handleWhatsAppMenuInquiry = () => {
    const phone = "918073663774"; // Primary phone from menu page 16
    let message = `Hello South Delicious Catering! I explored your catering menu book.\n`;
    if (selectedDishes.length > 0) {
      message += `\nI have selected ${selectedDishes.length} dishes for our upcoming celebration:\n`;
      selectedDishes.forEach((item, idx) => {
        message += `${idx + 1}. ${item.name} (${item.category})\n`;
      });
      message += `\nPlease provide a customized catering quote and availability.`;
    } else {
      message += `\nI would like to inquire about your full catering packages and customize our menu.`;
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="catering-menu" className="py-16 sm:py-24 bg-[#fcfaf6] text-[#0b1a30] relative overflow-hidden border-b-2 border-[#dfc17b]/30">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#dfc17b]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#0b1a30]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b1a30] leading-tight">
            Explore Our <span className="gold-text-gradient">Catering Menu</span> By Category
          </h2>
        </div>

        {/* Global Search & Quick Actions Bar */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any dish (e.g. Masala Dosa, Faluda, Kaju Katli, Rasmalai, Naan, Halwa...)"
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border-2 border-[#dfc17b]/60 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#0b1a30] focus:ring-2 focus:ring-[#0b1a30]/20 shadow-md text-sm sm:text-base transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* SEARCH RESULTS VIEW (When search query is active) */}
        {isSearching ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfc17b]/40">
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#0b1a30]">
                Search Results for "<span className="text-[#b39352]">{searchQuery}</span>" ({searchResults.length} matches)
              </h3>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs sm:text-sm font-semibold text-[#0b1a30] hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#dfc17b]/40 p-8 shadow-sm">
                <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h4 className="font-royal text-lg font-bold text-stone-700 mb-1">No dishes found</h4>
                <p className="text-stone-500 text-sm">Try searching for something else or browse categories below.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {searchResults.map((result, idx) => {
                  const isSelected = selectedDishes.some(d => d.name === result.dish);
                  const dishImage = getDishImage(result.dish, result.categoryId);

                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleDishSelection(result.dish, result.categoryName)}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-gradient-to-b from-[#fcfaf6] to-[#f6f1e5] border-2 border-[#0b1a30] ring-2 ring-[#0b1a30] shadow-md transform -translate-y-1' 
                          : 'bg-white border-2 border-stone-200 hover:border-[#dfc17b] hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Dish Photo */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                        <img 
                          src={dishImage} 
                          alt={result.dish}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />

                        {/* Veg Badge */}
                        <div className="absolute top-2.5 left-2.5 w-4 h-4 border border-green-600 p-[2px] flex items-center justify-center rounded-sm bg-white shadow-md">
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                        </div>

                        {/* Selection Badge */}
                        <div className="absolute top-2.5 right-2.5">
                          <div 
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shadow-md ${
                              isSelected 
                                ? 'bg-[#0b1a30] text-[#f3e9d2] scale-110' 
                                : 'bg-white/90 text-stone-600 group-hover:bg-[#0b1a30] group-hover:text-[#f3e9d2]'
                            }`}
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3 flex flex-col flex-1 justify-between">
                        <div>
                          <h4 className="font-royal text-sm font-bold text-[#0b1a30] group-hover:text-[#b39352] transition-colors leading-snug line-clamp-2">
                            {result.dish}
                          </h4>
                          <span className="text-[11px] text-[#8e7235] font-medium block mt-1 line-clamp-1">
                            {result.categoryName} • {result.page}
                          </span>
                        </div>

                        <div className="mt-2 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-bold">
                          <span className={isSelected ? 'text-[#0b1a30]' : 'text-stone-500'}>
                            {isSelected ? '✓ Selected' : '+ Add'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* REGULAR CATEGORY EXPLORER VIEW */
          <div className="space-y-10">

            {/* 5 CATEGORIES IN 1 ROW WITH RELEVANT PHOTO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#0b1a30]">
                    Menu Categories
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0b1a30] text-[#f3e9d2]">
                    {visibleCategories.length} Categories
                  </span>
                </div>
                <span className="text-xs text-stone-500 font-medium hidden sm:inline-block">
                  Click any category to explore dishes below
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {visibleCategories.map((cat) => {
                  const isSelected = activeCategory?.id === cat.id;
                  const catImage = cat.image || CATEGORY_IMAGES[cat.id] || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80';
                  
                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryId(cat.id);
                        const element = document.getElementById('category-dishes-view');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0b1a30] text-white ring-4 ring-[#dfc17b] shadow-xl transform -translate-y-1'
                          : 'bg-white text-stone-800 border-2 border-stone-200/90 hover:border-[#dfc17b] hover:shadow-lg hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Category Photo Container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                        <img 
                          src={catImage}
                          alt={cat.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        
                        {/* Item Count Badge */}
                        <div className="absolute top-2.5 right-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold shadow-sm backdrop-blur-md ${
                            isSelected 
                              ? 'bg-[#dfc17b] text-[#0b1a30]' 
                              : 'bg-black/60 text-white'
                          }`}>
                            {cat.items.length} Items
                          </span>
                        </div>

                        {/* Selected Checkmark Badge */}
                        {isSelected && (
                          <div className="absolute top-2.5 left-2.5 bg-[#dfc17b] text-[#0b1a30] p-1 rounded-full shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Category Label */}
                      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                        <div>
                          <h4 className={`font-royal font-bold text-sm sm:text-base leading-snug line-clamp-2 ${
                            isSelected ? 'text-[#f3e9d2]' : 'text-[#0b1a30] group-hover:text-[#b39352]'
                          }`}>
                            {cat.name}
                          </h4>
                          <p className={`text-[11px] mt-1 line-clamp-1 ${
                            isSelected ? 'text-stone-300' : 'text-stone-500'
                          }`}>
                            {cat.page}
                          </p>
                        </div>

                        <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[11px] font-semibold ${
                          isSelected ? 'border-[#dfc17b]/40' : 'border-stone-200/60'
                        }`}>
                          <span className={isSelected ? 'text-[#f3e9d2]' : 'text-stone-600'}>
                            {isSelected ? 'Viewing Options' : 'View Options'}
                          </span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                            isSelected ? 'text-[#f3e9d2]' : 'text-stone-400'
                          }`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE CATEGORY OPTIONS SHOWCASE (5 OPTIONS IN 1 ROW WITH SUITABLE PHOTO) */}
            {activeCategory && (
              <div 
                id="category-dishes-view" 
                className="bg-white rounded-3xl border-2 border-[#dfc17b] shadow-xl p-5 sm:p-8 space-y-6 scroll-mt-24 animate-fadeIn"
              >
                
                {/* Active Category Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-[#dfc17b]/30">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-[#f5eedd] text-[#8e7235] text-xs font-bold border border-[#dfc17b]/40">
                        {activeCategory.page} of Menu Book
                      </span>
                      <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">
                        {activeCategory.items.length} Delicacies in {activeCategory.name}
                      </span>
                    </div>

                    <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#0b1a30]">
                      {activeCategory.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
                      {activeCategory.description}
                    </p>
                  </div>

                  {/* Select All in this category action */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const allSelected = activeCategory.items.every(dish => 
                          selectedDishes.some(d => d.name === dish)
                        );
                        if (allSelected) {
                          setSelectedDishes(prev => 
                            prev.filter(d => !activeCategory.items.includes(d.name))
                          );
                        } else {
                          const newToAdd = activeCategory.items
                            .filter(dish => !selectedDishes.some(d => d.name === dish))
                            .map(dish => ({ name: dish, category: activeCategory.name }));
                          setSelectedDishes(prev => [...prev, ...newToAdd]);
                        }
                      }}
                      className="text-xs font-bold text-[#0b1a30] hover:text-[#b39352] bg-[#fcfaf6] hover:bg-[#f5eedd] border border-[#dfc17b]/50 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                      {activeCategory.items.every(dish => selectedDishes.some(d => d.name === dish))
                        ? 'Deselect Category Items'
                        : 'Select All in Category'}
                    </button>
                  </div>
                </div>

                {/* 5 Options in 1 Row with Suitable Picture */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                  {activeCategory.items.map((dishName, idx) => {
                    const isSelected = selectedDishes.some(d => d.name === dishName);
                    const dishImage = getDishImage(dishName, activeCategory.id);

                    return (
                      <div 
                        key={idx}
                        onClick={() => toggleDishSelection(dishName, activeCategory.name)}
                        className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                          isSelected 
                            ? 'bg-gradient-to-b from-[#fcfaf6] to-[#f6f1e5] border-2 border-[#0b1a30] ring-2 ring-[#0b1a30] shadow-md transform -translate-y-1' 
                            : 'bg-[#fcfaf6]/70 hover:bg-white border-2 border-stone-200 hover:border-[#dfc17b] hover:shadow-md hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Food Image Container */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                          <img 
                            src={dishImage} 
                            alt={dishName}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />

                          {/* Indian Veg Badge */}
                          <div className="absolute top-2.5 left-2.5 w-4 h-4 border border-green-600 p-[2px] flex items-center justify-center rounded-sm bg-white shadow-md">
                            <div className="w-2 h-2 rounded-full bg-green-600"></div>
                          </div>

                          {/* Selection Check Badge */}
                          <div className="absolute top-2.5 right-2.5">
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shadow-md ${
                                isSelected 
                                  ? 'bg-[#0b1a30] text-[#f3e9d2] scale-110' 
                                  : 'bg-white/90 text-stone-600 group-hover:bg-[#0b1a30] group-hover:text-[#f3e9d2]'
                              }`}
                            >
                              {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        </div>

                        {/* Dish Details */}
                        <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                          <div>
                            <h4 className="font-royal text-sm sm:text-base font-bold text-[#0b1a30] group-hover:text-[#b39352] transition-colors leading-snug line-clamp-2">
                              {dishName}
                            </h4>
                            <p className="text-[11px] text-stone-500 mt-1 font-medium">
                              Pure Veg Delicacy
                            </p>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between">
                            <span className={`text-[11px] font-bold ${
                              isSelected ? 'text-[#0b1a30]' : 'text-stone-500 group-hover:text-[#0b1a30]'
                            }`}>
                              {isSelected ? '✓ Selected' : '+ Add to Feast'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

          </div>
        )}

        {/* BOTTOM CALL TO ACTION & SELECTED DISHES BANNER */}
        <div className="mt-14 bg-gradient-to-r from-[#0b1a30] via-[#132a48] to-[#071224] rounded-3xl p-6 sm:p-10 border-2 border-[#dfc17b] text-[#fcfaf6] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfc17b]/20 text-[#f3e9d2] text-xs font-bold border border-[#dfc17b]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#ebd5a7]" />
                <span>
                  {selectedDishes.length > 0 
                    ? `${selectedDishes.length} Dishes Selected for Your Feast` 
                    : 'Personalize Your Catering Menu'}
                </span>
              </div>
              <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#fcfaf6]">
                Ready to Plan Your Authentic Feast?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                Speak directly with Chef Ishwar and our banquet coordinators to customize plate pricing, live counters, and service for your auspicious day.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
              {/* WhatsApp Quote with selected dishes */}
              <button
                onClick={handleWhatsAppMenuInquiry}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp {selectedDishes.length > 0 && `(${selectedDishes.length})`}</span>
              </button>

              {/* Booking & Quote Modal Button */}
              <button
                onClick={() => {
                  setSelectedPackageForQuote({ name: 'Custom Tailored Menu' });
                  setInquiryModalOpen(true);
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#dfc17b] to-[#e8c868] hover:from-[#cbb079] hover:to-[#dfc17b] text-[#0b1a30] font-extrabold text-sm shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Selected Dishes Pill Drawer (if any items selected) */}
          {selectedDishes.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#dfc17b]/30">
              <div className="flex items-center justify-between mb-3 text-xs text-[#f3e9d2] font-bold">
                <span>Your Selected Menu Items ({selectedDishes.length}):</span>
                <button 
                  onClick={() => setSelectedDishes([])}
                  className="text-stone-300 hover:text-white underline cursor-pointer"
                >
                  Clear Selection
                </button>
              </div>

              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-[#dfc17b]/40 pr-2">
                {selectedDishes.map((item, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs border border-white/20 backdrop-blur-sm"
                  >
                    <span>{item.name}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDishSelection(item.name, item.category);
                      }}
                      className="text-stone-300 hover:text-red-400 p-0.5 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
