import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface CartDrawerProps {
  onCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onExplore }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTax,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 3000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E8DEC8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#581C4E]" />
              <h2 className="font-serif text-xl font-semibold text-[#3B1637]">
                Shopping Bag
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F2ECE1] text-[#581C4E] font-medium">
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-[#845377] hover:text-[#3B1637] hover:bg-[#F2ECE1] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F8F2E8] px-5 py-3 border-b border-[#E8DEC8] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#5B4856] mb-1.5">
                Add <strong className="text-[#581C4E]">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for <span className="font-semibold text-emerald-800">Free Express Air Shipping</span>
              </p>
            ) : (
              <p className="text-emerald-800 font-medium flex items-center gap-1.5 mb-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Congratulations! You’ve unlocked Free Express Shipping
              </p>
            )}
            <div className="w-full bg-[#E8DEC8] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#581C4E] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F2ECE1] flex items-center justify-center text-[#845377]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-[#3B1637]">Your shopping bag is empty</h3>
                  <p className="text-xs text-[#845377] max-w-xs mx-auto">
                    Explore our hand-woven silk and bridal collections to find your perfect drape.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExplore();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#581C4E] text-white text-xs font-medium hover:bg-[#45143C] transition-colors"
                >
                  Explore Sarees
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#E8DEC8]/80 shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded-lg bg-[#FAF7F2] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-xs font-semibold text-[#221C20] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#845377] mt-0.5">
                        Color: {item.selectedColor || item.product.color}
                      </p>
                      <p className="text-[11px] text-[#845377]">
                        Blouse: {item.blouseStitching === 'unstitched' ? 'Unstitched Silk Piece' : 'Custom Tailored'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F2ECE1]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E8DEC8] rounded-full bg-[#FAF7F2] overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#E8DEC8] text-[#581C4E] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums text-[#221C20]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#E8DEC8] text-[#581C4E] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-[#221C20] tabular-nums">
                          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#997E8B] hover:text-red-700 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8DEC8] bg-white space-y-4">
              {/* Coupon Code Section */}
              <div className="space-y-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-emerald-900 font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#845377]" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value);
                            setCouponError('');
                          }}
                          placeholder="Enter Promo Code"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-[#E8DEC8] rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#581C4E]"
                        />
                      </div>
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="px-4 py-2 bg-[#FAF7F2] border border-[#581C4E] text-[#581C4E] text-xs font-semibold rounded-lg hover:bg-[#581C4E] hover:text-white transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick promo suggestion */}
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#845377]">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>Try code:</span>
                      <button
                        onClick={() => handleApplyCoupon('WELCOME10')}
                        className="font-semibold text-[#581C4E] hover:underline"
                      >
                        WELCOME10 (10% off)
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Calculations Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5B4856] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#221C20] tabular-nums">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-medium tabular-nums">
                      -₹{cartDiscount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-medium tabular-nums">
                    {cartShippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[10px]">Free</span>
                    ) : (
                      `₹${cartShippingFee.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Applicable GST (5%)</span>
                  <span className="font-medium text-[#221C20] tabular-nums">
                    ₹{cartTax.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8DEC8] text-sm font-semibold text-[#3B1637]">
                  <span>Total Payable</span>
                  <span className="text-base text-[#581C4E] tabular-nums">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-3.5 px-6 rounded-full bg-[#581C4E] hover:bg-[#45143C] text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
