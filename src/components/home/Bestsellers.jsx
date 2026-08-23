import React from 'react';
import { ArrowRight, Sparkles, Flame } from 'lucide-react';
import { ProductCard } from '../shop/ProductCard';
import { products } from '../../data/products';
import { useUI } from '../../context/UIContext';

export const Bestsellers = () => {
  const { navigateTo } = useUI();
  // Filter top bestsellers
  const bestsellers = products.filter(p => p.isBestseller || p.badge === 'BESTSELLER' || p.badge === 'FAVORITE').slice(0, 3);

  return (
    <section
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#F5EFEB',
        borderBottom: '1px solid rgba(28, 26, 23, 0.06)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '3.5rem'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <Flame size={13} color="#A8875A" />
            <span className="tagline-eyebrow">MOST COVETED RITUALS</span>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              fontWeight: 400,
              color: '#1C1A17',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
              textTransform: 'uppercase'
            }}
          >
            THE ONES YOU'LL KEEP COMING BACK TO
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: '#6E675F',
              fontWeight: 300,
              maxWidth: '560px'
            }}
          >
            Our community's most beloved aromatic sanctuaries. Formulated to linger in memory.
          </p>
        </div>

        {/* 3-Column Large Photography Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
          className="bestsellers-grid"
        >
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bestsellers footer note */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            padding: '1.5rem 2rem',
            backgroundColor: 'rgba(251, 249, 245, 0.65)',
            border: '1px solid rgba(28, 26, 23, 0.06)',
            borderRadius: '2px',
            maxWidth: '750px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#6E675F', letterSpacing: '0.04em' }}>
            <Sparkles size={14} color="#C5A880" />
            <span>Over 10,000+ moments illuminated across homes worldwide.</span>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="editorial-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            <span>Explore All Fragrances</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
};
