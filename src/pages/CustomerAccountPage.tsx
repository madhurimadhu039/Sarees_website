import React, { useState } from 'react';
import { User, Package, MapPin, Heart, ShieldCheck, Plus, Trash2, ExternalLink, Mail, Phone } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Address, Order } from '../types';
import { EmailConfirmationModal } from '../components/EmailConfirmationModal';

interface CustomerAccountPageProps {
  onNavigate: (view: string, param?: string) => void;
  onTrackOrder: (orderId: string) => void;
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({ onNavigate, onTrackOrder }) => {
  const {
    user,
    orders,
    wishlist,
    products,
    moveToCartFromWishlist,
    toggleWishlist,
    addAddress,
    deleteAddress,
    updateUserProfile,
    toggleUserRole
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'profile'>('orders');
  const [selectedOrderForEmail, setSelectedOrderForEmail] = useState<Order | null>(null);

  // Address modal form
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newFullName, setNewFullName] = useState(user.name);
  const [newPhone, setNewPhone] = useState(user.phone);
  const [newLine1, setNewLine1] = useState('');
  const [newLine2, setNewLine2] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLine1 || !newCity || !newPincode) return;

    addAddress({
      fullName: newFullName,
      phone: newPhone,
      addressLine1: newLine1,
      addressLine2: newLine2,
      city: newCity,
      state: newState,
      pincode: newPincode,
      isDefault: user.addresses.length === 0
    });

    setShowAddressModal(false);
    setNewLine1('');
    setNewLine2('');
    setNewCity('');
    setNewState('');
    setNewPincode('');
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Account Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#3B1637] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-2xl font-semibold text-[#3B1637]">{user.name}</h1>
            <p className="text-xs text-[#845377]">{user.email} · {user.phone}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                Verified Patron
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#581C4E] border border-[#E8DEC8] font-medium">
                Role: {user.role}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleUserRole}
            className="px-4 py-2 text-xs font-semibold rounded-full border border-[#581C4E] text-[#581C4E] hover:bg-[#581C4E] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Switch to {user.role === 'customer' ? 'Admin Mode' : 'Customer Mode'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#E8DEC8] gap-6 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'orders' ? 'border-[#581C4E] text-[#581C4E]' : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'addresses' ? 'border-[#581C4E] text-[#581C4E]' : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({user.addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'wishlist' ? 'border-[#581C4E] text-[#581C4E]' : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Sarees ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'border-[#581C4E] text-[#581C4E]' : 'border-transparent text-[#7B6976] hover:text-[#3B1637]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account Settings</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-[#E8DEC8] space-y-3">
              <Package className="w-10 h-10 mx-auto text-[#845377] opacity-60" />
              <p className="font-serif text-lg text-[#3B1637]">No orders placed yet</p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-5 py-2 rounded-full bg-[#581C4E] text-white text-xs font-semibold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8DEC8]">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-lg font-semibold text-[#3B1637]">{order.orderNumber}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#581C4E] border border-[#E8DEC8] font-medium capitalize">
                      {order.orderStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-[#845377]">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-16 object-cover rounded-md bg-[#FAF7F2]"
                        />
                        <div>
                          <p className="font-semibold text-[#221C20]">{item.product.name}</p>
                          <p className="text-[11px] text-[#845377]">Qty: {item.quantity} · Color: {item.selectedColor || item.product.color}</p>
                        </div>
                      </div>
                      <span className="font-semibold tabular-nums text-[#221C20]">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[#845377]">Total Paid: </span>
                    <strong className="text-sm text-[#581C4E] tabular-nums">₹{order.total.toLocaleString('en-IN')}</strong>
                    <span className="text-[11px] text-[#845377] ml-2">({order.paymentMethod.toUpperCase()})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrderForEmail(order)}
                      className="px-3.5 py-1.5 rounded-md border border-[#581C4E] text-[#581C4E] hover:bg-[#581C4E] hover:text-white transition-colors cursor-pointer"
                    >
                      View Receipt / Email
                    </button>
                    <button
                      onClick={() => onTrackOrder(order.id)}
                      className="px-4 py-1.5 rounded-md bg-[#581C4E] text-white font-medium hover:bg-[#3B1637] transition-colors cursor-pointer"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-lg font-semibold text-[#3B1637]">Delivery Addresses</h2>
            <button
              onClick={() => setShowAddressModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#581C4E] text-white text-xs font-semibold hover:bg-[#3B1637] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map(addr => (
              <div key={addr.id} className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-2 relative shadow-xs">
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                    Default Address
                  </span>
                )}
                <p className="font-semibold text-xs text-[#3B1637]">{addr.fullName}</p>
                <p className="text-xs text-[#5B4856] leading-relaxed">
                  {addr.addressLine1}, {addr.addressLine2 || ''}<br />
                  {addr.city}, {addr.state} – <strong>{addr.pincode}</strong>
                </p>
                <p className="text-xs text-[#845377]">Phone: {addr.phone}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-semibold text-[#3B1637]">Your Saved Weaves</h2>
          {wishlistProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-[#E8DEC8] space-y-2">
              <Heart className="w-10 h-10 mx-auto text-[#845377] opacity-60" />
              <p className="font-serif text-lg text-[#3B1637]">No sarees saved in wishlist</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistProducts.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-xl border border-[#E8DEC8] flex gap-3 shadow-xs">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-28 object-cover rounded-md bg-[#FAF7F2]"
                  />
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <p className="font-semibold text-[#221C20] line-clamp-1">{p.name}</p>
                      <p className="text-[11px] text-[#845377]">{p.fabric}</p>
                      <p className="font-bold text-[#581C4E] mt-1 tabular-nums">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => moveToCartFromWishlist(p)}
                        className="px-3 py-1.5 bg-[#581C4E] text-white rounded-md font-semibold text-[11px] hover:bg-[#3B1637] transition-colors"
                      >
                        Move to Bag
                      </button>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-[#845377] hover:text-red-700 text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] max-w-xl space-y-4 shadow-xs">
          <h2 className="font-serif text-lg font-semibold text-[#3B1637]">Personal Information</h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#3B1637] font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => updateUserProfile({ name: e.target.value })}
                className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
              />
            </div>
            <div>
              <label className="block text-[#3B1637] font-medium mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => updateUserProfile({ email: e.target.value })}
                className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
              />
            </div>
            <div>
              <label className="block text-[#3B1637] font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => updateUserProfile({ phone: e.target.value })}
                className="w-full p-2.5 border border-[#E8DEC8] rounded-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-semibold text-[#3B1637]">Add Delivery Address</h3>
            <form onSubmit={handleCreateAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full p-2 border border-[#E8DEC8] rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full p-2 border border-[#E8DEC8] rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Address Line 1</label>
                <input
                  type="text"
                  required
                  value={newLine1}
                  onChange={(e) => setNewLine1(e.target.value)}
                  placeholder="House, Flat or Street"
                  className="w-full p-2 border border-[#E8DEC8] rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full p-2 border border-[#E8DEC8] rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    className="w-full p-2 border border-[#E8DEC8] rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-3 py-1.5 border border-[#E8DEC8] rounded-md text-[#845377]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#581C4E] text-white rounded-md font-semibold"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Email Preview Modal */}
      {selectedOrderForEmail && (
        <EmailConfirmationModal
          order={selectedOrderForEmail}
          onClose={() => setSelectedOrderForEmail(null)}
          onTrackOrder={onTrackOrder}
        />
      )}
    </div>
  );
};
