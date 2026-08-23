import React from 'react';
import { UIProvider, useUI } from './context/UIContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';

import { HomePage } from './components/pages/HomePage';
import { ShopPage } from './components/pages/ShopPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { CollectionsPage } from './components/pages/CollectionsPage';
import { JournalPage } from './components/pages/JournalPage';

import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { QuickViewModal } from './components/shop/QuickViewModal';
import { SearchModal } from './components/common/SearchModal';
import { Toast } from './components/common/Toast';

const AppContent = () => {
  const { currentPage } = useUI();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AnnouncementBar />
      <Header />
      <MobileNav />

      {/* Main Routed Page View */}
      <div style={{ flex: 1 }}>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductDetailPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'collections' && <CollectionsPage />}
        {currentPage === 'journal' && <JournalPage />}
      </div>

      <Footer />

      {/* Modals & Slide Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <QuickViewModal />
      <SearchModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <UIProvider>
      <WishlistProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </WishlistProvider>
    </UIProvider>
  );
}
