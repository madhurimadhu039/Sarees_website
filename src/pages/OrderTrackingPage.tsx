import React, { useState } from 'react';
import { Search, CheckCircle2, Circle, Truck, Package, Clock, ShieldCheck, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStage, Order } from '../types';

interface OrderTrackingPageProps {
  initialOrderId?: string;
  onNavigate: (view: string, param?: string) => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ initialOrderId, onNavigate }) => {
  const { orders, getOrderById } = useShop();

  const [searchQuery, setSearchQuery] = useState(initialOrderId || orders[0]?.orderNumber || '');
  const [activeOrder, setActiveOrder] = useState<Order | undefined>(() => {
    return initialOrderId ? getOrderById(initialOrderId) : orders[0];
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = getOrderById(searchQuery.trim());
    if (found) {
      setActiveOrder(found);
      setErrorMessage('');
    } else {
      setErrorMessage(`No shipment found matching "${searchQuery}". Please verify your order number (e.g., SA-2026-1049).`);
    }
  };

  // 7-Stage sequence
  const stages: { key: OrderStage; label: string; desc: string }[] = [
    { key: 'placed', label: 'Order Placed', desc: 'Received & verified in queue' },
    { key: 'confirmed', label: 'Payment Confirmed', desc: 'Secure payment authorized' },
    { key: 'processing', label: 'Quality Inspection', desc: 'Silk Mark tag authentication' },
    { key: 'packed', label: 'Artisan Packed', desc: 'Enclosed in moisture-resistant pouch' },
    { key: 'shipped', label: 'Dispatched via Air', desc: 'Handed over to courier partner' },
    { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Agent arriving at doorstep' },
    { key: 'delivered', label: 'Delivered', desc: 'Handed over to customer' }
  ];

  const getStageIndex = (stage: OrderStage): number => {
    switch (stage) {
      case 'placed': return 0;
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'packed': return 3;
      case 'shipped': return 4;
      case 'out_for_delivery': return 5;
      case 'delivered': return 6;
      default: return 0;
    }
  };

  const currentStageIndex = activeOrder ? getStageIndex(activeOrder.orderStatus) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
          LIVE COURIER LOGISTICS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#3B1637] font-semibold">
          Track Your Saree Shipment
        </h1>
        <p className="text-xs sm:text-sm text-[#7B6976] max-w-md mx-auto">
          Enter your order reference ID to view real-time flight transit status and estimated arrival.
        </p>
      </div>

      {/* Tracking Input Form */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E8DEC8] shadow-xs">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#845377]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. SA-2026-1049"
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-[#E8DEC8] rounded-xl focus:outline-none focus:border-[#581C4E] font-mono uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#581C4E] hover:bg-[#3B1637] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Track Status
          </button>
        </form>

        {errorMessage && (
          <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
        )}

        {/* Quick demo links */}
        <div className="mt-3 flex items-center gap-2 text-xs text-[#845377] flex-wrap">
          <span>Recent Orders:</span>
          {orders.slice(0, 3).map(o => (
            <button
              key={o.id}
              onClick={() => {
                setSearchQuery(o.orderNumber);
                setActiveOrder(o);
                setErrorMessage('');
              }}
              className="text-[#581C4E] font-medium underline font-mono cursor-pointer"
            >
              {o.orderNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Active Order Details */}
      {activeOrder && (
        <div className="space-y-6">
          {/* Order Overview Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DEC8] gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#3B1637]">
                    Order {activeOrder.orderNumber}
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#581C4E] border border-[#E8DEC8] capitalize">
                    {activeOrder.orderStatus.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-[#845377] mt-1">
                  Placed on {new Date(activeOrder.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] text-xs space-y-1">
                <p className="text-[#845377]">Courier Partner: <strong>{activeOrder.tracking.courier}</strong></p>
                <p className="text-[#845377] font-mono">AWB Tracking: <strong>{activeOrder.tracking.awbNumber}</strong></p>
                <p className="text-emerald-800 font-semibold">
                  ETA: {activeOrder.estimatedDeliveryDate}
                </p>
              </div>
            </div>

            {/* 7-STAGE INTERACTIVE VISUAL TIMELINE */}
            <div className="py-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B1637]">
                Live Fulfillment Progress
              </h3>

              {/* Progress Line Bar */}
              <div className="relative">
                <div className="hidden sm:grid grid-cols-7 gap-2 relative">
                  {/* Connecting Line */}
                  <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#E8DEC8] -z-0">
                    <div
                      className="h-full bg-[#581C4E] transition-all duration-500"
                      style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                    />
                  </div>

                  {stages.map((stage, idx) => {
                    const isCompleted = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div key={stage.key} className="flex flex-col items-center text-center relative z-10">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors shadow-xs ${
                            isCurrent
                              ? 'bg-[#581C4E] text-white ring-4 ring-[#FAF7F2] ring-offset-2 ring-offset-[#581C4E]'
                              : isCompleted
                              ? 'bg-[#581C4E] text-white'
                              : 'bg-white border-2 border-[#E8DEC8] text-[#845377]'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <p className={`text-[11px] font-semibold mt-2 ${isCompleted ? 'text-[#3B1637]' : 'text-[#A894A2]'}`}>
                          {stage.label}
                        </p>
                        <p className="text-[9px] text-[#845377] line-clamp-1 mt-0.5">
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Vertical Timeline */}
                <div className="sm:hidden space-y-3 pl-2 border-l-2 border-[#581C4E]/30">
                  {stages.map((stage, idx) => {
                    const isCompleted = idx <= currentStageIndex;
                    return (
                      <div key={stage.key} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                            isCompleted ? 'bg-[#581C4E] text-white' : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isCompleted ? '✓' : idx + 1}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${isCompleted ? 'text-[#3B1637]' : 'text-slate-400'}`}>
                            {stage.label}
                          </p>
                          <p className="text-[10px] text-slate-500">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Checkpoint Events History */}
            <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B1637]">
                Courier Checkpoints & Scans
              </h3>
              <div className="space-y-3">
                {activeOrder.tracking.events.map((evt, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] flex items-start justify-between gap-4 text-xs">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-[#3B1637] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#581C4E]" />
                        <span>{evt.status} — {evt.location}</span>
                      </p>
                      <p className="text-[#5B4856] text-[11px]">{evt.description}</p>
                    </div>
                    <span className="text-[10px] text-[#845377] font-mono shrink-0">
                      {evt.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ordered Sarees Thumbnails */}
            <div className="pt-4 border-t border-[#E8DEC8] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B1637]">
                Items In This Consignment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeOrder.items.map(item => (
                  <div key={item.id} className="p-3 rounded-lg border border-[#E8DEC8] flex items-center gap-3 bg-white">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-16 object-cover rounded-md bg-[#FAF7F2]"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-[#221C20]">{item.product.name}</p>
                      <p className="text-[11px] text-[#845377]">Qty: {item.quantity} · {item.selectedColor || item.product.color}</p>
                      <p className="font-bold text-[#581C4E] mt-0.5">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
