import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isSaved = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-[#FAF7F2] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#EFE8DC]">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#3B1637] hover:bg-white hover:text-[#581C4E] transition-all shadow-sm z-10"
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-[#581C4E] text-[#581C4E]' : 'text-[#3B1637]'
            }`}
          />
        </button>

        {/* Discount Badge if available */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#581C4E] text-[#F9F5EC] text-[10px] font-semibold tracking-wider uppercase">
            {product.discountPercent}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        <h3 className="font-sans text-sm font-medium text-[#221C20] line-clamp-1 group-hover:text-[#581C4E] transition-colors">
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-sans font-semibold text-sm text-[#221C20] tabular-nums">
            Rs. {product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-[#8F7788] line-through tabular-nums">
              Rs. {product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Rating Stars & Count */}
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#5C4D58]">
          <div className="flex items-center text-[#B68429]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-[#B68429] text-[#B68429]'
                    : 'text-[#D8CECC]'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-[#7B6976]">({product.reviewCount})</span>
        </div>

        {/* Full-width "Add to Cart" Button */}
        <div className="mt-3">
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 rounded-full bg-[#3B1637] hover:bg-[#581C4E] active:scale-[0.99] text-white text-xs font-medium tracking-wide transition-all shadow-sm hover:shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
