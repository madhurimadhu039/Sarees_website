export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  fabric: string;
  color: string;
  occasion: string;
  zariType: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  description: string;
  details: {
    weave: string;
    length: string;
    blousePiece: string;
    weight: string;
    origin: string;
    certification: string;
  };
  careInstructions: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  variants?: {
    colorName: string;
    colorHex: string;
    image: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  image: string;
  description: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  blouseStitching: 'unstitched' | 'standard' | 'custom';
  unitPrice: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

export type OrderStage = 
  | 'placed' 
  | 'confirmed' 
  | 'processing' 
  | 'packed' 
  | 'shipped' 
  | 'out_for_delivery' 
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentId?: string;
  orderStatus: OrderStage;
  createdAt: string;
  estimatedDeliveryDate: string;
  tracking: {
    courier: string;
    awbNumber: string;
    trackingUrl: string;
    events: TrackingEvent[];
  };
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minOrder: number;
  description: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  isVerifiedBuyer: boolean;
}

export interface StoreBranch {
  id: string;
  name: string;
  city: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
  timings: string;
  mapQuery: string;
  image: string;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'in_progress' | 'resolved';
}
