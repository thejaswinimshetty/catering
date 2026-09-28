import React, { useState, useEffect } from 'react';
import { useCatering } from '../context/CateringContext';
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
  MessageSquare
} from 'lucide-react';

export const InquiryModal = () => {
  const { 
    inquiryModalOpen, 
    setInquiryModalOpen, 
    selectedPackageForQuote, 
    setSelectedPackageForQuote,
    packages,
    addInquiry 
  } = useCatering();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding Reception',
    guestCount: '250',
    selectedPackage: '',
    eventDate: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [createdInquiryId, setCreatedInquiryId] = useState(null);

  useEffect(() => {
    if (selectedPackageForQuote) {
      setFormData(prev => ({
        ...prev,
        selectedPackage: selectedPackageForQuote.name
      }));
    } else if (packages.length > 0 && !formData.selectedPackage) {
      setFormData(prev => ({
        ...prev,
        selectedPackage: packages[0].name
      }));
    }
  }, [selectedPackageForQuote, packages]);

  if (!inquiryModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    const created = addInquiry(formData);
    setCreatedInquiryId(created.id);
    setSubmitted(true);
  };

  const handleClose = () => {
    setInquiryModalOpen(false);
    setSubmitted(false);
    setSelectedPackageForQuote(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#faf5eb] rounded-3xl border-2 border-[#d4af37] shadow-2xl p-6 sm:p-8 text-[#1a2d24] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-stone-500 hover:text-[#0d2e24] p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation Screen */
          <div className="text-center py-8 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#0d2e24] border-2 border-[#d4af37] text-[#f5d77f] flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle className="w-10 h-10 text-[#f5d77f]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#996e14] font-bold">Booking Request Received</span>
              <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#0d2e24]">
                Thank You, {formData.name}!
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto">
                Your inquiry has been successfully sent to <strong className="text-[#0d2e24]">South Delicious Catering</strong>. Reference ID: <span className="font-mono text-[#996e14] font-bold">{createdInquiryId}</span>.
              </p>
            </div>

            <div className="bg-[#ffffff] p-4 rounded-2xl border border-[#d4af37]/50 text-left text-xs space-y-1.5 max-w-md mx-auto shadow-sm">
              <div className="text-stone-600">Package: <span className="text-[#0d2e24] font-bold">{formData.selectedPackage}</span></div>
              <div className="text-stone-600">Occasion: <span className="text-[#0d2e24] font-bold">{formData.eventType}</span></div>
              <div className="text-stone-600">Estimated Guests: <span className="text-[#0d2e24] font-bold">{formData.guestCount}</span></div>
              {formData.eventDate && <div className="text-stone-600">Date: <span className="text-[#0d2e24] font-bold">{formData.eventDate}</span></div>}
            </div>

            <p className="text-xs text-stone-600">
              Our Head Banquet Manager will contact you on <strong className="text-[#0d2e24]">{formData.phone}</strong> within 2 hours with customized menu quotes.
            </p>

            <button
              onClick={handleClose}
              className="gold-button-gradient font-bold px-8 py-3 rounded-full text-sm shadow-md cursor-pointer"
            >
              Back to Website
            </button>
          </div>
        ) : (
          /* Input Form */
          <div className="space-y-5">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d2e24] text-[#f5d77f] text-xs font-bold shadow">
                <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
                <span>Banqueting Inquiry & Menu Customization</span>
              </div>
              <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#0d2e24]">
                Book South Delicious Catering
              </h3>
              <p className="text-xs text-stone-600">
                Share your event details and our master chef team will curate a bespoke pure veg menu for your auspicious celebration.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                    <User className="w-3 h-3 text-[#c59b27]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Ramanathan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0d2e24] placeholder-stone-400 focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#c59b27]" />
                    <span>Contact Number (WhatsApp) *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98401 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0d2e24] placeholder-stone-400 focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#c59b27]" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ram@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0d2e24] placeholder-stone-400 focus:outline-none focus:border-[#d4af37] shadow-sm"
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
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
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

                {/* Estimated Date */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#c59b27]" />
                    <span>Event Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                {/* Approximate Guests */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#c59b27]" />
                    <span>Estimated Guest Count</span>
                  </label>
                  <input
                    type="number"
                    min="30"
                    placeholder="e.g. 350"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

              </div>

              {/* Package Selection */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                  <Utensils className="w-3 h-3 text-[#c59b27]" />
                  <span>Preferred Catering Package</span>
                </label>
                <select
                  value={formData.selectedPackage}
                  onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm font-medium"
                >
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} — (₹{pkg.pricePerPlate}/plate)
                    </option>
                  ))}
                  <option value="Custom Tailored Menu">Custom Tailored Menu Request</option>
                </select>
              </div>

              {/* Special Notes / Dietary */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-[#c59b27]" />
                  <span>Special Requirements (Dietary, Jain, Live Stalls, Venue)</span>
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. 50 Jain meals required, live filter coffee station needed, venue is in Chennai..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2 text-xs text-[#0d2e24] placeholder-stone-400 focus:outline-none focus:border-[#d4af37] shadow-sm"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full gold-button-gradient font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  Submit Inquiry & Get Custom Quote
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
