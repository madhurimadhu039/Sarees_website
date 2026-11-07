import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, Ruler, FileText, CheckCircle2 } from 'lucide-react';

interface PoliciesPageProps {
  initialTab?: string;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ initialTab = 'shipping' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Policy Selector Tabs */}
      <div className="flex border-b border-[#E8DEC8] overflow-x-auto text-xs sm:text-sm font-semibold gap-6">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'shipping'
              ? 'border-[#581C4E] text-[#581C4E]'
              : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Delivery</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'returns'
              ? 'border-[#581C4E] text-[#581C4E]'
              : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Returns & Exchanges</span>
        </button>

        <button
          onClick={() => setActiveTab('size-guide')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'size-guide'
              ? 'border-[#581C4E] text-[#581C4E]'
              : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
          }`}
        >
          <Ruler className="w-4 h-4" />
          <span>Size & Blouse Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'border-[#581C4E] text-[#581C4E]'
              : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Security</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'terms'
              ? 'border-[#581C4E] text-[#581C4E]'
              : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms & Conditions</span>
        </button>
      </div>

      {/* Policy Content Body */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E8DEC8] space-y-6 text-xs sm:text-sm text-[#4A3E47] leading-relaxed shadow-xs">
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3B1637]">
              Shipping & Delivery Policy
            </h1>
            <p>
              At <strong>SareeAura</strong>, each heirloom drape is inspected for weave density and authenticated with a Silk Mark certification tag before leaving our master warehouse in Varanasi or Hyderabad.
            </p>
            <h3 className="font-serif text-base font-bold text-[#3B1637] pt-2">Domestic Express Shipping (India)</h3>
            <ul className="list-disc list-inside space-y-1.5">
              <li><strong>Free Express Shipping:</strong> Complimentarily provided on all orders totaling ₹3,000 and above. Orders below ₹3,000 carry a nominal flat air-express charge of ₹250.</li>
              <li><strong>Dispatch Time:</strong> Ready-to-wear sarees are dispatched within 24 to 36 hours of payment authorization. Custom tailored blouse orders ship within 4–5 business days.</li>
              <li><strong>Delivery Timeline:</strong> Tier-1 Metros (Hyderabad, Bengaluru, Mumbai, Delhi, Chennai, Kolkata) arrive within 2–3 business days. Tier-2 and non-metro locations arrive within 3–5 business days.</li>
              <li><strong>Logistics Partners:</strong> All consignments are carried exclusively via BlueDart Express Air, Delhivery Air, or DTDC Premium. Full transit tracking numbers are sent via email and SMS.</li>
            </ul>

            <h3 className="font-serif text-base font-bold text-[#3B1637] pt-2">Cash on Delivery (COD)</h3>
            <p>
              Cash on Delivery is available across 18,000+ PIN codes in India for orders up to ₹25,000. For orders exceeding this threshold, digital payment is required to ensure courier insurance coverage.
            </p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3B1637]">
              Hassle-Free 7-Day Returns & Exchanges
            </h1>
            <p>
              We want you to be completely captivated by your SareeAura weave. If for any reason the shade, texture, or drape does not meet your desires, you may return or exchange it within <strong>7 days</strong> of delivery.
            </p>
            <h3 className="font-serif text-base font-bold text-[#3B1637] pt-2">Eligibility Guidelines</h3>
            <ul className="list-disc list-inside space-y-1.5">
              <li>The saree must remain unworn, unwashed, and folded along its original master creases.</li>
              <li>The official <strong>Silk Mark security tag</strong> and SareeAura brand labels must remain intact and untampered.</li>
              <li>Sarees with customized, custom-stitched, or altered blouse pieces are final sale and non-returnable unless a manufacturing defect is verified.</li>
            </ul>

            <h3 className="font-serif text-base font-bold text-[#3B1637] pt-2">Reverse Pickup & Refund Process</h3>
            <p>
              Simply visit your Account page and click &ldquo;Request Return&rdquo;, or email <strong>concierge@sareaura.com</strong>. Our courier partner will pick up the package from your doorstep at zero cost to you. Once received and inspected at our central studio (within 48 hours), your full refund is processed back to the original source (or Bank Account / UPI for COD orders).
            </p>
          </div>
        )}

        {activeTab === 'size-guide' && (
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3B1637]">
              Saree Dimensions & Blouse Tailoring Guide
            </h1>
            <p>
              Authentic Indian sarees are crafted according to centuries-old proportional math to ensure graceful pleats and an opulent, sweeping pallu fall.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <h4 className="font-bold text-[#3B1637] text-sm mb-1">Standard Saree Dimensions</h4>
                <ul className="space-y-1 text-xs text-[#5B4856]">
                  <li>• Body Length: 5.50 metres (approx. 6 yards)</li>
                  <li>• Width / Height: 44 to 46 inches</li>
                  <li>• Blouse Fabric: 0.80 to 1.00 metre unstitched piece</li>
                  <li>• Pleat Capacity: 6 to 8 deep pleats with 2.5m pallu drape</li>
                </ul>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <h4 className="font-bold text-[#3B1637] text-sm mb-1">Blouse Measurement Chart (Inches)</h4>
                <ul className="space-y-1 text-xs text-[#5B4856]">
                  <li>• XS (32): Bust 32&quot; | Underbust 28&quot; | Waist 26&quot;</li>
                  <li>• S (34): Bust 34&quot; | Underbust 30&quot; | Waist 28&quot;</li>
                  <li>• M (36): Bust 36&quot; | Underbust 32&quot; | Waist 30&quot;</li>
                  <li>• L (38): Bust 38&quot; | Underbust 34&quot; | Waist 32&quot;</li>
                  <li>• XL (40): Bust 40&quot; | Underbust 36&quot; | Waist 34&quot;</li>
                  <li>• XXL (42): Bust 42&quot; | Underbust 38&quot; | Waist 36&quot;</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3B1637]">
              Privacy & Data Security Policy
            </h1>
            <p>
              SareeAura prioritizes the absolute confidentiality of our patrons. We strictly adhere to the Digital Personal Data Protection (DPDP) Act of India and international encryption standards.
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>We never sell, rent, or trade your personal email, phone number, or delivery address to third parties.</li>
              <li>All payments are processed through RBI-authorized payment aggregators (Razorpay) using 256-bit bank-grade TLS 1.3 encryption.</li>
              <li>Credit card numbers and CVVs never touch or reside on our servers.</li>
            </ul>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3B1637]">
              Terms of Service
            </h1>
            <p>
              Welcome to SareeAura. By browsing or purchasing through this platform, you agree to the conditions governing our master artisan collections and boutique services. Handloom textiles naturally feature subtle textural variations in yarn and zari tension—these are authentic hallmarks of genuine hand-weaving, not imperfections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
