import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, ExternalLink, Check, Sparkles } from 'lucide-react';
import { STORE_BRANCHES } from '../data/mockData';
import { StoreBranch } from '../types';

export const StoreLocatorPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [appointmentStore, setAppointmentStore] = useState<StoreBranch | null>(null);
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentPhone, setAppointmentPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('2026-10-18');
  const [appointmentType, setAppointmentType] = useState('Bridal Trousseau Styling');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const cities = ['all', ...Array.from(new Set(STORE_BRANCHES.map(s => s.city)))];

  const filteredStores = selectedCity === 'all'
    ? STORE_BRANCHES
    : STORE_BRANCHES.filter(s => s.city === selectedCity);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentName || !appointmentPhone) return;
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setAppointmentStore(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
          FLAGSHIP ATELIERS & SALONS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#3B1637] font-semibold">
          Experience SareeAura In Person
        </h1>
        <p className="text-xs sm:text-sm text-[#7B6976]">
          Touch the pure silk luster, feel the authentic zari weight, and consult with our bridal styling masters across 5 luxury destinations.
        </p>

        {/* City Filter Pills */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCity === c
                  ? 'bg-[#581C4E] text-white shadow-sm'
                  : 'bg-white border border-[#E8DEC8] text-[#3B1637] hover:border-[#581C4E]'
              }`}
            >
              {c === 'all' ? 'All Flagships (5)' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Boutiques Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map(store => (
          <div
            key={store.id}
            className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="relative aspect-video bg-[#FAF7F2] overflow-hidden">
              <img
                src={store.image}
                alt={store.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#3B1637]/90 text-white text-[10px] font-semibold uppercase tracking-wider backdrop-blur-xs">
                {store.city}
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-semibold text-[#3B1637]">
                  {store.name}
                </h3>

                <p className="text-xs text-[#5B4856] flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#581C4E] shrink-0 mt-0.5" />
                  <span>{store.address}, {store.city} – {store.pincode}</span>
                </p>

                <p className="text-xs text-[#5B4856] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#581C4E] shrink-0" />
                  <span>{store.timings}</span>
                </p>

                <p className="text-xs text-[#5B4856] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#581C4E] shrink-0" />
                  <a href={`tel:${store.phone}`} className="hover:text-[#581C4E] font-medium">
                    {store.phone}
                  </a>
                </p>

                <p className="text-xs text-[#5B4856] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#581C4E] shrink-0" />
                  <span>{store.email}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E8DEC8] flex items-center gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURI(store.name + ' ' + store.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg border border-[#E8DEC8] text-xs font-semibold text-[#3B1637] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setAppointmentStore(store)}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#581C4E] hover:bg-[#3B1637] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Private Appointment Modal */}
      {appointmentStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#845377]">
                Private Boutique Styling Session
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#3B1637]">
                Reserve Appointment at {appointmentStore.city}
              </h3>
              <p className="text-xs text-[#7B6976]">{appointmentStore.name}</p>
            </div>

            {bookingConfirmed ? (
              <div className="p-6 text-center space-y-2 bg-[#FAF7F2] rounded-xl border border-emerald-300">
                <Check className="w-8 h-8 mx-auto text-emerald-600" />
                <h4 className="font-serif text-lg font-semibold text-emerald-800">Appointment Confirmed!</h4>
                <p className="text-xs text-[#5B4856]">
                  Our boutique manager will contact you at {appointmentPhone} to welcome you on {appointmentDate}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={appointmentName}
                    onChange={(e) => setAppointmentName(e.target.value)}
                    placeholder="e.g. Ananya Rao"
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-md focus:outline-none focus:border-[#581C4E]"
                  />
                </div>

                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={appointmentPhone}
                    onChange={(e) => setAppointmentPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-md focus:outline-none focus:border-[#581C4E]"
                  />
                </div>

                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Consultation Objective</label>
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
                  >
                    <option value="Bridal Trousseau Styling">Bridal Trousseau & Muhurtham Selection</option>
                    <option value="Banarasi & Kanjivaram Weave Consultation">Banarasi & Kanjivaram Custom Weave</option>
                    <option value="Festive Wardrobe Curation">Festive & Family Wedding Curation</option>
                    <option value="Custom Blouse Tailoring Fit">Custom Blouse Tailoring & Sizing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAppointmentStore(null)}
                    className="px-4 py-2 border border-[#E8DEC8] rounded-md text-[#845377]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#581C4E] hover:bg-[#3B1637] text-white rounded-md font-semibold"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
