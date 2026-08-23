import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { testimonials } from '../../data/contentData';

export const Testimonials = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevReview = () => {
    setCurrentIdx(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIdx(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIdx];

  return (
    <section
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        backgroundColor: '#F5EFEB',
        borderBottom: '1px solid rgba(28, 26, 23, 0.06)'
      }}
    >
      <div className="container" style={{ maxWidth: '940px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <Sparkles size={12} color="#A8875A" />
            <span className="tagline-eyebrow">COMMUNITY DEVOTION</span>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.3rem, 4vw, 3.2rem)',
              fontWeight: 400,
              color: '#1C1A17',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            LOVED BY THE MUSES
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div
          style={{
            backgroundColor: '#FBF9F5',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            borderRadius: '2px',
            border: '1px solid rgba(28, 26, 23, 0.08)',
            boxShadow: '0 12px 36px -10px rgba(28, 26, 23, 0.06)',
            position: 'relative',
            textAlign: 'center'
          }}
        >
          {/* Rating stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.75rem' }}>
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={16} fill="#C5A880" color="#C5A880" />
            ))}
          </div>

          {/* Quote */}
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.25rem, 2.3vw, 1.8rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#1C1A17',
              lineHeight: 1.5,
              marginBottom: '2.25rem'
            }}
          >
            “{current.quote}”
          </blockquote>

          {/* Author & Product */}
          <div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1C1A17',
                marginBottom: '0.25rem'
              }}
            >
              {current.author}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#8C827A', letterSpacing: '0.04em' }}>
              {current.role} • Fragrance: <span style={{ color: '#C5A880', fontWeight: 500 }}>{current.product}</span>
            </div>
          </div>

          {/* Nav buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '2.5rem'
            }}
          >
            <button
              onClick={prevReview}
              style={navArrowStyle}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  style={{
                    width: idx === currentIdx ? '24px' : '6px',
                    height: '6px',
                    borderRadius: '4px',
                    backgroundColor: idx === currentIdx ? '#1C1A17' : 'rgba(28, 26, 23, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              style={navArrowStyle}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const navArrowStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: '1px solid rgba(28, 26, 23, 0.15)',
  backgroundColor: 'transparent',
  color: '#1C1A17',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, border-color 0.2s ease'
};
