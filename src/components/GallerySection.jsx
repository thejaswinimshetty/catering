import React, { useState } from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export const GallerySection = () => {
  const { gallery } = useCatering();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const categories = ['All', ...new Set(gallery.map(g => g.category || 'General'))];

  const filteredGallery = selectedFilter === 'All'
    ? gallery
    : gallery.filter(item => item.category === selectedFilter);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#faf6ee] text-[#1c2e26] relative overflow-hidden">
      {/* Ambience lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0d2e24] text-[#f5d77f] text-xs uppercase tracking-widest font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>Memories Through The Years</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2e24]">
            A Visual Journey of <span className="gold-text-gradient">Grand Banquets</span>
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Capturing the regal splendor of authentic South Indian weddings, brassware food presentations, and synchronized banana leaf feasts catered since 2014.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#0d2e24] text-[#f5d77f] border-2 border-[#d4af37] shadow-md scale-105'
                  : 'bg-[#ffffff] text-stone-700 hover:text-[#0d2e24] border-2 border-[#d4af37]/40 hover:border-[#d4af37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden bg-white border-2 border-[#d4af37]/40 hover:border-[#d4af37] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/3] sm:aspect-square flex flex-col justify-end"
            >
              {/* Photo */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2e24]/95 via-[#0d2e24]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>

              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="bg-[#faf5ea]/95 backdrop-blur-md text-[#0d2e24] text-[11px] font-extrabold px-3 py-1 rounded-full border border-[#d4af37] uppercase tracking-wider shadow">
                  {item.category || 'Catering'}
                </span>
                
                {item.year && (
                  <span className="bg-[#0d2e24]/90 backdrop-blur-md text-[#f5d77f] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#d4af37]/60 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#d4af37]" />
                    <span>{item.year}</span>
                  </span>
                )}
              </div>

              {/* Bottom Caption Overlay */}
              <div className="relative z-10 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                <h3 className="font-royal text-lg sm:text-xl font-bold text-[#ffffff] group-hover:text-[#f5d77f] transition-colors leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-xs text-[#ded8cc] line-clamp-2 font-normal opacity-90">
                  {item.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-[#e8dfcf] border-t border-white/20">
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#f5d77f]" />
                      <span>{item.location}</span>
                    </span>
                  )}
                  {item.guests && (
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#f5d77f]" />
                      <span>{item.guests}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="w-12 h-12 rounded-full bg-[#d4af37] text-[#0d2e24] flex items-center justify-center shadow-2xl">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImageIndex !== null && filteredGallery[activeImageIndex] && (
          <div 
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 text-white p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-50 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 text-white p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-50 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#faf5ea] rounded-3xl overflow-hidden border-2 border-[#d4af37] shadow-2xl text-[#1c2e26]"
            >
              <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={filteredGallery[activeImageIndex].image}
                  alt={filteredGallery[activeImageIndex].title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              <div className="p-6 bg-[#faf5ea] space-y-2 border-t border-[#d4af37]/40">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#996e14] font-extrabold">
                    {filteredGallery[activeImageIndex].category} • {filteredGallery[activeImageIndex].year}
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">
                    Image {activeImageIndex + 1} of {filteredGallery.length}
                  </span>
                </div>

                <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#0d2e24]">
                  {filteredGallery[activeImageIndex].title}
                </h3>

                <p className="text-sm text-stone-600 font-normal">
                  {filteredGallery[activeImageIndex].description}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-600">
                  {filteredGallery[activeImageIndex].location && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-[#c59b27]" />
                      <span>{filteredGallery[activeImageIndex].location}</span>
                    </span>
                  )}
                  {filteredGallery[activeImageIndex].guests && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-4 h-4 text-[#c59b27]" />
                      <span>{filteredGallery[activeImageIndex].guests}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
