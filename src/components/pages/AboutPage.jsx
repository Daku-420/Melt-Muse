import React from 'react';
import { Sparkles, Flame, Heart, ArrowRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { BrandLogo } from '../common/BrandLogo';

export const AboutPage = () => {
  const { navigateTo } = useUI();

  return (
    <div style={{ backgroundColor: '#FBF9F5', minHeight: '100vh', paddingBottom: '7rem' }}>
      {/* Story Hero */}
      <section
        style={{
          position: 'relative',
          paddingTop: '6rem',
          paddingBottom: '6rem',
          backgroundColor: '#F5EFEB',
          borderBottom: '1px solid rgba(28, 26, 23, 0.06)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
            <Sparkles size={13} color="#A8875A" />
            <span className="tagline-eyebrow">OUR ORIGIN & ESSENCE</span>
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
              fontWeight: 400,
              color: '#1C1A17',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}
          >
            THE STORY OF MELT MUSE
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.45rem',
              fontStyle: 'italic',
              color: '#605850',
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            “We did not start Melt Muse to sell wax in a glass. We started it to give everyday moments an evocative soundtrack of light and scent.”
          </p>
        </div>
      </section>

      {/* Asymmetric Story Narrative Layout 1: The Philosophy */}
      <section style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '5rem',
              alignItems: 'center'
            }}
            className="about-grid"
          >
            {/* Image */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.08)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&w=1200&q=85"
                  alt="Pouring hot botanical wax into luxury vessels"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  left: '-1.5rem',
                  backgroundColor: '#161412',
                  color: '#FBF9F5',
                  padding: '1.25rem 1.75rem',
                  maxWidth: '260px'
                }}
                className="hide-mobile"
              >
                <div style={{ fontSize: '0.7rem', color: '#C5A880', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  HAND-POURED IN MICRO-BATCHES
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic' }}>
                  No automated assembly lines. Just patience and precision.
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div>
              <span className="tagline-eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                INTENTIONAL LUXURY
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  lineHeight: 1.15,
                  marginBottom: '1.5rem',
                  color: '#1C1A17'
                }}
              >
                The Invisible Architecture of Home.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem', color: '#5C544C', lineHeight: 1.8 }}>
                <p>
                  In a world that moves too fast, memory is often our most fragile possession. Scent is the only sense directly tethered to the limbic brain—the epicenter of memory and emotion. A single breath of smoldering black tea or milky cedarwood can instantly transport you back to a golden hour in Florence, a rainy midnight reverie, or a cherished intimate conversation.
                </p>
                <p>
                  Melt Muse was conceived from this profound connection. We set out to design candles that do not merely perfume a room, but hold space for you. An everyday ritual that commands you to slow down, strike a match, and melt into the present.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Story Narrative Layout 2: The Botanicals & The Sound */}
      <section style={{ paddingTop: '5rem', paddingBottom: '6rem', backgroundColor: '#F5EFEB' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: '5rem',
              alignItems: 'center'
            }}
            className="about-grid"
          >
            {/* Narrative */}
            <div>
              <span className="tagline-eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                ZERO COMPROMISE FORMULATION
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  lineHeight: 1.15,
                  marginBottom: '1.5rem',
                  color: '#1C1A17'
                }}
              >
                Wax as Pure as Intention.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem', color: '#5C544C', lineHeight: 1.8 }}>
                <p>
                  Most commercial candles hide petroleum-derived paraffin wax, chemical phthalate fixatives, and synthetic dyes behind fancy branding. At Melt Muse, our pledge is absolute purity.
                </p>
                <p>
                  Every jar is poured with our proprietary blend of renewable coconut and soybean waxes. It melts at a lower temperature into a velvety, translucent pool, releasing fragrance gently and evenly over 55+ hours without headache-inducing fumes or black smoke.
                </p>
                <p>
                  Combined with our FSC-certified wooden wicks that emit a soothing, subtle crackle reminiscent of an autumn fireplace, every burn is an immersive multi-sensory symphony.
                </p>
              </div>
            </div>

            {/* Image */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.08)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=1200&q=85"
                  alt="Aesthetic Melt Muse candle with crackling wooden wick flame"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section style={{ padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: '#161412', color: '#FBF9F5' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Flame size={28} color="#C5A880" style={{ margin: '0 auto 1.5rem auto' }} />
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.4,
              marginBottom: '2.5rem',
              color: '#F0E6D8'
            }}
          >
            “May your days be purposeful, your evenings tranquil, and your sanctuary forever burning bright.”
          </h3>
          <button
            onClick={() => navigateTo('shop')}
            className="btn-luxury btn-light-outline"
            style={{ backgroundColor: '#FBF9F5', color: '#1C1A17', borderColor: '#FBF9F5' }}
          >
            <span>DISCOVER THE CREATIONS</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};
