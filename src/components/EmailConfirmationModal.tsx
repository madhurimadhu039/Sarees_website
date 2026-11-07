import React, { useRef } from 'react';
import { X, Mail, Printer, CheckCircle, ExternalLink } from 'lucide-react';
import { Order } from '../types';
import { BrandLogo } from './BrandLogo';

interface EmailConfirmationModalProps {
  order: Order;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const EmailConfirmationModal: React.FC<EmailConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder
}) => {
  const emailPrintRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#E8DEC8] animate-in zoom-in-95">
        {/* Modal Controls Bar */}
        <div className="p-4 bg-[#3B1637] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#E8C888]" />
            <span className="text-xs font-semibold tracking-wide uppercase text-[#E8C888]">
              Automated Dispatch Email Preview
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/20">
              Delivered to {order.customerEmail}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-2.5 py-1 text-xs bg-[#581C4E] hover:bg-[#722465] text-white rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Order Receipt"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Email Document Body */}
        <div ref={emailPrintRef} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white font-sans text-[#221C20]">
          {/* Email Header */}
          <div className="text-center pb-6 border-b border-[#F0E6D8] space-y-3">
            <div className="flex justify-center">
              <BrandLogo size="lg" />
            </div>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Payment & Order Confirmed
              </span>
              <h2 className="font-serif text-2xl text-[#3B1637] font-semibold">
                Your Drape of Tradition is Reserved
              </h2>
              <p className="text-xs text-[#7B6976]">
                Dear {order.customerName}, thank you for choosing SareeAura. Our master weavers are preparing your ensemble.
              </p>
            </div>
          </div>

          {/* Key Meta Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC8] text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-[#845377]">Order Reference</p>
              <p className="font-semibold text-[#3B1637] font-mono mt-0.5">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-[#845377]">Order Date</p>
              <p className="font-medium text-[#221C20] mt-0.5">
                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-[#845377]">Payment Method</p>
              <p className="font-medium text-[#221C20] mt-0.5 capitalize">
                {order.paymentMethod === 'razorpay' ? 'Razorpay (Paid)' : 'Cash On Delivery'}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-[#845377]">Estimated Delivery</p>
              <p className="font-semibold text-emerald-800 mt-0.5">{order.estimatedDeliveryDate}</p>
            </div>
          </div>

          {/* Itemized Items Table */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#3B1637] border-b border-[#F0E6D8] pb-1">
              Order Items Summary
            </h3>
            <div className="divide-y divide-[#F0E6D8]">
              {order.items.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-18 object-cover rounded-md bg-[#FAF7F2] border border-[#E8DEC8]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#221C20]">{item.product.name}</p>
                      <p className="text-[11px] text-[#845377]">
                        Color: {item.selectedColor || item.product.color} · Qty: {item.quantity}
                      </p>
                      <p className="text-[10px] text-[#845377]">
                        Blouse: {item.blouseStitching === 'unstitched' ? 'Unstitched Silk Piece' : 'Custom'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#221C20] tabular-nums">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-[#845377]">₹{item.unitPrice.toLocaleString('en-IN')} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC8] space-y-2 text-xs">
            <div className="flex justify-between text-[#5B4856]">
              <span>Subtotal</span>
              <span className="font-medium text-[#221C20] tabular-nums">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Discount Applied ({order.couponCode || 'Promo'})</span>
                <span className="font-medium tabular-nums">-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-[#5B4856]">
              <span>Express Air Courier Delivery</span>
              <span className="font-medium tabular-nums">
                {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee.toLocaleString('en-IN')}`}
              </span>
            </div>
            <div className="flex justify-between text-[#5B4856]">
              <span>Applicable GST (5%)</span>
              <span className="font-medium text-[#221C20] tabular-nums">₹{order.tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E8DEC8] text-sm font-bold text-[#3B1637]">
              <span>Total Paid</span>
              <span className="text-[#581C4E] tabular-nums">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Delivery Address & Tracking Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3 rounded-lg border border-[#E8DEC8] bg-white">
              <p className="font-semibold text-[#3B1637] mb-1">Delivery Destination</p>
              <p className="font-medium text-[#221C20]">{order.shippingAddress.fullName}</p>
              <p className="text-[#5B4856] text-[11px] leading-relaxed">
                {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2 || ''}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}<br />
                Phone: {order.shippingAddress.phone}
              </p>
            </div>

            <div className="p-3 rounded-lg border border-[#E8DEC8] bg-[#F7F2EA] flex flex-col justify-between">
              <div>
                <p className="font-semibold text-[#3B1637] mb-1">Courier Logistics</p>
                <p className="text-[11px] text-[#5B4856]">Partner: {order.tracking.courier}</p>
                <p className="text-[11px] text-[#5B4856] font-mono">AWB: {order.tracking.awbNumber}</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onTrackOrder(order.id);
                }}
                className="mt-3 w-full py-2 bg-[#581C4E] hover:bg-[#43143B] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Track Live Order</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-4 border-t border-[#F0E6D8] text-[11px] text-[#845377] space-y-1">
            <p>Need assistance or draping guidance? Write to us at <strong>concierge@sareaura.com</strong> or call <strong>+91 40 4852 9100</strong>.</p>
            <p>© 2026 SareeAura. Handcrafted with reverence for Indian heritage weaves.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
