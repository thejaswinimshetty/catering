import React, { useState, useEffect, useMemo } from 'react';
import { useCatering } from '../context/CateringContext';
import { CATERING_CATEGORIES, MENU_GROUPS } from '../data/cateringMenuData';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  User, 
  Utensils, 
  CheckCircle,
  MessageSquare,
  Check,
  Plus,
  Search,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ListPlus
} from 'lucide-react';

export const InquiryModal = () => {
  const { 
    inquiryModalOpen, 
    setInquiryModalOpen, 
    selectedPackageForQuote, 
    setSelectedPackageForQuote,
    packages,
    addInquiry,
    customDishes,
    toggleCustomDish,
    clearCustomDishes,
    categories,
    companyInfo
  } = useCatering();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding Reception',
    guestCount: '250',
    selectedPackage: 'Custom Tailored Menu',
    eventDate: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [createdInquiryId, setCreatedInquiryId] = useState(null);

  // Custom Dish Picker state
  const [showDishPicker, setShowDishPicker] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState('all');
  const [dishSearch, setDishSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    if (selectedPackageForQuote) {
      setFormData(prev => ({
        ...prev,
        selectedPackage: selectedPackageForQuote.name
      }));
      // If opened for custom menu, auto-open the dish picker if no dishes selected yet
      if (selectedPackageForQuote.name === 'Custom Tailored Menu' && customDishes.length === 0) {
        setShowDishPicker(true);
      }
    } else if (packages.length > 0 && !formData.selectedPackage) {
      setFormData(prev => ({
        ...prev,
        selectedPackage: packages[0].name
      }));
    }
  }, [selectedPackageForQuote, packages]);

  // Filtered categories for dish picker
  const filteredCategories = useMemo(() => {
    let cats = categories || CATERING_CATEGORIES;
    if (selectedGroupId !== 'all') {
      cats = cats.filter(c => c.group === selectedGroupId);
    }
    if (dishSearch.trim().length > 0) {
      const q = dishSearch.toLowerCase().trim();
      cats = cats.map(cat => ({
        ...cat,
        items: cat.items.filter(dish => 
          dish.toLowerCase().includes(q) || cat.name.toLowerCase().includes(q)
        )
      })).filter(cat => cat.items.length > 0);
    }
    return cats;
  }, [selectedGroupId, dishSearch]);

  if (!inquiryModalOpen) return null;

  const isCustomPackage = formData.selectedPackage === 'Custom Tailored Menu';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    const created = addInquiry({
      ...formData,
      customDishes: isCustomPackage ? customDishes : []
    });
    setCreatedInquiryId(created.id);
    setSubmitted(true);
  };

  const handleClose = () => {
    setInquiryModalOpen(false);
    setSubmitted(false);
    setSelectedPackageForQuote(null);
    setShowDishPicker(false);
  };

  // WhatsApp Message Formatter for Custom Package
  const handleWhatsAppSend = () => {
    const phone = "918073663774";
    let message = `*🍽️ Custom Tailored Catering Inquiry — South Delicious Catering*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Name:* ${formData.name || 'Valued Customer'}\n`;
    message += `*Contact:* ${formData.phone}\n`;
    message += `*Occasion:* ${formData.eventType}\n`;
    message += `*Guests:* ${formData.guestCount} plates\n`;
    if (formData.eventDate) message += `*Event Date:* ${formData.eventDate}\n`;
    if (formData.notes) message += `*Special Notes:* ${formData.notes}\n`;

    if (customDishes.length > 0) {
      message += `\n*✨ Custom Selected Dishes (${customDishes.length} Items):*\n`;
      // Group dishes by category
      const grouped = {};
      customDishes.forEach(item => {
        const cat = item.category || 'General';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(item.name);
      });
      Object.keys(grouped).forEach(cat => {
        message += `\n*• ${cat}:*\n`;
        grouped[cat].forEach(d => {
          message += `   - ${d}\n`;
        });
      });
    } else {
      message += `\n_Package:_ Custom Tailored Menu (Please share suggestions & quote)\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Please provide customized plate pricing and banquet availability. Thank you! 🙏`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const toggleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${isCustomPackage && showDishPicker ? 'max-w-4xl' : 'max-w-2xl'} bg-[#fcfaf6] rounded-3xl border-2 border-[#dfc17b] shadow-2xl p-5 sm:p-8 text-[#0b1a30] max-h-[92vh] overflow-y-auto transition-all duration-300`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-[#0b1a30] p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation Screen */
          <div className="text-center py-6 sm:py-8 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#0b1a30] border-2 border-[#dfc17b] text-[#f3e9d2] flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle className="w-10 h-10 text-[#dfc17b]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-widest text-[#8e7235] font-bold">Inquiry & Custom Package Received</span>
              <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#0b1a30]">
                Thank You, {formData.name}!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Your custom package inquiry has been logged with South Delicious Catering. Reference ID: <span className="font-mono text-[#8e7235] font-bold">{createdInquiryId}</span>.
              </p>
            </div>

            {/* Inquiry Summary Box */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dfc17b]/50 text-left text-xs space-y-2 max-w-lg mx-auto shadow-sm">
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-semibold">Package Selected:</span>
                <span className="text-[#0b1a30] font-bold">{formData.selectedPackage}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-semibold">Occasion:</span>
                <span className="text-[#0b1a30] font-bold">{formData.eventType}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-semibold">Estimated Guests:</span>
                <span className="text-[#0b1a30] font-bold">{formData.guestCount} Plates</span>
              </div>
              {formData.eventDate && (
                <div className="flex justify-between border-b border-stone-200/60 pb-2">
                  <span className="text-stone-500 font-semibold">Event Date:</span>
                  <span className="text-[#0b1a30] font-bold">{formData.eventDate}</span>
                </div>
              )}

              {/* Custom Dishes Breakdown */}
              {isCustomPackage && customDishes.length > 0 && (
                <div className="pt-2">
                  <div className="font-bold text-[#0b1a30] mb-2 flex items-center justify-between">
                    <span>Selected Custom Dishes ({customDishes.length}):</span>
                    <span className="text-[10px] text-[#8e7235] font-normal">Authentic Pure Veg</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {customDishes.map((dish, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-[#f6f1e5] border border-[#dfc17b]/50 text-[#0b1a30] text-[11px] font-medium">
                        {dish.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Our Head Banquet Manager will call you on <strong className="text-[#0b1a30]">{formData.phone}</strong> with customized plate pricing and catering availability.
            </p>

            {/* Confirmation Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppSend}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp to Chef</span>
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto gold-button-gradient font-bold px-7 py-3 rounded-full text-xs shadow-md cursor-pointer"
              >
                Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* Input Form & Custom Dish Picker */
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b1a30] text-[#f3e9d2] text-xs font-bold shadow">
                <Sparkles className="w-3.5 h-3.5 text-[#dfc17b]" />
                <span>{isCustomPackage ? 'Custom Tailored Menu Request' : 'Banqueting Inquiry & Quote'}</span>
              </div>
              <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#0b1a30]">
                {isCustomPackage ? 'Create Your Custom Package' : 'Book South Delicious Catering'}
              </h3>
              <p className="text-xs text-stone-600 max-w-lg mx-auto">
                {isCustomPackage 
                  ? 'Choose your desired delicacies across our 33 authentic pure veg categories and finalize your bespoke catering package.' 
                  : 'Share your event details and our master chef team will curate a bespoke pure veg banquet for your celebration.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              
              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                    <User className="w-3 h-3 text-[#cbb079]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Ramanathan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#dfc17b]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0b1a30] placeholder-stone-400 focus:outline-none focus:border-[#dfc17b] shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#cbb079]" />
                    <span>WhatsApp / Contact Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98401 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#dfc17b]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0b1a30] placeholder-stone-400 focus:outline-none focus:border-[#dfc17b] shadow-sm"
                  />
                </div>

                {/* Occasion / Event Type */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold">
                    Occasion / Event Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-white border border-[#dfc17b]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b] shadow-sm font-medium"
                  >
                    <option value="Wedding Reception">Wedding & Kalyana Virundhu</option>
                    <option value="Engagement / Sangeet">Engagement / Sangeet Ceremony</option>
                    <option value="Housewarming / Grihapravesham">Grihapravesham (Housewarming)</option>
                    <option value="Temple Pooja & Seemantham">Sacred Temple Pooja / Seemantham</option>
                    <option value="Milestone 60th / 80th Birthday">Milestone Birthday (Sashtiapthapoorthi)</option>
                    <option value="Corporate Gala / Summit">Corporate Gala / High-Tea</option>
                    <option value="Other Celebrations">Other Auspicious Occasion</option>
                  </select>
                </div>

                {/* Approximate Guests */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#cbb079]" />
                    <span>Estimated Guest Count</span>
                  </label>
                  <input
                    type="number"
                    min="25"
                    placeholder="e.g. 250"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full bg-white border border-[#dfc17b]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b] shadow-sm font-medium"
                  />
                </div>

                {/* Estimated Date */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#cbb079]" />
                    <span>Event Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full bg-white border border-[#dfc17b]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b] shadow-sm"
                  />
                </div>

              </div>

              {/* Package Selection Dropdown */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                  <Utensils className="w-3 h-3 text-[#cbb079]" />
                  <span>Catering Package Type</span>
                </label>
                <select
                  value={formData.selectedPackage}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({ ...formData, selectedPackage: val });
                    if (val === 'Custom Tailored Menu') {
                      setShowDishPicker(true);
                    }
                  }}
                  className="w-full bg-white border-2 border-[#dfc17b] rounded-xl px-3.5 py-2.5 text-xs text-[#0b1a30] focus:outline-none focus:ring-2 focus:ring-[#dfc17b]/30 shadow-sm font-bold"
                >
                  <option value="Custom Tailored Menu">
                    ✨ Custom Tailored Menu Request (Choose Dishes by Category)
                  </option>
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} — (₹{pkg.pricePerPlate}/plate)
                    </option>
                  ))}
                </select>
              </div>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* CUSTOM PACKAGE DISH BUILDER (When Custom Menu is Selected) */}
              {/* ──────────────────────────────────────────────────────────── */}
              {isCustomPackage && (
                <div className="rounded-2xl border-2 border-[#dfc17b] bg-[#fdfbf7] p-4 sm:p-5 space-y-4 shadow-sm animate-fadeIn">
                  
                  {/* Custom Package Header & Dish Count */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#dfc17b]/40">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-royal font-bold text-sm sm:text-base text-[#0b1a30]">
                          Your Custom Package Dishes
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#0b1a30] text-[#dfc17b] text-xs font-extrabold shadow-xs">
                          {customDishes.length} Items Selected
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Select dishes below to create your exact customized banquet feast.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {customDishes.length > 0 && (
                        <button
                          type="button"
                          onClick={clearCustomDishes}
                          className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer px-2 py-1"
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowDishPicker(!showDishPicker)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#0b1a30] hover:bg-[#132a48] text-[#f3e9d2] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <ListPlus className="w-3.5 h-3.5 text-[#dfc17b]" />
                        <span>{showDishPicker ? 'Close Picker' : 'Choose Dishes'}</span>
                        {showDishPicker ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  {/* Selected Dishes Pill Tags */}
                  {customDishes.length > 0 ? (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        Dishes Added to Package ({customDishes.length}):
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                        {customDishes.map((dish, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#dfc17b]/70 text-[#0b1a30] text-xs shadow-xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                            <span className="font-semibold">{dish.name}</span>
                            <button
                              type="button"
                              onClick={() => toggleCustomDish(dish.name, dish.category)}
                              className="text-stone-400 hover:text-red-500 p-0.5 rounded-full"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-white rounded-xl border border-dashed border-[#dfc17b] text-center text-xs text-stone-500">
                      No dishes chosen yet. Click <strong className="text-[#0b1a30]">"Choose Dishes"</strong> below to pick your favorite items across Welcome Drinks, Soups, Starters, Sweets, and Main Courses!
                    </div>
                  )}

                  {/* ──────────────────────────────────────────────────────── */}
                  {/* EXPANDABLE CATEGORY & DISH BROWSER / SELECTOR */}
                  {/* ──────────────────────────────────────────────────────── */}
                  {showDishPicker && (
                    <div className="pt-3 border-t border-[#dfc17b]/40 space-y-3.5 animate-fadeIn">
                      
                      {/* Search & Filter Bar */}
                      <div className="space-y-2">
                        <div className="relative">
                          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search dishes (e.g. Masala Dosa, Faluda, Kaju Katli, Paneer, Halwa)..."
                            value={dishSearch}
                            onChange={(e) => setDishSearch(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2 bg-white border border-[#dfc17b]/60 rounded-xl text-xs text-[#0b1a30] placeholder-stone-400 focus:outline-none focus:border-[#dfc17b]"
                          />
                          {dishSearch && (
                            <button
                              type="button"
                              onClick={() => setDishSearch('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Category Group Filter Pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                          {MENU_GROUPS.map(group => {
                            const isActive = selectedGroupId === group.id;
                            return (
                              <button
                                key={group.id}
                                type="button"
                                onClick={() => setSelectedGroupId(group.id)}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-[#0b1a30] text-[#dfc17b] border border-[#dfc17b]'
                                    : 'bg-white text-stone-700 hover:text-[#0b1a30] border border-stone-200'
                                }`}
                              >
                                {group.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Categories Accordion / Dishes List */}
                      <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                        {filteredCategories.length === 0 ? (
                          <div className="text-center py-6 text-xs text-stone-500">
                            No dishes match "{dishSearch}". Try searching for something else.
                          </div>
                        ) : (
                          filteredCategories.map(cat => {
                            const isExpanded = expandedCategories[cat.id] ?? true;
                            const categorySelectedCount = cat.items.filter(dish => 
                              customDishes.some(d => d.name === dish)
                            ).length;

                            return (
                              <div 
                                key={cat.id} 
                                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs"
                              >
                                {/* Category Bar Header */}
                                <div 
                                  onClick={() => toggleCategoryExpand(cat.id)}
                                  className="px-3.5 py-2.5 bg-[#f6f1e5]/60 hover:bg-[#f6f1e5] flex items-center justify-between cursor-pointer transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-royal text-xs font-bold text-[#0b1a30]">
                                      {cat.name}
                                    </h5>
                                    <span className="text-[10px] text-stone-500">
                                      ({cat.items.length} items)
                                    </span>
                                    {categorySelectedCount > 0 && (
                                      <span className="px-1.5 py-0.2 rounded-full bg-[#0b1a30] text-[#dfc17b] text-[10px] font-extrabold">
                                        {categorySelectedCount} chosen
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const allSelected = cat.items.every(dish => 
                                          customDishes.some(d => d.name === dish)
                                        );
                                        if (allSelected) {
                                          cat.items.forEach(dish => {
                                            if (customDishes.some(d => d.name === dish)) {
                                              toggleCustomDish(dish, cat.name);
                                            }
                                          });
                                        } else {
                                          cat.items.forEach(dish => {
                                            if (!customDishes.some(d => d.name === dish)) {
                                              toggleCustomDish(dish, cat.name);
                                            }
                                          });
                                        }
                                      }}
                                      className="text-[10px] font-bold text-[#8e7235] hover:underline"
                                    >
                                      {cat.items.every(dish => customDishes.some(d => d.name === dish)) 
                                        ? 'Deselect All' 
                                        : 'Select All'}
                                    </button>
                                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-stone-400" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-400" />}
                                  </div>
                                </div>

                                {/* Dish Items Grid */}
                                {isExpanded && (
                                  <div className="p-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    {cat.items.map((dishName, dIdx) => {
                                      const isSelected = customDishes.some(d => d.name === dishName);
                                      return (
                                        <div
                                          key={dIdx}
                                          onClick={() => toggleCustomDish(dishName, cat.name)}
                                          className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                            isSelected 
                                              ? 'bg-[#fcf7ec] border-[#dfc17b] text-[#0b1a30] font-bold ring-1 ring-[#dfc17b]' 
                                              : 'bg-white border-stone-200/80 hover:border-[#dfc17b] text-stone-800'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2 overflow-hidden">
                                            {/* Pure Veg Badge */}
                                            <div className="w-3.5 h-3.5 border border-green-600 p-[1.5px] flex items-center justify-center shrink-0 rounded-xs bg-white">
                                              <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                                            </div>
                                            <span className="text-xs truncate">{dishName}</span>
                                          </div>

                                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                            isSelected ? 'bg-[#0b1a30] text-[#dfc17b]' : 'border border-stone-300 text-stone-400'
                                          }`}>
                                            {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3" />}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Done selecting CTA button */}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#0b1a30]">
                          Total Selected: <strong className="text-[#8e7235]">{customDishes.length} Dishes</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowDishPicker(false)}
                          className="px-4 py-1.5 rounded-full bg-[#0b1a30] text-[#dfc17b] text-xs font-bold hover:bg-[#132a48] transition-colors cursor-pointer"
                        >
                          ✓ Done Selecting Dishes
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* Special Requirements / Notes */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-[#cbb079]" />
                  <span>Special Requirements (Dietary, Jain, Live Counters, Timing)</span>
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Need Jain meals, live filter coffee station, timing is 7 PM reception..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-[#dfc17b]/60 rounded-xl px-3.5 py-2 text-xs text-[#0b1a30] placeholder-stone-400 focus:outline-none focus:border-[#dfc17b] shadow-sm"
                ></textarea>
              </div>

              {/* Finalize Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 gold-button-gradient font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-xs uppercase tracking-wider cursor-pointer text-center"
                >
                  {isCustomPackage 
                    ? `Finalize Custom Package (${customDishes.length} Items)` 
                    : 'Submit Inquiry & Get Quote'}
                </button>

                {isCustomPackage && customDishes.length > 0 && (
                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                )}
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
