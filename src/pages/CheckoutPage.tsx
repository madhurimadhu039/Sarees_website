import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, Banknote, Tag, ArrowRight, Check, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order, Address } from '../types';
import { RazorpayModal } from '../components/RazorpayModal';

interface CheckoutPageProps {
  onOrderSuccess: (order: Order) => void;
  onNavigate: (view: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderSuccess, onNavigate }) => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTax,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    createOrder,
    user
  } = useShop();

  // Contact info
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  // Address
  const [selectedSavedAddress, setSelectedSavedAddress] = useState<string>(
    user.addresses[0]?.id || 'new'
  );

  const [fullName, setFullName] = useState(user.name);
  const [addressLine1, setAddressLine1] = useState(user.addresses[0]?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(user.addresses[0]?.addressLine2 || '');
  const [city, setCity] = useState(user.addresses[0]?.city || 'Hyderabad');
  const [state, setState] = useState(user.addresses[0]?.state || 'Telangana');
  const [pincode, setPincode] = useState(user.addresses[0]?.pincode || '500081');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const extraShippingFee = shippingMethod === 'express' ? 350 : 0;

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

  // Razorpay modal state
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [pendingOrderDetails, setPendingOrderDetails] = useState<any>(null);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const finalPayable = cartTotal + extraShippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };

  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    // Auto-fill city/state for major Indian pin prefixes
    if (clean.startsWith('50')) {
      setCity('Hyderabad');
      setState('Telangana');
    } else if (clean.startsWith('56')) {
      setCity('Bengaluru');
      setState('Karnataka');
    } else if (clean.startsWith('60')) {
      setCity('Chennai');
      setState('Tamil Nadu');
    } else if (clean.startsWith('40')) {
      setCity('Mumbai');
      setState('Maharashtra');
    } else if (clean.startsWith('11')) {
      setCity('New Delhi');
      setState('Delhi');
    } else if (clean.startsWith('70')) {
      setCity('Kolkata');
      setState('West Bengal');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      onNavigate('shop');
      return;
    }

    const shippingAddress: Address = {
      id: `addr-${Date.now()}`,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      isDefault: true
    };

    const orderPayload = {
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress,
      items: cart,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      shippingFee: cartShippingFee + extraShippingFee,
      tax: cartTax,
      total: finalPayable,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? ('pending' as const) : ('paid' as const),
      orderStatus: 'confirmed' as const
    };

    if (paymentMethod === 'razorpay') {
      // Open Razorpay sandbox modal
      setPendingOrderDetails(orderPayload);
      setShowRazorpayModal(true);
    } else {
      // Cash on Delivery
      const order = createOrder(orderPayload);
      onOrderSuccess(order);
    }
  };

  const handleRazorpaySuccess = (paymentId: string) => {
    setShowRazorpayModal(false);
    if (!pendingOrderDetails) return;
    const finalOrder = createOrder({
      ...pendingOrderDetails,
      paymentStatus: 'paid',
      paymentId
    });
    onOrderSuccess(finalOrder);
  };

  const handleRazorpayFailure = (reason: string) => {
    setShowRazorpayModal(false);
    alert(`Payment could not be completed: ${reason}\nYou can retry or choose Cash on Delivery.`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#3B1637]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#845377]">Please add sarees to your bag before checking out.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 rounded-full bg-[#581C4E] text-white text-xs font-semibold"
        >
          Explore Sarees
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#845377]">
        <button onClick={() => onNavigate('shop')} className="hover:text-[#581C4E]">Shop</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#3B1637] font-semibold">Secure Checkout</span>
      </div>

      <h1 className="font-serif text-3xl text-[#3B1637] font-semibold">
        Review & Place Your Order
      </h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Customer Info, Shipping Address & Payment Selection */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Contact Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-4 shadow-xs">
            <h2 className="font-serif text-lg font-semibold text-[#3B1637] flex items-center justify-between">
              <span>1. Customer Contact</span>
              <span className="text-xs font-sans text-[#845377] font-normal">Order updates will be sent here</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                />
              </div>

              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Mobile Phone (for delivery SMS) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Address */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-[#3B1637]">
                2. Delivery Destination
              </h2>
              {user.addresses.length > 0 && (
                <div className="text-xs text-[#581C4E] font-medium">
                  Using Saved Profile Address
                </div>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                />
              </div>

              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Flat / Villa / House No. & Building Name *</label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Villa 42, Palm Meadows"
                  className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                />
              </div>

              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Street / Area / Landmark (Optional)</label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Near Botanical Garden, Jubilee Hills"
                  className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="6-digit PIN"
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                  />
                </div>

                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                  />
                </div>

                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Delivery Method */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-4 shadow-xs">
            <h2 className="font-serif text-lg font-semibold text-[#3B1637]">
              3. Courier Speed
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  shippingMethod === 'standard'
                    ? 'border-[#581C4E] bg-[#FAF7F2]'
                    : 'border-[#E8DEC8] hover:bg-slate-50'
                }`}
              >
                <div>
                  <p className="font-semibold text-[#3B1637]">Standard Air Courier (3–4 Days)</p>
                  <p className="text-[11px] text-[#845377]">Dispatched in custom boutique packaging</p>
                </div>
                <span className="font-bold text-emerald-800">FREE</span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  shippingMethod === 'express'
                    ? 'border-[#581C4E] bg-[#FAF7F2]'
                    : 'border-[#E8DEC8] hover:bg-slate-50'
                }`}
              >
                <div>
                  <p className="font-semibold text-[#3B1637]">Priority VIP Express (1–2 Days)</p>
                  <p className="text-[11px] text-[#845377]">Guaranteed next flight out dispatch</p>
                </div>
                <span className="font-bold text-[#581C4E]">₹350</span>
              </label>
            </div>
          </div>

          {/* 4. Payment Method */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-4 shadow-xs">
            <h2 className="font-serif text-lg font-semibold text-[#3B1637]">
              4. Payment Method
            </h2>

            <div className="space-y-3 text-xs">
              {/* Razorpay Option */}
              <label
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'razorpay'
                    ? 'border-[#581C4E] bg-[#FAF7F2]'
                    : 'border-[#E8DEC8] hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                  className="mt-1 accent-[#581C4E]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#3B1637]">
                      Online Payment via Razorpay
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                      Fast & Secure
                    </span>
                  </div>
                  <p className="text-xs text-[#7B6976] mt-0.5">
                    UPI (Google Pay, PhonePe, Paytm, CRED), Credit/Debit Cards, Netbanking
                  </p>
                </div>
              </label>

              {/* Cash On Delivery Option */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'cod'
                    ? 'border-[#581C4E] bg-[#FAF7F2]'
                    : 'border-[#E8DEC8] hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-[#581C4E]"
                />
                <div className="flex-1">
                  <span className="font-bold text-sm text-[#3B1637]">
                    Cash on Delivery (COD)
                  </span>
                  <p className="text-xs text-[#7B6976] mt-0.5">
                    Pay with cash or UPI to the courier agent upon doorstep delivery.
                  </p>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-6 sticky top-28 shadow-xs">
          <h2 className="font-serif text-xl font-semibold text-[#3B1637] border-b border-[#E8DEC8] pb-3">
            Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h2>

          {/* Cart items list */}
          <div className="max-h-60 overflow-y-auto divide-y divide-[#E8DEC8]/60 pr-1 space-y-3">
            {cart.map(item => (
              <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover rounded-md bg-[#FAF7F2] border border-[#E8DEC8]"
                  />
                  <div>
                    <p className="font-semibold text-[#221C20] line-clamp-1">{item.product.name}</p>
                    <p className="text-[11px] text-[#845377]">Qty: {item.quantity} · {item.selectedColor || item.product.color}</p>
                  </div>
                </div>
                <span className="font-bold tabular-nums text-[#221C20]">
                  ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Promo Code Input */}
          <div className="pt-2 border-t border-[#E8DEC8]">
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                <span className="font-medium">Code <strong>{appliedCoupon.code}</strong> applied (-₹{cartDiscount.toLocaleString('en-IN')})</span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs text-emerald-900 font-semibold underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. WELCOME10)"
                    className="flex-1 text-xs px-3 py-2 border border-[#E8DEC8] rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#581C4E]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-[#FAF7F2] border border-[#581C4E] text-[#581C4E] text-xs font-semibold rounded-lg hover:bg-[#581C4E] hover:text-white transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>
            )}
          </div>

          {/* Itemized Price Calculations */}
          <div className="space-y-2 text-xs text-[#5B4856] pt-2 border-t border-[#E8DEC8]">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-medium text-[#221C20] tabular-nums">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Coupon Discount</span>
                <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="tabular-nums">
                {cartShippingFee + extraShippingFee === 0 ? (
                  <span className="text-emerald-700 font-semibold">FREE</span>
                ) : (
                  `₹${(cartShippingFee + extraShippingFee).toLocaleString('en-IN')}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Applicable GST (5%)</span>
              <span className="font-medium text-[#221C20] tabular-nums">
                ₹{cartTax.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#E8DEC8] text-base font-bold text-[#3B1637]">
              <span>Final Payable</span>
              <span className="text-xl text-[#581C4E] tabular-nums">
                ₹{finalPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-full bg-[#581C4E] hover:bg-[#43143B] text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {paymentMethod === 'razorpay'
                ? `Pay ₹${finalPayable.toLocaleString('en-IN')} via Razorpay`
                : 'Confirm & Place Cash on Delivery Order'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Security note */}
          <div className="flex items-center gap-2 text-[11px] text-[#845377] justify-center pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-bit SSL encrypted. 100% genuine Silk Mark quality.</span>
          </div>
        </div>

      </form>

      {/* RAZORPAY SANDBOX MODAL */}
      {showRazorpayModal && pendingOrderDetails && (
        <RazorpayModal
          amount={finalPayable}
          orderNumber={`SA-2026-${Math.floor(1000 + Math.random() * 9000)}`}
          customerName={fullName}
          customerEmail={email}
          customerPhone={phone}
          onSuccess={handleRazorpaySuccess}
          onFailure={handleRazorpayFailure}
          onClose={() => setShowRazorpayModal(false)}
        />
      )}
    </div>
  );
};
