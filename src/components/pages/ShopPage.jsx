import React, { useState, useMemo } from 'react';
import { Sparkles, Filter, X, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { ProductCard } from '../shop/ProductCard';
import { products, collections } from '../../data/products';
import { useUI } from '../../context/UIContext';
import { brandConfig } from '../../data/brandConfig';

export const ShopPage = () => {
  const { selectedCollectionId, setSelectedCollectionId } = useUI();

  // Filter states
  const [activeCollection, setActiveCollection] = useState(selectedCollectionId || 'all');
  const [activeScentFamily, setActiveScentFamily] = useState('all');
  const [activeBadgeFilter, setActiveBadgeFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'newest', 'price-low', 'price-high', 'rating'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Scent families list
  const scentFamilies = ['all', 'Woody Oriental', 'Woody Aromatics', 'Fruity Green', 'Warm Gourmand', 'Floral Oriental', 'Citrus Herbaceous', 'Green Aromatic'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by collection
    if (activeCollection !== 'all') {
      result = result.filter(p => p.collection === activeCollection);
    }

    // Filter by scent family
    if (activeScentFamily !== 'all') {
      result = result.filter(p => p.scentFamily.toLowerCase() === activeScentFamily.toLowerCase());
    }

    // Filter by badge
    if (activeBadgeFilter === 'bestseller') {
      result = result.filter(p => p.isBestseller || p.badge === 'BESTSELLER');
    } else if (activeBadgeFilter === 'new') {
      result = result.filter(p => p.isNew || p.badge === 'NEW');
    } else if (activeBadgeFilter === 'limited') {
      result = result.filter(p => p.badge === 'LIMITED EDITION');
    }

    // Filter by max price
    result = result.filter(p => p.price <= maxPrice);

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCollection, activeScentFamily, activeBadgeFilter, maxPrice, sortBy]);

  const resetFilters = () => {
    setActiveCollection('all');
    setActiveScentFamily('all');
    setActiveBadgeFilter('all');
    setMaxPrice(2500);
    setSortBy('featured');
    setSelectedCollectionId(null);
  };

  const hasActiveFilters = activeCollection !== 'all' || activeScentFamily !== 'all' || activeBadgeFilter !== 'all' || maxPrice < 2500;

  return (
    <div style={{ backgroundColor: '#FBF9F5', minHeight: '100vh', paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <Sparkles size={12} color="#A8875A" />
            <span className="tagline-eyebrow">ARTISANAL CANDLE APOTHECARY</span>
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
            SHOP MELT MUSE
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
            Explore our curated catalog of small-batch botanical candles, hand-poured with crackling wooden wicks and complex fragrance architectures.
          </p>
        </div>

        {/* Collection Pills Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(28, 26, 23, 0.08)'
          }}
        >
          <button
            onClick={() => setActiveCollection('all')}
            style={{
              padding: '0.55rem 1.25rem',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              borderRadius: '20px',
              border: activeCollection === 'all' ? '1px solid #1C1A17' : '1px solid rgba(28, 26, 23, 0.12)',
              backgroundColor: activeCollection === 'all' ? '#1C1A17' : '#F5EFEB',
              color: activeCollection === 'all' ? '#FBF9F5' : '#1C1A17',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            All Creations ({products.length})
          </button>
          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => setActiveCollection(col.id)}
              style={{
                padding: '0.55rem 1.25rem',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.74rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: '20px',
                border: activeCollection === col.id ? '1px solid #1C1A17' : '1px solid rgba(28, 26, 23, 0.12)',
                backgroundColor: activeCollection === col.id ? '#1C1A17' : '#F5EFEB',
                color: activeCollection === col.id ? '#FBF9F5' : '#1C1A17',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Toolbar (Filters toggle + Sort dropdown + Product Count) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem 1.25rem',
            backgroundColor: '#F5EFEB',
            borderRadius: '2px'
          }}
        >
          {/* Left: Filter toggle & active counts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: '#FFFFFF',
                border: '1px solid rgba(28, 26, 23, 0.15)',
                padding: '0.5rem 1rem',
                fontSize: '0.74rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '1px',
                color: '#1C1A17'
              }}
            >
              <Filter size={14} />
              <span>Filter Fragrances</span>
              {hasActiveFilters && (
                <span
                  style={{
                    backgroundColor: '#C5A880',
                    color: '#1C1A17',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 700
                  }}
                >
                  !
                </span>
              )}
            </button>

            <span style={{ fontSize: '0.78rem', color: '#6E675F', letterSpacing: '0.04em' }}>
              Displaying <strong>{filteredProducts.length}</strong> bespoke candles
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8C3B3B',
                  fontSize: '0.74rem',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Right: Sorting Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.74rem', color: '#8C827A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(28, 26, 23, 0.15)',
                borderRadius: '1px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.74rem',
                color: '#1C1A17',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Formulations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {isMobileFilterOpen && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(28, 26, 23, 0.1)',
              padding: '1.75rem',
              marginBottom: '2.5rem',
              borderRadius: '2px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              boxShadow: '0 8px 24px -6px rgba(28, 26, 23, 0.05)',
              animation: 'slideUp 0.3s ease'
            }}
          >
            {/* Scent Family Filter */}
            <div>
              <span className="tagline-eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                Fragrance Family
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {scentFamilies.map(fam => (
                  <label
                    key={fam}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.78rem',
                      color: activeScentFamily === fam ? '#1C1A17' : '#6E675F',
                      fontWeight: activeScentFamily === fam ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="scentFamily"
                      checked={activeScentFamily === fam}
                      onChange={() => setActiveScentFamily(fam)}
                      style={{ accentColor: '#1C1A17' }}
                    />
                    <span>{fam === 'all' ? 'All Fragrance Families' : fam}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Badge / Curations Filter */}
            <div>
              <span className="tagline-eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                Curations & Badges
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { id: 'all', label: 'All Creations' },
                  { id: 'bestseller', label: 'Bestsellers Only' },
                  { id: 'new', label: 'New Releases' },
                  { id: 'limited', label: 'Limited Editions' }
                ].map(item => (
                  <label
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.78rem',
                      color: activeBadgeFilter === item.id ? '#1C1A17' : '#6E675F',
                      fontWeight: activeBadgeFilter === item.id ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="badgeFilter"
                      checked={activeBadgeFilter === item.id}
                      onChange={() => setActiveBadgeFilter(item.id)}
                      style={{ accentColor: '#1C1A17' }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <span className="tagline-eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                Maximum Price: {brandConfig.currency.symbol}{maxPrice.toLocaleString('en-IN')}
              </span>
              <input
                type="range"
                min="1500"
                max="2500"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1C1A17', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#8C827A', marginTop: '0.4rem' }}>
                <span>₹1,500</span>
                <span>₹2,500</span>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '6rem 2rem',
              backgroundColor: '#F5EFEB',
              borderRadius: '2px',
              border: '1px solid rgba(28, 26, 23, 0.06)'
            }}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '0.5rem' }}>
              No matches found for this olfactory combination.
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#6E675F', marginBottom: '1.5rem' }}>
              Try broadening your filter criteria or reset to view all signature candles.
            </p>
            <button onClick={resetFilters} className="btn-luxury btn-primary">
              <span>RESET FILTERS</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '3rem'
            }}
          >
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
