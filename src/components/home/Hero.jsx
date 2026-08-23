import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Flame, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { brandConfig } from '../../data/brandConfig';

export const Hero = () => {
  const { navigateTo, isAmbientPlaying, toggleAmbientSound } = useUI();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        marginTop: 'calc(-1 * var(--header-height))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FBF9F5',
        backgroundColor: '#161412'
      }}
    >
      {/* Background Image with subtle slow zoom & parallax */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=2000&q=90')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          transform: `translateY(${scrollY * 0.25}px) scale(1.04)`,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
      />

      {/* Luxury Cinematic Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(22, 20, 18, 0.45) 0%, rgba(22, 20, 18, 0.55) 50%, rgba(22, 20, 18, 0.85) 100%)',
          backdropFilter: 'blur(1px)'
        }}
      />

      {/* Content Box */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '6rem',
          paddingBottom: '4rem',
          textAlign: 'center',
          maxWidth: '860px'
        }}
      >
        {/* Eyebrow Tagline */}
        <div
          className="animate-fade-in"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            marginBottom: '1.25rem',
            padding: '0.45rem 1.25rem',
            backgroundColor: 'rgba(251, 249, 245, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '40px',
            border: '1px solid rgba(251, 249, 245, 0.18)'
          }}
        >
          <Sparkles size={13} color="#E5C9A6" />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#F0E6D8'
            }}
          >
            {brandConfig.tagline}
          </span>
        </div>

        {/* Brand Master Headline */}
        <h1
          className="animate-slide-up"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3.2rem, 7.5vw, 6.2rem)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FBF9F5',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            textShadow: '0 4px 30px rgba(0,0,0,0.5)'
          }}
        >
          MELT MUSE
        </h1>

        {/* Supporting Copy */}
        <p
          className="animate-slide-up"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#E8E1D9',
            lineHeight: 1.45,
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto',
            textShadow: '0 2px 20px rgba(0,0,0,0.6)'
          }}
        >
          “Candles created to turn everyday moments into something worth remembering.”
        </p>

        {/* CTAs */}
        <div
          className="animate-slide-up"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => navigateTo('shop')}
            className="btn-luxury btn-light-outline"
            style={{
              backgroundColor: '#FBF9F5',
              color: '#1C1A17',
              borderColor: '#FBF9F5',
              padding: '1.05rem 2.4rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            <span>SHOP THE COLLECTION</span>
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => navigateTo('about')}
            className="btn-luxury btn-light-outline"
            style={{
              padding: '1.05rem 2.2rem'
            }}
          >
            <span>DISCOVER MELT MUSE</span>
          </button>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 3rem'
        }}
        className="hero-footer-bar"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'rgba(251, 249, 245, 0.7)' }}>
          <Flame size={14} color="#C5A880" />
          <span>HAND-POURED BOTANICAL WAX</span>
        </div>

        {/* Scroll down indicator */}
        <div
          onClick={() => {
            window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          }}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'rgba(251, 249, 245, 0.65)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
        >
          <span>SCROLL</span>
          <ChevronDown size={14} style={{ animation: 'pulseGlow 2s infinite' }} />
        </div>

        <div style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: 'rgba(251, 249, 245, 0.7)' }}>
          <span>NEW DELHI • MUMBAI</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-footer-bar {
            padding: 0 1.5rem !important;
            bottom: 1.25rem !important;
          }
          .hero-footer-bar > div:first-child,
          .hero-footer-bar > div:last-child {
            display: none !important;
          }
          .hero-footer-bar {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
