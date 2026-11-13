import React from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Lock, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, setIsAdminMode, companyInfo, setInquiryModalOpen } = useCatering();

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071224] text-[#fcfaf6] border-t-2 border-[#dfc17b]/50 pt-16 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#dfc17b]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#dfc17b]/30">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#dfc17b] overflow-hidden shadow-lg bg-white shrink-0 ring-2 ring-[#dfc17b]/40 flex items-center justify-center">
                <img 
                  src="/logo.jpg" 
                  alt="South Delicious Catering Logo" 
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <div>
                <h3 className="font-royal text-xl font-bold text-[#fcfaf6]">
                  South Delicious Catering
                </h3>
                <p className="text-xs text-[#dfc17b] font-bold tracking-wider uppercase">
                  Pure Veg Cuisine • Since 2014
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#ded8cc] leading-relaxed font-normal">
              South Delicious Catering is famous for authentic South Indian flavors. We serve delicious pure veg cuisine for all occasions since 2014, delighting families and celebrations with authentic traditional recipes, pure ingredients, and heartfelt hospitality.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071224] border border-[#dfc17b]/50 text-xs text-[#f3e9d2]">
              <ShieldCheck className="w-4 h-4 text-[#dfc17b]" />
              <span className="font-semibold">100% Pure Satvik & Pure Veg Facility</span>
            </div>

            {/* YouTube Channel Button */}
            <div className="pt-2">
              <a
                href="https://youtube.com/@sdcatering-wt4wl?si=TwW8DuRpLBu2k1QN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md hover:shadow-red-600/40 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch on YouTube (@sdcatering)</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-royal text-sm font-bold text-[#fcfaf6] uppercase tracking-wider border-b border-[#dfc17b]/30 pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#ded8cc]">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-[#ebd5a7] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#dfc17b]" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('menu')} 
                  className="hover:text-[#ebd5a7] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#dfc17b]" />
                  <span>Catering Menu Book</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-[#ebd5a7] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#dfc17b]" />
                  <span>Catering Packages</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('gallery')} 
                  className="hover:text-[#ebd5a7] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#dfc17b]" />
                  <span>Photo Gallery</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('products')} 
                  className="hover:text-[#ebd5a7] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#dfc17b]" />
                  <span>Artisanal Products</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('portfolio')} 
                  className="hover:text-[#ebd5a7] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#dfc17b]" />
                  <span>Event Portfolio</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-royal text-sm font-bold text-[#fcfaf6] uppercase tracking-wider border-b border-[#dfc17b]/30 pb-2">
              Catering For All Occasions
            </h4>
            <p className="text-xs text-[#ded8cc] leading-relaxed">
              Available across all venues, banquet halls, and celebrations:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {companyInfo.serviceAreas.map((area, idx) => (
                <span 
                  key={idx} 
                  className="bg-[#132a48] text-xs px-2.5 py-1 rounded-md border border-[#dfc17b]/40 text-[#fcfaf6] font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#e2be5a] pt-1 font-semibold">
              Weddings • Receptions • Poojas • Grihapravesham • Corporate Galas
            </p>
          </div>

          {/* Contact Details with User Provided Numbers & Email */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-royal text-sm font-bold text-[#fcfaf6] uppercase tracking-wider border-b border-[#dfc17b]/30 pb-2">
              Contact Us Directly
            </h4>
            <div className="space-y-2.5 text-xs text-[#ded8cc]">
              {/* Menu Hotline Numbers */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e2be5a] shrink-0" />
                <a 
                  href="tel:8073663774" 
                  className="text-white hover:text-[#ebd5a7] font-bold text-sm transition-colors"
                >
                  +91 80736 63774
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e2be5a] shrink-0" />
                <a 
                  href="tel:8970634713" 
                  className="text-white hover:text-[#ebd5a7] font-bold text-sm transition-colors"
                >
                  +91 89706 34713
                </a>
              </div>

              {/* General Numbers */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e2be5a]/70 shrink-0" />
                <a 
                  href="tel:7795533507" 
                  className="text-stone-300 hover:text-[#ebd5a7] font-medium text-xs transition-colors"
                >
                  +91 77955 33507 / +91 96636 14666
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e2be5a] shrink-0" />
                <a 
                  href="mailto:sdcatering666@gmail.com" 
                  className="text-[#f3e9d2] hover:underline transition-colors font-medium"
                >
                  sdcatering666@gmail.com
                </a>
              </div>

              {/* YouTube Link */}
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <a 
                  href="https://youtube.com/@sdcatering-wt4wl?si=TwW8DuRpLBu2k1QN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  YouTube: @sdcatering-wt4wl
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-1 text-stone-400">
                <Clock className="w-4 h-4 text-[#e2be5a] shrink-0" />
                <span>Available Daily for Event Bookings</span>
              </div>
            </div>

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="mt-3 w-full gold-button-gradient font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-md"
            >
              Get Free Catering Quote
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#c4b9a7]">
          <p>© {new Date().getFullYear()} South Delicious Catering. All Rights Reserved. Pure Veg Since 2014.</p>
          <p className="text-stone-400">Authentic Vegetarian Catering & Feast Management</p>
        </div>

      </div>
    </footer>
  );
};
