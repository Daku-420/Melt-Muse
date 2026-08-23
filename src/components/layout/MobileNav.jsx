import React from 'react';
import { X, ArrowRight, Mail, Phone, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { BrandLogo } from '../common/BrandLogo';
import { brandConfig } from '../../data/brandConfig';
import { useUI } from '../../context/UIContext';
import { collections } from '../../data/products';

export const MobileNav = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, currentPage, navigateTo } = useUI();

  if (!isMobileMenuOpen) return null;

  const links = [
    { label: 'Shop All Candles', page: 'shop' },
    { label: 'Collections', page: 'collections' },
    { label: 'Our Story & Craft', page: 'about' },
    { label: 'The Muse Journal', page: 'journal' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex'
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(22, 20, 18, 0.6)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.3s ease'
        }}
      />

      {/* Slide Drawer */}
      <div
        style={{
          position: 'relative',
          width: '85%',
          maxWidth: '380px',
          height: '100%',
          backgroundColor: '#FBF9F5',
          zIndex: 1001,
          padding: '2.5rem 1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
          boxShadow: '10px 0 40px rgba(0,0,0,0.2)',
          animation: 'slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
            <BrandLogo size="small" onClick={() => navigateTo('home')} />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#1C1A17',
                cursor: 'pointer',
                padding: '0.4rem'
              }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {links.map(link => (
              <button
                key={link.page}
                onClick={() => navigateTo(link.page)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.65rem',
                  fontWeight: 400,
                  color: currentPage === link.page ? '#A8875A' : '#1C1A17',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.25rem 0',
                  borderBottom: '1px solid rgba(28, 26, 23, 0.06)'
                }}
              >
                <span>{link.label}</span>
                <ArrowRight size={16} opacity={0.4} />
              </button>
            ))}
          </div>

          {/* Featured Collections list in mobile menu */}
          <div style={{ marginBottom: '2rem' }}>
            <span className="tagline-eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              Explore Series
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {collections.map(col => (
                <button
                  key={col.id}
                  onClick={() => navigateTo('shop', { collectionId: col.id })}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.82rem',
                    color: '#6E675F',
                    cursor: 'pointer',
                    letterSpacing: '0.04em'
                  }}
                >
                  {col.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Details in Drawer */}
        <div style={{ borderTop: '1px solid rgba(28, 26, 23, 0.08)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Sparkles size={14} color="#C5A880" />
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C1A17' }}>
              BURNING BRIGHT
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#8C827A', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            Hand-poured luxury botanical candles designed to elevate every moment.
          </p>
          <a
            href={brandConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#1C1A17',
              fontSize: '0.78rem',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            <InstagramIcon size={16} />
            <span>{brandConfig.instagramHandle}</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
