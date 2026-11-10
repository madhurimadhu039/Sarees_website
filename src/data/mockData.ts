import { Product, Category, StoreBranch, Coupon, Order, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-silk',
    name: 'Silk Sarees',
    slug: 'silk-sarees',
    subtitle: 'Elegant & Rich',
    image: '/src/assets/images/product_silk_royal_blue_kanjivaram.jpg',
    description: 'Pure Mulberry and Katan silk woven with luminous gold and silver zari.'
  },
  {
    id: 'cat-cotton',
    name: 'Cotton Sarees',
    slug: 'cotton-sarees',
    subtitle: 'Comfort & Class',
    image: '/src/assets/images/product_cotton_blue_1791712928505.jpg',
    description: 'Breathable hand-spun Chanderi and Bengal cottons with artisanal borders.'
  },
  {
    id: 'cat-georgette',
    name: 'Georgette Sarees',
    slug: 'georgette-sarees',
    subtitle: 'Light & Graceful',
    image: '/src/assets/images/product_georgette_coral_1791712916242.jpg',
    description: 'Fluid drapes adorned with subtle sequin embroidery and delicate zari accents.'
  },
  {
    id: 'cat-kanjivaram',
    name: 'Kanjivaram Sarees',
    slug: 'kanjivaram-sarees',
    subtitle: 'Royal Tradition',
    image: '/src/assets/images/product_kanjivaram_red_1791712939874.jpg',
    description: 'Authentic temple border silks woven in Tamil Nadu with pure gold zari.'
  },
  {
    id: 'cat-party',
    name: 'Party Wear Sarees',
    slug: 'party-wear',
    subtitle: 'For Special Moments',
    image: '/src/assets/images/product_party_champagne_shimmer.jpg',
    description: 'Contemporary silhouettes, glamorous shimmer, and opulent metallic evening drapes.'
  },
  {
    id: 'cat-handloom',
    name: 'Handloom Sarees',
    slug: 'handloom-sarees',
    subtitle: 'Pure & Authentic',
    image: '/src/assets/images/product_handloom_ivory_temple.jpg',
    description: 'Traditional master weaver handlooms honoring centuries-old craft heritage.'
  },
  {
    id: 'cat-banarasi',
    name: 'Banarasi Sarees',
    slug: 'banarasi-sarees',
    subtitle: 'Rich Heritage',
    image: '/src/assets/images/banner_banarasi_pallu_1791712855920.jpg',
    description: 'Varanasi brocade silks with regal floral jaal and meenakari motifs.'
  },
  {
    id: 'cat-bridal',
    name: 'Bridal & Wedding',
    slug: 'bridal-wedding',
    subtitle: 'Sacred Splendour',
    image: '/src/assets/images/hero_saree_model_1791712828037.jpg',
    description: 'Heirloom trousseau sarees meant to be cherished across generations.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Royal Purple Banarasi Silk Saree',
    slug: 'royal-purple-banarasi-silk-saree',
    category: 'Banarasi Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Royal Purple',
    occasion: 'Bridal & Wedding',
    zariType: 'Gold & Silver Metallic Zari',
    price: 8500,
    originalPrice: 10500,
    discountPercent: 19,
    description: 'Draped in regal majesty, this deep violet-purple Banarasi Katan silk saree features a masterfully woven golden zari floral jaal with opulent Kadwa motifs. Crafted by hereditary master weavers in Varanasi, it features an ornate pallu and a coordinating silk blouse piece.',
    details: {
      weave: 'Varanasi Kadwa Handloom',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Running unstitched silk blouse included',
      weight: '820 grams',
      origin: 'Varanasi, Uttar Pradesh',
      certification: 'Silk Mark Certified 100% Pure Silk'
    },
    careInstructions: [
      'Strictly Dry Clean only',
      'Wrap in soft unbleached muslin cloth for storage',
      'Iron on reverse side using low heat setting',
      'Avoid spraying perfume directly on zari work'
    ],
    images: [
      '/src/assets/images/product_banarasi_purple_1791712866730.jpg',
      '/src/assets/images/banner_banarasi_pallu_1791712855920.jpg',
      '/src/assets/images/hero_saree_model_1791712828037.jpg'
    ],
    rating: 4.9,
    reviewCount: 24,
    inStock: true,
    stockCount: 8,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: false,
    variants: [
      { colorName: 'Royal Purple', colorHex: '#4A154B', image: '/src/assets/images/product_banarasi_purple_1791712866730.jpg' },
      { colorName: 'Emerald Green', colorHex: '#1B4D3E', image: '/src/assets/images/product_meenakari_green_1791712880156.jpg' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Meenakari Silk Saree',
    slug: 'meenakari-silk-saree',
    category: 'Silk Sarees',
    fabric: 'Pure Mulberry Silk',
    color: 'Emerald Green',
    occasion: 'Festive Collections',
    zariType: 'Fine Tested Zari with Meenakari Threadwork',
    price: 6999,
    originalPrice: 8499,
    discountPercent: 18,
    description: 'A masterpiece of resplendent jewel tones, this emerald green silk saree is accentuated with multi-colored Meenakari floral threadwork along the border and scalloped pallu. The luminous sheen catches the light gracefully from every angle.',
    details: {
      weave: 'Artisanal Meenakari Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Contrasting green brocade blouse piece included',
      weight: '750 grams',
      origin: 'Chanderi, Madhya Pradesh',
      certification: 'Silk Mark Certified Pure Silk'
    },
    careInstructions: [
      'Dry Clean Recommended',
      'Store in a cool, dry place wrapped in cotton',
      'Steam iron only on delicate fabric setting'
    ],
    images: [
      '/src/assets/images/product_silk_emerald_banarasi.jpg',
      '/src/assets/images/product_meenakari_green_1791712880156.jpg'
    ],
    rating: 4.8,
    reviewCount: 18,
    inStock: true,
    stockCount: 12,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: false,
    variants: [
      { colorName: 'Emerald Green', colorHex: '#1B4D3E', image: '/src/assets/images/product_meenakari_green_1791712880156.jpg' },
      { colorName: 'Royal Purple', colorHex: '#4A154B', image: '/src/assets/images/product_banarasi_purple_1791712866730.jpg' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Soft Georgette Saree',
    slug: 'soft-georgette-saree',
    category: 'Georgette Sarees',
    fabric: 'Pure Viscose Georgette',
    color: 'Blush Coral',
    occasion: 'Party Wear',
    zariType: 'Subtle Micro-Zari & Sequin Embroidery',
    price: 4499,
    originalPrice: 5200,
    discountPercent: 13,
    description: 'Weightless and ethereal, this blush coral pink Georgette saree drapes like a dream. Adorned with delicate tone-on-tone paisley embroidery along the border, it offers timeless understated glamour for cocktail soirees and daytime celebrations.',
    details: {
      weave: 'Hand-Embroidered Georgette',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Embroidered blouse fabric included',
      weight: '510 grams',
      origin: 'Surat, Gujarat',
      certification: 'Quality Verified High-Twist Georgette'
    },
    careInstructions: [
      'Gentle hand wash with mild detergent or dry clean',
      'Do not wring; drip dry in shade',
      'Mild steam press'
    ],
    images: [
      '/src/assets/images/product_georgette_coral_1791712916242.jpg'
    ],
    rating: 4.9,
    reviewCount: 32,
    inStock: true,
    stockCount: 15,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-4',
    name: 'Elegant Cotton Saree',
    slug: 'elegant-cotton-saree',
    category: 'Cotton Sarees',
    fabric: 'Chanderi Cotton Silk',
    color: 'Slate Blue',
    occasion: 'Ethnic Wear',
    zariType: 'Silver Zari Border',
    price: 2999,
    originalPrice: 3500,
    discountPercent: 14,
    description: 'An ode to understated Indian elegance, this slate blue Chanderi cotton silk saree blends the breathability of fine handloom cotton with the soft luster of raw silk. Features a clean silver zari woven temple border.',
    details: {
      weave: 'Chanderi Handloom Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Matching plain cotton-silk blouse included',
      weight: '430 grams',
      origin: 'Madhya Pradesh',
      certification: 'Handloom Mark India'
    },
    careInstructions: [
      'First wash dry clean recommended, subsequent cold hand wash',
      'Starch lightly if crisp drape is desired',
      'Warm iron'
    ],
    images: [
      '/src/assets/images/product_cotton_blue_1791712928505.jpg'
    ],
    rating: 4.7,
    reviewCount: 21,
    inStock: true,
    stockCount: 14,
    isBestSeller: true,
    isFeatured: false,
    isNewArrival: false
  },
  {
    id: 'prod-5',
    name: 'Heritage Crimson Kanjivaram Silk Saree',
    slug: 'heritage-crimson-kanjivaram-silk-saree',
    category: 'Kanjivaram Sarees',
    fabric: 'Pure Mulberry Silk',
    color: 'Crimson Red',
    occasion: 'Bridal & Wedding',
    zariType: 'Pure Silver & Gold Electroplated Zari',
    price: 14500,
    originalPrice: 18000,
    discountPercent: 19,
    description: 'The epitome of South Indian bridal opulence. Woven with authentic three-shuttle Korvai technique, this deep crimson red Kanjivaram saree boasts an authentic temple border, peacock motifs, and a solid gold zari pallu.',
    details: {
      weave: 'Authentic Korvai Handloom',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Heavy gold brocade blouse piece included',
      weight: '980 grams',
      origin: 'Kanchipuram, Tamil Nadu',
      certification: 'GI Tagged & Silk Mark Certified'
    },
    careInstructions: [
      'Dry Clean exclusively',
      'Store flat wrapped in cotton muslin',
      'Refold every 3 months along different crease lines'
    ],
    images: [
      '/src/assets/images/product_kanjivaram_red_1791712939874.jpg'
    ],
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    stockCount: 5,
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-6',
    name: 'Traditional Handloom Ivory & Red Saree',
    slug: 'traditional-handloom-ivory-red-saree',
    category: 'Handloom Sarees',
    fabric: 'Pure Tussar Silk Handloom',
    color: 'Ivory & Crimson Red',
    occasion: 'Festive Collections',
    zariType: 'Antique Red Zari Temple Border',
    price: 7800,
    originalPrice: 9200,
    discountPercent: 15,
    description: 'Graceful and timeless, this ivory saree features handcrafted crimson temple borders and geometric handloom butis across the body. Perfect for pujas, classical recitals, and intimate wedding ceremonies.',
    details: {
      weave: 'Traditional Pit Loom Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Contrast crimson raw silk blouse piece',
      weight: '680 grams',
      origin: 'Maheshwar, Madhya Pradesh',
      certification: 'Handloom Mark Certified'
    },
    careInstructions: [
      'Dry Clean only',
      'Do not spray direct perfumes',
      'Store in dry cedar or muslin bag'
    ],
    images: [
      '/src/assets/images/product_handloom_ivory_temple.jpg'
    ],
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    stockCount: 9,
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-7',
    name: 'Champagne Gold Shimmer Cocktail Party Saree',
    slug: 'champagne-gold-shimmer-cocktail-party-saree',
    category: 'Party Wear Sarees',
    fabric: 'Metallic Shimmer Tissue & Satin',
    color: 'Champagne Gold',
    occasion: 'Party Wear',
    zariType: 'Micro-Sequin & Metallic Lurex Weave',
    price: 7499,
    originalPrice: 9200,
    discountPercent: 18,
    description: 'Designed for gala cocktail evenings and high-profile receptions, this luminous champagne gold shimmer party saree features subtle micro-sequin embellishments, delicate satin border piping, and a lightweight fluid drape.',
    details: {
      weave: 'Metallic Shimmer Lurex Weave with Satin Edging',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Designer sleeveless embroidered blouse fabric included',
      weight: '520 grams',
      origin: 'Mumbai, Maharashtra',
      certification: 'Craftmark Verified Luxury Evening Wear'
    },
    careInstructions: [
      'Dry Clean only',
      'Wrap in cotton muslin',
      'Low heat iron on reverse side'
    ],
    images: [
      '/src/assets/images/product_party_champagne_shimmer.jpg'
    ],
    rating: 4.9,
    reviewCount: 24,
    inStock: true,
    stockCount: 7,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-8',
    name: 'Royal Red Bridal Trousseau Kanjivaram',
    slug: 'royal-red-bridal-trousseau-kanjivaram',
    category: 'Bridal & Wedding',
    fabric: 'Pure Mulberry Silk',
    color: 'Crimson Red',
    occasion: 'Bridal & Wedding',
    zariType: 'Pure Gold & Silver Electroplated Zari',
    price: 16500,
    originalPrice: 19999,
    discountPercent: 17,
    description: 'The crowning jewel of any bridal trousseau. Handcrafted with traditional Korvai temple borders, sacred swan and peacock motifs, and a resplendent solid gold zari pallu.',
    details: {
      weave: 'Three-Shuttle Korvai Handloom',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Heavy brocade blouse piece included',
      weight: '990 grams',
      origin: 'Kanchipuram, Tamil Nadu',
      certification: 'GI Tagged & Silk Mark Certified'
    },
    careInstructions: [
      'Strictly Dry Clean only',
      'Store flat wrapped in unbleached muslin',
      'Protect from direct sunlight and perfume'
    ],
    images: [
      '/src/assets/images/hero_saree_model_1791712828037.jpg',
      '/src/assets/images/product_kanjivaram_red_1791712939874.jpg'
    ],
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    stockCount: 4,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: false
  },
  {
    id: 'prod-9',
    name: 'Kashi Gold Brocade Banarasi Saree',
    slug: 'kashi-gold-brocade-banarasi-saree',
    category: 'Banarasi Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Emerald Green',
    occasion: 'Festive Collections',
    zariType: 'Regal Golden Zari Kadwa Brocade',
    price: 9200,
    originalPrice: 11500,
    discountPercent: 20,
    description: 'A masterpiece from the heritage looms of Kashi, featuring intricate botanical bel motifs in genuine golden zari on deep emerald silk. Comes with a matching brocade blouse piece.',
    details: {
      weave: 'Varanasi Kadwa Brocade',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Contrast brocade blouse piece',
      weight: '840 grams',
      origin: 'Varanasi, Uttar Pradesh',
      certification: 'Silk Mark Certified Pure Silk'
    },
    careInstructions: [
      'Dry Clean only',
      'Store in muslin pouch'
    ],
    images: [
      '/src/assets/images/product_silk_emerald_banarasi.jpg',
      '/src/assets/images/product_meenakari_green_1791712880156.jpg'
    ],
    rating: 4.8,
    reviewCount: 19,
    inStock: true,
    stockCount: 6,
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-10',
    name: 'Sage Green Chanderi Handloom Cotton Saree',
    slug: 'sage-green-chanderi-handloom-cotton-saree',
    category: 'Cotton Sarees',
    fabric: 'Pure Chanderi Cotton',
    color: 'Sage Green',
    occasion: 'Festive Collections',
    zariType: 'Woven Silver Temple Border',
    price: 3400,
    originalPrice: 4200,
    discountPercent: 19,
    description: 'Breezy luxury crafted for sunny celebrations and daytime functions. Features subtle botanical butis across a refreshing pastel sage green body and a finely woven zari border on lightweight hand-spun cotton.',
    details: {
      weave: 'Chanderi Handloom',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Running cotton blouse piece',
      weight: '410 grams',
      origin: 'Chanderi, Madhya Pradesh',
      certification: 'Handloom Mark India'
    },
    careInstructions: [
      'Cold gentle hand wash or dry clean',
      'Medium heat iron'
    ],
    images: [
      '/src/assets/images/product_cotton_green_chanderi.jpg'
    ],
    rating: 4.8,
    reviewCount: 17,
    inStock: true,
    stockCount: 11,
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-11',
    name: 'Lavender Lilac Chikankari Georgette Saree',
    slug: 'lavender-lilac-chikankari-georgette-saree',
    category: 'Georgette Sarees',
    fabric: 'Pure Viscose Georgette',
    color: 'Lavender',
    occasion: 'Festive Collections',
    zariType: 'Lucknowi Chikankari & Silver Mukaish Work',
    price: 4999,
    originalPrice: 6200,
    discountPercent: 19,
    description: 'An epitome of pastel poetry, this soft lavender lilac pure georgette saree features intricate handcrafted Lucknowi Chikankari floral needlework accentuated by delicate silver mukaish accents and a scalloped embroidered border.',
    details: {
      weave: 'Lucknowi Hand Chikankari on Pure Georgette',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Matching embroidered georgette blouse piece included',
      weight: '490 grams',
      origin: 'Lucknow, Uttar Pradesh',
      certification: 'Handcrafted Heritage Certified'
    },
    careInstructions: [
      'Dry Clean exclusively',
      'Store flat in muslin cover',
      'Steam press on reverse side'
    ],
    images: [
      '/src/assets/images/product_georgette_lavender_chikankari.jpg'
    ],
    rating: 4.9,
    reviewCount: 28,
    inStock: true,
    stockCount: 11,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-12',
    name: 'Mango Yellow & Magenta Pattu Pure Silk Saree',
    slug: 'mango-yellow-magenta-pattu-pure-silk-saree',
    category: 'Silk Sarees',
    fabric: 'Pure Kanchipuram Mulberry Silk',
    color: 'Mango Yellow',
    occasion: 'Festive Collections',
    zariType: 'Heavy Tested Gold Zari with Brocade Motifs',
    price: 11999,
    originalPrice: 14500,
    discountPercent: 17,
    description: 'A magnificent creation in festive golden mango yellow pure silk, framed with contrasting royal magenta pink gold zari borders and intricate floral buttas. Features a solid gold woven zari pallu and coordinating magenta silk blouse fabric.',
    details: {
      weave: 'Kanchipuram Handloom Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Contrast royal magenta silk blouse included',
      weight: '820 grams',
      origin: 'Kanchipuram, Tamil Nadu',
      certification: 'Silk Mark Certified 100% Pure Silk'
    },
    careInstructions: [
      'Dry clean exclusively',
      'Store in unbleached muslin wrap'
    ],
    images: [
      '/src/assets/images/product_silk_mango_yellow_pattu.jpg'
    ],
    rating: 5.0,
    reviewCount: 31,
    inStock: true,
    stockCount: 6,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-13',
    name: 'Mustard Bengal Tant Handloom Cotton Saree',
    slug: 'mustard-bengal-tant-handloom-cotton-saree',
    category: 'Cotton Sarees',
    fabric: 'Bengal Tant Handloom Cotton',
    color: 'Mustard Yellow',
    occasion: 'Ethnic Wear',
    zariType: 'Woven Maroon Paisley Border',
    price: 2499,
    originalPrice: 3200,
    discountPercent: 22,
    description: 'Authentic Bengal Tant handloom saree in radiant mustard turmeric yellow, framed with an intricate maroon and golden woven temple border. Renowned for its crisp, airy weave that keeps you comfortable in warm weather.',
    details: {
      weave: 'Bengal Tant Handloom',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Matching unstitched cotton blouse piece included',
      weight: '390 grams',
      origin: 'Phulia, West Bengal',
      certification: 'Handloom Mark India'
    },
    careInstructions: [
      'Cold gentle hand wash',
      'Light starch for structured drape',
      'Medium heat iron'
    ],
    images: [
      '/src/assets/images/product_cotton_yellow_tant.jpg'
    ],
    rating: 4.8,
    reviewCount: 26,
    inStock: true,
    stockCount: 14,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-14',
    name: 'Terracotta Maheshwari Handloom Cotton Saree',
    slug: 'terracotta-maheshwari-handloom-cotton-saree',
    category: 'Cotton Sarees',
    fabric: 'Maheshwari Cotton Silk',
    color: 'Terracotta Rust',
    occasion: 'Festive Collections',
    zariType: 'Golden Zari Bugdi Border',
    price: 3899,
    originalPrice: 4700,
    discountPercent: 17,
    description: 'Handcrafted by master artisans in Maheshwar, this earthy terracotta rust cotton saree features distinctive reversible borders in delicate golden zari and a finely striped linear pallu.',
    details: {
      weave: 'Maheshwari Handloom',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Contrasting cotton-silk blouse piece',
      weight: '450 grams',
      origin: 'Maheshwar, Madhya Pradesh',
      certification: 'GI Tagged & Handloom Mark Certified'
    },
    careInstructions: [
      'Dry clean or gentle hand wash',
      'Iron on low-to-medium heat'
    ],
    images: [
      '/src/assets/images/product_cotton_rust_maheshwari.jpg'
    ],
    rating: 4.9,
    reviewCount: 19,
    inStock: true,
    stockCount: 8,
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-15',
    name: 'Blush Pink Jamdani Fine Cotton Saree',
    slug: 'blush-pink-jamdani-fine-cotton-saree',
    category: 'Cotton Sarees',
    fabric: 'Handwoven Jamdani Muslin Cotton',
    color: 'Blush Pink',
    occasion: 'Party Wear',
    zariType: 'Delicate Floating Floral Threadwork',
    price: 4299,
    originalPrice: 5400,
    discountPercent: 20,
    description: 'An heirloom piece of sheer grace, this dusty blush rose Jamdani saree features delicate woven floral motifs floating seamlessly across breathable fine muslin cotton.',
    details: {
      weave: 'Jamdani Supplementary Weft Handloom',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Fine muslin cotton blouse included',
      weight: '380 grams',
      origin: 'Bengal',
      certification: 'Handloom Mark India'
    },
    careInstructions: [
      'Dry clean recommended',
      'Store wrapped in soft cotton fabric'
    ],
    images: [
      '/src/assets/images/product_cotton_pink_jamdani.jpg'
    ],
    rating: 5.0,
    reviewCount: 35,
    inStock: true,
    stockCount: 10,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-16',
    name: 'Royal Peacock Blue Mysore Crepe Silk Saree',
    slug: 'royal-peacock-blue-mysore-crepe-silk-saree',
    category: 'Silk Sarees',
    fabric: 'Pure Mysore Crepe Silk',
    color: 'Peacock Blue',
    occasion: 'Festive Collections',
    zariType: 'Fine Electroplated Gold Zari Border',
    price: 9499,
    originalPrice: 11500,
    discountPercent: 17,
    description: 'Crafted from pure mulberry silk filaments with high-twist crepe yarn, this royal peacock blue Mysore silk saree radiates unmatched luster and a butter-soft drape. Features an authentic golden zari border and traditional floral motifs along the grand pallu.',
    details: {
      weave: 'Mysore Silk Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Matching pure crepe silk blouse included',
      weight: '540 grams',
      origin: 'Mysuru, Karnataka',
      certification: 'Silk Mark Certified 100% Pure Silk & GI Tagged'
    },
    careInstructions: [
      'Strictly Dry Clean only',
      'Wrap in soft muslin cloth',
      'Iron on low heat setting'
    ],
    images: [
      '/src/assets/images/product_silk_royal_blue_kanjivaram.jpg'
    ],
    rating: 5.0,
    reviewCount: 39,
    inStock: true,
    stockCount: 8,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-17',
    name: 'Radiant Rani Pink Dharmavaram Pure Silk Saree',
    slug: 'radiant-rani-pink-dharmavaram-pure-silk-saree',
    category: 'Silk Sarees',
    fabric: 'Pure Dharmavaram Pattu Silk',
    color: 'Rani Pink',
    occasion: 'Festive Collections',
    zariType: 'Broad Woven Gold Zari Temple Border',
    price: 12800,
    originalPrice: 15200,
    discountPercent: 16,
    description: 'Celebrated for its heavy gold border and rich double-warp pattu weave, this rani pink Dharmavaram silk saree is an iconic festive heirloom favourite. Features sacred temple kalash motifs and an ornate zari pallu that shimmers majestically.',
    details: {
      weave: 'Dharmavaram Double-Warp Handloom',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Heavy gold brocade blouse piece included',
      weight: '880 grams',
      origin: 'Dharmavaram, Andhra Pradesh',
      certification: 'Silk Mark Certified 100% Pure Silk'
    },
    careInstructions: [
      'Strictly Dry Clean only',
      'Store flat wrapped in unbleached muslin'
    ],
    images: [
      '/src/assets/images/product_silk_rani_pattu.jpg'
    ],
    rating: 4.9,
    reviewCount: 44,
    inStock: true,
    stockCount: 6,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-18',
    name: 'Wine Maroon Paithani Heritage Pure Silk Saree',
    slug: 'wine-maroon-paithani-heritage-pure-silk-saree',
    category: 'Silk Sarees',
    fabric: 'Pure Paithani Silk',
    color: 'Wine Maroon',
    occasion: 'Festive Collections',
    zariType: 'Solid Gold Tissue Pallu with Mor (Peacock) Motifs',
    price: 15999,
    originalPrice: 18999,
    discountPercent: 16,
    description: 'Known as the Queen of Silks in Maharashtra, this wine maroon Paithani saree is handwoven using fine silk threads and solid gold tissue. Showcases the legendary kaleidoscopic peacock (mor) and parrot tapestry weave across the pallu.',
    details: {
      weave: 'Traditional Tapestry Handloom Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Plain wine silk blouse with matching border',
      weight: '920 grams',
      origin: 'Paithan, Maharashtra',
      certification: 'Silk Mark Certified Pure Silk & GI Tagged'
    },
    careInstructions: [
      'Dry Clean exclusively',
      'Refold every 3 months along different crease lines'
    ],
    images: [
      '/src/assets/images/product_silk_wine_paithani.jpg'
    ],
    rating: 5.0,
    reviewCount: 28,
    inStock: true,
    stockCount: 5,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-19',
    name: 'Auspicious Crimson & Temple Gold Pure Silk Saree',
    slug: 'auspicious-crimson-temple-gold-pure-silk-saree',
    category: 'Silk Sarees',
    fabric: 'Pure Kanchipuram Mulberry Silk',
    color: 'Crimson Red',
    occasion: 'Festive Collections',
    zariType: 'Wide Solid Gold Zari Border with Elephant & Lotus Motifs',
    price: 13999,
    originalPrice: 16500,
    discountPercent: 15,
    description: 'An heirloom treasure woven in auspicious crimson red pure silk, framed with a magnificent solid gold zari border featuring sacred elephant and lotus motifs. Finished with a heavy golden brocade pallu and traditional silk tassels.',
    details: {
      weave: 'Three-Shuttle Korvai Handloom Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Contrast crimson brocade blouse included',
      weight: '890 grams',
      origin: 'Kanchipuram, Tamil Nadu',
      certification: 'Silk Mark Certified 100% Pure Silk'
    },
    careInstructions: [
      'Strictly Dry Clean only',
      'Wrap in soft unbleached muslin cloth',
      'Refold periodically along different crease lines'
    ],
    images: [
      '/src/assets/images/product_silk_crimson_temple_gold.jpg'
    ],
    rating: 5.0,
    reviewCount: 32,
    inStock: true,
    stockCount: 6,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-20',
    name: 'Royal Violet Purple Paithani Pure Silk Saree',
    slug: 'royal-violet-purple-paithani-pure-silk-saree',
    category: 'Silk Sarees',
    fabric: 'Pure Paithani Silk',
    color: 'Royal Purple',
    occasion: 'Festive Collections',
    zariType: 'Solid Gold Tissue Border & Mor (Peacock) Tapestry Pallu',
    price: 14500,
    originalPrice: 17200,
    discountPercent: 16,
    description: 'Majestic deep violet-purple pure silk Paithani saree with pure gold zari butis, wide gold tissue border, and a breathtaking kaleidoscopic peacock tapestry weave across the pallu in rich jewel tones.',
    details: {
      weave: 'Traditional Paithani Tapestry Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Heavy brocade silk blouse piece',
      weight: '860 grams',
      origin: 'Paithan, Maharashtra',
      certification: 'Silk Mark Certified Pure Silk'
    },
    careInstructions: [
      'Strictly Dry Clean only',
      'Wrap in cotton muslin'
    ],
    images: [
      '/src/assets/images/product_silk_violet_paithani.jpg'
    ],
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    stockCount: 7,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: false
  },
  {
    id: 'prod-21',
    name: 'Sapphire Blue Mysore Crepe Pure Silk Saree',
    slug: 'sapphire-blue-mysore-crepe-pure-silk-saree',
    category: 'Silk Sarees',
    fabric: 'Pure Mysore Crepe Silk',
    color: 'Peacock Blue',
    occasion: 'Festive Collections',
    zariType: 'Electroplated Tested Gold Zari Border',
    price: 9999,
    originalPrice: 11999,
    discountPercent: 17,
    description: 'Crafted from pure mulberry silk filaments with high-twist crepe yarn, this sapphire peacock blue Mysore silk saree radiates unmatched luster and a butter-soft drape, finished with an authentic golden zari border.',
    details: {
      weave: 'Mysore Silk Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Contrast pure crepe silk blouse piece',
      weight: '620 grams',
      origin: 'Mysuru, Karnataka',
      certification: 'Silk Mark Certified 100% Pure Silk & GI Tagged'
    },
    careInstructions: [
      'Dry Clean only',
      'Store in dry cedar or muslin bag'
    ],
    images: [
      '/src/assets/images/product_silk_peacock_blue.jpg'
    ],
    rating: 4.9,
    reviewCount: 26,
    inStock: true,
    stockCount: 9,
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-22',
    name: 'Resplendent Emerald Kadwa Banarasi Pure Silk Saree',
    slug: 'resplendent-emerald-kadwa-banarasi-pure-silk-saree',
    category: 'Silk Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Emerald Green',
    occasion: 'Festive Collections',
    zariType: 'Fine Kadwa Golden Zari Floral Jaal',
    price: 12500,
    originalPrice: 14999,
    discountPercent: 17,
    description: 'Exquisite jewel-toned emerald green pure Katan silk saree with fine Kadwa golden zari floral jaal creepers woven across the entire body, complemented by an opulent antique gold zari border and grand pallu.',
    details: {
      weave: 'Varanasi Kadwa Handloom Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Matching emerald brocade blouse fabric included',
      weight: '840 grams',
      origin: 'Varanasi, Uttar Pradesh',
      certification: 'Silk Mark Certified 100% Pure Silk'
    },
    careInstructions: [
      'Dry Clean exclusively',
      'Store flat wrapped in soft cotton fabric'
    ],
    images: [
      '/src/assets/images/product_silk_emerald_banarasi.jpg'
    ],
    rating: 5.0,
    reviewCount: 29,
    inStock: true,
    stockCount: 7,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-23',
    name: 'Midnight Navy Blue Sequin Georgette Saree',
    slug: 'midnight-navy-blue-sequin-georgette-saree',
    category: 'Georgette Sarees',
    fabric: 'Poly-Viscose Flowy Georgette',
    color: 'Navy Blue',
    occasion: 'Party Wear',
    zariType: 'Tone-on-Tone Micro Sequin & Threadwork Border',
    price: 5299,
    originalPrice: 6500,
    discountPercent: 18,
    description: 'Made for glamorous starlit evenings and cocktail receptions, this midnight navy georgette saree boasts shimmering tone-on-tone micro-sequin borders and celestial floral butis that catch ambient light with every step.',
    details: {
      weave: 'Embroidered Sequin Work on Flowy Georgette',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Heavy designer sequin embroidered blouse fabric',
      weight: '530 grams',
      origin: 'Surat, Gujarat',
      certification: 'Quality Verified High-Twist Georgette'
    },
    careInstructions: [
      'Dry clean only',
      'Do not iron directly on sequins'
    ],
    images: [
      '/src/assets/images/product_georgette_navy_sequin.jpg'
    ],
    rating: 5.0,
    reviewCount: 34,
    inStock: true,
    stockCount: 8,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-24',
    name: 'Pastel Mint Botanical Printed Georgette Saree',
    slug: 'pastel-mint-botanical-printed-georgette-saree',
    category: 'Georgette Sarees',
    fabric: 'Pure Viscose Georgette',
    color: 'Mint Green',
    occasion: 'Ethnic Wear',
    zariType: 'Scalloped Gold Zari Embroidered Edging',
    price: 3899,
    originalPrice: 4800,
    discountPercent: 19,
    description: 'Breezy and effortlessly chic, this refreshing pastel mint green pure georgette saree features watercolor botanical blooms paired with a finely embroidered scalloped golden zari border.',
    details: {
      weave: 'Digital Botanical Print with Scalloped Zari Border',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Unstitched plain mint silk-blend blouse piece',
      weight: '440 grams',
      origin: 'Jaipur, Rajasthan',
      certification: 'Quality Verified Pure Georgette'
    },
    careInstructions: [
      'Gentle hand wash with mild shampoo or dry clean',
      'Drip dry in shade'
    ],
    images: [
      '/src/assets/images/product_georgette_mint_floral.jpg'
    ],
    rating: 4.8,
    reviewCount: 19,
    inStock: true,
    stockCount: 12,
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-25',
    name: 'Midnight Black Kashmiri Kashida Georgette Saree',
    slug: 'midnight-black-kashmiri-kashida-georgette-saree',
    category: 'Georgette Sarees',
    fabric: 'Pure Viscose Georgette',
    color: 'Black',
    occasion: 'Party Wear',
    zariType: 'Handcrafted Crimson-Orange Floral Border',
    price: 5499,
    originalPrice: 6800,
    discountPercent: 19,
    description: 'A striking creation in pitch-black sheer georgette, richly accentuated by traditional Kashmiri Kashida threadwork along the border with intricate silver leafy vines across the body.',
    details: {
      weave: 'Kashmiri Kashida Hand Embroidery on Georgette',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Running black georgette blouse piece with border',
      weight: '510 grams',
      origin: 'Srinagar, Jammu & Kashmir',
      certification: 'Handloom & Handicraft Certified'
    },
    careInstructions: [
      'Dry Clean exclusively',
      'Store flat in muslin cover',
      'Steam iron on reverse'
    ],
    images: [
      '/src/assets/images/product_georgette_black_kashmiri.jpg'
    ],
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    stockCount: 8,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-26',
    name: 'Heritage Crimson Red Jaal Georgette Saree',
    slug: 'heritage-crimson-red-jaal-georgette-saree',
    category: 'Georgette Sarees',
    fabric: 'Pure Viscose Georgette',
    color: 'Crimson Red',
    occasion: 'Festive Collections',
    zariType: 'Heavy Tested Gold Zari Scalloped Jaal Border',
    price: 5999,
    originalPrice: 7200,
    discountPercent: 17,
    description: 'A showstopping festive look in rich auspicious crimson red georgette, adorned with intricate golden floral jaal work and an opulent scalloped embroidered border with subtle sequin shimmer.',
    details: {
      weave: 'Intricate Jaal Embroidery with Scalloped Zari Edge',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Contrast brocade embroidered blouse piece',
      weight: '550 grams',
      origin: 'Surat, Gujarat',
      certification: 'Quality Verified High-Twist Georgette'
    },
    careInstructions: [
      'Dry Clean only',
      'Do not wring; store flat',
      'Low heat iron on reverse side'
    ],
    images: [
      '/src/assets/images/product_georgette_crimson_jaal.jpg'
    ],
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    stockCount: 6,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-27',
    name: 'Emerald Green Glamour Sequin Party Saree',
    slug: 'emerald-green-glamour-sequin-party-saree',
    category: 'Party Wear Sarees',
    fabric: 'Designer High-Twist Georgette',
    color: 'Emerald Green',
    occasion: 'Party Wear',
    zariType: 'Tonal Micro-Sequins & Beadwork Border',
    price: 6899,
    originalPrice: 8500,
    discountPercent: 19,
    description: 'A showstopping emerald green designer georgette party wear saree covered in delicate tonal sequins and micro-bead embellishments with a contemporary fluid drape.',
    details: {
      weave: 'Hand-Embellished Sequin Jaal on Georgette',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Unstitched designer heavy sequin blouse piece included',
      weight: '580 grams',
      origin: 'Surat, Gujarat',
      certification: 'Craftmark Verified Designer Wear'
    },
    careInstructions: [
      'Dry Clean only',
      'Store in muslin pouch',
      'Steam iron on reverse with low heat'
    ],
    images: [
      '/src/assets/images/product_party_emerald_sequin.jpg'
    ],
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    stockCount: 8,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-28',
    name: 'Rose Gold Metallic Scalloped Tissue Organza Party Saree',
    slug: 'rose-gold-scalloped-tissue-organza-party-saree',
    category: 'Party Wear Sarees',
    fabric: 'Metallic Tissue Organza',
    color: 'Rose Gold',
    occasion: 'Party Wear',
    zariType: 'Scalloped Cut-Work Crystal & Silver Zari Border',
    price: 8299,
    originalPrice: 9999,
    discountPercent: 17,
    description: 'Exquisite rose gold metallic tissue organza saree designed with delicate scalloped cut-work crystal borders and subtle luminescent sheen for high-fashion cocktails and reception soirees.',
    details: {
      weave: 'Fine Metallic Tissue Weft with Hand Cut-Work Edge',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Complementary raw silk embroidered blouse piece',
      weight: '490 grams',
      origin: 'Varanasi, Uttar Pradesh',
      certification: 'Silk Mark Certified Tissue'
    },
    careInstructions: [
      'Dry Clean only',
      'Do not squeeze or wring',
      'Press on low heat with press cloth'
    ],
    images: [
      '/src/assets/images/product_party_rose_gold_tissue.jpg'
    ],
    rating: 5.0,
    reviewCount: 33,
    inStock: true,
    stockCount: 5,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-29',
    name: 'Wine Plum Ombre Satin Georgette Crystal Party Saree',
    slug: 'wine-plum-ombre-satin-georgette-crystal-party-saree',
    category: 'Party Wear Sarees',
    fabric: 'Satin Finish Pure Georgette',
    color: 'Wine Burgundy',
    occasion: 'Party Wear',
    zariType: 'Swarovski Crystal Border & Subtle Cutdana Work',
    price: 7999,
    originalPrice: 9600,
    discountPercent: 17,
    description: 'Modern ombre gradient saree transitioning seamlessly from rich wine to deep midnight plum on lustrous satin georgette, bordered with gleaming Swarovski crystal edging.',
    details: {
      weave: 'Hand-Dyed Ombre Dip Dye with Crystal Handwork',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Wine velvet embroidered blouse fabric included',
      weight: '560 grams',
      origin: 'Jaipur, Rajasthan',
      certification: 'Artisanal Hand-Dye Verified'
    },
    careInstructions: [
      'Dry Clean only',
      'Store rolled in cloth bag',
      'Low heat steam iron'
    ],
    images: [
      '/src/assets/images/product_party_wine_ombre.jpg'
    ],
    rating: 4.8,
    reviewCount: 21,
    inStock: true,
    stockCount: 7,
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-30',
    name: 'Midnight Black Starlight Sequin Cocktail Party Saree',
    slug: 'midnight-black-starlight-sequin-cocktail-party-saree',
    category: 'Party Wear Sarees',
    fabric: 'Flowing Featherweight Georgette',
    color: 'Midnight Black',
    occasion: 'Party Wear',
    zariType: 'Celestial Starlight Micro-Sequins & Metallic Piping',
    price: 7199,
    originalPrice: 8800,
    discountPercent: 18,
    description: 'A sleek, glamorous statement cocktail saree in jet black drenched in delicate micro-sequins resembling a midnight sky. Complemented by sleek metallic piping and featherlight drape.',
    details: {
      weave: 'All-Over Scattered Starlight Sequin Embroidery',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Designer halter-neck embroidered blouse fabric',
      weight: '530 grams',
      origin: 'Surat, Gujarat',
      certification: 'High-Grade Tested Evening Georgette'
    },
    careInstructions: [
      'Dry Clean exclusively',
      'Store flat wrapped in cotton muslin',
      'Iron on reverse with cloth layer'
    ],
    images: [
      '/src/assets/images/product_party_black_sequin.jpg'
    ],
    rating: 5.0,
    reviewCount: 47,
    inStock: true,
    stockCount: 9,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-31',
    name: 'Sambalpuri Ikat Artisan Handloom Saree',
    slug: 'sambalpuri-ikat-artisan-handloom-saree',
    category: 'Handloom Sarees',
    fabric: 'Pure Hand-Spun Silk-Cotton',
    color: 'Terracotta & Black',
    occasion: 'Festive Collections',
    zariType: 'Traditional Bandha Woven Temple Border',
    price: 6499,
    originalPrice: 7999,
    discountPercent: 19,
    description: 'Authentic Sambalpuri double-ikat handloom saree woven by master weavers in Odisha, featuring intricate geometric bandha patterns, traditional floral motifs, and a rich narrative pallu.',
    details: {
      weave: 'Double Ikat Bandha Pit Loom Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Matching handloom unstitched blouse piece',
      weight: '560 grams',
      origin: 'Bargarh, Odisha',
      certification: 'GI Tagged & Handloom Mark India'
    },
    careInstructions: [
      'Dry Clean recommended for initial washes',
      'Gentle hand wash in cold water with mild detergent',
      'Dry in shade'
    ],
    images: [
      '/src/assets/images/product_handloom_sambalpuri_ikat.jpg'
    ],
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    stockCount: 7,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-32',
    name: 'Natural Tussar Ghicha Raw Silk Handloom Saree',
    slug: 'natural-tussar-ghicha-raw-silk-handloom-saree',
    category: 'Handloom Sarees',
    fabric: '100% Organic Tussar Ghicha Silk',
    color: 'Honey Beige & Maroon',
    occasion: 'Festive Collections',
    zariType: 'Earthy Hand-Woven Tribal Border',
    price: 8499,
    originalPrice: 10200,
    discountPercent: 17,
    description: 'Rich raw organic tussar ghicha silk saree with natural slub texture, framed by an earthy contrast maroon border with handcrafted tribal embroidery butis and an artisanal tassel pallu.',
    details: {
      weave: 'Hand-Spun Ghicha Tussar Pit Loom Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Contrast maroon tussar silk blouse fabric',
      weight: '620 grams',
      origin: 'Bhagalpur, Bihar',
      certification: 'Silk Mark & Handloom Mark Certified'
    },
    careInstructions: [
      'Dry Clean only',
      'Store wrapped in cotton muslin',
      'Iron with damp press cloth on reverse'
    ],
    images: [
      '/src/assets/images/product_handloom_tussar_ghicha.jpg'
    ],
    rating: 5.0,
    reviewCount: 26,
    inStock: true,
    stockCount: 6,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-33',
    name: 'Royal Indigo Pochampally Ikat Handloom Saree',
    slug: 'royal-indigo-pochampally-ikat-handloom-saree',
    category: 'Handloom Sarees',
    fabric: 'Pure Handloom Silk',
    color: 'Indigo Navy & Crimson',
    occasion: 'Festive Collections',
    zariType: 'Pure Silver & Gold Zari Selvedge',
    price: 8999,
    originalPrice: 10800,
    discountPercent: 17,
    description: 'Prestigious Pochampally Ikat handloom saree woven with tie-and-dye warp and weft yarns, showcasing geometric diamond grids in royal indigo navy and crimson with handcrafted zari selvedges.',
    details: {
      weave: 'Authentic Telia-Style Double Ikat Handloom Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Indigo silk blouse piece with matching ikat sleeve border',
      weight: '590 grams',
      origin: 'Bhoodan Pochampally, Telangana',
      certification: 'GI Tagged & Handloom Mark Certified'
    },
    careInstructions: [
      'Dry Clean exclusively',
      'Do not squeeze or wring',
      'Iron on low silk setting on reverse'
    ],
    images: [
      '/src/assets/images/product_handloom_pochampally_ikat.jpg'
    ],
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 8,
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'prod-34',
    name: 'Pastel Mint Emerald Kota Doria Handloom Saree',
    slug: 'pastel-mint-emerald-kota-doria-handloom-saree',
    category: 'Handloom Sarees',
    fabric: 'Pure Kota Doria Silk-Cotton',
    color: 'Pastel Sage Emerald',
    occasion: 'Festive Collections',
    zariType: 'Fine Tested Silver Zari Border & Khat Checks',
    price: 5899,
    originalPrice: 7200,
    discountPercent: 18,
    description: 'Featherlight and airy master artisan handloom saree featuring signature translucent square khat check weave in refreshing sage mint emerald, accentuated by delicate silver zari edging.',
    details: {
      weave: 'Traditional Pit Loom Khat Weave',
      length: '5.5 metres + 0.8 metre blouse piece',
      blousePiece: 'Artisanal handloom embroidered blouse fabric',
      weight: '430 grams',
      origin: 'Kota, Rajasthan',
      certification: 'GI Tagged & Handloom Mark India'
    },
    careInstructions: [
      'Dry Clean or gentle hand wash',
      'Mild starching recommended',
      'Steam iron with low temperature'
    ],
    images: [
      '/src/assets/images/product_handloom_kota_doria.jpg'
    ],
    rating: 4.8,
    reviewCount: 22,
    inStock: true,
    stockCount: 9,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerName: 'Ananya Sharma',
    rating: 5,
    date: 'March 14, 2026',
    comment: 'The Royal Purple Banarasi is breathtaking in person! The zari has an authentic antique shimmer that looks so royal under warm lighting. Received endless compliments at my cousin’s sangeet.',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    customerName: 'Priya Venkatesh',
    rating: 5,
    date: 'February 28, 2026',
    comment: 'Pure silk certified with Silk Mark tag. The drape is crisp yet comfortable. Packaging was exquisite in a velvet storage pouch.',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    customerName: 'Deepa Mukherji',
    rating: 5,
    date: 'March 02, 2026',
    comment: 'The Meenakari floral work is so detailed. It feels truly handcrafted. Delivery to Kolkata took just 3 days.',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    customerName: 'Radhika Nair',
    rating: 5,
    date: 'January 19, 2026',
    comment: 'Light as air and such a romantic blush coral shade. Perfect for evening cocktail parties!',
    isVerifiedBuyer: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minOrder: 0,
    description: '10% off on your first luxury order',
    isActive: true
  },
  {
    code: 'FESTIVE15',
    discountType: 'percentage',
    value: 15,
    minOrder: 7000,
    description: '15% off on orders above ₹7,000',
    isActive: true
  },
  {
    code: 'ROYAL500',
    discountType: 'flat',
    value: 500,
    minOrder: 5000,
    description: 'Flat ₹500 instant discount on orders above ₹5,000',
    isActive: true
  }
];

export const STORE_BRANCHES: StoreBranch[] = [
  {
    id: 'store-hyd',
    name: 'SareeAura Flagship Boutique – Jubilee Hills',
    city: 'Hyderabad',
    address: 'Road No. 36, Beside Peddamma Temple Metro, Jubilee Hills',
    pincode: '500033',
    phone: '+91 40 4852 9100',
    email: 'jubileehills@sareaura.com',
    timings: 'Mon - Sun: 10:30 AM to 9:00 PM',
    mapQuery: 'Jubilee Hills Hyderabad',
    image: '/src/assets/images/hero_saree_model_1791712828037.jpg'
  },
  {
    id: 'store-blr',
    name: 'SareeAura Experiential Studio – Indiranagar',
    city: 'Bengaluru',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar',
    pincode: '560038',
    phone: '+91 80 4120 7800',
    email: 'indiranagar@sareaura.com',
    timings: 'Mon - Sun: 11:00 AM to 8:30 PM',
    mapQuery: 'Indiranagar Bengaluru',
    image: '/src/assets/images/banner_banarasi_pallu_1791712855920.jpg'
  },
  {
    id: 'store-chn',
    name: 'SareeAura Heritage Gallery – T. Nagar',
    city: 'Chennai',
    address: 'Gopathy Narayana Chetty Road, T. Nagar',
    pincode: '600017',
    phone: '+91 44 2815 4300',
    email: 'tnagar@sareaura.com',
    timings: 'Mon - Sun: 10:00 AM to 9:30 PM',
    mapQuery: 'T Nagar Chennai',
    image: '/src/assets/images/product_kanjivaram_red_1791712939874.jpg'
  },
  {
    id: 'store-mum',
    name: 'SareeAura Haute Salon – Colaba',
    city: 'Mumbai',
    address: 'Mandlik Road, Near Taj Mahal Palace, Colaba',
    pincode: '400001',
    phone: '+91 22 2284 1900',
    email: 'colaba@sareaura.com',
    timings: 'Mon - Sun: 11:00 AM to 8:00 PM',
    mapQuery: 'Colaba Mumbai',
    image: '/src/assets/images/product_banarasi_purple_1791712866730.jpg'
  },
  {
    id: 'store-del',
    name: 'SareeAura Atelier – South Extension Part 1',
    city: 'New Delhi',
    address: 'Block F, Ring Road, South Extension 1',
    pincode: '110049',
    phone: '+91 11 4164 5600',
    email: 'southext@sareaura.com',
    timings: 'Mon - Sun: 11:00 AM to 8:30 PM',
    mapQuery: 'South Extension Delhi',
    image: '/src/assets/images/banner_handloom_cream_1791712842478.jpg'
  }
];

export const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-1049',
    orderNumber: 'SA-2026-1049',
    customerName: 'Surya Nallagonda',
    customerEmail: 'surya.nallagonda123@gmail.com',
    customerPhone: '+91 98765 43210',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Surya Nallagonda',
      phone: '+91 98765 43210',
      addressLine1: 'Villa 42, Palm Meadows Luxury Enclave',
      addressLine2: 'Near Bio-Diversity Park',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      isDefault: true
    },
    items: [
      {
        id: 'cart-item-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Royal Purple',
        blouseStitching: 'unstitched',
        unitPrice: 8500
      }
    ],
    subtotal: 8500,
    discount: 850,
    couponCode: 'WELCOME10',
    shippingFee: 0,
    tax: 382.5,
    total: 8032.5,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    paymentId: 'pay_RP_demo9814728',
    orderStatus: 'shipped',
    createdAt: '2026-10-09T14:30:00Z',
    estimatedDeliveryDate: 'October 13, 2026',
    tracking: {
      courier: 'BlueDart Express Air',
      awbNumber: 'BD74910284910',
      trackingUrl: 'https://www.bluedart.com',
      events: [
        {
          timestamp: '2026-10-10 18:20',
          status: 'In Transit',
          location: 'Hyderabad Hub',
          description: 'Shipment arrived at destination processing sorting facility.'
        },
        {
          timestamp: '2026-10-10 09:15',
          status: 'Shipped',
          location: 'Varanasi Master Warehouse',
          description: 'Dispatched via Priority Air Cargo.'
        },
        {
          timestamp: '2026-10-09 17:40',
          status: 'Packed',
          location: 'Varanasi Master Warehouse',
          description: 'Quality inspected with Silk Mark certification seal.'
        },
        {
          timestamp: '2026-10-09 14:35',
          status: 'Payment Confirmed',
          location: 'SareeAura Payments',
          description: 'Payment authorized via Razorpay UPI.'
        },
        {
          timestamp: '2026-10-09 14:30',
          status: 'Order Placed',
          location: 'Online Store',
          description: 'Order successfully logged in SareeAura systems.'
        }
      ]
    }
  }
];
