import React, { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  // Navigation & Routing state
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('midnight-muse');
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSensoryModalOpen, setIsSensoryModalOpen] = useState(false);

  // Toast notification system
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = id => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Scroll to top on page change
  const navigateTo = (page, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    if (params.productId) {
      setSelectedProductId(params.productId);
    }
    if (params.collectionId) {
      setSelectedCollectionId(params.collectionId);
    }
    setIsMobileMenuOpen(false);
  };

  // Ambient sound synthesizer (Web Audio API generated realistic gentle wood-wick crackle & warmth)
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [audioContextRef, setAudioContextRef] = useState(null);
  const [gainNodeRef, setGainNodeRef] = useState(null);

  const toggleAmbientSound = () => {
    if (isAmbientPlaying) {
      if (audioContextRef && audioContextRef.state !== 'closed') {
        audioContextRef.suspend();
      }
      setIsAmbientPlaying(false);
      addToast('Ambient candle sound paused', 'info', 2000);
    } else {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        let ctx = audioContextRef;
        if (!ctx) {
          ctx = new AudioCtx();
          setAudioContextRef(ctx);

          // Create subtle pink noise filtered for crackle
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 650;

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          setGainNodeRef(gain);

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          whiteNoise.start(0);
        } else {
          ctx.resume();
        }
        setIsAmbientPlaying(true);
        addToast('🕯️ Wood wick crackle ambience playing', 'success', 3000);
      } catch (err) {
        console.warn('Audio not allowed without gesture', err);
      }
    }
  };

  return (
    <UIContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        selectedCollectionId,
        setSelectedCollectionId,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSensoryModalOpen,
        setIsSensoryModalOpen,
        toasts,
        addToast,
        removeToast,
        isAmbientPlaying,
        toggleAmbientSound
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
