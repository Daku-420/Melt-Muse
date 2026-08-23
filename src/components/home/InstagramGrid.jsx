import React, { useState } from 'react';
import { ArrowUpRight, Heart } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { instagramPosts } from '../../data/contentData';
import { brandConfig } from '../../data/brandConfig';

export const InstagramGrid = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

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
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <InstagramIcon size={13} color="#A8875A" />
            <span className="tagline-eyebrow">VISUAL DIARY & COMMUNITY</span>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.3rem, 4vw, 3.2rem)',
              fontWeight: 400,
              color: '#1C1A17',
              letterSpacing: '0.04em',
              marginBottom: '0.5rem',
              textTransform: 'uppercase'
            }}
          >
            FOLLOW THE MUSE
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: '#6E675F',
              fontWeight: 300,
              marginBottom: '1rem'
            }}
          >
            A little Melt Muse, every day.
          </p>

          <a
            href={brandConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: '#A8875A',
              textDecoration: 'none',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>{brandConfig.instagramHandle}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 6-Image Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1rem',
            marginBottom: '3rem'
          }}
          className="insta-grid"
        >
          {instagramPosts.map((post, idx) => (
            <a
              key={post.id}
              href={brandConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderRadius: '1px',
                display: 'block',
                textDecoration: 'none'
              }}
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: hoveredIdx === idx ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />

              {/* Hover Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(22, 20, 18, 0.65)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: '#FBF9F5',
                  padding: '1rem',
                  textAlign: 'center',
                  opacity: hoveredIdx === idx ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <InstagramIcon size={22} color="#C5A880" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600 }}>
                  <Heart size={12} fill="#C5A880" color="#C5A880" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href={brandConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury btn-outline"
            style={{ padding: '0.95rem 2.2rem' }}
          >
            <InstagramIcon size={16} />
            <span>FOLLOW US ON INSTAGRAM</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .insta-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
        @media (max-width: 600px) {
          .insta-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
