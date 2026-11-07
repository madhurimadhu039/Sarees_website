import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, Coupon, Review, CustomerInquiry, OrderStage, Address } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_DEMO_ORDERS, INITIAL_COUPONS, INITIAL_REVIEWS } from '../data/mockData';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'error';
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: Address[];
}

interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  reviews: Review[];
  inquiries: CustomerInquiry[];
  user: UserProfile;
  isCartOpen: boolean;
  toasts: ToastMessage[];
  
  // Navigation & UI controls
  setIsCartOpen: (open: boolean) => void;
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string, blouseStitching?: 'unstitched' | 'standard' | 'custom') => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShippingFee: number;
  cartTax: number;
  cartTotal: number;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  
  // Coupon Actions
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Order Actions
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'tracking' | 'estimatedDeliveryDate'> & { estimatedDeliveryDate?: string }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStage) => void;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;
  
  // Admin & Catalog Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  submitInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'date' | 'status'>) => void;
  toggleUserRole: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sareaura_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sareaura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('sareaura_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sareaura_orders');
    return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('sareaura_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    const saved = localStorage.getItem('sareaura_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    return {
      name: 'Surya Nallagonda',
      email: 'surya.nallagonda123@gmail.com',
      phone: '+91 98765 43210',
      role: 'customer',
      addresses: [
        {
          id: 'addr-1',
          fullName: 'Surya Nallagonda',
          phone: '+91 98765 43210',
          addressLine1: 'Villa 42, Palm Meadows Luxury Enclave',
          addressLine2: 'Near Bio-Diversity Park',
          landmark: 'Opposite Gachibowli Stadium',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500081',
          isDefault: true
        }
      ]
    };
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('sareaura_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sareaura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sareaura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('sareaura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sareaura_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('sareaura_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Toast handler
  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (cartSubtotal >= appliedCoupon.minOrder) {
      if (appliedCoupon.discountType === 'percentage') {
        cartDiscount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
      } else {
        cartDiscount = appliedCoupon.value;
      }
    }
  }

  // Free shipping on orders above Rs. 3000
  const cartShippingFee = cartSubtotal === 0 || cartSubtotal >= 3000 ? 0 : 250;
  // 5% GST on silk textiles
  const cartTax = Math.round((cartSubtotal - cartDiscount) * 0.05);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee + cartTax);

  // Cart Actions
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor = product.color,
    blouseStitching: 'unstitched' | 'standard' | 'custom' = 'unstitched'
  ) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id &&
                item.selectedColor === selectedColor &&
                item.blouseStitching === blouseStitching
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedColor,
          blouseStitching,
          unitPrice: product.price
        };
        return [...prev, newItem];
      }
    });

    showToast('Added to Shopping Bag', `${product.name} (Qty: ${quantity}) has been added.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.id !== cartItemId));
    showToast('Removed from Bag', 'Item removed from your cart.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const prod = products.find(p => p.id === productId);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Removed from Wishlist', `${prod?.name || 'Item'} removed from saved collection.`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('Saved to Wishlist', `${prod?.name || 'Item'} saved to your wishlist.`);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product, 1);
    setWishlist(prev => prev.filter(id => id !== product.id));
  };

  // Coupon Actions
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired promo code.' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `This coupon requires a minimum purchase of ₹${found.minOrder.toLocaleString('en-IN')}.`
      };
    }
    setAppliedCoupon(found);
    showToast('Coupon Applied!', `You saved with code ${found.code}`);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Discount removed from order.', 'info');
  };

  // Order Actions
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'tracking' | 'estimatedDeliveryDate'> & { estimatedDeliveryDate?: string }): Order => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SA-2026-${randNum}`;
    const id = `ord-${Date.now()}`;
    const now = new Date();
    
    // Delivery 4 days out
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estDateStr = deliveryDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: now.toISOString(),
      estimatedDeliveryDate: orderData.estimatedDeliveryDate || estDateStr,
      tracking: {
        courier: 'BlueDart Express Air',
        awbNumber: `BD${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        trackingUrl: 'https://www.bluedart.com',
        events: [
          {
            timestamp: now.toISOString().slice(0, 16).replace('T', ' '),
            status: 'Order Placed',
            location: 'Online Store',
            description: 'Order successfully verified and logged into SareeAura dispatch queue.'
          },
          {
            timestamp: now.toISOString().slice(0, 16).replace('T', ' '),
            status: orderData.paymentMethod === 'razorpay' ? 'Payment Confirmed' : 'COD Verified',
            location: 'SareeAura Payments Gateway',
            description: orderData.paymentMethod === 'razorpay'
              ? 'Online payment confirmed and authenticated.'
              : 'Cash on delivery payment verified for dispatch.'
          }
        ]
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStage) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const stageLabels: Record<OrderStage, string> = {
        placed: 'Order Placed',
        confirmed: 'Confirmed',
        processing: 'In Quality Inspection',
        packed: 'Packed & Silk Mark Tagged',
        shipped: 'Dispatched via Air Courier',
        out_for_delivery: 'Out for Delivery with Courier Agent',
        delivered: 'Delivered to Customer Doorstep',
        cancelled: 'Order Cancelled'
      };

      const newEvent: { timestamp: string; status: string; location: string; description: string } = {
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        status: stageLabels[status],
        location: status === 'delivered' ? order.shippingAddress.city : 'Varanasi Central Warehouse',
        description: `Order status transitioned to ${stageLabels[status]}.`
      };

      return {
        ...order,
        orderStatus: status,
        tracking: {
          ...order.tracking,
          events: [newEvent, ...order.tracking.events]
        }
      };
    }));
    showToast('Order Status Updated', `Order transitioned to ${status.replace('_', ' ').toUpperCase()}`);
  };

  const getOrderById = (orderIdOrNumber: string) => {
    const clean = orderIdOrNumber.trim().toLowerCase();
    return orders.find(o => o.id.toLowerCase() === clean || o.orderNumber.toLowerCase() === clean);
  };

  // Product Admin Actions
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProd: Product = { ...prodData, id };
    setProducts(prev => [newProd, ...prev]);
    showToast('Product Created', `${newProd.name} is now live in store.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast('Product Updated', `${updated.name} updated successfully.`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product Deleted', 'Item removed from catalogue.', 'info');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Review Submitted', 'Thank you for your valuable feedback!');
  };

  const submitInquiry = (inq: Omit<CustomerInquiry, 'id' | 'date' | 'status'>) => {
    const newInq: CustomerInquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'new'
    };
    setInquiries(prev => [newInq, ...prev]);
    showToast('Message Received', 'Our bridal stylist will respond within 24 hours.');
  };

  const toggleUserRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === 'customer' ? 'admin' : 'customer'
    }));
    showToast('Mode Switched', `Active role is now ${user.role === 'customer' ? 'Admin' : 'Customer'}`);
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
    showToast('Profile Updated', 'Your contact details have been saved.');
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addr,
      id: `addr-${Date.now()}`
    };
    setUser(prev => ({
      ...prev,
      addresses: [...prev.addresses, newAddress]
    }));
    showToast('Address Saved', 'New delivery address added.');
  };

  const deleteAddress = (id: string) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.filter(a => a.id !== id)
    }));
    showToast('Address Removed', 'Delivery address removed.', 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories: INITIAL_CATEGORIES,
        cart,
        wishlist,
        orders,
        coupons,
        appliedCoupon,
        reviews,
        inquiries,
        user,
        isCartOpen,
        toasts,
        setIsCartOpen,
        showToast,
        dismissToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShippingFee,
        cartTax,
        cartTotal,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        applyCoupon,
        removeCoupon,
        createOrder,
        updateOrderStatus,
        getOrderById,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        submitInquiry,
        toggleUserRole,
        updateUserProfile,
        addAddress,
        deleteAddress
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
