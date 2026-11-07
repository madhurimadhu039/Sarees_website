import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onViewCategory: (categoryName: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onViewCategory
}) => {
  const { products, categories } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase()) ||
        p.color.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ['Banarasi Silk', 'Kanjivaram', 'Purple Saree', 'Georgette', 'Bridal', 'Handloom'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-2xl w-full border border-[#E8DEC8] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E8DEC8] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#581C4E] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by weave, fabric, color, or occasion (e.g. Banarasi, Kanjivaram, Purple)..."
            className="w-full text-sm sm:text-base bg-transparent text-[#221C20] placeholder-[#8F7788] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8F7788] hover:text-[#221C20] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 text-[#581C4E] hover:bg-[#F2ECE1] rounded-lg transition-colors font-medium ml-2"
          >
            ESC
          </button>
        </div>

        {/* Results / Popular Tags */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-5">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#845377] mb-2.5">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#E8DEC8] text-xs text-[#3B1637] hover:border-[#581C4E] hover:bg-[#F2ECE1] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Tag className="w-3 h-3 text-[#581C4E]" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#845377] mb-2.5">
                  Explore by Category
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.slice(0, 6).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onClose();
                        onViewCategory(cat.name);
                      }}
                      className="p-2.5 rounded-xl bg-white border border-[#E8DEC8] text-left hover:border-[#581C4E] transition-colors group cursor-pointer"
                    >
                      <p className="text-xs font-semibold text-[#3B1637] group-hover:text-[#581C4E]">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-[#845377]">{cat.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#845377] space-y-2">
              <p className="text-sm font-medium">No sarees found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs">Try searching for &ldquo;Banarasi&rdquo;, &ldquo;Silk&rdquo;, &ldquo;Georgette&rdquo;, or &ldquo;Kanjivaram&rdquo;.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#845377]">
                Found {filteredProducts.length} matching {filteredProducts.length === 1 ? 'saree' : 'sarees'}
              </p>
              <div className="divide-y divide-[#E8DEC8]/60">
                {filteredProducts.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(prod);
                    }}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-white px-3 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover rounded-lg bg-[#FAF7F2]"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-[#221C20] group-hover:text-[#581C4E] transition-colors">
                          {prod.name}
                        </h4>
                        <p className="text-[11px] text-[#845377]">
                          {prod.fabric} · {prod.color}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#581C4E] tabular-nums">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#845377] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
