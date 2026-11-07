import React, { useState } from 'react';
import {
  Package, ShoppingBag, TrendingUp, Users, Tag, Plus, Edit, Trash2,
  CheckCircle, Clock, Truck, ShieldAlert, ArrowUpRight, Search, Eye
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, OrderStage } from '../types';

interface AdminDashboardProps {
  onNavigate: (view: string, param?: string) => void;
  onTrackOrder: (orderId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onTrackOrder }) => {
  const {
    user,
    products,
    orders,
    coupons,
    inquiries,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    toggleUserRole,
    showToast
  } = useShop();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'inquiries'>('overview');

  // Product Add / Edit Modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Banarasi Sarees');
  const [formFabric, setFormFabric] = useState('Pure Katan Silk');
  const [formColor, setFormColor] = useState('Royal Purple');
  const [formPrice, setFormPrice] = useState(8500);
  const [formOriginalPrice, setFormOriginalPrice] = useState(10500);
  const [formStock, setFormStock] = useState(10);
  const [formDescription, setFormDescription] = useState('');

  // Coupon create form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState(10);
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'flat'>('percentage');

  // Financial calculations for KPI
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const totalInventoryCount = products.reduce((sum, p) => sum + p.stockCount, 0);

  // Open Add Product modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('Banarasi Sarees');
    setFormFabric('Pure Katan Silk');
    setFormColor('Royal Purple');
    setFormPrice(8500);
    setFormOriginalPrice(10500);
    setFormStock(10);
    setFormDescription('Artisanal handloom saree with pure silk and metallic gold zari weave.');
    setShowProductModal(true);
  };

  // Open Edit Product modal
  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormFabric(p.fabric);
    setFormColor(p.color);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice);
    setFormStock(p.stockCount);
    setFormDescription(p.description);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discountPercent = formOriginalPrice > formPrice
      ? Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100)
      : 0;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        category: formCategory,
        fabric: formFabric,
        color: formColor,
        price: formPrice,
        originalPrice: formOriginalPrice,
        discountPercent,
        stockCount: formStock,
        description: formDescription
      });
    } else {
      addProduct({
        name: formName,
        slug: formName.toLowerCase().replace(/\s+/g, '-'),
        category: formCategory,
        fabric: formFabric,
        color: formColor,
        occasion: 'Festive Collections',
        zariType: 'Gold & Silver Metallic Zari',
        price: formPrice,
        originalPrice: formOriginalPrice,
        discountPercent,
        description: formDescription,
        details: {
          weave: 'Handloom Artisanal Weave',
          length: '5.5 metres + 0.8 metre blouse piece',
          blousePiece: 'Running unstitched silk piece included',
          weight: '750 grams',
          origin: 'Varanasi / Kanchipuram',
          certification: 'Silk Mark Certified Pure Silk'
        },
        careInstructions: ['Dry Clean Only', 'Store wrapped in muslin cloth'],
        images: ['/src/assets/images/product_banarasi_purple_1791712866730.jpg'],
        rating: 5.0,
        reviewCount: 1,
        inStock: formStock > 0,
        stockCount: formStock,
        isNewArrival: true
      });
    }

    setShowProductModal(false);
  };

  // If user role is customer, show a neat access screen with 1-click elevation
  if (user.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl text-[#3B1637] font-semibold">Admin Authorization Required</h2>
        <p className="text-xs text-[#845377]">
          You are currently viewing SareeAura in Customer role mode. To evaluate store management, inventory, and order fulfillment capabilities, elevate your session.
        </p>
        <button
          onClick={toggleUserRole}
          className="px-6 py-2.5 rounded-full bg-[#581C4E] hover:bg-[#3B1637] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          Elevate to Admin Mode
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Admin Top Banner */}
      <div className="bg-[#3B1637] text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs uppercase font-bold text-[#E8C888] tracking-widest">
            SareeAura Backoffice Atelier Console
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mt-1">
            Store Management Dashboard
          </h1>
          <p className="text-xs text-[#D9C4D4] mt-0.5">
            Real-time control over catalogue inventory, orders fulfillment, and customer inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleUserRole}
            className="px-4 py-2 rounded-lg bg-[#581C4E] hover:bg-[#722465] text-xs font-medium border border-white/20 transition-colors cursor-pointer"
          >
            Switch to Customer View
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-[#E8DEC8] gap-6 text-xs sm:text-sm font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`pb-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            activeAdminTab === 'overview' ? 'border-[#581C4E] text-[#581C4E]' : 'border-transparent text-[#7B6976]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Executive Overview</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('products')}
          className={`pb-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            activeAdminTab === 'products' ? 'border-[#581C4E] text-[#581C4E]' : 'border-transparent text-[#7B6976]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Product Catalogue ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            activeAdminTab === 'orders' ? 'border-[#581C4E] text-[#581C4E]' : 'border-transparent text-[#7B6976]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Fulfillment Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('coupons')}
          className={`pb-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            activeAdminTab === 'coupons' ? 'border-[#581C4E] text-[#581C4E]' : 'border-transparent text-[#7B6976]'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Coupons & Promotions ({coupons.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('inquiries')}
          className={`pb-3 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            activeAdminTab === 'inquiries' ? 'border-[#581C4E] text-[#581C4E]' : 'border-transparent text-[#7B6976]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Inquiries ({inquiries.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-2 shadow-xs">
              <span className="text-xs uppercase font-bold text-[#845377]">Gross Verified Revenue</span>
              <p className="text-2xl font-bold text-[#581C4E] tabular-nums">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-700 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Across verified transactions</span>
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-2 shadow-xs">
              <span className="text-xs uppercase font-bold text-[#845377]">Total Placed Orders</span>
              <p className="text-2xl font-bold text-[#3B1637] tabular-nums">
                {totalOrdersCount}
              </p>
              <p className="text-[11px] text-[#845377]">Active across India</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-2 shadow-xs">
              <span className="text-xs uppercase font-bold text-[#845377]">Average Order Value</span>
              <p className="text-2xl font-bold text-[#3B1637] tabular-nums">
                ₹{avgOrderValue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-[#845377]">Silk & bridal ensembles</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-2 shadow-xs">
              <span className="text-xs uppercase font-bold text-[#845377]">Live Stock Units</span>
              <p className="text-2xl font-bold text-[#3B1637] tabular-nums">
                {totalInventoryCount} pieces
              </p>
              <p className="text-[11px] text-emerald-700">Silk Mark certified</p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-3">
              <h3 className="font-serif text-lg font-semibold text-[#3B1637]">
                Recent Customer Orders
              </h3>
              <button
                onClick={() => setActiveAdminTab('orders')}
                className="text-xs font-semibold text-[#581C4E] hover:underline"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF7F2] text-[#845377] font-semibold border-b border-[#E8DEC8]">
                  <tr>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Ensembles</th>
                    <th className="py-2.5 px-3">Total Amount</th>
                    <th className="py-2.5 px-3">Payment</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DEC8]/60">
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-semibold text-[#3B1637]">{o.orderNumber}</td>
                      <td className="py-3 px-3 font-medium text-[#221C20]">{o.customerName}</td>
                      <td className="py-3 px-3 text-[#7B6976]">{o.items.length} item(s)</td>
                      <td className="py-3 px-3 font-bold tabular-nums text-[#581C4E]">₹{o.total.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          o.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 capitalize font-medium">{o.orderStatus.replace('_', ' ')}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => onTrackOrder(o.id)}
                          className="text-[#581C4E] hover:underline font-semibold"
                        >
                          Track Logistics
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeAdminTab === 'products' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DEC8] pb-4">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#3B1637]">
                Product Inventory Catalogue
              </h2>
              <p className="text-xs text-[#845377]">
                Add, modify prices, update stock levels or remove catalog weaves.
              </p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#581C4E] text-white text-xs font-semibold hover:bg-[#3B1637] transition-colors cursor-pointer self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Saree</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF7F2] text-[#845377] font-semibold border-b border-[#E8DEC8]">
                <tr>
                  <th className="py-2.5 px-3">Image</th>
                  <th className="py-2.5 px-3">Title</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Fabric</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Stock Units</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DEC8]/60">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    <td className="py-2.5 px-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-12 object-cover rounded-md bg-[#FAF7F2]"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#221C20] max-w-xs">{p.name}</td>
                    <td className="py-2.5 px-3 text-[#7B6976]">{p.category}</td>
                    <td className="py-2.5 px-3 text-[#7B6976]">{p.fabric}</td>
                    <td className="py-2.5 px-3 font-bold tabular-nums text-[#581C4E]">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 font-semibold">{p.stockCount} in stock</td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-[#581C4E] hover:bg-[#FAF7F2] rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER FULFILLMENT MANAGEMENT */}
      {activeAdminTab === 'orders' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 shadow-xs">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#3B1637]">
              Customer Order Dispatch Management
            </h2>
            <p className="text-xs text-[#845377]">
              Update shipment milestone stages to notify customer tracking in real-time.
            </p>
          </div>

          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="p-5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8DEC8]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-[#3B1637]">{order.orderNumber}</span>
                    <span className="text-xs text-[#845377]">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#3B1637]">Update Stage:</span>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStage)}
                      className="text-xs p-1.5 rounded-md border border-[#581C4E] bg-white font-medium text-[#581C4E] focus:outline-none cursor-pointer"
                    >
                      <option value="placed">Order Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Quality Inspection</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="font-bold text-[#845377]">Customer Contact</p>
                    <p className="font-semibold text-[#221C20]">{order.customerName}</p>
                    <p className="text-[#5B4856]">{order.customerEmail}</p>
                    <p className="text-[#5B4856]">{order.customerPhone}</p>
                  </div>

                  <div>
                    <p className="font-bold text-[#845377]">Delivery Destination</p>
                    <p className="text-[#5B4856]">
                      {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}
                    </p>
                    <p className="text-[#5B4856] font-mono mt-0.5">AWB: {order.tracking.awbNumber}</p>
                  </div>

                  <div>
                    <p className="font-bold text-[#845377]">Order Total</p>
                    <p className="font-bold text-base text-[#581C4E] tabular-nums">
                      ₹{order.total.toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={() => onTrackOrder(order.id)}
                      className="text-[11px] text-[#581C4E] underline font-medium mt-1 cursor-pointer"
                    >
                      View Live Tracking Page →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COUPON MANAGEMENT */}
      {activeAdminTab === 'coupons' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 shadow-xs">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#3B1637]">
              Promotional Codes & Discounts
            </h2>
            <p className="text-xs text-[#845377]">
              Manage marketing promotions, welcome discounts, and festive offers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map(c => (
              <div key={c.code} className="p-4 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#581C4E]">{c.code}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                    ACTIVE
                  </span>
                </div>
                <p className="text-xs text-[#3B1637] font-semibold">
                  {c.discountType === 'percentage' ? `${c.value}% Off` : `₹${c.value} Flat Off`}
                </p>
                <p className="text-[11px] text-[#7B6976]">{c.description}</p>
                <p className="text-[10px] text-[#845377]">Min Order: ₹{c.minOrder.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INQUIRIES */}
      {activeAdminTab === 'inquiries' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-6 shadow-xs">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#3B1637]">
              Customer Inquiries & Bridal Requests
            </h2>
            <p className="text-xs text-[#845377]">
              Inquiries submitted through the Contact and Bridal Styling forms.
            </p>
          </div>

          {inquiries.length === 0 ? (
            <p className="text-xs text-[#845377] py-8 text-center">No inquiries currently pending.</p>
          ) : (
            <div className="space-y-3">
              {inquiries.map(inq => (
                <div key={inq.id} className="p-4 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#3B1637]">{inq.name} ({inq.email})</span>
                    <span className="text-[10px] text-[#845377]">{inq.date}</span>
                  </div>
                  <p className="font-medium text-[#581C4E]">Subject: {inq.subject}</p>
                  <p className="text-[#5B4856] leading-relaxed">{inq.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-semibold text-[#3B1637]">
              {editingProduct ? 'Edit Saree Specifications' : 'Add New Handcrafted Saree'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Royal Purple Banarasi Silk Saree"
                  className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
                  >
                    <option value="Silk Sarees">Silk Sarees</option>
                    <option value="Banarasi Sarees">Banarasi Sarees</option>
                    <option value="Kanjivaram Sarees">Kanjivaram Sarees</option>
                    <option value="Cotton Sarees">Cotton Sarees</option>
                    <option value="Georgette Sarees">Georgette Sarees</option>
                    <option value="Handloom Sarees">Handloom Sarees</option>
                    <option value="Bridal & Wedding">Bridal & Wedding</option>
                    <option value="Party Wear Sarees">Party Wear Sarees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Fabric</label>
                  <input
                    type="text"
                    required
                    value={formFabric}
                    onChange={(e) => setFormFabric(e.target.value)}
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[#3B1637] font-medium mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#3B1637] font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border border-[#E8DEC8] rounded-md text-[#845377]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#581C4E] hover:bg-[#3B1637] text-white rounded-md font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
