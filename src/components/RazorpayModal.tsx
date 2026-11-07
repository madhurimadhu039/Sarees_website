import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, Building2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface RazorpayModalProps {
  amount: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (reason: string) => void;
  onClose: () => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  amount,
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure,
  onClose
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('surya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 8912 3456 7890');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('842');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate real Razorpay gateway response & signature validation
    setTimeout(() => {
      setIsProcessing(false);
      const generatedPayId = `pay_RP_${Date.now().toString(36).toUpperCase()}_${Math.floor(1000 + Math.random() * 9000)}`;
      onSuccess(generatedPayId);
    }, 1400);
  };

  const handleSimulateFailure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onFailure('Payment declined by issuing bank (Insufficient test balance or invalid OTP simulation).');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Razorpay Header Bar */}
        <div className="bg-[#0C2340] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#3395FF] flex items-center justify-center font-bold text-white text-xs tracking-wider">
              RZP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">SareeAura Luxury Silks</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-400/30">
                  Sandbox Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Order: {orderNumber}</p>
            </div>
          </div>
          <div className="text-right flex items-center gap-3">
            <div>
              <p className="text-xs text-slate-300">Payable Amount</p>
              <p className="text-base font-bold text-white tabular-nums">
                ₹{amount.toLocaleString('en-IN')}
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs">
          <button
            onClick={() => setMethod('upi')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 font-medium transition-colors border-b-2 ${
              method === 'upi'
                ? 'border-[#3395FF] text-[#0C2340] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>UPI / QR</span>
          </button>
          <button
            onClick={() => setMethod('card')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 font-medium transition-colors border-b-2 ${
              method === 'card'
                ? 'border-[#3395FF] text-[#0C2340] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setMethod('netbanking')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 font-medium transition-colors border-b-2 ${
              method === 'netbanking'
                ? 'border-[#3395FF] text-[#0C2340] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Netbanking</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4">
          {method === 'upi' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 flex items-center justify-center font-bold text-blue-600 text-xs shadow-xs">
                  UPI
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-semibold text-slate-900">Pay via any UPI App</p>
                  <p className="text-slate-600">Google Pay, PhonePe, Paytm, CRED or BHIM</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Enter Virtual Payment Address (VPA / UPI ID)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@okhdfcbank"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#3395FF]"
                />
              </div>

              {/* Instant Test UPI Buttons */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                {['@okaxis', '@okhdfcbank', '@paytm', '@ybl'].map(handle => (
                  <button
                    key={handle}
                    onClick={() => setUpiId(`surya${handle}`)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                  >
                    surya{handle}
                  </button>
                ))}
              </div>
            </div>
          )}

          {method === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4532 0000 0000 0000"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#3395FF] tracking-wider"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#3395FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="•••"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#3395FF]"
                  />
                </div>
              </div>
            </div>
          )}

          {method === 'netbanking' && (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Select Your Bank
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                  <button
                    key={bank}
                    onClick={() => setSelectedBank(bank)}
                    className={`p-2.5 border rounded-lg text-left transition-colors flex items-center justify-between ${
                      selectedBank === bank
                        ? 'border-[#3395FF] bg-blue-50/50 text-[#0C2340] font-semibold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{bank}</span>
                    {selectedBank === bank && <CheckCircle2 className="w-3.5 h-3.5 text-[#3395FF]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security Guarantee */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-bit SSL encrypted. 100% RBI & PCI-DSS compliant payment gateway.</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleSimulateFailure}
            disabled={isProcessing}
            className="text-xs text-red-600 hover:text-red-700 font-medium py-2 px-3 rounded hover:bg-red-50 transition-colors"
          >
            Simulate Decline
          </button>

          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="flex-1 py-3 px-5 bg-[#3395FF] hover:bg-[#2879d0] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying with Bank...</span>
              </>
            ) : (
              <span>Pay ₹{amount.toLocaleString('en-IN')} Now</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
