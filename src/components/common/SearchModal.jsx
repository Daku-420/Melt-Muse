import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { products } from '../../data/products';
import { brandConfig } from '../../data/brandConfig';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useUI();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return products.filter(p => {
      const matchName = p.name.toLowerCase().includes(term);
      const matchSub = p.subtitle.toLowerCase().includes(term);
      const matchDesc = p.description.toLowerCase().includes(term);
      const matchFamily = p.scentFamily.toLowerCase().includes(term);
      const matchNotes = [
        ...p.scentNotes.top,
        ...p.scentNotes.heart,
        ...p.scentNotes.base
      ].some(note => note.toLowerCase().includes(term));

      return matchName || matchSub || matchDesc || matchFamily || matchNotes;
    });
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Midnight Muse', 'Vanilla', 'Sandalwood', 'Wooden Wick', 'Rose Noir', 'Citrus'];

  const handleSelectProduct = (id) => {
    setIsSearchOpen(false);
    navigateTo('product', { productId: id });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(22, 20, 18, 0.75)',
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.25s ease'
        }}
      />

      {/* Modal Content Top Panel */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#FBF9F5',
          zIndex: 1001,
          padding: '2.5rem 2rem 3rem 2rem',
          boxShadow: '0 15px 45px rgba(0,0,0,0.2)',
          animation: 'slideUp 0.3s ease'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Close Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setIsSearchOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#1C1A17',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              <span>ESC / CLOSE</span>
              <X size={18} />
            </button>
          </div>

          {/* Search Input Bar */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '2px solid #1C1A17',
              paddingBottom: '0.75rem',
              marginBottom: '2rem'
            }}
          >
            <Search size={24} color="#1C1A17" style={{ marginRight: '1rem', flexShrink: 0 }} />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by candle, scent note, mood, or fragrance family..."
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                color: '#1C1A17',
                outline: 'none',
                fontWeight: 400
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ background: 'none', border: 'none', color: '#8C827A', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Quick suggestions if no query */}
          {!searchTerm && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
                <Sparkles size={12} color="#C5A880" />
                <span className="tagline-eyebrow">POPULAR SENSORY SEARCHES</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {popularSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    style={{
                      background: '#F5EFEB',
                      border: '1px solid rgba(28, 26, 23, 0.08)',
                      padding: '0.45rem 1rem',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.76rem',
                      color: '#1C1A17',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {searchTerm && (
            <div>
              <div style={{ fontSize: '0.78rem', color: '#8C827A', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                FOUND {searchResults.length} {searchResults.length === 1 ? 'RESULT' : 'RESULTS'} FOR "{searchTerm}"
              </div>

              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: '#6E675F' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                    No candles matching that specific whisper.
                  </p>
                  <p style={{ fontSize: '0.82rem' }}>
                    Try searching for “Sandalwood”, “Midnight”, “Vanilla”, or explore all creations.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '1.5rem',
                    maxHeight: '50vh',
                    overflowY: 'auto',
                    paddingRight: '0.5rem'
                  }}
                >
                  {searchResults.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.id)}
                      style={{
                        display: 'flex',
                        gap: '0.85rem',
                        cursor: 'pointer',
                        padding: '0.75rem',
                        backgroundColor: '#F5EFEB',
                        borderRadius: '1px',
                        border: '1px solid rgba(28, 26, 23, 0.05)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        style={{ width: '60px', height: '75px', objectFit: 'cover', borderRadius: '1px' }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 500, color: '#1C1A17' }}>
                          {prod.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#857D74', textTransform: 'uppercase' }}>
                          {prod.scentFamily}
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1C1A17', marginTop: '0.25rem' }}>
                          {brandConfig.currency.symbol}{prod.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
