import React, { useState } from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  Sparkles, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Scale, 
  Plus, 
  Minus,
  Truck,
  PackageCheck
} from 'lucide-react';

export const ProductsSection = () => {
  const { products, addToCart } = useCatering();

  const [selectedWeights, setSelectedWeights] = useState({});
  const [quantities, setQuantities] = useState({});
  const [addedAlert, setAddedAlert] = useState(null);

  const getActiveWeight = (prod) => {
    return selectedWeights[prod.id] || prod.weights?.[0] || 'Standard';
  };

  const getActiveQty = (prodId) => {
    return quantities[prodId] || 1;
  };

  const handleWeightSelect = (prodId, weight) => {
    setSelectedWeights(prev => ({ ...prev, [prodId]: weight }));
  };

  const handleQtyChange = (prodId, delta) => {
    setQuantities(prev => {
      const current = prev[prodId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [prodId]: next };
    });
  };

  const calculatePriceForWeight = (basePrice, weight) => {
    if (!weight) return basePrice;
    if (weight.includes('1kg')) return Math.round(basePrice * 1.85);
    if (weight.includes('700g')) return Math.round(basePrice * 1.7);
    if (weight.includes('500g')) return basePrice;
    if (weight.includes('400g')) return Math.round(basePrice * 1.6);
    if (weight.includes('350g')) return basePrice;
    if (weight.includes('250g')) return Math.round(basePrice * 0.55);
    if (weight.includes('200g')) return basePrice;
    return basePrice;
  };

  const handleAddToCart = (product) => {
    const weight = getActiveWeight(product);
    const qty = getActiveQty(product.id);
    const effectivePrice = calculatePriceForWeight(product.price, weight);
    
    addToCart({ ...product, price: effectivePrice }, weight, qty);
    
    setAddedAlert(`${qty}x ${product.name} (${weight}) added to cart!`);
    setTimeout(() => setAddedAlert(null), 3000);
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-[#faf6ee] text-[#1c2e26] relative overflow-hidden border-b-2 border-[#d4af37]/30">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0d2e24] text-[#f5d77f] text-xs uppercase tracking-widest font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>Artisanal Gourmet Pantry</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2e24]">
            Authentic South Indian <span className="gold-text-gradient">Handcrafted Products</span>
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Take home the magic of South Delicious Catering. Freshly batched traditional sweets, heirloom spice podis, filter coffee blends, and stone-cured pickles prepared with pure ingredients.
          </p>
        </div>

        {/* Floating Toast Notification */}
        {addedAlert && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0d2e24] border-2 border-[#d4af37] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0d2e24] flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="text-sm font-semibold text-[#f5e6c8]">{addedAlert}</span>
          </div>
        )}

        {/* Products Grid in Warm Cream & Gold Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const activeWeight = getActiveWeight(product);
            const activeQty = getActiveQty(product.id);
            const unitPrice = calculatePriceForWeight(product.price, activeWeight);
            const totalPrice = unitPrice * activeQty;

            return (
              <div 
                key={product.id}
                className="bg-[#ffffff] rounded-3xl border-2 border-[#d4af37]/40 hover:border-[#d4af37] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl group hover:-translate-y-1"
              >
                {/* Product Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-[#faf5eb]">
                  <img 
                    src={product.image || "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[#d4af37] text-[#0d2e24] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                      {product.badge}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-stone-200 flex items-center gap-1 text-[11px] text-[#0d2e24] shadow-sm">
                    <Star className="w-3 h-3 fill-[#c59b27] text-[#c59b27]" />
                    <span className="font-bold">{product.rating || 5.0}</span>
                  </div>

                  {/* Weight Pill Overlay */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-[#ffffff]/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-[#d4af37]/60 text-xs text-[#0d2e24] shadow">
                    <Scale className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span className="font-bold">Weight: {activeWeight}</span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#996e14] font-bold block mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-royal text-xl font-bold text-[#0d2e24] mb-2 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal line-clamp-3 mb-4">
                      {product.description}
                    </p>

                    {/* Weight Selection Buttons */}
                    <div className="space-y-1.5 mb-4">
                      <label className="text-[11px] uppercase text-stone-500 font-bold tracking-wide flex items-center justify-between">
                        <span>Select Net Weight:</span>
                        <span className="text-[#0d2e24]">{activeWeight}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(product.weights || ["250g", "500g"]).map((w) => (
                          <button
                            key={w}
                            onClick={() => handleWeightSelect(product.id, w)}
                            className={`px-3 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                              activeWeight === w
                                ? 'bg-[#0d2e24] text-[#f5d77f] shadow'
                                : 'bg-[#faf5eb] text-stone-700 hover:text-[#0d2e24] border border-[#d4af37]/40'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-[#d4af37]/30 space-y-3">
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-stone-500 uppercase font-bold">Total Price</div>
                        <div className="font-royal text-2xl font-bold text-[#0d2e24]">
                          ₹{totalPrice}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center bg-[#faf5eb] border border-[#d4af37]/60 rounded-xl overflow-hidden shadow-inner">
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          className="px-2.5 py-1 text-stone-700 hover:bg-[#ede3ce] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-[#0d2e24]">
                          {activeQty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          className="px-2.5 py-1 text-stone-700 hover:bg-[#ede3ce] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full gold-button-gradient font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Cart • ₹{totalPrice}</span>
                    </button>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Freshness & Shipping Feature Banner in Cream Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t-2 border-[#d4af37]/30 text-center">
          <div className="bg-[#ffffff] p-6 rounded-2xl border-2 border-[#d4af37]/40 shadow-md flex flex-col items-center">
            <PackageCheck className="w-8 h-8 text-[#0d2e24] mb-2" />
            <h4 className="font-royal text-base font-bold text-[#0d2e24]">Freshly Prepared Weekly Batches</h4>
            <p className="text-xs text-stone-600 mt-1">Cooked in small artisanal quantities with zero artificial preservatives or food colorings.</p>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl border-2 border-[#d4af37]/40 shadow-md flex flex-col items-center">
            <Truck className="w-8 h-8 text-[#0d2e24] mb-2" />
            <h4 className="font-royal text-base font-bold text-[#0d2e24]">All-India Vacuum Packaging</h4>
            <p className="text-xs text-stone-600 mt-1">Shipped in airtight aroma-lock packaging ensuring crispy freshness right to your doorstep.</p>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl border-2 border-[#d4af37]/40 shadow-md flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-[#0d2e24] mb-2" />
            <h4 className="font-royal text-base font-bold text-[#0d2e24]">100% Desi Cow Ghee Guaranteed</h4>
            <p className="text-xs text-stone-600 mt-1">Every sweet is made exclusively with rich pure churned ghee for that nostalgic authentic aroma.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
