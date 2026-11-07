import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal, X, Search, RotateCcw, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const isCategoryMatch = (product: Product, categoryQuery: string): boolean => {
  if (!categoryQuery || categoryQuery === 'all') return true;
  const target = categoryQuery.toLowerCase().trim();

  // Silk Sarees: ONLY 100% Pure Silk sarees, absolutely NO bridal sarees, NO cotton or georgette
  if (target === 'silk sarees' || target === 'silk-sarees' || target === 'silk') {
    if (
      product.category.toLowerCase().includes('bridal') ||
      product.category.toLowerCase().includes('wedding') ||
      product.occasion.toLowerCase().includes('bridal') ||
      product.occasion.toLowerCase().includes('wedding') ||
      product.category.toLowerCase().includes('cotton') ||
      product.category.toLowerCase().includes('georgette') ||
      product.fabric.toLowerCase().includes('cotton') ||
      product.fabric.toLowerCase().includes('viscose')
    ) {
      return false;
    }
    return product.category.toLowerCase() === 'silk sarees';
  }

  // Cotton Sarees: ONLY authentic cotton sarees, absolutely NO pure silk or georgette
  if (target === 'cotton sarees' || target === 'cotton-sarees' || target === 'cotton') {
    if (
      (product.category.toLowerCase().includes('silk') && !product.category.toLowerCase().includes('cotton')) ||
      product.category.toLowerCase().includes('georgette')
    ) {
      return false;
    }
    return (
      product.category.toLowerCase() === 'cotton sarees' ||
      product.category.toLowerCase().includes('cotton') ||
      product.fabric.toLowerCase().includes('cotton')
    );
  }

  // Direct category equality
  if (product.category.toLowerCase() === target) return true;

  // Banarasi Sarees
  if (target.includes('banarasi')) {
    if (
      product.category.toLowerCase().includes('banarasi') ||
      product.name.toLowerCase().includes('banarasi') ||
      product.details?.weave?.toLowerCase().includes('varanasi') ||
      product.details?.origin?.toLowerCase().includes('varanasi')
    ) {
      return true;
    }
  }

  // Kanjivaram Sarees
  if (target.includes('kanjivaram') || target.includes('kanchipuram')) {
    if (
      product.category.toLowerCase().includes('kanjivaram') ||
      product.name.toLowerCase().includes('kanjivaram') ||
      product.details?.origin?.toLowerCase().includes('kanchipuram') ||
      product.details?.weave?.toLowerCase().includes('korvai')
    ) {
      return true;
    }
  }

  // Georgette Sarees
  if (target.includes('georgette')) {
    if (
      product.category.toLowerCase().includes('cotton') ||
      product.category.toLowerCase() === 'silk sarees' ||
      product.category.toLowerCase().includes('banarasi') ||
      product.category.toLowerCase().includes('kanjivaram')
    ) {
      return false;
    }
    return (
      product.category.toLowerCase() === 'georgette sarees' ||
      product.category.toLowerCase().includes('georgette') ||
      product.fabric.toLowerCase().includes('georgette')
    );
  }

  // Handloom Sarees
  if (target.includes('handloom')) {
    if (
      product.category.toLowerCase().includes('handloom') ||
      product.name.toLowerCase().includes('handloom') ||
      product.details?.weave?.toLowerCase().includes('handloom') ||
      product.details?.certification?.toLowerCase().includes('handloom')
    ) {
      return true;
    }
  }

  // Party Wear Sarees
  if (target.includes('party')) {
    if (
      product.category.toLowerCase().includes('party') ||
      product.occasion.toLowerCase().includes('party') ||
      product.name.toLowerCase().includes('party')
    ) {
      return true;
    }
  }

  // Bridal & Wedding Sarees
  if (target.includes('bridal') || target.includes('wedding')) {
    if (
      product.category.toLowerCase().includes('bridal') ||
      product.category.toLowerCase().includes('wedding') ||
      product.occasion.toLowerCase().includes('bridal') ||
      product.occasion.toLowerCase().includes('wedding') ||
      product.name.toLowerCase().includes('bridal')
    ) {
      return true;
    }
  }

  return false;
};

interface ShopPageProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCategory, onSelectProduct }) => {
  const { products, categories } = useShop();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Sync category state when navigating from header or external view
  useEffect(() => {
    if (initialCategory !== undefined) {
      setSelectedCategory(initialCategory || 'all');
      setSelectedFabric('all');
      setSelectedOccasion('all');
      setSelectedColor('all');
      setSearchQuery('');
    }
  }, [initialCategory]);

  // Available filter options extracted dynamically
  const fabrics = ['all', ...Array.from(new Set(products.map(p => p.fabric)))];
  const occasions = ['all', ...Array.from(new Set(products.map(p => p.occasion)))];
  const colors = ['all', ...Array.from(new Set(products.map(p => p.color)))];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category Match
      if (selectedCategory !== 'all') {
        if (!isCategoryMatch(product, selectedCategory)) {
          return false;
        }
      }

      // Fabric Match
      if (selectedFabric !== 'all' && product.fabric !== selectedFabric) {
        return false;
      }

      // Occasion Match
      if (selectedOccasion !== 'all' && product.occasion !== selectedOccasion) {
        return false;
      }

      // Color Match
      if (selectedColor !== 'all' && !product.color.toLowerCase().includes(selectedColor.toLowerCase())) {
        return false;
      }

      // Price Match
      if (product.price > maxPrice) {
        return false;
      }

      // In Stock Match
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Search Query Match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText =
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.fabric.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default
    });
  }, [products, categories, selectedCategory, selectedFabric, selectedOccasion, selectedColor, maxPrice, inStockOnly, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedFabric('all');
    setSelectedOccasion('all');
    setSelectedColor('all');
    setMaxPrice(20000);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedFabric !== 'all' ||
    selectedOccasion !== 'all' ||
    selectedColor !== 'all' ||
    maxPrice < 20000 ||
    inStockOnly ||
    searchQuery.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header & Breadcrumb */}
      <div className="space-y-2 border-b border-[#E8DEC8] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#845377]">
          <span>Home</span>
          <span>/</span>
          <span className="text-[#3B1637] font-semibold">Catalogue</span>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-[#581C4E] font-medium">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3B1637] font-semibold">
              {selectedCategory === 'all' ? 'All Handcrafted Sarees' : selectedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-[#7B6976] mt-1">
              Showing {filteredProducts.length} authentic handloom & designer weaves
            </p>
          </div>

          {/* Quick Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#845377]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in sarees..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8DEC8] rounded-full focus:outline-none focus:border-[#581C4E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[#845377] hover:text-[#3B1637]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Layout (Filters Sidebar + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP FILTERS SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-6 sticky top-28 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#581C4E]" />
              <h2 className="text-sm font-bold text-[#3B1637] tracking-wider uppercase font-sans">
                Filter Sarees
              </h2>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#581C4E] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-[#3B1637] uppercase tracking-wider">
              Category
            </h3>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors cursor-pointer flex justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-[#581C4E] text-white font-semibold'
                    : 'text-[#4A3E47] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[11px] opacity-75">{products.length}</span>
              </button>
              {categories.map(cat => {
                const count = products.filter(p => isCategoryMatch(p, cat.name)).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors cursor-pointer flex justify-between ${
                      selectedCategory.toLowerCase() === cat.name.toLowerCase()
                        ? 'bg-[#581C4E] text-white font-semibold'
                        : 'text-[#4A3E47] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] opacity-75">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Occasion Filter */}
          <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
            <h3 className="text-xs font-semibold text-[#3B1637] uppercase tracking-wider">
              Occasion
            </h3>
            <div className="space-y-1">
              {occasions.map(occ => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors cursor-pointer capitalize ${
                    selectedOccasion === occ
                      ? 'bg-[#581C4E] text-white font-semibold'
                      : 'text-[#4A3E47] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {occ === 'all' ? 'All Occasions' : occ}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Filter */}
          <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
            <h3 className="text-xs font-semibold text-[#3B1637] uppercase tracking-wider">
              Fabric & Weave
            </h3>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {fabrics.map(fab => (
                <button
                  key={fab}
                  onClick={() => setSelectedFabric(fab)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors cursor-pointer ${
                    selectedFabric === fab
                      ? 'bg-[#581C4E] text-white font-semibold'
                      : 'text-[#4A3E47] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {fab === 'all' ? 'All Fabrics' : fab}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#3B1637] uppercase tracking-wider">Max Price</span>
              <span className="font-bold text-[#581C4E] tabular-nums">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#581C4E] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#845377]">
              <span>₹2,000</span>
              <span>₹20,000+</span>
            </div>
          </div>

          {/* Color Palette Filter */}
          <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
            <h3 className="text-xs font-semibold text-[#3B1637] uppercase tracking-wider">
              Color Tone
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {colors.map(col => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                    selectedColor === col
                      ? 'bg-[#3B1637] text-white border-[#3B1637]'
                      : 'bg-[#FAF7F2] text-[#4A3E47] border-[#E8DEC8] hover:border-[#581C4E]'
                  }`}
                >
                  {col === 'all' ? 'All Colors' : col}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <div className="pt-2 border-t border-[#E8DEC8]">
            <label className="flex items-center gap-2 text-xs text-[#3B1637] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#581C4E] accent-[#581C4E]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* PRODUCTS LISTING AREA */}
        <main className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Mobile filter button + Sorting */}
          <div className="bg-white p-4 rounded-xl border border-[#E8DEC8] flex items-center justify-between gap-4 flex-wrap">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8] text-xs font-semibold text-[#3B1637]"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>

            {/* Active Pills Summary */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#845377]">
              <span>Showing <strong>{filteredProducts.length}</strong> items</span>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-[#845377] hidden sm:inline">Sort By:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs bg-[#FAF7F2] border border-[#E8DEC8] text-[#3B1637] font-medium py-2 px-3 rounded-lg focus:outline-none focus:border-[#581C4E] cursor-pointer"
                >
                  <option value="featured">Featured / Curated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid or No-Results Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DEC8] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mx-auto text-[#845377]">
                <Filter className="w-8 h-8 opacity-60" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-semibold text-[#3B1637]">
                  No Sarees Match Your Current Filters
                </h3>
                <p className="text-xs text-[#845377] max-w-sm mx-auto">
                  We couldn&apos;t find any weaves matching your specified combination. Try resetting your price or fabric criteria.
                </p>
              </div>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 rounded-full bg-[#581C4E] text-white text-xs font-semibold hover:bg-[#3B1637] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTERS MODAL DRAWER */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white p-6 shadow-2xl flex flex-col space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-serif text-lg font-semibold text-[#3B1637]">Filters</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-[#845377] hover:text-[#3B1637]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category Select */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-[#845377]">Category</p>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs p-2 border border-[#E8DEC8] rounded-md"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Price slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#845377]">Max Price</span>
                  <span className="font-bold text-[#581C4E]">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="20000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#581C4E]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-2 border border-[#E8DEC8] text-xs font-medium rounded-lg text-[#3B1637]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 py-2 bg-[#581C4E] text-white text-xs font-medium rounded-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
