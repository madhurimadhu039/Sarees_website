import React, { useState } from 'react';
import { CheckCircle2, Package, Truck, Mail, Printer, ArrowRight, ExternalLink } from 'lucide-react';
import { Order } from '../types';
import { EmailConfirmationModal } from '../components/EmailConfirmationModal';

interface OrderConfirmationPageProps {
  order: Order;
  onNavigate: (view: string, param?: string) => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onNavigate,
  onTrackOrder
}) => {
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      {/* Success Badge & Headline */}
      <div className="text-center space-y-3 bg-white p-8 rounded-3xl border border-[#E8DEC8] shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#3B1637] font-semibold">
          Thank You! Your Order is Confirmed
        </h1>

        <p className="text-xs sm:text-sm text-[#7B6976] max-w-lg mx-auto">
          We have received your order <strong className="text-[#3B1637] font-mono">{order.orderNumber}</strong>. A confirmation email with itemized invoice and tracking credentials has been sent to <strong>{order.customerEmail}</strong>.
        </p>

        {/* Action Buttons: View Email & Track Order */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowEmailModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#581C4E] text-[#581C4E] text-xs font-semibold hover:bg-[#581C4E] hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>Preview Confirmation Email</span>
          </button>

          <button
            onClick={() => onTrackOrder(order.id)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#581C4E] text-white text-xs font-semibold hover:bg-[#3B1637] transition-all cursor-pointer shadow-md"
          >
            <Truck className="w-4 h-4" />
            <span>Track Delivery Status</span>
          </button>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DEC8] gap-2">
          <div>
            <p className="text-xs text-[#845377]">Order Reference</p>
            <p className="font-serif text-xl font-semibold text-[#3B1637]">{order.orderNumber}</p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-[#845377]">Estimated Delivery</p>
            <p className="text-sm font-bold text-emerald-800">{order.estimatedDeliveryDate}</p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="space-y-3">
          <h3 className="font-serif text-base font-semibold text-[#3B1637]">
            Ordered Ensembles ({order.items.length})
          </h3>
          <div className="divide-y divide-[#E8DEC8]/60">
            {order.items.map(item => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#221C20]">{item.product.name}</h4>
                    <p className="text-[11px] text-[#845377]">
                      Color: {item.selectedColor || item.product.color} · Qty: {item.quantity}
                    </p>
                    <p className="text-[11px] text-[#845377]">
                      Blouse: {item.blouseStitching === 'unstitched' ? 'Unstitched Silk Piece' : 'Custom'}
                    </p>
                  </div>
                </div>

                <span className="font-semibold text-xs sm:text-sm tabular-nums text-[#221C20]">
                  ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Destination & Payment Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8DEC8] text-xs">
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
            <p className="font-bold text-[#3B1637] mb-1">Delivery Destination</p>
            <p className="font-medium text-[#221C20]">{order.shippingAddress.fullName}</p>
            <p className="text-[#5B4856] leading-relaxed">
              {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2 || ''}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}<br />
              Phone: {order.shippingAddress.phone}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-1.5">
            <p className="font-bold text-[#3B1637] mb-1">Financial Summary</p>
            <div className="flex justify-between text-[#5B4856]">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Discount:</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-[#5B4856]">
              <span>Air Shipping:</span>
              <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-[#5B4856]">
              <span>Applicable GST (5%):</span>
              <span>₹{order.tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#581C4E] pt-2 border-t border-[#E8DEC8]">
              <span>Total Paid:</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="pt-4 text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#581C4E] hover:underline cursor-pointer"
          >
            <span>Continue Exploring Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Full Email Modal */}
      {showEmailModal && (
        <EmailConfirmationModal
          order={order}
          onClose={() => setShowEmailModal(false)}
          onTrackOrder={onTrackOrder}
        />
      )}
    </div>
  );
};
