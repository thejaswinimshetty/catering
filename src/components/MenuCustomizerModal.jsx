import React, { useState, useMemo } from 'react';
import { useCatering } from '../context/CateringContext';
import {
  X,
  Wine,
  Utensils,
  Soup,
  IceCream,
  Check,
  Phone,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

import { MASTER_MENU } from '../data/initialData';

const CATEGORIES = [
  {
    key: 'welcomeDrinks',
    label: 'Welcome Drinks & Coolers',
    number: '1',
    icon: Wine,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    activeBg: 'bg-blue-600',
    tip: 'Choose welcome drinks to greet your guests on arrival.',
  },
  {
    key: 'starters',
    label: 'Starters & Appetizers',
    number: '2',
    icon: Utensils,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    activeBg: 'bg-orange-500',
    tip: 'Pick your preferred starters and crispy appetizers.',
  },
  {
    key: 'mainCourse',
    label: 'Main Course',
    number: '3',
    icon: Soup,
    color: 'text-[#0d2e24]',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    activeBg: 'bg-[#0d2e24]',
    tip: 'Select main course dishes for the banana leaf / buffet spread.',
  },
  {
    key: 'desserts',
    label: 'Desserts, Sweets & Filter Coffee',
    number: '4',
    icon: IceCream,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    activeBg: 'bg-pink-600',
    tip: 'Pick your sweet endings and filter coffee options.',
  },
];

export const MenuCustomizerModal = ({ pkg, onClose }) => {
  const { companyInfo, masterMenu } = useCatering();
  const currentMenu = masterMenu || MASTER_MENU;
  const [selections, setSelections] = useState({ welcomeDrinks: [], starters: [], mainCourse: [], desserts: [] });
  const [openCategories, setOpenCategories] = useState({ welcomeDrinks: true, starters: false, mainCourse: false, desserts: false });
  const [searchTerms, setSearchTerms] = useState({ welcomeDrinks: '', starters: '', mainCourse: '', desserts: '' });
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalSelected = Object.values(selections).reduce((sum, arr) => sum + arr.length, 0);

  const toggleItem = (category, item) => {
    setSelections(prev => {
      const exists = prev[category].includes(item);
      return {
        ...prev,
        [category]: exists
          ? prev[category].filter(i => i !== item)
          : [...prev[category], item],
      };
    });
  };

  const toggleCategory = (key) => {
    setOpenCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredItems = (catKey) => {
    const term = searchTerms[catKey].toLowerCase();
    const list = currentMenu[catKey] || [];
    return list.filter(item => item.toLowerCase().includes(term));
  };

  const buildWhatsAppMessage = () => {
    const lines = [];
    lines.push(`*🍽️ Custom Menu Request — South Delicious Catering*`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    if (pkg) lines.push(`*Package:* ${pkg.name}`);
    if (guestName) lines.push(`*Name:* ${guestName}`);
    if (guestCount) lines.push(`*Guest Count:* ${guestCount}`);
    if (eventDate) lines.push(`*Event Date:* ${eventDate}`);
    lines.push(``);

    CATEGORIES.forEach(cat => {
      const items = selections[cat.key];
      if (items.length > 0) {
        lines.push(`*${cat.number}. ${cat.label}:*`);
        items.forEach(item => lines.push(`  • ${item}`));
        lines.push(``);
      }
    });

    if (totalSelected === 0) {
      lines.push(`_(No specific items selected — please suggest based on our preference)_`);
    }

    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`Please confirm availability and pricing. Thank you! 🙏`);

    return encodeURIComponent(lines.join('\n'));
  };

  const handleSendWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/91${companyInfo.rawPhones[0]}?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#faf6ee] w-full max-w-2xl max-h-[95vh] rounded-3xl shadow-2xl border-2 border-[#d4af37] flex flex-col overflow-hidden">
        
        {/* ── Header ── */}
        <div className="bg-[#0d2e24] px-6 py-5 flex items-start justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#f5d77f]" />
              <span className="text-[#f5d77f] text-xs font-bold uppercase tracking-widest">Customize Your Menu</span>
            </div>
            <h2 className="font-royal text-xl sm:text-2xl font-bold text-white leading-tight">
              {pkg ? pkg.name : 'Build Your Own Menu'}
            </h2>
            {pkg && (
              <p className="text-[#c8b87a] text-xs mt-1">{pkg.subtitle}</p>
            )}
          </div>
          <button onClick={onClose} className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 space-y-4">

          {/* Guest details */}
          <div className="bg-white rounded-2xl border border-[#d4af37]/40 p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#0d2e24]">Your Event Details <span className="text-stone-400 font-normal normal-case">(optional)</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="border border-[#d4af37]/50 rounded-xl px-3 py-2 text-sm bg-[#faf5eb] text-[#1a2d24] placeholder-stone-400 focus:outline-none focus:border-[#d4af37]"
              />
              <input
                type="number"
                placeholder="Guest Count"
                value={guestCount}
                onChange={e => setGuestCount(e.target.value)}
                className="border border-[#d4af37]/50 rounded-xl px-3 py-2 text-sm bg-[#faf5eb] text-[#1a2d24] placeholder-stone-400 focus:outline-none focus:border-[#d4af37]"
              />
              <input
                type="date"
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                className="border border-[#d4af37]/50 rounded-xl px-3 py-2 text-sm bg-[#faf5eb] text-[#1a2d24] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* Selection Counter */}
          <div className="flex items-center gap-3 px-1">
            <div className="flex items-center gap-2 text-sm text-[#0d2e24] font-bold">
              <ShoppingBag className="w-4 h-4 text-[#c59b27]" />
              <span>{totalSelected} item{totalSelected !== 1 ? 's' : ''} selected</span>
            </div>
            <span className="text-stone-400 text-xs">— Tap categories below to expand and choose items</span>
          </div>

          {/* ── Category Accordions ── */}
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isOpen = openCategories[cat.key];
            const items = filteredItems(cat.key);
            const selected = selections[cat.key];

            return (
              <div key={cat.key} className={`rounded-2xl border-2 overflow-hidden transition-all ${isOpen ? 'border-[#d4af37]' : 'border-[#d4af37]/30'}`}>
                {/* Accordion Header */}
                <button
                  onClick={() => toggleCategory(cat.key)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 cursor-pointer transition-colors ${isOpen ? 'bg-[#0d2e24]' : 'bg-white hover:bg-[#faf5eb]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${isOpen ? 'bg-[#d4af37]' : 'bg-[#0d2e24]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className={`font-bold text-sm ${isOpen ? 'text-white' : 'text-[#0d2e24]'}`}>
                        {cat.number}. {cat.label}
                      </div>
                      <div className={`text-[11px] ${isOpen ? 'text-[#c8b87a]' : 'text-stone-500'}`}>
                        {(currentMenu[cat.key] || []).length} items available
                        {selected.length > 0 && <span className="ml-2 font-bold text-[#d4af37]">• {selected.length} selected</span>}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 ${isOpen ? 'text-[#f5d77f]' : 'text-[#0d2e24]'}`}>
                    {selected.length > 0 && !isOpen && (
                      <span className="bg-[#d4af37] text-[#0d2e24] text-[10px] font-extrabold px-2 py-0.5 rounded-full">{selected.length}</span>
                    )}
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="bg-white px-4 pt-3 pb-4 space-y-3">
                    <p className="text-[11px] text-stone-500 italic">{cat.tip}</p>
                    {/* Search */}
                    <input
                      type="text"
                      placeholder={`Search ${cat.label.toLowerCase()}...`}
                      value={searchTerms[cat.key]}
                      onChange={e => setSearchTerms(prev => ({ ...prev, [cat.key]: e.target.value }))}
                      className="w-full border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs bg-[#faf5eb] text-[#1a2d24] placeholder-stone-400 focus:outline-none focus:border-[#d4af37]"
                    />

                    {/* Item checkboxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                      {items.length === 0 && (
                        <p className="text-xs text-stone-400 col-span-2 py-2 text-center">No items match your search.</p>
                      )}
                      {items.map((item, i) => {
                        const checked = selected.includes(item);
                        return (
                          <button
                            key={i}
                            onClick={() => toggleItem(cat.key, item)}
                            className={`flex items-start gap-2.5 text-left px-3 py-2.5 rounded-xl border-2 transition-all cursor-pointer text-xs w-full ${
                              checked
                                ? 'border-[#d4af37] bg-[#faf5eb] text-[#0d2e24] font-semibold'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-[#d4af37]/60 hover:bg-[#fdfaf2]'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              checked ? 'bg-[#0d2e24] border-[#0d2e24]' : 'bg-white border-stone-300'
                            }`}>
                              {checked && <Check className="w-2.5 h-2.5 text-[#f5d77f]" />}
                            </span>
                            <span className="leading-tight">{item}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected summary for this category */}
                    {selected.length > 0 && (
                      <div className="bg-[#faf5eb] border border-[#d4af37]/50 rounded-xl px-3 py-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#996e14] mb-1">Your picks:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selected.map((item, i) => (
                            <span key={i} className="bg-[#0d2e24] text-[#f5d77f] text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                              {item}
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleItem(cat.key, item); }}
                                className="text-[#f5d77f]/70 hover:text-white ml-1 leading-none cursor-pointer"
                              >×</button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Full summary of all selected */}
          {totalSelected > 0 && (
            <div className="bg-[#0d2e24]/5 border border-[#d4af37]/30 rounded-2xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#0d2e24] mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                Your Custom Menu Summary ({totalSelected} items)
              </h4>
              <div className="space-y-2">
                {CATEGORIES.map(cat => {
                  const items = selections[cat.key];
                  if (items.length === 0) return null;
                  const Icon = cat.icon;
                  return (
                    <div key={cat.key} className="text-xs">
                      <div className={`flex items-center gap-1.5 font-bold text-[#0d2e24] mb-1`}>
                        <Icon className={`w-3 h-3 ${cat.color}`} />
                        {cat.label}
                      </div>
                      <div className="flex flex-wrap gap-1 ml-4">
                        {items.map((item, i) => (
                          <span key={i} className="text-[10px] bg-white border border-[#d4af37]/50 px-2 py-0.5 rounded-full text-stone-700">{item}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer Actions ── */}
        <div className="shrink-0 px-4 sm:px-6 py-4 bg-white border-t border-[#d4af37]/30 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {submitted ? (
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>Request sent via WhatsApp! We'll confirm shortly.</span>
            </div>
          ) : (
            <>
              <p className="text-xs text-stone-500 text-center sm:text-left">
                Your selection will be sent to us via WhatsApp. We'll confirm and customise the quote for you.
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#0d2e24] bg-[#faf5eb] border-2 border-[#d4af37]/50 hover:border-[#d4af37] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendWhatsApp}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#0d2e24] gold-button-gradient shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
