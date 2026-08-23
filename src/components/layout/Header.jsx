import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const {
    currentPage,
    navigateTo,
    setIsSearchOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    addToast
  } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHeroTransparent = currentPage === 'home' && !isScrolled;

  const headerStyle = {
    position: 'sticky',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, padding 0.4s ease, border-color 0.4s ease',
    backgroundColor: isHeroTransparent
      ? 'rgba(22, 20, 18, 0.25)'
      : 'rgba(251, 249, 245, 0.94)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: isHeroTransparent
      ? '1px solid rgba(255, 255, 255, 0.08)'
      : '1px solid rgba(28, 26, 23, 0.07)',
    boxShadow: isScrolled ? '0 10px 30px -10px rgba(28, 26, 23, 0.06)' : 'none',
    padding: isScrolled ? '0.75rem 0' : '1.15rem 0'
  };

  const navLinkStyle = (pageName) => ({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.75rem',
    fontWeight: currentPage === pageName ? 600 : 400,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: isHeroTransparent ? '#FBF9F5' : '#1C1A17',
    position: 'relative',
    padding: '0.5rem 0',
    cursor: 'pointer',
    transition: 'color 0.3s ease, opacity 0.3s ease',
    opacity: currentPage === pageName ? 1 : isHeroTransparent ? 0.85 : 0.75
  });

  const iconBtnStyle = {
    background: 'none',
    border: 'none',
    color: isHeroTransparent ? '#FBF9F5' : '#1C1A17',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '0.5rem',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    opacity: isHeroTransparent ? 0.9 : 0.85
  };

  return (
    <header style={headerStyle}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Mobile Hamburger Menu button */}
          <div className="mobile-only" style={{ display: 'none' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={iconBtnStyle}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Left: Melt Muse Brand Logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }} className="header-logo-container">
            <BrandLogo
              variant={isHeroTransparent ? 'light' : 'dark'}
              onClick={() => navigateTo('home')}
            />
          </div>

          {/* Center: Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem'
            }}
            className="desktop-nav"
          >
            <button
              onClick={() => navigateTo('shop')}
              style={{ ...navLinkStyle('shop'), background: 'none', border: 'none' }}
            >
              Shop
              {currentPage === 'shop' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: isHeroTransparent ? '#C5A880' : '#1C1A17'
                  }}
                />
              )}
            </button>

            <button
              onClick={() => navigateTo('collections')}
              style={{ ...navLinkStyle('collections'), background: 'none', border: 'none' }}
            >
              Collections
              {currentPage === 'collections' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: isHeroTransparent ? '#C5A880' : '#1C1A17'
                  }}
                />
              )}
            </button>

            <button
              onClick={() => navigateTo('about')}
              style={{ ...navLinkStyle('about'), background: 'none', border: 'none' }}
            >
              About
              {currentPage === 'about' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: isHeroTransparent ? '#C5A880' : '#1C1A17'
                  }}
                />
              )}
            </button>

            <button
              onClick={() => navigateTo('journal')}
              style={{ ...navLinkStyle('journal'), background: 'none', border: 'none' }}
            >
              Journal
              {currentPage === 'journal' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: isHeroTransparent ? '#C5A880' : '#1C1A17'
                  }}
                />
              )}
            </button>
          </nav>

          {/* Right: Actions (Search, Wishlist, Account, Cart) */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.8rem'
            }}
          >
            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              style={iconBtnStyle}
              aria-label="Search candle collection"
              title="Search"
            >
              <Search size={18} />
            </button>

            {/* Wishlist button */}
            <button
              onClick={() => {
                navigateTo('shop');
                addToast('Viewing your bespoke favorites', 'info');
              }}
              style={iconBtnStyle}
              aria-label="Wishlist"
              title="Wishlist"
              className="hide-mobile"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    backgroundColor: '#C5A880',
                    color: '#1C1A17',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account / Concierge */}
            <button
              onClick={() => {
                addToast('Melt Muse Private Client Concierge is active', 'info');
              }}
              style={iconBtnStyle}
              aria-label="Client Account"
              title="Muse Concierge"
              className="hide-mobile"
            >
              <User size={18} />
            </button>

            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                ...iconBtnStyle,
                backgroundColor: isHeroTransparent
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(28, 26, 23, 0.05)',
                borderRadius: '50%',
                width: '38px',
                height: '38px'
              }}
              aria-label="Shopping Cart"
              title="Bag"
            >
              <ShoppingBag size={18} />
              {totalItemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    backgroundColor: '#1C1A17',
                    color: '#FBF9F5',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    minWidth: '17px',
                    height: '17px',
                    padding: '0 3px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    border: '1.5px solid var(--bg-primary)'
                  }}
                >
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: block !important; }
          .header-logo-container { justify-content: center !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
};
