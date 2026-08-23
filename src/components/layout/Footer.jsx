import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { BrandLogo } from '../common/BrandLogo';
import { brandConfig } from '../../data/brandConfig';
import { useUI } from '../../context/UIContext';

export const Footer = () => {
  const { navigateTo, addToast } = useUI();

  const handleStaticClick = (topic) => {
    addToast(`${topic} policy details available via Concierge service`, 'info');
  };

  return (
    <footer
      style={{
        backgroundColor: '#161412',
        color: '#FBF9F5',
        paddingTop: '6rem',
        paddingBottom: '3.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Top Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr 0.9fr 1.2fr',
            gap: '3.5rem',
            marginBottom: '4.5rem'
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Philosophy */}
          <div>
            <div style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
              <BrandLogo variant="light" size="large" />
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                color: '#B8B0A6',
                lineHeight: 1.7,
                maxWidth: '320px',
                marginBottom: '1.75rem',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.15rem',
                fontStyle: 'italic'
              }}
            >
              “Candles created to turn everyday moments into something worth remembering.”
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#C5A880',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'opacity 0.2s ease'
                }}
              >
                <InstagramIcon size={16} />
                <span>Follow {brandConfig.instagramHandle}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C5A880',
                marginBottom: '1.5rem'
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  style={footerLinkStyle}
                >
                  Shop All Candles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('collections')}
                  style={footerLinkStyle}
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  style={footerLinkStyle}
                >
                  About Our Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('journal')}
                  style={footerLinkStyle}
                >
                  The Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleStaticClick('FAQ')}
                  style={footerLinkStyle}
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C5A880',
                marginBottom: '1.5rem'
              }}
            >
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <li>
                <button
                  onClick={() => handleStaticClick('Shipping & Delivery')}
                  style={footerLinkStyle}
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleStaticClick('Returns & Exchanges')}
                  style={footerLinkStyle}
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleStaticClick('Candle Care & Safety')}
                  style={footerLinkStyle}
                >
                  Candle Care Ritual
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleStaticClick('Privacy Policy')}
                  style={footerLinkStyle}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleStaticClick('Terms & Conditions')}
                  style={footerLinkStyle}
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio & Concierge */}
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C5A880',
                marginBottom: '1.5rem'
              }}
            >
              The Studio
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#B8B0A6', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={16} color="#C5A880" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{brandConfig.contact.studio}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#C5A880" style={{ flexShrink: 0 }} />
                <a href={`mailto:${brandConfig.contact.email}`} style={{ color: '#E8E1D9', textDecoration: 'none' }}>
                  {brandConfig.contact.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#C5A880" style={{ flexShrink: 0 }} />
                <span>{brandConfig.contact.concierge}</span>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#8C827A' }}>
                {brandConfig.contact.hours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Subtle Emblem */}
        <div
          style={{
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            fontSize: '0.75rem',
            color: '#8C827A'
          }}
        >
          <div>
            © {new Date().getFullYear()} Melt Muse. All rights reserved. Handcrafted with intention.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>BURNING BRIGHT</span>
            <span>•</span>
            <span>100% BOTANICAL WAX</span>
            <span>•</span>
            <span>CRACKLING WOODEN WICKS</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
};

const footerLinkStyle = {
  background: 'none',
  border: 'none',
  padding: 0,
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.82rem',
  color: '#B8B0A6',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'color 0.2s ease',
  letterSpacing: '0.02em',
  display: 'inline-block'
};
