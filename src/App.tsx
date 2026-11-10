/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { CustomerAccountPage } from './pages/CustomerAccountPage';
import { StoreLocatorPage } from './pages/StoreLocatorPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Product, Order } from './types';

function MainApp() {
  const { products, addToCart, setIsCartOpen } = useShop();

  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0] || null);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [policyTab, setPolicyTab] = useState<string>('shipping');
  const [trackOrderId, setTrackOrderId] = useState<string | undefined>(undefined);

  // Smooth scroll to top on page navigation
  const navigateTo = (view: string, param?: string) => {
    setCurrentView(view);
    if (view === 'shop') {
      setCategoryFilter(param);
    }
    if (view === 'policy' && param) {
      setPolicyTab(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = (
    product: Product,
    quantity: number,
    color: string,
    blouse: 'unstitched' | 'standard' | 'custom'
  ) => {
    addToCart(product, quantity, color, blouse);
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: Order) => {
    setLatestOrder(order);
    setCurrentView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackOrder = (orderId: string) => {
    setTrackOrderId(orderId);
    setCurrentView('track-order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#221C20]">
      {/* Header Bar */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onSearchOpen={() => setSearchModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'shop' && (
          <ShopPage
            initialCategory={categoryFilter}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onNavigate={navigateTo}
            onBuyNow={handleBuyNow}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onOrderSuccess={handleOrderSuccess}
            onNavigate={navigateTo}
          />
        )}

        {currentView === 'order-success' && latestOrder && (
          <OrderConfirmationPage
            order={latestOrder}
            onNavigate={navigateTo}
            onTrackOrder={handleTrackOrder}
          />
        )}

        {currentView === 'track-order' && (
          <OrderTrackingPage
            initialOrderId={trackOrderId}
            onNavigate={navigateTo}
          />
        )}

        {currentView === 'account' && (
          <CustomerAccountPage
            onNavigate={navigateTo}
            onTrackOrder={handleTrackOrder}
          />
        )}

        {currentView === 'wishlist' && (
          <CustomerAccountPage
            onNavigate={navigateTo}
            onTrackOrder={handleTrackOrder}
          />
        )}

        {currentView === 'stores' && (
          <StoreLocatorPage />
        )}

        {currentView === 'about' && (
          <AboutPage />
        )}

        {currentView === 'contact' && (
          <ContactPage />
        )}

        {currentView === 'policy' && (
          <PoliciesPage initialTab={policyTab} />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            onNavigate={navigateTo}
            onTrackOrder={handleTrackOrder}
          />
        )}
      </main>

      {/* Footer Bar - Landing page only */}
      {currentView === 'home' && (
        <Footer onNavigate={navigateTo} />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        onCheckout={() => {
          setCurrentView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onExplore={() => {
          setCurrentView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Instant Search Overlay */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
        onViewCategory={(catName) => {
          setCategoryFilter(catName);
          setCurrentView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}
