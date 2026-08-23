import React, { useState } from 'react';
import { Sparkles, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { journalArticles } from '../../data/contentData';
import { useUI } from '../../context/UIContext';

export const JournalPage = () => {
  const { navigateTo } = useUI();
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div style={{ backgroundColor: '#FBF9F5', minHeight: '100vh', paddingTop: '3rem', paddingBottom: '7rem' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <BookOpen size={12} color="#A8875A" />
            <span className="tagline-eyebrow">THE OLFACTORY EDITORIAL</span>
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
            THE MUSE JOURNAL
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
            Reflections on slow living, the acoustics of wooden wicks, and scent-mapping your sacred sanctuary.
          </p>
        </div>

        {/* Selected Article Modal/View if opened */}
        {selectedArticle ? (
          <div
            style={{
              backgroundColor: '#F5EFEB',
              borderRadius: '2px',
              padding: 'clamp(2rem, 5vw, 4rem)',
              marginBottom: '4rem',
              border: '1px solid rgba(28, 26, 23, 0.08)'
            }}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              style={{
                background: 'none',
                border: 'none',
                color: '#A8875A',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginBottom: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              ← Back to All Journal Essays
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#8C827A', fontSize: '0.75rem', marginBottom: '1rem', letterSpacing: '0.08em' }}>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                lineHeight: 1.15,
                color: '#1C1A17',
                marginBottom: '2rem'
              }}
            >
              {selectedArticle.title}
            </h2>

            <div style={{ aspectRatio: '21 / 9', borderRadius: '2px', overflow: 'hidden', marginBottom: '2.5rem' }}>
              <img src={selectedArticle.image} alt={selectedArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.35rem',
                color: '#403A34',
                lineHeight: 1.8,
                maxWidth: '780px',
                margin: '0 auto'
              }}
            >
              <p style={{ marginBottom: '1.5rem' }}>{selectedArticle.content}</p>
              <p style={{ marginBottom: '1.5rem' }}>
                When lighting a candle, we create a sensory punctuation mark in the day. The gentle crackle acts as white noise for a restless mind, anchoring attention to the steady dance of flame. In our studio experiments, we observed how the sound alone triggers a measurable parasympathetic calming response.
              </p>
              <p>
                To maintain this pristine acoustic experience, remember the golden rule: trim the charred wood crest to 1/8 inch before re-lighting. A clean wick ensures complete combustion, optimal fragrance throw, and zero soot.
              </p>
            </div>
          </div>
        ) : (
          /* Grid of Articles */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem'
            }}
          >
            {journalArticles.map(article => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                style={{
                  backgroundColor: '#FBF9F5',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease'
                }}
              >
                {/* Image */}
                <div
                  style={{
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    borderRadius: '1px',
                    backgroundColor: '#F0EBE5',
                    marginBottom: '1.25rem'
                  }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="journal-thumb"
                  />
                </div>

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.72rem', color: '#8C827A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={11} /> {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.65rem',
                    fontWeight: 500,
                    lineHeight: 1.25,
                    color: '#1C1A17',
                    marginBottom: '0.75rem'
                  }}
                >
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p style={{ fontSize: '0.86rem', color: '#6E675F', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {article.excerpt}
                </p>

                {/* Link */}
                <div style={{ marginTop: 'auto' }}>
                  <span className="editorial-link" style={{ fontSize: '0.74rem' }}>
                    <span>Read Essay</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <style>{`
        article:hover .journal-thumb {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
};
