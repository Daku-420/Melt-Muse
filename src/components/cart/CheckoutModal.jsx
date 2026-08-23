import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Sparkles, ArrowRight, Truck, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { brandConfig } from '../../data/brandConfig';

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, navigateTo } = useUI();
  const {
    cartItems,
    subtotal,
    discountAmount,
    appliedDiscount,
    isGiftWrap,
    giftNote,
    shippingFee,
    isFreeShipping,
    total,
    clearCart
  } = useCart();

  const [step, setStep] = useState('shipping'); // 'shipping', 'payment', 'confirmed'
  const [formData, setFormData] = useState({
    firstName: 'Devika',
    lastName: 'Sharma',
    email: 'devika.muse@example.com',
    phone: '+91 98111 22334',
    address: 'Apartment 4B, The Amara Residences, Golf Course Road',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
    paymentMethod: 'upi'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrder = 'MM-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrder);
      setStep('confirmed');
      clearCart();

      // Trigger celebratory gold confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#EEDCD5', '#8E978C', '#1C1A17']
        });
      } catch (err) {
        console.warn(err);
      }
    }, 1600);
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
        onClick={() => {
          if (step !== 'confirmed') setIsCheckoutOpen(false);
        }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(22, 20, 18, 0.75)',
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
          maxHeight: '92vh',
          backgroundColor: '#FBF9F5',
          borderRadius: '2px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: step === 'confirmed' ? '1fr' : '1.3fr 0.9fr',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          zIndex: 1001,
          animation: 'slideUp 0.3s ease'
        }}
        className="checkout-modal-grid"
      >
        {/* Close button */}
        {step !== 'confirmed' && (
          <button
            onClick={() => setIsCheckoutOpen(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: '#1C1A17',
              cursor: 'pointer',
              zIndex: 10,
              padding: '0.4rem'
            }}
          >
            <X size={20} />
          </button>
        )}

        {/* Confirmed State */}
        {step === 'confirmed' ? (
          <div style={{ padding: '4rem 2.5rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#EAEFE8',
                color: '#2E6B38',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <Check size={32} />
            </div>

            <span className="tagline-eyebrow" style={{ color: '#A8875A', marginBottom: '0.5rem', display: 'block' }}>
              ORDER ILLUMINATED
            </span>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2.8rem',
                color: '#1C1A17',
                marginBottom: '1rem'
              }}
            >
              Thank You for Melting With Us.
            </h2>

            <p style={{ fontSize: '0.92rem', color: '#6E675F', lineHeight: 1.6, marginBottom: '2rem' }}>
              Your order <strong style={{ color: '#1C1A17' }}>#{orderNumber}</strong> has been secured and sent to our artisanal pouring studio. We've sent your order confirmation and tracking details to <strong>{formData.email}</strong>.
            </p>

            <div
              style={{
                backgroundColor: '#F5EFEB',
                border: '1px solid rgba(28, 26, 23, 0.08)',
                padding: '1.5rem',
                borderRadius: '2px',
                textAlign: 'left',
                marginBottom: '2.5rem',
                fontSize: '0.82rem'
              }}
            >
              <div style={{ fontWeight: 600, color: '#1C1A17', marginBottom: '0.5rem' }}>
                Delivery Destination:
              </div>
              <div style={{ color: '#6E675F' }}>
                {formData.firstName} {formData.lastName}<br />
                {formData.address}, {formData.city}, {formData.state} - {formData.pincode}<br />
                Contact: {formData.phone}
              </div>
            </div>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                navigateTo('shop');
              }}
              className="btn-luxury btn-primary"
              style={{ padding: '1rem 2.5rem' }}
            >
              <span>CONTINUE EXPLORING</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <>
            {/* Left: Checkout Form */}
            <div
              style={{
                padding: '2.5rem 2rem',
                overflowY: 'auto',
                borderRight: '1px solid rgba(28, 26, 23, 0.08)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
                <Lock size={15} color="#A8875A" />
                <span className="tagline-eyebrow" style={{ color: '#A8875A' }}>
                  MELT MUSE CONCIERGE CHECKOUT
                </span>
              </div>

              {step === 'shipping' ? (
                <form onSubmit={handleProceedToPayment}>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.75rem',
                      fontWeight: 500,
                      color: '#1C1A17',
                      marginBottom: '1.25rem'
                    }}
                  >
                    1. Shipping & Concierge Details
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem', marginBottom: '0.9rem' }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.9rem', marginBottom: '0.9rem' }}>
                    <div>
                      <label style={labelStyle}>Email Address (For Tracking)</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Mobile Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '0.9rem' }}>
                    <label style={labelStyle}>Street Address & Landmark</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.9rem', marginBottom: '1.75rem' }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>State</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-luxury btn-primary"
                    style={{ width: '100%', padding: '1rem' }}
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.75rem',
                        fontWeight: 500,
                        color: '#1C1A17'
                      }}
                    >
                      2. Select Payment Privilege
                    </h3>
                    <button
                      onClick={() => setStep('shipping')}
                      style={{ background: 'none', border: 'none', color: '#A8875A', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Edit Shipping
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                    {[
                      { id: 'upi', title: 'UPI Instant (GPay / PhonePe / Paytm)', subtitle: 'Instant zero-fee authorization' },
                      { id: 'cards', title: 'Credit / Debit Card (Visa, Mastercard, Amex)', subtitle: 'Encrypted 256-bit luxury checkout' },
                      { id: 'netbanking', title: 'Net Banking (All Indian Banks)', subtitle: 'Direct bank transfer' },
                      { id: 'cod', title: 'Cash on Delivery (Available in select PINs)', subtitle: 'Pay when receiving your box' }
                    ].map(method => (
                      <label
                        key={method.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.9rem',
                          padding: '1rem 1.25rem',
                          backgroundColor: formData.paymentMethod === method.id ? '#F5EFEB' : '#FFFFFF',
                          border: formData.paymentMethod === method.id ? '1.5px solid #1C1A17' : '1px solid rgba(28, 26, 23, 0.12)',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === method.id}
                          onChange={() => {}}
                          style={{ accentColor: '#1C1A17' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1A17' }}>{method.title}</div>
                          <div style={{ fontSize: '0.74rem', color: '#8C827A' }}>{method.subtitle}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="btn-luxury btn-primary"
                    style={{ width: '100%', padding: '1.1rem' }}
                  >
                    {isProcessing ? (
                      <span>SECURING YOUR CANDLES...</span>
                    ) : (
                      <>
                        <span>PAY {brandConfig.currency.symbol}{total.toLocaleString('en-IN')} & PLACE ORDER</span>
                        <Sparkles size={15} color="#C5A880" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Right: Order Summary Sidebar */}
            <div
              style={{
                backgroundColor: '#F5EFEB',
                padding: '2.5rem 1.75rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    color: '#1C1A17',
                    marginBottom: '1.25rem',
                    textTransform: 'uppercase'
                  }}
                >
                  Order Summary
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  {cartItems.map(item => (
                    <div key={`${item.id}-${item.wick}`} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '45px', height: '55px', objectFit: 'cover', borderRadius: '1px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1A17' }}>{item.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#8C827A' }}>Qty: {item.quantity} • {item.wick}</div>
                      </div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1C1A17' }}>
                        {brandConfig.currency.symbol}{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price calculations */}
                <div
                  style={{
                    borderTop: '1px solid rgba(28, 26, 23, 0.08)',
                    paddingTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    color: '#6E675F'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span>{brandConfig.currency.symbol}{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {appliedDiscount && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2E6B38' }}>
                      <span>Privilege Discount ({appliedDiscount.code})</span>
                      <span>-{brandConfig.currency.symbol}{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {isGiftWrap && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Luxury Gift Wrap</span>
                      <span>+{brandConfig.currency.symbol}150</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Shipping</span>
                    <span>{isFreeShipping ? 'COMPLIMENTARY' : `${brandConfig.currency.symbol}${shippingFee}`}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(28, 26, 23, 0.12)',
                      paddingTop: '0.75rem',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#1C1A17',
                      marginTop: '0.5rem'
                    }}
                  >
                    <span>Total Due</span>
                    <span>{brandConfig.currency.symbol}{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(28, 26, 23, 0.08)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', color: '#8C827A', marginBottom: '0.4rem' }}>
                  <ShieldCheck size={14} color="#A8875A" />
                  <span>Handcrafted in small batches & inspected for excellence.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', color: '#8C827A' }}>
                  <Truck size={14} color="#A8875A" />
                  <span>Delivered securely in recyclable shock-absorbent packaging.</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-modal-grid {
            grid-template-columns: 1fr !important;
            max-height: 85vh !important;
            overflow-y: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.68rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#605850',
  marginBottom: '0.35rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 0.85rem',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.82rem',
  color: '#1C1A17',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28, 26, 23, 0.15)',
  borderRadius: '1px',
  outline: 'none'
};
