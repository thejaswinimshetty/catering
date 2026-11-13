import React, { useState } from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  Sparkles, 
  Users, 
  ChevronRight,
  Phone,
  MessageCircle,
  Star,
  UtensilsCrossed,
  Wine,
  IceCream2,
  Salad,
  Baby,
  ChefHat,
  Soup
} from 'lucide-react';

/* ─── Section row renderer ─────────────────────────────────────────── */
const MenuSection = ({ icon: Icon, label, color, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className={`rounded-xl border p-3.5 ${color.bg} ${color.border}`}>
      <div className={`flex items-center gap-1.5 mb-2.5 text-xs font-extrabold uppercase tracking-wide ${color.label}`}>
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${color.dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ─── Main Packages Section ────────────────────────────────────────── */
export const PackagesSection = () => {
  const { packages, setInquiryModalOpen, setSelectedPackageForQuote, companyInfo } = useCatering();
  const [expandedId, setExpandedId] = useState(null);

  const handleWhatsApp = (pkg) => {
    const phone = "918073663774";
    const msg = `Hello South Delicious Catering! I'm interested in the *${pkg.name}* package at ₹${pkg.pricePerPlate}/plate. Please share more details and availability.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const colorSchemes = [
    {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      label: 'text-amber-800',
      dot: 'bg-amber-500',
    },
    {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      label: 'text-rose-800',
      dot: 'bg-rose-500',
    },
    {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      label: 'text-blue-800',
      dot: 'bg-blue-500',
    },
    {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      label: 'text-rose-800',
      dot: 'bg-rose-500',
    },
    {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      label: 'text-purple-800',
      dot: 'bg-purple-500',
    },
    {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      label: 'text-orange-800',
      dot: 'bg-orange-500',
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#fcfaf6] text-[#0b1a30] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#dfc17b]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0b1a30]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0b1a30] text-[#f3e9d2] text-xs uppercase tracking-widest font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ebd5a7]" />
            <span>Catering Packages • 100% Pure Veg Since 2014</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b1a30]">
            Our <span className="gold-text-gradient">Catering Packages</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Choose from our carefully crafted packages — from simple family feasts to full royal wedding experiences.
          </p>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {packages.map((pkg, pkgIdx) => {
            const isExpanded = expandedId === pkg.id;
            const colorBase = colorSchemes[0]; // gold/green for main sections

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl overflow-hidden bg-white border-2 flex flex-col shadow-xl transition-all duration-300 ${
                  pkg.popular
                    ? 'border-[#dfc17b] shadow-[0_10px_35px_rgba(212,175,55,0.22)] ring-2 ring-[#dfc17b]/30'
                    : 'border-[#dfc17b]/50 hover:border-[#dfc17b]'
                }`}
              >
                {/* Banner Image with Price Overlay */}
                <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Tag badge */}
                  {pkg.tag && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#dfc17b] to-[#cbb079] text-[#0b1a30] text-xs font-extrabold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      {pkg.popular && <Star className="w-3 h-3 fill-[#0b1a30]" />}
                      <span>{pkg.tag}</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="absolute bottom-4 right-4 bg-[#fcfaf6]/95 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#dfc17b] text-right shadow-lg">
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Per Plate</div>
                    <div className="font-royal text-2xl font-extrabold text-[#0b1a30]">
                      ₹{pkg.pricePerPlate}
                    </div>
                  </div>

                  {/* Min Guests */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                    <Users className="w-3.5 h-3.5 text-[#f3e9d2]" />
                    <span>Min {pkg.minGuests} Guests</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col space-y-4">

                  {/* Package Title */}
                  <div>
                    <h3 className="font-royal text-2xl font-extrabold text-[#0b1a30] leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#8e7235] font-bold uppercase tracking-wide mt-0.5">
                      {pkg.subtitle}
                    </p>
                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Menu Sections — always show sweets + main, counters etc always visible */}
                  <div className="space-y-2.5 pt-2 border-t border-[#dfc17b]/30">

                    {/* Welcome Drinks */}
                    <MenuSection
                      icon={Wine}
                      label="Welcome Drinks"
                      color={{ bg: 'bg-blue-50', border: 'border-blue-200', label: 'text-blue-800', dot: 'bg-blue-400' }}
                      items={pkg.welcomeDrinks}
                    />

                    {/* Welcome Starters */}
                    <MenuSection
                      icon={UtensilsCrossed}
                      label="Welcome Starters"
                      color={{ bg: 'bg-orange-50', border: 'border-orange-200', label: 'text-orange-800', dot: 'bg-orange-400' }}
                      items={pkg.welcomeStarters}
                    />

                    {/* Soup Station */}
                    <MenuSection
                      icon={Soup}
                      label="Soup Station"
                      color={{ bg: 'bg-cyan-50', border: 'border-cyan-200', label: 'text-cyan-800', dot: 'bg-cyan-400' }}
                      items={pkg.soupStation}
                    />

                    {/* Starters */}
                    <MenuSection
                      icon={ChefHat}
                      label="Starters"
                      color={{ bg: 'bg-amber-50', border: 'border-amber-200', label: 'text-amber-800', dot: 'bg-amber-500' }}
                      items={pkg.starters}
                    />

                    {/* Sweets */}
                    <MenuSection
                      icon={IceCream2}
                      label="Sweets"
                      color={{ bg: 'bg-pink-50', border: 'border-pink-200', label: 'text-pink-800', dot: 'bg-pink-400' }}
                      items={pkg.sweets}
                    />

                    {/* Pasta Counter */}
                    <MenuSection
                      icon={UtensilsCrossed}
                      label="Pasta Counter"
                      color={{ bg: 'bg-yellow-50', border: 'border-yellow-200', label: 'text-yellow-800', dot: 'bg-yellow-500' }}
                      items={pkg.pastaCounter}
                    />

                    {/* Main Course — collapsible for large lists */}
                    {pkg.mainCourse && pkg.mainCourse.length > 0 && (
                      <div className="rounded-xl border border-[#dfc17b]/60 bg-[#f9f4ea] p-3.5">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-[#0b1a30]">
                            <UtensilsCrossed className="w-3.5 h-3.5 text-[#8e7235]" />
                            <span>Main Course</span>
                          </div>
                          {pkg.mainCourse.length > 6 && (
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                              className="text-[11px] font-bold text-[#8e7235] hover:text-[#0b1a30] underline underline-offset-2 cursor-pointer"
                            >
                              {isExpanded ? 'Show Less' : `+${pkg.mainCourse.length - 6} more`}
                            </button>
                          )}
                        </div>
                        <ul className="space-y-1">
                          {(isExpanded ? pkg.mainCourse : pkg.mainCourse.slice(0, 6)).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#0a192f]">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#dfc17b]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Salad Counter */}
                    <MenuSection
                      icon={Salad}
                      label="Salad Counter"
                      color={{ bg: 'bg-lime-50', border: 'border-lime-200', label: 'text-lime-800', dot: 'bg-lime-500' }}
                      items={pkg.saladCounter}
                    />

                    {/* Solid Counters */}
                    <MenuSection
                      icon={ChefHat}
                      label="Solid Counters"
                      color={{ bg: 'bg-violet-50', border: 'border-violet-200', label: 'text-violet-800', dot: 'bg-violet-400' }}
                      items={pkg.solidCounters}
                    />

                    {/* Kids Counter */}
                    <MenuSection
                      icon={Baby}
                      label="Children's Counter"
                      color={{ bg: 'bg-rose-50', border: 'border-rose-200', label: 'text-rose-800', dot: 'bg-rose-400' }}
                      items={pkg.kidsCounter}
                    />

                    {/* Desserts (legacy packages) */}
                    <MenuSection
                      icon={IceCream2}
                      label="Desserts & Sweets"
                      color={{ bg: 'bg-pink-50', border: 'border-pink-200', label: 'text-pink-800', dot: 'bg-pink-400' }}
                      items={pkg.desserts}
                    />

                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-4 mt-auto flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleWhatsApp(pkg)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Enquire on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setInquiryModalOpen(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl gold-button-gradient font-bold text-sm text-[#0b1a30] shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Book / Get Quote</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#0b1a30] text-[#fcfaf6] p-8 sm:p-10 rounded-3xl border-2 border-[#dfc17b] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-royal text-2xl font-bold text-[#fcfaf6]">Need a Completely Custom Menu?</h3>
            <p className="text-sm text-[#e8dfce] max-w-xl">
              Mix and match dishes from our 393+ item menu book. We'll craft a custom package just for your event and budget.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+918073663774"
              className="px-6 py-3.5 rounded-full font-bold text-sm bg-white/10 hover:bg-white/20 text-[#f3e9d2] border border-[#dfc17b]/60 transition-colors cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#ebd5a7]" />
              <span>+91 80736 63774</span>
            </a>
            <button
              onClick={() => {
                setSelectedPackageForQuote({ name: 'Custom Tailored Menu' });
                setInquiryModalOpen(true);
              }}
              className="px-8 py-3.5 rounded-full font-bold text-sm gold-button-gradient shadow-xl hover:scale-105 transition-transform cursor-pointer text-[#0b1a30]"
            >
              Request Custom Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
