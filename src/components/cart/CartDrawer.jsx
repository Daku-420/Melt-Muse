import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Gift, Tag, Check, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { brandConfig } from '../../data/brandConfig';
import { products } from '../../data/products';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    appliedDiscount,
    applyPromo,
    removePromo,
    promoCode,
    setPromoCode,
    isGiftWrap,
    setIsGiftWrap,
    giftNote,
    setGiftNote,
    freeShippingProgress,
    amountToFreeShipping,
    isFreeShipping,
    shippingFee,
    total,
    addToCart
  } = useCart();

  const { setIsCheckoutOpen, navigateTo, addToast } = useUI();
  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const res = applyPromo(inputCode);
    if (res.success) {
      setInputCode('');
      addToast(res.message, 'success');
    } else {
      setPromoError(res.message);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Recommendations: products not yet in cart
  const cartIds = cartItems.map(item => item.id);
  const recommendations = products.filter(p => !cartIds.includes(p.id)).slice(0, 2);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(22, 20, 18, 0.65)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease'
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#FBF9F5',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.18)',
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            borderBottom: '1px solid rgba(28, 26, 23, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F5EFEB'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={18} color="#1C1A17" />
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.5rem',
                fontWeight: 500,
                color: '#1C1A17',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              YOUR SHOPPING BAG
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#8C827A', fontWeight: 600 }}>
              ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#1C1A17',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div
          style={{
            padding: '0.85rem 1.75rem',
            backgroundColor: '#EDE6DE',
            borderBottom: '1px solid rgba(28, 26, 23, 0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.74rem' }}>
            <span style={{ color: '#1C1A17', fontWeight: 500 }}>
              {isFreeShipping ? (
                <span style={{ color: '#2E6B38', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                  <Check size={13} /> You have unlocked complimentary delivery!
                </span>
              ) : (
                <span>
                  Add <strong style={{ color: '#1C1A17' }}>{brandConfig.currency.symbol}{amountToFreeShipping.toLocaleString('en-IN')}</strong> for complimentary delivery
                </span>
              )}
            </span>
            <span style={{ color: '#8C827A', fontSize: '0.7rem' }}>
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(28, 26, 23, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${freeShippingProgress}%`,
                height: '100%',
                backgroundColor: isFreeShipping ? '#3F7A49' : '#C5A880',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Items List or Empty State */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', margin: 'auto' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#F5EFEB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <ShoppingBag size={24} color="#8C827A" />
              </div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Your bag is whispering for light.
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#8C827A', marginBottom: '1.75rem' }}>
                Explore our signature botanical fragrances and handcrafted wooden wicks.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="btn-luxury btn-primary"
                style={{ padding: '0.85rem 1.75rem' }}
              >
                <span>EXPLORE CANDLES</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div
                  key={`${item.id}-${item.wick}`}
                  style={{
                    display: 'flex',
                    gap: '1.15rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid rgba(28, 26, 23, 0.08)',
                    position: 'relative'
                  }}
                >
                  {/* Image */}
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('product', { productId: item.id });
                    }}
                    style={{
                      width: '82px',
                      height: '100px',
                      backgroundColor: '#F0EBE5',
                      flexShrink: 0,
                      borderRadius: '1px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('product', { productId: item.id });
                          }}
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '1.25rem',
                            fontWeight: 500,
                            color: '#1C1A17',
                            cursor: 'pointer',
                            lineHeight: 1.2
                          }}
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#A0988F',
                            cursor: 'pointer',
                            padding: '0.2rem'
                          }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: '#8C827A', marginTop: '0.2rem' }}>
                        {item.wick} • {item.size}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                      {/* Quantity Selector */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid rgba(28, 26, 23, 0.15)',
                          borderRadius: '1px',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.25rem 0.55rem',
                            cursor: 'pointer',
                            color: '#1C1A17',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.25rem 0.55rem',
                            cursor: 'pointer',
                            color: '#1C1A17',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: '#1C1A17' }}>
                        {brandConfig.currency.symbol}{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* You May Also Like Mini-Recommendations */}
              {recommendations.length > 0 && (
                <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
                    <Sparkles size={12} color="#C5A880" />
                    <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C827A', fontWeight: 600 }}>
                      YOU MAY ALSO LIKE...
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {recommendations.map(rec => (
                      <div
                        key={rec.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 0.85rem',
                          backgroundColor: '#F5EFEB',
                          borderRadius: '1px',
                          border: '1px solid rgba(28, 26, 23, 0.05)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={rec.images[0]}
                            alt={rec.name}
                            style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '1px' }}
                          />
                          <div>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 500, color: '#1C1A17' }}>
                              {rec.name}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#6E675F' }}>
                              {brandConfig.currency.symbol}{rec.price.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(rec, 1)}
                          style={{
                            background: '#1C1A17',
                            color: '#FBF9F5',
                            border: 'none',
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            borderRadius: '1px'
                          }}
                        >
                          + ADD
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gift Wrap Toggle */}
              <div
                style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: '#F5EFEB',
                  borderRadius: '1px',
                  marginTop: '0.5rem'
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.78rem', color: '#1C1A17' }}>
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={e => setIsGiftWrap(e.target.checked)}
                    style={{ accentColor: '#1C1A17' }}
                  />
                  <Gift size={14} color="#C5A880" />
                  <span>Complimentary Luxury Gift Box & Note (+₹150)</span>
                </label>
                {isGiftWrap && (
                  <textarea
                    value={giftNote}
                    onChange={e => setGiftNote(e.target.value)}
                    placeholder="Enter your personalized handwritten note here..."
                    rows={2}
                    style={{
                      width: '100%',
                      marginTop: '0.6rem',
                      padding: '0.5rem',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.75rem',
                      border: '1px solid rgba(28, 26, 23, 0.12)',
                      borderRadius: '1px',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                )}
              </div>

              {/* Promo Code Accordion */}
              <div style={{ marginTop: '0.25rem' }}>
                {appliedDiscount ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: '#EAEFE8',
                      borderRadius: '1px',
                      border: '1px solid #99B89E'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.76rem', color: '#2B5A33' }}>
                      <Tag size={13} />
                      <span>{appliedDiscount.label} (Code: {appliedDiscount.code})</span>
                    </div>
                    <button
                      onClick={removePromo}
                      style={{ background: 'none', border: 'none', color: '#8C3B3B', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={inputCode}
                      onChange={e => setInputCode(e.target.value)}
                      placeholder="Promo Code (e.g. FIRSTMUSE)"
                      style={{
                        flex: 1,
                        padding: '0.6rem 0.8rem',
                        fontSize: '0.74rem',
                        border: '1px solid rgba(28, 26, 23, 0.14)',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        textTransform: 'uppercase'
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: '#1C1A17',
                        color: '#FBF9F5',
                        border: 'none',
                        padding: '0 1rem',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      }}
                    >
                      APPLY
                    </button>
                  </form>
                )}
                {promoError && (
                  <div style={{ color: '#A83232', fontSize: '0.72rem', marginTop: '0.35rem' }}>
                    {promoError}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout Button) */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '1.5rem 1.75rem',
              backgroundColor: '#F5EFEB',
              borderTop: '1px solid rgba(28, 26, 23, 0.08)'
            }}
          >
            {/* Subtotal lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6E675F' }}>
                <span>Subtotal</span>
                <span>{brandConfig.currency.symbol}{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2E6B38' }}>
                  <span>Discount ({appliedDiscount.percentage}%)</span>
                  <span>-{brandConfig.currency.symbol}{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {isGiftWrap && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6E675F' }}>
                  <span>Luxury Gift Packaging</span>
                  <span>+{brandConfig.currency.symbol}150</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6E675F' }}>
                <span>Shipping</span>
                <span>{isFreeShipping ? 'FREE' : `${brandConfig.currency.symbol}${shippingFee}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.6rem',
                  borderTop: '1px solid rgba(28, 26, 23, 0.1)',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#1C1A17'
                }}
              >
                <span>Estimated Total</span>
                <span>{brandConfig.currency.symbol}{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              className="btn-luxury btn-primary"
              style={{
                width: '100%',
                padding: '1.1rem 1rem',
                fontSize: '0.8rem',
                letterSpacing: '0.2em'
              }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            {/* Security note */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                marginTop: '0.75rem',
                fontSize: '0.68rem',
                color: '#8C827A',
                letterSpacing: '0.04em'
              }}
            >
              <ShieldCheck size={13} color="#A8875A" />
              <span>Safe & Secure Luxury Checkout • Carbon-Neutral Delivery</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
