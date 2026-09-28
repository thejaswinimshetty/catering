import React from 'react';
import { useCatering } from '../context/CateringContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle 
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    companyInfo 
  } = useCatering();

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let text = `*New Order from South Delicious Catering Website*\n\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}* (${item.weight}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    text += `\n*Total Amount:* ₹${totalAmount}\n`;
    text += `\nPlease confirm my order and share delivery / payment details.`;

    const encoded = encodeURIComponent(text);
    const phone = companyInfo.rawPhones?.[0] || '7795533507';
    window.open(`https://wa.me/91${phone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf5eb] border-l-2 border-[#d4af37] shadow-2xl flex flex-col justify-between text-[#1c2e26]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#d4af37]/40 flex items-center justify-between bg-[#0d2e24] text-[#faf5ea]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#f5d77f]" />
              <h3 className="font-royal text-xl font-bold text-[#fffdf7]">
                Your Pantry Cart
              </h3>
              <span className="bg-[#faf5eb] text-[#0d2e24] text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow">
                {totalItemCount} items
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4 text-stone-500">
                <ShoppingBag className="w-12 h-12 text-[#c59b27]/60 mx-auto" />
                <p className="text-sm font-semibold">Your cart is currently empty.</p>
                <p className="text-xs text-stone-600">
                  Explore our authentic Mysore Pak, roasted spice podis, and filter coffee blends.
                </p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div 
                  key={`${item.id}-${item.weight}-${index}`}
                  className="bg-[#ffffff] p-4 rounded-2xl border-2 border-[#d4af37]/40 flex items-center gap-4 shadow-sm"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-[#d4af37]/40 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-royal text-sm font-bold text-[#0d2e24] truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs text-[#996e14] font-bold block">
                      Weight: {item.weight}
                    </span>
                    <span className="text-xs font-bold text-stone-700 mt-1 block">
                      ₹{item.price} each
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-[#faf5eb] border border-[#d4af37]/60 rounded-lg overflow-hidden shadow-inner">
                        <button
                          onClick={() => updateCartQuantity(index, -1)}
                          className="px-2 py-0.5 text-stone-700 hover:bg-[#ede3ce] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-[#0d2e24]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(index, 1)}
                          className="px-2 py-0.5 text-stone-700 hover:bg-[#ede3ce] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-[#0d2e24]">
                        = ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-stone-400 hover:text-red-500 p-2 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#d4af37]/40 bg-[#ffffff] space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#0d2e24] font-bold">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fresh Vacuum Packing</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#0d2e24] pt-2 border-t border-[#d4af37]/30">
                  <span>Total Payable:</span>
                  <span className="text-xl">₹{totalAmount}</span>
                </div>
              </div>

              {/* Checkout WhatsApp Action */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full gold-button-gradient font-bold py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Now via WhatsApp</span>
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-[11px] text-stone-500 hover:text-red-600 transition-colors py-1 cursor-pointer font-semibold"
              >
                Clear Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
