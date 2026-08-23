import React, { useState } from 'react';
import { Star, ShoppingBag, Heart, Check, Flame, Sparkles, ChevronDown, ChevronUp, ShieldCheck, Truck, RefreshCw, Volume2, VolumeX, Share2 } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { brandConfig } from '../../data/brandConfig';
import { ProductCard } from '../shop/ProductCard';

export const ProductDetailPage = () => {
  const { selectedProductId, navigateTo, setIsCheckoutOpen, addToast, isAmbientPlaying, toggleAmbientSound } = useUI();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find product or fallback to first
  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedWick, setSelectedWick] = useState(product.wick);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Expandable accordions state
  const [openSections, setOpenSections] = useState({
    description: true,
    scentNotes: true,
    details: false,
    shipping: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, { wick: selectedWick });
    setAdded(true);
    addToast(`Added ${product.name} to your bag`, 'success');
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, { wick: selectedWick });
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Fragrance link copied to clipboard', 'info');
    }
  };

  // Recommendations: Other products excluding this one
  const recommendations = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ backgroundColor: '#FBF9F5', minHeight: '100vh', paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: '#8C827A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2.5rem' }}>
          <button onClick={() => navigateTo('home')} style={breadcrumbBtn}>Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} style={breadcrumbBtn}>Shop</button>
          <span>/</span>
          <span style={{ color: '#1C1A17', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Top Product Hero Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            gap: '4.5rem',
            alignItems: 'flex-start',
            marginBottom: '6rem'
          }}
          className="pdp-grid"
        >
          {/* Left: Large Image Gallery with Sticky Effect */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Main Stage Image */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                backgroundColor: '#F0EBE5',
                borderRadius: '2px',
                overflow: 'hidden',
                boxShadow: '0 15px 40px -10px rgba(28, 26, 23, 0.08)'
              }}
            >
              <img
                src={product.images[activeImgIdx]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Badge */}
              {product.badge && (
                <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                  <span className={`luxury-badge ${product.badge.toLowerCase().includes('bestseller') ? 'bestseller' : product.badge.toLowerCase().includes('new') ? 'new' : 'limited'}`}>
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Ambience audio trigger badge */}
              <button
                onClick={toggleAmbientSound}
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  right: '1.25rem',
                  backgroundColor: 'rgba(22, 20, 18, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: isAmbientPlaying ? '#C5A880' : '#FBF9F5',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                {isAmbientPlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
                <span>{isAmbientPlaying ? 'Flame Sound: On' : 'Hear Wooden Wick'}</span>
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${product.images.length}, 1fr)`, gap: '1rem' }}>
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    style={{
                      aspectRatio: '1 / 1',
                      backgroundColor: '#F0EBE5',
                      borderRadius: '1px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: activeImgIdx === idx ? '2px solid #1C1A17' : '1px solid rgba(28, 26, 23, 0.08)',
                      opacity: activeImgIdx === idx ? 1 : 0.7,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={img} alt="Candle view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Information & Purchase Area */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Scent family eyebrow & rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span className="tagline-eyebrow" style={{ color: '#A8875A' }}>
                {product.scentFamily}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C5A880" color="#C5A880" />
                  ))}
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1C1A17', marginLeft: '4px' }}>
                  {product.rating}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#8C827A' }}>
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                fontWeight: 400,
                color: '#1C1A17',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                marginBottom: '0.35rem'
              }}
            >
              {product.name}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#7D756C',
                fontWeight: 500,
                marginBottom: '1.25rem'
              }}
            >
              {product.subtitle}
            </p>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.9rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.65rem', fontWeight: 600, color: '#1C1A17' }}>
                {brandConfig.currency.symbol}{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: '#9E958C', textDecoration: 'line-through' }}>
                  {brandConfig.currency.symbol}{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span style={{ fontSize: '0.75rem', color: '#8C827A', marginLeft: 'auto' }}>
                Inclusive of all taxes
              </span>
            </div>

            {/* Short product description */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.2rem',
                fontStyle: 'italic',
                color: '#5C544C',
                lineHeight: 1.6,
                marginBottom: '2rem',
                fontWeight: 300
              }}
            >
              {product.description}
            </p>

            {/* Atmospheric Spec Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#F5EFEB',
                borderRadius: '2px',
                marginBottom: '2rem',
                textAlign: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C827A' }}>BURN TIME</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1A17', marginTop: '2px' }}>{product.burnTime}</div>
              </div>
              <div style={{ borderLeft: '1px solid rgba(28, 26, 23, 0.08)', borderRight: '1px solid rgba(28, 26, 23, 0.08)' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C827A' }}>VESSEL WEIGHT</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1A17', marginTop: '2px' }}>{product.size}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C827A' }}>WAX FORMULA</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1A17', marginTop: '2px' }}>100% Botanical</div>
              </div>
            </div>

            {/* Wick selection */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.74rem' }}>
                <span style={{ fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1C1A17' }}>
                  Wick Style: <strong style={{ color: '#A8875A' }}>{selectedWick}</strong>
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { name: 'FSC Certified Wooden Wick', desc: 'Therapeutic crackling sound & wider wax pool' },
                  { name: 'Organic Braided Cotton Wick', desc: 'Silent clean burn & concentrated flame' }
                ].map(w => (
                  <button
                    key={w.name}
                    onClick={() => setSelectedWick(w.name)}
                    style={{
                      padding: '0.85rem 1rem',
                      textAlign: 'left',
                      backgroundColor: selectedWick === w.name ? '#1C1A17' : '#FFFFFF',
                      color: selectedWick === w.name ? '#FBF9F5' : '#1C1A17',
                      border: selectedWick === w.name ? '1.5px solid #1C1A17' : '1px solid rgba(28, 26, 23, 0.15)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, marginBottom: '2px' }}>{w.name}</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.75 }}>{w.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Primary CTA Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              {/* Quantity Selector */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid rgba(28, 26, 23, 0.2)',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '2px'
                }}
              >
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ background: 'none', border: 'none', padding: '0.9rem 1.1rem', cursor: 'pointer', color: '#1C1A17' }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, minWidth: '28px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{ background: 'none', border: 'none', padding: '0.9rem 1.1rem', cursor: 'pointer', color: '#1C1A17' }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="btn-luxury btn-primary"
                style={{ flex: 1, padding: '1.05rem' }}
              >
                {added ? (
                  <>
                    <Check size={16} color="#C5A880" />
                    <span>ADDED TO YOUR BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD TO CART</span>
                  </>
                )}
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => {
                  toggleWishlist(product.id);
                  addToast(isInWishlist(product.id) ? 'Removed from favorites' : 'Saved to favorites', 'info');
                }}
                style={{
                  width: '54px',
                  border: '1px solid rgba(28, 26, 23, 0.2)',
                  backgroundColor: isInWishlist(product.id) ? '#1C1A17' : '#FFFFFF',
                  color: isInWishlist(product.id) ? '#FBF9F5' : '#1C1A17',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Wishlist"
                aria-label="Save to wishlist"
              >
                <Heart size={18} fill={isInWishlist(product.id) ? '#C5A880' : 'none'} />
              </button>

              {/* Share button */}
              <button
                onClick={handleShare}
                style={{
                  width: '54px',
                  border: '1px solid rgba(28, 26, 23, 0.2)',
                  backgroundColor: '#FFFFFF',
                  color: '#1C1A17',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Share Fragrance"
                aria-label="Share"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="btn-luxury btn-gold"
              style={{ width: '100%', padding: '1.05rem', marginBottom: '2.5rem' }}
            >
              <span>BUY NOW • INSTANT CONCIERGE CHECKOUT</span>
            </button>

            {/* Expandable Accordion Tabs */}
            <div style={{ borderTop: '1px solid rgba(28, 26, 23, 0.12)' }}>
              {/* Tab 1: Description & Story */}
              <div style={{ borderBottom: '1px solid rgba(28, 26, 23, 0.08)' }}>
                <button
                  onClick={() => toggleSection('description')}
                  style={accordionBtnStyle}
                >
                  <span style={accordionTitleStyle}>Description & Scent Narrative</span>
                  {openSections.description ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.description && (
                  <div style={{ paddingBottom: '1.5rem', fontSize: '0.88rem', color: '#605850', lineHeight: 1.7 }}>
                    <p style={{ marginBottom: '0.75rem' }}>{product.description}</p>
                    <p><strong>The Mood:</strong> {product.mood}</p>
                  </div>
                )}
              </div>

              {/* Tab 2: Scent Notes */}
              <div style={{ borderBottom: '1px solid rgba(28, 26, 23, 0.08)' }}>
                <button
                  onClick={() => toggleSection('scentNotes')}
                  style={accordionBtnStyle}
                >
                  <span style={accordionTitleStyle}>Scent Notes & Olfactory Pyramid</span>
                  {openSections.scentNotes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.scentNotes && (
                  <div style={{ paddingBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.84rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <span style={{ fontWeight: 600, color: '#A8875A', minWidth: '70px', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.1em' }}>
                          Top Notes
                        </span>
                        <span style={{ color: '#1C1A17' }}>{product.scentNotes.top.join(' • ')}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <span style={{ fontWeight: 600, color: '#A8875A', minWidth: '70px', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.1em' }}>
                          Heart Notes
                        </span>
                        <span style={{ color: '#1C1A17' }}>{product.scentNotes.heart.join(' • ')}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <span style={{ fontWeight: 600, color: '#A8875A', minWidth: '70px', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.1em' }}>
                          Base Notes
                        </span>
                        <span style={{ color: '#1C1A17' }}>{product.scentNotes.base.join(' • ')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tab 3: Details & Candle Care */}
              <div style={{ borderBottom: '1px solid rgba(28, 26, 23, 0.08)' }}>
                <button
                  onClick={() => toggleSection('details')}
                  style={accordionBtnStyle}
                >
                  <span style={accordionTitleStyle}>Candle Details & Burn Ritual</span>
                  {openSections.details ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.details && (
                  <div style={{ paddingBottom: '1.5rem', fontSize: '0.84rem', color: '#605850', lineHeight: 1.7 }}>
                    <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <li><strong>Wax Composition:</strong> 100% natural botanical coconut and soy wax blend. Free of paraffin, parabens, and phthalates.</li>
                      <li><strong>Wick:</strong> Sustainably sourced FSC-certified natural wooden wick.</li>
                      <li><strong>First Burn Ritual:</strong> On your initial burn, allow the wax to melt completely to the edges (approx. 2 hours) to avoid tunneling memory.</li>
                      <li><strong>Wick Care:</strong> Always trim the charred wood tip to 1/8 inch before every re-lighting for a clean, soot-free flame.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Tab 4: Shipping & Returns */}
              <div style={{ borderBottom: '1px solid rgba(28, 26, 23, 0.08)' }}>
                <button
                  onClick={() => toggleSection('shipping')}
                  style={accordionBtnStyle}
                >
                  <span style={accordionTitleStyle}>Shipping & Complimentary Returns</span>
                  {openSections.shipping ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.shipping && (
                  <div style={{ paddingBottom: '1.5rem', fontSize: '0.84rem', color: '#605850', lineHeight: 1.7 }}>
                    <p style={{ marginBottom: '0.5rem' }}>
                      Complimentary tracked express shipping across India on all orders over ₹1,499. Orders are poured and dispatched within 24-48 business hours.
                    </p>
                    <p>
                      If you are not completely enchanted by the fragrance, our concierge offers a 14-day hassle-free exchange privilege on unburned items in original packaging.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div style={{ borderTop: '1px solid rgba(28, 26, 23, 0.08)', paddingTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Sparkles size={12} color="#A8875A" />
              <span className="tagline-eyebrow">COMPLEMENTARY FRAGRANCE PAIRINGS</span>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                color: '#1C1A17',
                textTransform: 'uppercase'
              }}
            >
              YOU MAY ALSO LIKE
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem'
            }}
          >
            {recommendations.map(rec => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pdp-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const breadcrumbBtn = {
  background: 'none',
  border: 'none',
  padding: 0,
  fontSize: '0.74rem',
  color: '#8C827A',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  cursor: 'pointer'
};

const accordionBtnStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.25rem 0',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left'
};

const accordionTitleStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#1C1A17'
};
