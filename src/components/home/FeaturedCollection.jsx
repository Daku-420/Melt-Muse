import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '../shop/ProductCard';
import { products } from '../../data/products';
import { useUI } from '../../context/UIContext';

export const FeaturedCollection = () => {
  const { navigateTo } = useUI();
  // Filter signature Muse collection items
  const featuredProducts = products.filter(p => p.collection === 'the-muse-collection').slice(0, 4);

  return (
    <section
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#FBF9F5',
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
            marginBottom: '4rem'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <Sparkles size={12} color="#A8875A" />
            <span className="tagline-eyebrow">SIGNATURE BOTANICAL SERIES</span>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
              fontWeight: 400,
              color: '#1C1A17',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
              textTransform: 'uppercase'
            }}
          >
            THE MUSE COLLECTION
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: '#6E675F',
              fontWeight: 300,
              maxWidth: '550px'
            }}
          >
            Scents designed to set the mood.
          </p>
        </div>

        {/* Sophisticated 2-column on tablet / 4-column on desktop product grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4.5rem'
          }}
          className="featured-collection-grid"
        >
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Shop All link */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigateTo('shop')}
            className="btn-luxury btn-outline"
            style={{ padding: '1rem 2.6rem' }}
          >
            <span>SHOP ALL CANDLES</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
