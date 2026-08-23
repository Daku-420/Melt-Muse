import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { brandConfig } from '../../data/brandConfig';

export const ProductCard = ({ product, layout = 'standard' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { navigateTo, setQuickViewProduct, addToast } = useUI();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    addToast(`Added ${product.name} to your bag`, 'success');
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    const added = !isInWishlist(product.id);
    addToast(added ? `Saved ${product.name} to favorites` : `Removed from favorites`, 'info');
  };

  const hasSecondaryImage = product.images && product.images.length > 1;
  const displayImage = isHovered && hasSecondaryImage ? product.images[1] : product.images[0];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateTo('product', { productId: product.id })}
      style={{
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FBF9F5',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="product-card-root"
    >
      {/* Image Container with Editorial Aspect Ratio */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          backgroundColor: '#F0EBE5',
          overflow: 'hidden',
          marginBottom: '1.25rem'
        }}
      >
        {/* Product Image with smooth cross-fade zoom */}
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease'
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            zIndex: 2
          }}
        >
          {product.badge && (
            <span
              className={`luxury-badge ${
                product.badge.toLowerCase().includes('bestseller')
                  ? 'bestseller'
                  : product.badge.toLowerCase().includes('new')
                  ? 'new'
                  : 'limited'
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlist}
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: isInWishlist(product.id) ? '#1C1A17' : 'rgba(251, 249, 245, 0.88)',
            backdropFilter: 'blur(6px)',
            border: 'none',
            color: isInWishlist(product.id) ? '#FBF9F5' : '#1C1A17',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            opacity: isHovered || isInWishlist(product.id) ? 1 : 0.85
          }}
          aria-label="Toggle wishlist"
        >
          <Heart size={15} fill={isInWishlist(product.id) ? '#C5A880' : 'none'} />
        </button>

        {/* Quick View and Quick Add Floating Action Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 3,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="product-card-actions"
        >
          <button
            onClick={handleAddToCart}
            style={{
              flex: 1,
              backgroundColor: '#1C1A17',
              color: '#FBF9F5',
              border: 'none',
              padding: '0.75rem 0.5rem',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              borderRadius: '1px'
            }}
          >
            {justAdded ? (
              <>
                <Check size={13} color="#C5A880" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>ADD TO CART</span>
              </>
            )}
          </button>

          <button
            onClick={handleQuickView}
            style={{
              width: '42px',
              backgroundColor: 'rgba(251, 249, 245, 0.95)',
              backdropFilter: 'blur(6px)',
              border: 'none',
              color: '#1C1A17',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '1px'
            }}
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'center' }}>
        {/* Name */}
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.45rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: '#1C1A17',
            textTransform: 'none'
          }}
        >
          {product.name}
        </h3>

        {/* Short Scent / Subtitle */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.74rem',
            letterSpacing: '0.08em',
            color: '#857D74',
            textTransform: 'uppercase',
            fontWeight: 400
          }}
        >
          {product.subtitle}
        </p>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.92rem',
              fontWeight: 600,
              color: '#1C1A17',
              letterSpacing: '0.02em'
            }}
          >
            {brandConfig.currency.symbol}{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.82rem',
                color: '#9E958C',
                textDecoration: 'line-through'
              }}
            >
              {brandConfig.currency.symbol}{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>

      <style>{`
        @media (hover: none) {
          .product-card-actions {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </div>
  );
};
