import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, Users, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero Story Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
          OUR SACRED LEGACY
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3B1637] font-semibold leading-tight">
          Tradition in Every Drape, Reverence in Every Thread
        </h1>
        <p className="text-sm sm:text-base text-[#6E5566] leading-relaxed">
          Founded with a pledge to honor India&apos;s ancient handloom guilds, SareeAura bridges the timeless mastery of hereditary weavers with the discerning grace of modern women across the globe.
        </p>
      </div>

      {/* Heritage Visual Spotlight */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-xl bg-[#3B1637]">
        <img
          src="/src/assets/images/hero_saree_model_1791712828037.jpg"
          alt="SareeAura Heritage Weaves"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 sm:p-12">
          <div className="text-white space-y-1">
            <p className="font-serif text-xl sm:text-2xl font-semibold">Kadwa Brocade Weaving in Varanasi</p>
            <p className="text-xs sm:text-sm text-slate-200">Where a single saree demands up to 45 days of painstaking manual shuttle work.</p>
          </div>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-center text-[#581C4E]">
            <Award className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#3B1637]">Pure Silk Integrity</h3>
          <p className="text-xs text-[#5B4856] leading-relaxed">
            Every Mulberry, Katan, and Tussar yarn is verified with Silk Mark certification. We never compromise on thread density, real metallic zari purity, or dye colorfastness.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-center text-[#581C4E]">
            <Users className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#3B1637]">Ethical Artisan Guilds</h3>
          <p className="text-xs text-[#5B4856] leading-relaxed">
            We bypass exploitative intermediary syndicates, ensuring over 450 hereditary weaving families in Varanasi, Kanchipuram, and Chanderi receive guaranteed living wages and healthcare dignity.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-center text-[#581C4E]">
            <Heart className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#3B1637]">Heirlooms for Generations</h3>
          <p className="text-xs text-[#5B4856] leading-relaxed">
            A SareeAura drape is never merely transient fashion. It is designed to be worn at sacred ceremonies today and lovingly passed down as an heirloom to daughters tomorrow.
          </p>
        </div>
      </div>

      {/* Milestone Journey */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E8DEC8] space-y-8 shadow-xs">
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
            CHRONOLOGY
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#3B1637]">
            Our Milestone Odyssey
          </h2>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto border-l-2 border-[#581C4E]/40 pl-6 text-xs sm:text-sm">
          <div className="space-y-1 relative">
            <span className="w-3 h-3 rounded-full bg-[#581C4E] absolute -left-[31px] top-1" />
            <span className="font-bold text-[#845377]">2019 — The First Looms in Varanasi</span>
            <p className="text-[#4A3E47]">Initiated direct partnerships with 12 master weavers in the historic Madanpura and Ramnagar clusters of Varanasi to resurrect endangered Kadwa motifs.</p>
          </div>

          <div className="space-y-1 relative">
            <span className="w-3 h-3 rounded-full bg-[#581C4E] absolute -left-[31px] top-1" />
            <span className="font-bold text-[#845377]">2021 — Kanchipuram Korvai Expansion</span>
            <p className="text-[#4A3E47]">Partnered with traditional temple border weavers in Tamil Nadu, securing GI-certified pure silver and gold electroplated zari sourcing.</p>
          </div>

          <div className="space-y-1 relative">
            <span className="w-3 h-3 rounded-full bg-[#581C4E] absolute -left-[31px] top-1" />
            <span className="font-bold text-[#845377]">2023 — Flagship Boutique in Hyderabad</span>
            <p className="text-[#4A3E47]">Opened our experiential bridal salon on Jubilee Hills Road 36, introducing private trousseau drape styling suites.</p>
          </div>

          <div className="space-y-1 relative">
            <span className="w-3 h-3 rounded-full bg-[#581C4E] absolute -left-[31px] top-1" />
            <span className="font-bold text-[#845377]">2026 — Pan-India Air Logistics & Global Reach</span>
            <p className="text-[#4A3E47]">Over 50,000 brides and connoisseurs adorned across 40 countries, with 5 flagship boutiques and direct master-weaver transparency.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
