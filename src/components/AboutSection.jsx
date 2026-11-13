import React from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  Sparkles, 
  Flame, 
  Leaf, 
  ShieldCheck, 
  Award, 
  Check, 
  ChevronRight
} from 'lucide-react';

export const AboutSection = () => {
  const { setActiveTab, setInquiryModalOpen, companyInfo } = useCatering();

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#fcfaf6] text-[#0b1a30] relative overflow-hidden border-b-2 border-[#dfc17b]/30">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#dfc17b]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0b1a30]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0b1a30] text-[#f3e9d2] text-xs uppercase tracking-widest font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ebd5a7]" />
            <span>About Us • Since 2014</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b1a30]">
            Famous for Authentic <span className="gold-text-gradient">South Indian Flavors</span>
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
            <strong>South Delicious Catering</strong> is renowned for authentic South Indian flavors. We serve delicious pure veg cuisine for all occasions since 2014, delighting families and guests with pristine quality, traditional recipes, and unforgettable feasts.
          </p>
        </div>

        {/* 2-Column Story and Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Visual Collage with Logo Watermark */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-[#dfc17b] shadow-xl group aspect-[4/5] bg-white p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80" 
                    alt="Authentic Traditional South Indian Spread" 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-[#ffffff] p-5 rounded-2xl border-2 border-[#dfc17b]/60 text-center shadow-md">
                  <div className="font-royal text-2xl font-bold text-[#0b1a30]">Since 2014</div>
                  <div className="text-xs text-[#8e7235] font-medium">Over a Decade of Pure Veg Excellence</div>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-[#ffffff] p-5 rounded-2xl border-2 border-[#dfc17b]/60 flex flex-col items-center text-center shadow-md">
                  <div className="w-16 h-16 rounded-full border-2 border-[#dfc17b] overflow-hidden mb-2 shadow-md bg-white flex items-center justify-center ring-2 ring-[#dfc17b]/40">
                    <img src="/logo.jpg" alt="South Delicious Catering Logo" className="w-full h-full object-cover scale-105" />
                  </div>
                  <div className="font-royal text-sm font-bold text-[#0b1a30]">Pure Veg Guarantee</div>
                  <div className="text-[11px] text-[#8e7235] font-medium">Delicious Food For All Occasions</div>
                </div>
                
                <div className="rounded-2xl overflow-hidden border-2 border-[#dfc17b] shadow-xl group aspect-[4/5] bg-white p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80" 
                    alt="Traditional South Indian Thali" 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Central Stamp */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0b1a30] border-2 border-[#dfc17b] p-3 rounded-full shadow-2xl hidden sm:block">
              <Award className="w-8 h-8 text-[#f3e9d2]" />
            </div>
          </div>

          {/* Right Column: Story Text & Quality Assurances */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#0b1a30]">
              Delicious Pure Veg Cuisine for All Occasions
            </h3>
            
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              At <strong className="text-[#0b1a30]">South Delicious Catering</strong>, we take pride in delivering the true essence of South Indian culinary heritage. Since 2014, our dedication has remained constant: serving authentic, freshly cooked, and mouthwatering pure vegetarian feasts for every momentous milestone.
            </p>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              From grand weddings, receptions, and engagement ceremonies to intimate poojas, housewarmings (Grihapravesham), birthdays, and corporate events, we cater across all occasions with unmatched flavor, purity, and hospitality.
            </p>

            {/* Core Values checklist in Cream & Gold Cards */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 bg-[#ffffff] p-4 rounded-xl border border-[#dfc17b]/50 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-[#0b1a30] text-[#f3e9d2] flex items-center justify-center shrink-0 mt-0.5 shadow">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0b1a30]">Famous for Authentic South Indian Flavors</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Authentic regional recipes with freshly ground spices, traditional sambar, rasam, and banana leaf feasts.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#ffffff] p-4 rounded-xl border border-[#dfc17b]/50 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-[#0b1a30] text-[#f3e9d2] flex items-center justify-center shrink-0 mt-0.5 shadow">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0b1a30]">Delicious Pure Veg for All Occasions</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Customized catering packages crafted for weddings, poojas, anniversaries, corporate banquets, and family gatherings.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#ffffff] p-4 rounded-xl border border-[#dfc17b]/50 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-[#0b1a30] text-[#f3e9d2] flex items-center justify-center shrink-0 mt-0.5 shadow">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0b1a30]">Trusted Catering Since 2014</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Over a decade of culinary excellence and trusted smiles across thousands of celebrated events.</p>
                </div>
              </div>
            </div>



          </div>

        </div>

        {/* 4 Pillars Card Grid in Cream & Gold */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="bg-[#ffffff] p-6 rounded-2xl border-2 border-[#dfc17b]/40 hover:border-[#dfc17b] transition-all hover:-translate-y-1 shadow-md hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0b1a30] border border-[#dfc17b] flex items-center justify-center text-[#f3e9d2] mb-4 shadow">
                {idx === 0 && <Flame className="w-6 h-6" />}
                {idx === 1 && <Sparkles className="w-6 h-6" />}
                {idx === 2 && <Leaf className="w-6 h-6" />}
                {idx === 3 && <ShieldCheck className="w-6 h-6" />}
              </div>
              <h4 className="font-royal text-lg font-bold text-[#0b1a30] mb-2">{pillar.title}</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
