import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ArrowRight, Check, Flame, Sparkles } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { brandConfig } from '../../data/brandConfig';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, navigateTo, addToast } = useUI();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedWick, setSelectedWick] = useState(quickViewProduct?.wick || 'FSC Certified Wooden Wick');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity, { wick: selectedWick });
    setAdded(true);
    addToast(`Added ${quickViewProduct.name} (${quantity}) to bag`, 'success');
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  const handleFullView = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateTo('product', { productId: id });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(22, 20, 18, 0.7)',
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.25s ease'
        }}
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          backgroundColor: '#FBF9F5',
          borderRadius: '2px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          zIndex: 1001,
          animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="quickview-modal-grid"
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(251, 249, 245, 0.9)',
            backdropFilter: 'blur(6px)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1C1A17',
            cursor: 'pointer',
            zIndex: 10
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Left: Gallery */}
        <div style={{ position: 'relative', backgroundColor: '#F0EBE5', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: '340px', overflow: 'hidden' }}>
            <img
              src={quickViewProduct.images[selectedImgIdx]}
              alt={quickViewProduct.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Thumbnail preview row */}
          {quickViewProduct.images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', backgroundColor: '#EDE6DE' }}>
              {quickViewProduct.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImgIdx(i)}
                  style={{
                    width: '54px',
                    height: '54px',
                    border: selectedImgIdx === i ? '2px solid #1C1A17' : '1px solid transparent',
                    padding: 0,
                    cursor: 'pointer',
                    borderRadius: '1px',
                    overflow: 'hidden'
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div
          style={{
            padding: '2.5rem 2rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {/* Scent Family & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span className="tagline-eyebrow" style={{ color: '#A8875A' }}>
                {quickViewProduct.scentFamily}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', color: '#6E675F' }}>
                <Star size={13} fill="#C5A880" color="#C5A880" />
                <span style={{ fontWeight: 600, color: '#1C1A17' }}>{quickViewProduct.rating}</span>
                <span>({quickViewProduct.reviewCount})</span>
              </div>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2.2rem',
                fontWeight: 500,
                color: '#1C1A17',
                marginBottom: '0.25rem'
              }}
            >
              {quickViewProduct.name}
            </h2>

            {/* Subtitle */}
            <p style={{ fontSize: '0.8rem', color: '#857D74', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              {quickViewProduct.subtitle}
            </p>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.35rem', fontWeight: 600, color: '#1C1A17' }}>
                {brandConfig.currency.symbol}{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice && (
                <span style={{ fontSize: '0.95rem', color: '#9E958C', textDecoration: 'line-through' }}>
                  {brandConfig.currency.symbol}{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.86rem', color: '#605850', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {quickViewProduct.description}
            </p>

            {/* Scent Notes Preview */}
            <div style={{ backgroundColor: '#F5EFEB', padding: '1rem', borderRadius: '1px', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C827A', marginBottom: '0.5rem' }}>
                Olfactory Notes Pyramid:
              </div>
              <div style={{ fontSize: '0.78rem', color: '#1C1A17', lineHeight: 1.5 }}>
                <div><strong>Top:</strong> {quickViewProduct.scentNotes.top.join(', ')}</div>
                <div><strong>Heart:</strong> {quickViewProduct.scentNotes.heart.join(', ')}</div>
                <div><strong>Base:</strong> {quickViewProduct.scentNotes.base.join(', ')}</div>
              </div>
            </div>

            {/* Wick selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C1A17', marginBottom: '0.5rem' }}>
                Select Wick Option:
              </span>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {['FSC Certified Wooden Wick', 'Organic Braided Cotton'].map(w => (
                  <button
                    key={w}
                    onClick={() => setSelectedWick(w)}
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.5rem',
                      fontSize: '0.72rem',
                      fontFamily: "'Montserrat', sans-serif",
                      border: selectedWick === w ? '1.5px solid #1C1A17' : '1px solid rgba(28, 26, 23, 0.15)',
                      backgroundColor: selectedWick === w ? '#1C1A17' : '#FFFFFF',
                      color: selectedWick === w ? '#FBF9F5' : '#1C1A17',
                      cursor: 'pointer',
                      borderRadius: '1px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart & Full View links */}
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid rgba(28, 26, 23, 0.15)',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '1px'
                }}
              >
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ background: 'none', border: 'none', padding: '0.75rem 0.9rem', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{ background: 'none', border: 'none', padding: '0.75rem 0.9rem', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="btn-luxury btn-primary"
                style={{ flex: 1, padding: '0.9rem' }}
              >
                {added ? (
                  <>
                    <Check size={14} color="#C5A880" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  toggleWishlist(quickViewProduct.id);
                  addToast(isInWishlist(quickViewProduct.id) ? 'Removed from favorites' : 'Saved to favorites', 'info');
                }}
                style={{
                  width: '46px',
                  border: '1px solid rgba(28, 26, 23, 0.15)',
                  backgroundColor: isInWishlist(quickViewProduct.id) ? '#1C1A17' : '#FFFFFF',
                  color: isInWishlist(quickViewProduct.id) ? '#FBF9F5' : '#1C1A17',
                  borderRadius: '1px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Wishlist"
              >
                <Heart size={16} fill={isInWishlist(quickViewProduct.id) ? '#C5A880' : 'none'} />
              </button>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleFullView}
                className="editorial-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}
              >
                <span>View Full Fragrance Details & Ritual</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .quickview-modal-grid {
            grid-template-columns: 1fr !important;
            max-height: 85vh !important;
            overflow-y: auto !important;
          }
        }
      `}</style>
    </div>
  );
};
