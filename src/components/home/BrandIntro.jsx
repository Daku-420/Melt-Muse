import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const BrandIntro = () => {
  const { navigateTo } = useUI();

  return (
    <section
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        backgroundColor: '#FBF9F5',
        position: 'relative',
        borderBottom: '1px solid rgba(28, 26, 23, 0.06)'
      }}
    >
      <div className="container" style={{ textAlign: 'center', maxWidth: '840px' }}>
        {/* Subtle Eyebrow */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Sparkles size={13} color="#A8875A" />
          <span className="tagline-eyebrow">THE MELT MUSE PHILOSOPHY</span>
        </div>

        {/* Master Serif Headline */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#1C1A17',
            marginBottom: '1.75rem',
            letterSpacing: '0.02em'
          }}
        >
          Made to Melt Into Your Moments.
        </h2>

        {/* Editorial Body */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: '#605850',
            marginBottom: '2.25rem',
            fontWeight: 300
          }}
        >
          Melt Muse creates beautifully crafted candles designed to bring warmth, atmosphere, and quiet personality into everyday spaces. Hand-poured with pure botanical wax, sustainably harvested wooden wicks, and intricate fragrance notes that linger long after the flame is snuffed.
        </p>

        {/* Link */}
        <div>
          <button
            onClick={() => navigateTo('about')}
            className="editorial-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem' }}
          >
            <span>Explore Our Story</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
