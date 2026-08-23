import React, { useState } from 'react';
import { Sparkles, Flame, Wind, Feather, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const SensoryExperience = () => {
  const { navigateTo, isAmbientPlaying, toggleAmbientSound } = useUI();
  const [activeScentLayer, setActiveScentLayer] = useState('heart');

  const scentLayers = {
    top: {
      title: 'Top Notes — The Initial Spark',
      timing: '0 – 20 Minutes',
      description: 'The luminous opening impression: crisp Italian bergamot, smoked tea leaves, and wild ripe cassis that greet your room with breathtaking clarity.',
      elements: ['Italian Bergamot', 'Smoked Black Tea', 'Wild Fig Leaf']
    },
    heart: {
      title: 'Heart Notes — The Atmospheric Soul',
      timing: '20 Min – 3 Hours',
      description: 'The true emotional identity of the candle. Decadent black rose, milky sandalwood, and moonlit tuberose that gently saturate the air and create deep serenity.',
      elements: ['Velvet Black Rose', 'Milky Australian Sandalwood', 'Night Blooming Jasmine']
    },
    base: {
      title: 'Base Notes — The Lingering Reverie',
      timing: '3 – 8+ Hours Post-Burn',
      description: 'The rich grounding foundation: warm amber resin, charred French oak, and Bourbon vanilla bean that soften into furniture and textiles long into tomorrow.',
      elements: ['Golden Amber Resin', 'Charred French Oak', 'Bourbon Vanilla Bean']
    }
  };

  return (
    <section
      style={{
        paddingTop: '7.5rem',
        paddingBottom: '7.5rem',
        backgroundColor: '#161412',
        color: '#FBF9F5',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative ambient radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(197, 168, 128, 0.12) 0%, rgba(22, 20, 18, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center'
          }}
          className="sensory-grid"
        >
          {/* Left: Large Editorial Lifestyle Image with Framed Overlay */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                borderRadius: '2px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1506003094589-53954a26283f?auto=format&fit=crop&w=1200&q=85"
                alt="Melt Muse candle burning on a luxury linen bedside"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Floating ambient sound badge overlay */}
              <div
                onClick={toggleAmbientSound}
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  backgroundColor: 'rgba(22, 20, 18, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.65rem 1.15rem',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  color: isAmbientPlaying ? '#C5A880' : '#FBF9F5',
                  transition: 'all 0.3s ease'
                }}
              >
                {isAmbientPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {isAmbientPlaying ? 'Wood Wick Ambience (Playing)' : 'Tap to Hear the Flame'}
                </span>
              </div>
            </div>

            {/* Subtle floating quote accent */}
            <div
              style={{
                position: 'absolute',
                top: '-2rem',
                right: '-1.5rem',
                backgroundColor: 'rgba(33, 30, 26, 0.95)',
                border: '1px solid rgba(197, 168, 128, 0.3)',
                padding: '1.25rem 1.5rem',
                maxWidth: '240px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
              }}
              className="hide-mobile"
            >
              <span className="script-accent" style={{ display: 'block', marginBottom: '0.3rem' }}>
                Sensory Poetry
              </span>
              <p style={{ fontSize: '0.76rem', color: '#D6DDD4', lineHeight: 1.5 }}>
                100% pure botanical wax. FSC-certified wood wicks that gently whisper.
              </p>
            </div>
          </div>

          {/* Right: Editorial Story & Interactive Scent Pyramid */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Flame size={13} color="#C5A880" />
              <span style={{ color: '#C5A880', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>
                THE SENSORY ARCHITECTURE
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.6rem, 4.2vw, 4rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '0.04em',
                marginBottom: '1.75rem',
                color: '#FBF9F5',
                textTransform: 'uppercase'
              }}
            >
              A LITTLE LIGHT.
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#C5A880' }}>
                A LOT OF MOOD.
              </span>
            </h2>

            <p
              style={{
                fontSize: '1rem',
                color: '#B8B0A6',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
                fontWeight: 300
              }}
            >
              Lighting a Melt Muse candle is an intentional transition. As the wooden wick begins its rhythmic, soothing crackle, rich complex fragrance oils gently diffuse through the botanical wax pool — transforming your sanctuary from chaotic to calm, mundane to memorable.
            </p>

            {/* Interactive Scent Pyramid Tabs */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                padding: '1.5rem',
                marginBottom: '2.5rem'
              }}
            >
              {/* Tab Selector */}
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '0.75rem',
                  gap: '1.5rem',
                  marginBottom: '1.25rem'
                }}
              >
                {(['top', 'heart', 'base']).map(layer => (
                  <button
                    key={layer}
                    onClick={() => setActiveScentLayer(layer)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeScentLayer === layer ? '#C5A880' : 'rgba(251, 249, 245, 0.5)',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      position: 'relative',
                      paddingBottom: '0.35rem'
                    }}
                  >
                    {layer.toUpperCase()} NOTES
                    {activeScentLayer === layer && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-0.8rem',
                          left: 0,
                          width: '100%',
                          height: '2px',
                          backgroundColor: '#C5A880'
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Layer Description */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#FBF9F5' }}>
                    {scentLayers[activeScentLayer].title}
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#C5A880', letterSpacing: '0.1em' }}>
                    {scentLayers[activeScentLayer].timing}
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#B8B0A6', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {scentLayers[activeScentLayer].description}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {scentLayers[activeScentLayer].elements.map((note, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.72rem',
                        backgroundColor: 'rgba(197, 168, 128, 0.12)',
                        border: '1px solid rgba(197, 168, 128, 0.25)',
                        color: '#F0E6D8',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px'
                      }}
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigateTo('shop')}
                className="btn-luxury btn-light-outline"
                style={{ backgroundColor: '#C5A880', color: '#161412', borderColor: '#C5A880' }}
              >
                <span>SHOP SENSORY CANDLES</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => navigateTo('about')}
                className="editorial-link"
                style={{ color: '#FBF9F5' }}
              >
                <span>Learn Our Pouring Method</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .sensory-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
};
