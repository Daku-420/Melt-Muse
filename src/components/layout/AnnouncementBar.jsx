import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const AnnouncementBar = () => {
  const { isAmbientPlaying, toggleAmbientSound } = useUI();
  const messages = [
    'Complimentary shipping on orders above ₹1,499',
    'Hand-poured botanical wax with therapeutic crackling wooden wicks',
    'Welcome Privilege: 10% off your first order with code FIRSTMUSE'
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div
      style={{
        backgroundColor: '#161412',
        color: '#FBF9F5',
        fontSize: '0.68rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '0.5rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 110,
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.7 }} className="hide-mobile">
        <Sparkles size={11} color="#C5A880" />
        <span>Artisanal Home Fragrance</span>
      </div>

      <div
        style={{
          flex: 1,
          textAlign: 'center',
          transition: 'opacity 0.5s ease',
          fontWeight: 400,
          color: '#E8E1D9'
        }}
      >
        <span>{messages[currentIdx]}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={toggleAmbientSound}
          title={isAmbientPlaying ? 'Pause candle crackle' : 'Play wooden wick crackle ambience'}
          style={{
            background: 'transparent',
            border: 'none',
            color: isAmbientPlaying ? '#C5A880' : 'rgba(251, 249, 245, 0.65)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          {isAmbientPlaying ? <Volume2 size={12} /> : <VolumeX size={12} />}
          <span className="hide-mobile">{isAmbientPlaying ? 'Sound: On' : 'Wood Wick Sound'}</span>
        </button>
      </div>
    </div>
  );
};
