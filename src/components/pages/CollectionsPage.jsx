import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { collections, products } from '../../data/products';
import { useUI } from '../../context/UIContext';
import { ProductCard } from '../shop/ProductCard';

export const CollectionsPage = () => {
  const { navigateTo, setSelectedCollectionId } = useUI();

  const handleExploreCollection = (colId) => {
    setSelectedCollectionId(colId);
    navigateTo('shop');
  };

  return (
    <div style={{ backgroundColor: '#FBF9F5', minHeight: '100vh', paddingTop: '3rem', paddingBottom: '7rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <Sparkles size={12} color="#A8875A" />
            <span className="tagline-eyebrow">CURATED SENSORY SERIES</span>
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: '#1C1A17',
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}
          >
            OUR COLLECTIONS
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: '#6E675F',
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            Every Melt Muse collection is conceptualized around a distinct time of day, atmosphere, and emotional state.
          </p>
        </div>

        {/* Collections Showcase Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {collections.map((col, idx) => {
            const colProducts = products.filter(p => p.collection === col.id);
            const isReversed = idx % 2 !== 0;

            return (
              <section
                key={col.id}
                style={{
                  backgroundColor: '#F5EFEB',
                  borderRadius: '2px',
                  border: '1px solid rgba(28, 26, 23, 0.06)',
                  padding: '3rem',
                  overflow: 'hidden'
                }}
                className="collection-section-card"
              >
                {/* Banner & Story Top */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isReversed ? '1fr 1.2fr' : '1.2fr 1fr',
                    gap: '3.5rem',
                    alignItems: 'center',
                    marginBottom: '3rem'
                  }}
                  className="collection-banner-grid"
                >
                  <div style={{ order: isReversed ? 2 : 1 }}>
                    <span className="tagline-eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>
                      SERIES {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                        fontWeight: 400,
                        color: '#1C1A17',
                        marginBottom: '0.5rem'
                      }}
                    >
                      {col.name}
                    </h2>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontStyle: 'italic', color: '#A8875A', marginBottom: '1.25rem' }}>
                      {col.tagline}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#605850', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                      {col.description}
                    </p>
                    <button
                      onClick={() => handleExploreCollection(col.id)}
                      className="btn-luxury btn-primary"
                      style={{ padding: '0.85rem 1.75rem' }}
                    >
                      <span>VIEW ALL IN THIS SERIES</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div style={{ order: isReversed ? 1 : 2 }}>
                    <div style={{ aspectRatio: '16 / 9', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}>
                      <img src={col.heroImage} alt={col.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>

                {/* Sub Products Carousel / Grid */}
                <div>
                  <h4 style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C827A', marginBottom: '1.5rem' }}>
                    Featured Fragrances in {col.name}:
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '2rem'
                    }}
                  >
                    {colProducts.map(prod => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .collection-banner-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .collection-section-card {
            padding: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};
