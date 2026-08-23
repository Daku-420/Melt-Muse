import React from 'react';
import { Sparkles } from 'lucide-react';

export const Craftsmanship = () => {
  const pillars = [
    {
      num: '01',
      title: 'Thoughtfully Made',
      subtitle: 'Small-Batch Hand Poured',
      description: 'Every single candle is poured by hand in curated micro-batches to guarantee consistent wax density, impeccable aesthetic finish, and an even burn pool.'
    },
    {
      num: '02',
      title: 'Beautifully Scented',
      subtitle: 'Complex Fragrance Architecture',
      description: 'Formulated with layered olfactory notes that evolve over hours. We use pure botanical oils balanced with fine perfumery notes to achieve a gentle yet lingering scent throw.'
    },
    {
      num: '03',
      title: 'Made for Your Space',
      subtitle: 'Timeless Minimalist Vessels',
      description: 'Housed in heavyweight frosted amber and matte ceramic jars designed to be repurposed as luxury brush holders, planter pots, or keepsake vessels once the wax is spent.'
    }
  ];

  return (
    <section
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        backgroundColor: '#FBF9F5',
        borderBottom: '1px solid rgba(28, 26, 23, 0.06)'
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <Sparkles size={12} color="#A8875A" />
            <span className="tagline-eyebrow">ARTISANAL COMMITMENT</span>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.3rem, 4vw, 3.3rem)',
              fontWeight: 400,
              color: '#1C1A17',
              letterSpacing: '0.03em',
              marginBottom: '0.75rem',
              textTransform: 'uppercase'
            }}
          >
            THE CRAFT BEHIND THE GLOW
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: '#6E675F',
              fontWeight: 300
            }}
          >
            Uncompromising dedication to slow craftsmanship, clean ingredients, and quiet luxury.
          </p>
        </div>

        {/* 3 Pillars Editorial Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3.5rem'
          }}
        >
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(28, 26, 23, 0.12)'
              }}
            >
              {/* Number and Subtitle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.75rem',
                    fontStyle: 'italic',
                    color: '#C5A880',
                    fontWeight: 400
                  }}
                >
                  {pillar.num}
                </span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.68rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#8C827A',
                    fontWeight: 600
                  }}
                >
                  {pillar.subtitle}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.9rem',
                  fontWeight: 500,
                  color: '#1C1A17',
                  marginBottom: '1rem',
                  letterSpacing: '0.02em'
                }}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#6E675F',
                  lineHeight: 1.7,
                  fontWeight: 300
                }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
