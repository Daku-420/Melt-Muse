import React from 'react';

export const BrandLogo = ({ variant = 'dark', size = 'normal', withTagline = true, onClick }) => {
  // variant: 'dark' (for light backgrounds), 'light' (for dark/hero overlays), 'gold'
  const isLight = variant === 'light';
  const textColor = isLight ? '#FBF9F5' : '#1C1A17';
  const taglineColor = isLight ? 'rgba(251, 249, 245, 0.75)' : '#8C827A';
  const flameColor = isLight ? '#E5C9A6' : '#C5A880';

  const scale = size === 'large' ? 1.3 : size === 'small' ? 0.85 : 1;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        textDecoration: 'none',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        transition: 'opacity 0.3s ease'
      }}
      className="melt-muse-logo"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        {/* Minimal luxury flame icon mark */}
        <svg
          width="18"
          height="22"
          viewBox="0 0 24 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flame-anim"
          style={{ opacity: 0.95 }}
        >
          <path
            d="M12 1.5C12 1.5 17.5 7.5 17.5 14C17.5 17.5 15 20.5 12 20.5C9 20.5 6.5 17.5 6.5 14C6.5 7.5 12 1.5 12 1.5Z"
            fill={flameColor}
          />
          <path
            d="M12 8C12 8 15 12 15 15C15 17 13.5 18.5 12 18.5C10.5 18.5 9 17 9 15C9 12 12 8 12 8Z"
            fill={isLight ? '#FFF3E0' : '#F6E6D2'}
          />
        </svg>

        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.65rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: textColor,
            lineHeight: 1,
            textTransform: 'uppercase'
          }}
        >
          MELT MUSE
        </span>
      </div>

      {withTagline && (
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.52rem',
            fontWeight: 500,
            letterSpacing: '0.34em',
            color: taglineColor,
            textTransform: 'uppercase',
            marginTop: '0.22rem',
            paddingLeft: '0.34em'
          }}
        >
          BURNING BRIGHT
        </span>
      )}
    </div>
  );
};
