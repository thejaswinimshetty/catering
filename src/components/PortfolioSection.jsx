import React from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Quote, 
  ChevronRight 
} from 'lucide-react';

export const PortfolioSection = () => {
  const { portfolio, setInquiryModalOpen } = useCatering();

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#faf6ee] text-[#1c2e26] relative overflow-hidden border-b-2 border-[#d4af37]/30">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0d2e24] text-[#f5d77f] text-xs uppercase tracking-widest font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>Landmark Celebrations</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2e24]">
            Prestigious Event <span className="gold-text-gradient">Portfolio & Stories</span>
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            From celebrity wedding banquets to elite corporate galas and sacred family milestones, explore how we delivered pure satvik magnificence with zero compromises.
          </p>
        </div>

        {/* Portfolio Cards */}
        <div className="space-y-10">
          {portfolio.map((item, idx) => (
            <div 
              key={item.id || idx}
              className="bg-[#ffffff] rounded-3xl p-6 sm:p-10 border-2 border-[#d4af37]/50 shadow-xl hover:border-[#d4af37] transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Event Details */}
                <div className="lg:col-span-7 space-y-4">
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="bg-[#0d2e24] text-[#f5d77f] font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                      {item.eventType}
                    </span>
                    <span className="text-xs text-stone-700 flex items-center gap-1 bg-[#faf5eb] px-3 py-1 rounded-full border border-[#d4af37]/40 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>{item.year}</span>
                    </span>
                    <span className="text-xs text-stone-700 flex items-center gap-1 bg-[#faf5eb] px-3 py-1 rounded-full border border-[#d4af37]/40 font-semibold">
                      <Users className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>{item.guestCount}</span>
                    </span>
                  </div>

                  <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#0d2e24] group-hover:text-[#996e14] transition-colors">
                    {item.client}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#996e14] font-bold">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{item.location}</span>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {item.summary}
                  </p>

                  {/* Highlight Dishes */}
                  {item.highlightDishes && (
                    <div className="pt-2">
                      <div className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                        Menu Highlights Served:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.highlightDishes.map((dish, dIdx) => (
                          <span 
                            key={dIdx}
                            className="bg-[#faf5eb] text-[#0d2e24] text-xs font-semibold px-3 py-1 rounded-lg border border-[#d4af37]/50 flex items-center gap-1.5 shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                            <span>{dish}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Testimonial Quote Box in Warm Cream & Gold */}
                <div className="lg:col-span-5 bg-[#faf5eb] p-6 sm:p-7 rounded-2xl border-2 border-[#d4af37] relative shadow-md">
                  <Quote className="w-10 h-10 text-[#d4af37]/40 absolute top-4 right-4" />
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[#c59b27] mb-3">
                    {[...Array(item.rating || 5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-[#c59b27]" />
                    ))}
                    <span className="text-xs text-stone-600 ml-1 font-bold">Verified Client Review</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed relative z-10 mb-4 font-medium">
                    "{item.testimonial}"
                  </p>

                  <div className="pt-3 border-t border-[#d4af37]/30 flex items-center justify-between text-xs text-stone-600 font-semibold">
                    <span className="text-[#0d2e24]">100% Recommended</span>
                    <span>Catered with Pure Desi Ghee</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer in Portfolio */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-stone-700 text-sm font-medium">
            Planning a wedding, corporate event, or milestone family feast?
          </p>
          <button
            onClick={() => setInquiryModalOpen(true)}
            className="gold-button-gradient font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book South Delicious Catering for Your Event</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
