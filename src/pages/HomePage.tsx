import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, ShieldCheck, RefreshCw, Headphones, Sparkles, Check, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  onNavigate: (view: string, param?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const { products, categories, applyCoupon, showToast } = useShop();
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  // Hero slides data
  const heroSlides = [
    {
      kicker: 'TIMELESS ELEGANCE',
      title: 'Beautiful Sarees for Every Story',
      subtitle: 'From traditional handloom to modern weaves, find the perfect saree for every occasion.',
      cta: 'Shop Now',
      category: 'all',
      image: '/src/assets/images/hero_saree_model_1791712828037.jpg'
    },
    {
      kicker: 'BRIDAL HEIRLOOMS',
      title: 'Sacred Kanjivaram & Banarasi Weaves',
      subtitle: 'Pure Mulberry silk interwoven with electroplated gold zari for life’s most auspicious ceremonies.',
      cta: 'Explore Bridal',
      category: 'Bridal & Wedding',
      image: '/src/assets/images/product_kanjivaram_red_1791712939874.jpg'
    },
    {
      kicker: 'CONTEMPORARY GRACE',
      title: 'Weightless Georgette & Organza',
      subtitle: 'Modern pastel hues, fluid drape silhouettes, and understated artisanal embroidery.',
      cta: 'View Festive',
      category: 'Georgette Sarees',
      image: '/src/assets/images/product_georgette_coral_1791712916242.jpg'
    }
  ];

  const currentSlide = heroSlides[activeHeroSlide];

  const nextHeroSlide = () => {
    setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('WELCOME10');
    setCopiedCode(true);
    applyCoupon('WELCOME10');
    showToast('Code WELCOME10 Applied!', '10% discount will be applied automatically at checkout.');
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const bestSellerProducts = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION (Exactly matching reference layout) */}
      <section className="relative overflow-hidden bg-[#2D122D] text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                <span>{currentSlide.kicker}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.1] text-balance">
                {currentSlide.title}
              </h1>

              <p className="text-sm sm:text-base text-[#D9C4D4] max-w-lg leading-relaxed font-light">
                {currentSlide.subtitle}
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('shop', currentSlide.category === 'all' ? undefined : currentSlide.category)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#581C4E] hover:bg-[#6E2462] active:scale-95 text-white font-medium text-sm transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <span>{currentSlide.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slider Dots & Prev/Next Controls */}
              <div className="pt-6 flex items-center justify-between border-t border-[#4A2649]/60 max-w-md">
                <div className="flex items-center gap-6 text-xs text-[#A88C9E]">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHeroSlide(idx)}
                      className={`font-mono transition-all pb-1 cursor-pointer ${
                        activeHeroSlide === idx
                          ? 'text-[#FAF7F2] font-bold border-b-2 border-[#D4AF37]'
                          : 'hover:text-white'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevHeroSlide}
                    className="w-9 h-9 rounded-full border border-[#582A52] hover:border-white hover:bg-[#581C4E] text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextHeroSlide}
                    className="w-9 h-9 rounded-full border border-[#582A52] hover:border-white hover:bg-[#581C4E] text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Fashion Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] bg-[#3B1637]">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (Explore Our Collections - matching circular cards in reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
              SHOP BY CATEGORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B1637] font-semibold">
              Explore Our Collections
            </h2>
            <p className="text-xs sm:text-sm text-[#7B6976]">
              Discover sarees for every mood, occasion and style.
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#581C4E] hover:text-[#3B1637] transition-colors cursor-pointer group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Circular Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', cat.name)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 border-2 border-[#E8DEC8] group-hover:border-[#581C4E] transition-all duration-300 shadow-sm group-hover:shadow-md bg-white">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#3B1637] group-hover:text-[#581C4E] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#845377] mt-0.5">
                {cat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED COLLECTION BANNERS (Matching 2-card layout in reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Wide Banner: Traditional Handloom Sarees */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-[#EAE2D5] min-h-[300px] sm:min-h-[360px] flex items-center shadow-sm group">
            <img
              src="/src/assets/images/banner_handloom_cream_1791712842478.jpg"
              alt="Traditional Handloom Sarees"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Gradient Scrim on Left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/90 via-[#FAF7F2]/60 to-transparent" />

            <div className="relative z-10 p-6 sm:p-10 max-w-md space-y-3">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#845377] uppercase">
                FEATURED COLLECTION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#3B1637] font-semibold leading-tight">
                Traditional Handloom Sarees
              </h3>
              <p className="text-xs sm:text-sm text-[#5B4856]">
                Pure weaves. Timeless beauty. Crafted on heritage pit looms.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('shop', 'Handloom Sarees')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#581C4E] hover:bg-[#3B1637] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  <span>Shop Handloom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Banner: Trending Now - Banarasi Sarees (Deep Purple) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-[#3B1637] min-h-[300px] sm:min-h-[360px] flex items-center shadow-sm group text-white">
            <img
              src="/src/assets/images/banner_banarasi_pallu_1791712855920.jpg"
              alt="Banarasi Sarees"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B1637] via-[#3B1637]/75 to-transparent" />

            <div className="relative z-10 p-6 sm:p-10 max-w-sm space-y-3">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                TRENDING NOW
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold leading-tight">
                Banarasi Sarees
              </h3>
              <p className="text-xs sm:text-sm text-[#D9C4D4]">
                Rich heritage. Modern elegance. Intricate Kadwa and Katan silks.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('shop', 'Banarasi Sarees')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/60 hover:bg-white hover:text-[#3B1637] text-white text-xs font-semibold tracking-wide transition-all cursor-pointer"
                >
                  <span>Shop Banarasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BEST SELLERS / Loved by Many (Exact match to reference product cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
              BEST SELLERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B1637] font-semibold">
              Loved by Many
            </h2>
            <p className="text-xs sm:text-sm text-[#7B6976]">
              Our most popular sarees, handpicked for you.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => onNavigate('shop')}
              className="w-9 h-9 rounded-full border border-[#D8CECC] hover:border-[#581C4E] hover:bg-[#581C4E] hover:text-white flex items-center justify-center text-[#3B1637] transition-colors cursor-pointer"
              aria-label="Previous collection"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="w-9 h-9 rounded-full border border-[#D8CECC] hover:border-[#581C4E] hover:bg-[#581C4E] hover:text-white flex items-center justify-center text-[#3B1637] transition-colors cursor-pointer"
              aria-label="Next collection"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Product Cards Row matching the reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellerProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 5. SPECIAL OFFER BANNER (Exact replica of bottom banner in reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#3B1637] text-white shadow-xl min-h-[160px] sm:min-h-[190px] flex items-center">
          {/* Background silk fabric with jasmine texture on right side */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 overflow-hidden">
            <img
              src="/src/assets/images/banner_banarasi_pallu_1791712855920.jpg"
              alt="Offer Silk Drape"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B1637] via-[#3B1637]/80 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-6">
            <div className="space-y-1.5 max-w-md">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                SPECIAL OFFER
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold">
                Get 10% Off on your first order
              </h3>
              <p className="text-xs text-[#D9C4D4]">
                Valid across all pure silk, bridal, and contemporary designer collections.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyCoupon}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF7F2] text-[#3B1637] hover:bg-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Applied: WELCOME10</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#B68429]" />
                    <span>Use Code: WELCOME10</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VALUE PROPOSITION BAR (Exact match to reference bottom icons) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 px-6 rounded-2xl bg-[#F5EFE6] border border-[#E8DEC8]">
          
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#581C4E] shadow-xs shrink-0">
              <Truck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#3B1637]">Free Shipping</h4>
              <p className="text-[11px] text-[#7B6976]">On orders above Rs. 3000</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#581C4E] shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#3B1637]">Secure Payments</h4>
              <p className="text-[11px] text-[#7B6976]">100% safe & trusted</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#581C4E] shadow-xs shrink-0">
              <RefreshCw className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#3B1637]">Easy Returns</h4>
              <p className="text-[11px] text-[#7B6976]">Hassle-free within 7 days</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#581C4E] shadow-xs shrink-0">
              <Headphones className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#3B1637]">Dedicated Support</h4>
              <p className="text-[11px] text-[#7B6976]">We&apos;re here to help</p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. HERITAGE & MASTER WEAVERS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E8DEC8] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
              THE WEAVE OF AUTHENTICITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B1637] font-semibold">
              Centuries of Heritage, Directly from Weaver to Wardrobe
            </h2>
            <p className="text-xs sm:text-sm text-[#5B4856] leading-relaxed">
              Every SareeAura creation is born on traditional wooden looms in the historic weaving hubs of Varanasi, Kanchipuram, and Maheshwar. By working directly with fifth-generation master artisans, we preserve age-old Kadwa and Korvai techniques while ensuring fair livelihood for weaving families.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-[#3B1637]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DEC8]">
                ✓ 100% Certified Silk Mark
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DEC8]">
                ✓ Handloom Tested Zari
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DEC8]">
                ✓ Ethical Artisan Royalties
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-xl overflow-hidden aspect-square max-w-sm w-full border-4 border-[#FAF7F2] shadow-lg">
              <img
                src="/src/assets/images/banner_handloom_cream_1791712842478.jpg"
                alt="Master weaver artisan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
