import React, { useState } from 'react';
import { Mail, Phone, Clock, MessageSquare, Check, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { submitInquiry, showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How can I verify the authenticity of my SareeAura silk saree?',
      a: 'Every pure silk saree from SareeAura arrives with a certified Silk Mark tag featuring a unique verifiable hologram and QR code issued by the Central Silk Board of India.'
    },
    {
      q: 'Do you offer blouse stitching and customized tailoring?',
      a: 'Yes! Every saree includes an unstitched 0.8m blouse piece. On the product page, you can choose "Custom Tailored" to have our boutique master tailor consult with you on neckline, sleeve length, and measurements.'
    },
    {
      q: 'What are the delivery timelines across India and internationally?',
      a: 'We dispatch all verified orders via Priority Air Cargo (BlueDart / Delhivery) within 24 hours. Metros receive delivery in 2–3 days, while rest of India takes 3–4 business days.'
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer an easy 7-day doorstep return and exchange service. If the drape does not meet your expectations, simply initiate a request from your Account page for complimentary pickup.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    submitInquiry({
      name,
      email,
      phone,
      subject,
      message
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
          CUSTOMER CONCIERGE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#3B1637] font-semibold">
          We&apos;re Here to Assist You
        </h1>
        <p className="text-xs sm:text-sm text-[#7B6976]">
          Have questions regarding pure silk weaves, custom bridal trousseau, or current shipments? Our concierge team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 shadow-xs">
          <h2 className="font-serif text-xl font-semibold text-[#3B1637]">
            Send an Inquiry to Our Stylists
          </h2>

          {submitted ? (
            <div className="p-6 bg-[#FAF7F2] rounded-xl border border-emerald-300 text-center space-y-2">
              <Check className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-semibold text-emerald-800">Inquiry Received</h3>
              <p className="text-xs text-[#5B4856]">
                Thank you for reaching out. A dedicated SareeAura stylist will respond to your email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Mobile Phone (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                  />
                </div>

                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Topic / Interest</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                  >
                    <option value="Order Enquiry">Current Order & Delivery Status</option>
                    <option value="Bridal Consultation">Bridal Trousseau Styling Consultation</option>
                    <option value="Custom Weaving">Custom Master Loom Weave Request</option>
                    <option value="Boutique Visit">Schedule Flagship Store Visit</option>
                    <option value="General Inquiry">General Question or Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are looking for..."
                  className="w-full p-2.5 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#581C4E] hover:bg-[#3B1637] text-white font-semibold rounded-full transition-colors cursor-pointer text-xs sm:text-sm"
              >
                Submit Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Details & WhatsApp Concierge */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-4 shadow-xs">
            <h2 className="font-serif text-xl font-semibold text-[#3B1637]">Direct Concierge Desk</h2>

            <div className="space-y-3 text-xs text-[#5B4856]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#581C4E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#3B1637]">Email Inquiries</p>
                  <p>concierge@sareaura.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#581C4E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#3B1637]">Toll-Free Phone</p>
                  <p>+91 40 4852 9100 / +91 1800 212 9900</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#581C4E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#3B1637]">Desk Hours</p>
                  <p>Monday – Sunday: 9:30 AM to 8:30 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#581C4E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#3B1637]">Central Atelier Office</p>
                  <p>Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4 border-t border-[#E8DEC8]">
              <a
                href="https://api.whatsapp.com/send?phone=914048529100&text=Hello%20SareeAura%20Concierge"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 40 4852 9100)</span>
              </a>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-3 shadow-xs">
            <h3 className="font-serif text-lg font-semibold text-[#3B1637]">
              Frequently Asked Questions
            </h3>

            <div className="divide-y divide-[#E8DEC8]/60 text-xs">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-2.5">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-semibold text-[#3B1637] hover:text-[#581C4E] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                  {openFaq === idx && (
                    <p className="text-[#5B4856] mt-2 leading-relaxed animate-in fade-in">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
