import React from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  CheckCircle2 
} from 'lucide-react';

export const Hero = () => {
  const { companyInfo } = useCatering();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#fcf9f2] via-[#faf4e6] to-[#f5edd9] border-b-2 border-[#d4af37]/40 text-[#1a2e26]">
      {/* Subtle Warm Gold Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#c59b27]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Gold pattern line accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Main Headline in Deep Temple Emerald & Warm Gold */}
            <h1 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d382c] leading-[1.15] tracking-tight">
              Authentic <span className="gold-text-gradient">South Indian Flavors</span> Crafted for Royal Feasts
            </h1>

            {/* Paragraph / Intro using real user-provided brand info */}
            <p className="text-base sm:text-lg text-[#3d4f46] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Welcome to <strong className="text-[#0d382c] font-bold">South Delicious Catering</strong>. 
              We are famous for authentic South Indian flavors, serving delicious pure veg cuisine for all occasions since 2014.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-[#2b3d35]">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span className="font-bold text-[#0d382c]">100% Pure Satvik Veg</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span className="font-bold text-[#0d382c]">Pure Desi Ghee Cooked</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span className="font-bold text-[#0d382c]">Generational Recipes</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column: Luxury Card on Warm Cream */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Gold Ornamental Outer Frame */}
              <div className="p-2.5 sm:p-3 rounded-3xl bg-gradient-to-tr from-[#d4af37] via-[#f7e09e] to-[#c59b27] shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden bg-white aspect-[4/3] sm:aspect-square flex items-center justify-center">
                  
                  {/* High Quality Banquet Photo */}
                  <img 
                    src="https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=1000&q=80" 
                    alt="Authentic South Indian Banana Leaf Feast" 
                    className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>



                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Brand Stats Grid in Warm Cream Cards */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t-2 border-[#d4af37]/30">
          {companyInfo.stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-[#ffffff] border-2 border-[#d4af37]/50 p-5 rounded-2xl text-center shadow-md hover:border-[#d4af37] transition-all hover:-translate-y-0.5"
            >
              <div className="font-royal text-2xl sm:text-3xl font-extrabold text-[#0d382c] mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#785f2e] font-bold tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
