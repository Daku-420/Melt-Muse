import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useUI();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Welcome to the Melt Muse inner circle. Your 10% privilege code is FIRSTMUSE', 'success', 5000);
  };

  return (
    <section
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        backgroundColor: '#EFE8E2',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(251, 249, 245, 0.8) 0%, rgba(239, 232, 226, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ maxWidth: '780px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
          <Sparkles size={13} color="#A8875A" />
          <span className="tagline-eyebrow">THE MUSE CIRCLE</span>
        </div>

        {/* Master Headline */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: '#1C1A17',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}
        >
          STAY IN THE GLOW
        </h2>

        {/* Supporting Copy */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.35rem',
            fontStyle: 'italic',
            color: '#6E675F',
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}
        >
          “New scents, little rituals and everything worth melting for.”
        </p>

        {/* Subscription Form */}
        {isSubmitted ? (
          <div
            style={{
              padding: '1.75rem 2.5rem',
              backgroundColor: '#FBF9F5',
              border: '1px solid rgba(197, 168, 128, 0.4)',
              borderRadius: '2px',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1C1A17', fontWeight: 600 }}>
              <Check size={18} color="#C5A880" />
              <span>You are now on the VIP Muse list.</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#8C827A' }}>
              Check your inbox for your 10% welcome voucher code: <strong style={{ color: '#1C1A17' }}>FIRSTMUSE</strong>
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              maxWidth: '540px',
              margin: '0 auto 1.5rem auto',
              backgroundColor: '#FBF9F5',
              border: '1px solid rgba(28, 26, 23, 0.16)',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px -6px rgba(28, 26, 23, 0.06)'
            }}
            className="newsletter-form"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: 1,
                border: 'none',
                padding: '1rem 1.4rem',
                backgroundColor: 'transparent',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.82rem',
                color: '#1C1A17',
                outline: 'none',
                letterSpacing: '0.04em'
              }}
            />
            <button
              type="submit"
              className="btn-luxury btn-primary"
              style={{
                borderRadius: 0,
                padding: '1rem 1.8rem',
                border: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              <span>JOIN THE MUSE</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <div style={{ fontSize: '0.74rem', color: '#9E958C', letterSpacing: '0.04em' }}>
          We respect your peace. Private releases & olfactory reflections only. Unsubscribe anytime.
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .newsletter-form {
            flex-direction: column !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            gap: 0.75rem !important;
          }
          .newsletter-form input {
            background-color: #FBF9F5 !important;
            border: 1px solid rgba(28, 26, 23, 0.15) !important;
            border-radius: 2px !important;
          }
          .newsletter-form button {
            border-radius: 2px !important;
          }
        }
      `}</style>
    </section>
  );
};
