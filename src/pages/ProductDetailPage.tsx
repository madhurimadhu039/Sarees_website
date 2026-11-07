import React, { useState } from 'react';
import { Heart, Star, ShieldCheck, Truck, RotateCcw, Share2, Check, ArrowRight, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: string, param?: string) => void;
  onBuyNow: (product: Product, quantity: number, color: string, blouse: 'unstitched' | 'standard' | 'custom') => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onSelectProduct,
  onNavigate,
  onBuyNow
}) => {
  const { addToCart, toggleWishlist, isInWishlist, products, reviews, addReview, showToast } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [blouseStitching, setBlouseStitching] = useState<'unstitched' | 'standard' | 'custom'>('unstitched');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping' | 'reviews'>('details');

  // PIN Code Estimator State
  const [pincode, setPincode] = useState('500081');
  const [pincodeStatus, setPincodeStatus] = useState<{ checked: boolean; valid?: boolean; message?: string; eta?: string; cod?: boolean }>({
    checked: true,
    valid: true,
    message: 'Express Delivery Available to Hyderabad',
    eta: 'Delivery by Wednesday, October 14',
    cod: true
  });

  // Review Form State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const isSaved = isInWishlist(product.id);

  // Check PIN code function
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setPincodeStatus({
        checked: true,
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
      return;
    }

    // Realistic delivery estimation based on major metro prefixes
    const isMetro = ['11', '40', '50', '56', '60', '70'].some(prefix => clean.startsWith(prefix));
    const deliveryDays = isMetro ? 2 : 4;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + deliveryDays);
    const dateStr = estDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    setPincodeStatus({
      checked: true,
      valid: true,
      message: `Verified serviceability for PIN ${clean}`,
      eta: `Express Air Delivery by ${dateStr}`,
      cod: true
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, blouseStitching);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, quantity, selectedColor, blouseStitching);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this gorgeous ${product.name} from SareeAura!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to clipboard.');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    addReview({
      productId: product.id,
      customerName: newReviewAuthor.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      isVerifiedBuyer: true
    });

    setShowReviewModal(false);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setActiveTab('reviews');
  };

  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.id !== product.id && (p.category === product.category || p.fabric === product.fabric)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#845377]">
        <button onClick={() => onNavigate('home')} className="hover:text-[#581C4E]">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('shop')} className="hover:text-[#581C4E]">Catalogue</button>
        <span>/</span>
        <button onClick={() => onNavigate('shop', product.category)} className="hover:text-[#581C4E]">{product.category}</button>
        <span>/</span>
        <span className="text-[#3B1637] font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT: GALLERY SECTION */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sticky top-28">
          {/* Thumbnails list */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  selectedImageIndex === idx
                    ? 'border-[#581C4E] shadow-sm'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Selected Image */}
          <div className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[#EFE8DC] shadow-md group">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            {/* Quick Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.discountPercent > 0 && (
                <span className="px-2.5 py-1 rounded bg-[#581C4E] text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
                  {product.discountPercent}% OFF
                </span>
              )}
              {product.isBestSeller && (
                <span className="px-2.5 py-1 rounded bg-[#D4AF37] text-[#2D122D] text-xs font-bold uppercase tracking-wider shadow-sm">
                  Best Seller
                </span>
              )}
            </div>

            {/* Floating Share button */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#3B1637] shadow-sm transition-colors cursor-pointer"
              title="Share product link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT: CONTIGUOUS PURCHASE MODULE */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-[#E8DEC8] pb-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
                {product.category}
              </span>
              <span className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Silk Mark Authenticated
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#3B1637] font-semibold leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews summary */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center text-[#B68429]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#B68429] text-[#B68429]'
                        : 'text-[#D8CECC]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#3B1637]">{product.rating}</span>
              <span className="text-xs text-[#845377]">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Pricing Section */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="font-sans text-2xl sm:text-3xl font-bold text-[#581C4E] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-[#8F7788] line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-[#845377]">Inclusive of all applicable taxes. Free insured air shipping.</p>
          </div>

          {/* Color & Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#3B1637] uppercase tracking-wider">
                Select Color: <span className="text-[#581C4E] font-medium">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.variants.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(v.colorName)}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedColor === v.colorName
                        ? 'border-[#581C4E] bg-white shadow-xs font-semibold'
                        : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3E47]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: v.colorHex }}
                    />
                    <span>{v.colorName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blouse Stitching Preference */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-[#3B1637] uppercase tracking-wider">
                Blouse Piece Option
              </label>
              <button
                onClick={() => onNavigate('policy', 'size-guide')}
                className="text-[11px] text-[#581C4E] font-medium underline"
              >
                Measurement Guide
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setBlouseStitching('unstitched')}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  blouseStitching === 'unstitched'
                    ? 'border-[#581C4E] bg-white shadow-xs text-[#3B1637] font-semibold'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3E47]'
                }`}
              >
                <p className="font-semibold">Unstitched Fabric (Free)</p>
                <p className="text-[10px] text-[#845377]">0.8m running silk piece included</p>
              </button>
              <button
                onClick={() => setBlouseStitching('custom')}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  blouseStitching === 'custom'
                    ? 'border-[#581C4E] bg-white shadow-xs text-[#3B1637] font-semibold'
                    : 'border-[#E8DEC8] bg-[#FAF7F2] text-[#4A3E47]'
                }`}
              >
                <p className="font-semibold">Custom Tailored (+₹999)</p>
                <p className="text-[10px] text-[#845377]">Consulted by our boutique master</p>
              </button>
            </div>
          </div>

          {/* Quantity & Stock Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3B1637] uppercase tracking-wider">Quantity</span>
              <span className="text-xs font-medium text-emerald-800">
                Only {product.stockCount} left in handloom inventory
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E8DEC8] rounded-full bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-sm text-[#581C4E] hover:bg-[#FAF7F2] transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-xs font-semibold tabular-nums text-[#221C20]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-3.5 py-2 text-sm text-[#581C4E] hover:bg-[#FAF7F2] transition-colors"
                >
                  +
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isSaved
                    ? 'border-[#581C4E] bg-[#581C4E]/10 text-[#581C4E]'
                    : 'border-[#E8DEC8] bg-white text-[#3B1637] hover:border-[#581C4E]'
                }`}
                title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#581C4E]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Primary Action Buttons: Add to Cart & Buy Now */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 rounded-full border-2 border-[#581C4E] bg-white hover:bg-[#FAF7F2] text-[#581C4E] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              Add to Shopping Bag
            </button>
            <button
              onClick={handleBuyNowClick}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#581C4E] hover:bg-[#3B1637] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* PIN Code Delivery Estimator */}
          <div className="p-4 rounded-xl bg-white border border-[#E8DEC8] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3B1637] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#581C4E]" />
              <span>Check Delivery & Serviceability</span>
            </div>

            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                value={pincode}
                maxLength={6}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 text-xs px-3 py-2 border border-[#E8DEC8] rounded-lg focus:outline-none focus:border-[#581C4E]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FAF7F2] border border-[#581C4E] text-[#581C4E] text-xs font-semibold rounded-lg hover:bg-[#581C4E] hover:text-white transition-colors"
              >
                Check
              </button>
            </form>

            {pincodeStatus.checked && (
              <div className="text-xs space-y-1 pt-1">
                {pincodeStatus.valid ? (
                  <>
                    <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      {pincodeStatus.eta}
                    </p>
                    <p className="text-[#845377] text-[11px]">
                      Cash on Delivery available · Free returns within 7 days
                    </p>
                  </>
                ) : (
                  <p className="text-red-600 text-[11px] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {pincodeStatus.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-[#5B4856]">
            <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#581C4E]" />
              <span>100% Pure Silk</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
              <Truck className="w-4 h-4 mx-auto mb-1 text-[#581C4E]" />
              <span>Free Air Cargo</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8]">
              <RotateCcw className="w-4 h-4 mx-auto mb-1 text-[#581C4E]" />
              <span>7-Day Return</span>
            </div>
          </div>

        </div>
      </div>

      {/* TABS SECTION: Specifications, Care, Shipping, Reviews */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DEC8] space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-[#E8DEC8] text-xs sm:text-sm font-semibold overflow-x-auto gap-6 sm:gap-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'border-[#581C4E] text-[#581C4E]'
                : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
            }`}
          >
            Weave & Specifications
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'care'
                ? 'border-[#581C4E] text-[#581C4E]'
                : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
            }`}
          >
            Saree Care Instructions
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'shipping'
                ? 'border-[#581C4E] text-[#581C4E]'
                : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
            }`}
          >
            Shipping & Hassle-Free Returns
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#581C4E] text-[#581C4E]'
                : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
            }`}
          >
            Customer Reviews ({productReviews.length})
          </button>
        </div>

        {/* Tab Content 1: Details */}
        {activeTab === 'details' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#4A3E47] leading-relaxed">
            <p>{product.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DEC8]">
                <span className="font-bold text-[#3B1637] block">Weaving Technique:</span>
                <span>{product.details.weave}</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DEC8]">
                <span className="font-bold text-[#3B1637] block">Saree Length & Blouse:</span>
                <span>{product.details.length}</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DEC8]">
                <span className="font-bold text-[#3B1637] block">Regional Origin:</span>
                <span>{product.details.origin}</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DEC8]">
                <span className="font-bold text-[#3B1637] block">Textile Certification:</span>
                <span className="text-emerald-800 font-semibold">{product.details.certification}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Care */}
        {activeTab === 'care' && (
          <div className="space-y-3 text-xs sm:text-sm text-[#4A3E47]">
            <p className="font-semibold text-[#3B1637]">
              Preserving Your Heirloom Silk Saree:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              {product.careInstructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
              <li>Store sarees in breathable cotton or muslin bags away from moisture and direct sunlight.</li>
              <li>Aerate your handloom saree in shade once every 6 months to maintain fiber vitality.</li>
            </ul>
          </div>
        )}

        {/* Tab Content 3: Shipping */}
        {activeTab === 'shipping' && (
          <div className="space-y-3 text-xs sm:text-sm text-[#4A3E47] leading-relaxed">
            <p>
              <strong>Express Delivery:</strong> Orders are dispatched from our Varanasi / Hyderabad master ateliers within 24 hours via BlueDart or Delhivery Air Cargo. Delivery typically takes 2–4 business days across India.
            </p>
            <p>
              <strong>7-Day Returns:</strong> If you are not completely enchanted by your drape, we offer a hassle-free 7-day pickup and full exchange or refund, provided the Silk Mark tag and original fold are intact.
            </p>
          </div>
        )}

        {/* Tab Content 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DEC8] pb-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#3B1637]">
                  Verified Customer Experiences
                </h3>
                <p className="text-xs text-[#845377]">
                  Real reviews from patrons across India and worldwide.
                </p>
              </div>
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-4 py-2 bg-[#581C4E] text-white text-xs font-semibold rounded-full hover:bg-[#3B1637] transition-colors self-start cursor-pointer"
              >
                Write a Review
              </button>
            </div>

            {productReviews.length === 0 ? (
              <p className="text-xs text-[#845377] py-6 text-center">
                Be the first to share your experience with this beautiful saree!
              </p>
            ) : (
              <div className="space-y-4">
                {productReviews.map(rev => (
                  <div key={rev.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#3B1637]">{rev.customerName}</span>
                        {rev.isVerifiedBuyer && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-medium">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#845377]">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-[#B68429]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < rev.rating ? 'fill-[#B68429] text-[#B68429]' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-[#4A3E47] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Sarees Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="border-b border-[#E8DEC8] pb-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#845377] uppercase">
              YOU MAY ALSO ADORE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3B1637] font-semibold">
              Complementary Weaves
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}

      {/* WRITE REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-semibold text-[#3B1637]">
              Share Your Saree Experience
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Radhika Verma"
                  className="w-full p-2 border border-[#E8DEC8] rounded-md focus:outline-none focus:border-[#581C4E]"
                />
              </div>

              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Rating</label>
                <div className="flex gap-2 text-lg text-[#B68429]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= newReviewRating ? 'fill-[#B68429] text-[#B68429]' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Review</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="How was the weave texture, zari shimmer, and drape quality?"
                  className="w-full p-2 border border-[#E8DEC8] rounded-md focus:outline-none focus:border-[#581C4E]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-3 py-1.5 border border-[#E8DEC8] rounded-md text-[#845377]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#581C4E] text-white rounded-md font-semibold"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
