/**
 * MELT MUSE — LUXURY CANDLES & HOME FRAGRANCE
 * Standalone Production JavaScript Logic (ES6+)
 */

(() => {
  'use strict';

  /* ==========================================================================
     PRODUCT CATALOG
     ========================================================================== */

  const PRODUCTS = [
    {
      id: 'midnight-muse',
      name: 'Product 1 • Midnight Muse',
      subtitle: 'Dark • Warm • Sensual',
      price: 1850,
      originalPrice: 2150,
      category: 'candles',
      scentFamily: 'Woody Oriental',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85',
      description: 'Our crowning signature. Midnight Muse opens with an intriguing whisper of smoked black tea and dark plum before settling into velvet black rose and smoldering cedarwood.'
    },
    {
      id: 'santal-whisper',
      name: 'Product 2 • Santal Whisper',
      subtitle: 'Creamy • Earthy • Grounding',
      price: 1950,
      originalPrice: null,
      category: 'diffusers',
      scentFamily: 'Woody Aromatics',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=85',
      description: 'An intoxicating harmony of Australian sandalwood, cardamom, and soft iris wrapped in milky fig and papyrus.'
    },
    {
      id: 'fig-cashmere',
      name: 'Product 3 • Fig & Cashmere',
      subtitle: 'Lush • Velvet • Comforting',
      price: 1750,
      originalPrice: 1990,
      category: 'soaps',
      scentFamily: 'Fruity Green',
      image: 'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&w=800&q=85',
      description: 'Ripened wild Adriatic figs meet rich coconut nectar, sun-warmed green leaves, and a soft base of cashmere wood.'
    },
    {
      id: 'vanilla-ember',
      name: 'Product 4 • Vanilla Ember',
      subtitle: 'Smoky • Gourmand • Addictive',
      price: 1850,
      originalPrice: null,
      category: 'candles',
      scentFamily: 'Warm Gourmand',
      image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=85',
      description: 'Dark Bourbon vanilla orchid with charred oak, caramelized amber, and tobacco leaf for sophisticated smoldering sweetness.'
    }
  ];

  /* ==========================================================================
     APP STATE
     ========================================================================== */

  const STATE = {
    cart: [{ id: 'midnight-muse', quantity: 1 }],
    isSoundPlaying: false,
    audioCtx: null
  };

  /* ==========================================================================
     DOM REFS
     ========================================================================== */

  const DOM = {
    mainProductGrid: document.getElementById('main-product-grid'),
    cartBtn: document.getElementById('cart-btn'),
    cartCount: document.getElementById('cart-count'),
    cartHeaderCount: document.getElementById('cart-header-count'),
    cartOverlay: document.getElementById('cart-drawer-overlay'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartTotalVal: document.getElementById('cart-total-val'),
    proceedCheckoutBtn: document.getElementById('proceed-checkout-btn'),

    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    soundIconDisplay: document.getElementById('sound-icon-display'),

    searchBtn: document.getElementById('search-btn'),
    searchOverlay: document.getElementById('search-modal-overlay'),
    closeSearchBtn: document.getElementById('close-search-btn'),
    siteSearchInput: document.getElementById('site-search-input'),
    searchResultsArea: document.getElementById('search-results-area'),

    quickviewOverlay: document.getElementById('quickview-modal-overlay'),
    closeQuickviewBtn: document.getElementById('close-quickview-btn'),
    quickviewImg: document.getElementById('quickview-img'),
    quickviewFamily: document.getElementById('quickview-family'),
    quickviewName: document.getElementById('quickview-name'),
    quickviewPrice: document.getElementById('quickview-price'),
    quickviewDesc: document.getElementById('quickview-desc'),
    quickviewAddBtn: document.getElementById('quickview-add-btn'),

    quizOptionBtns: document.querySelectorAll('.quiz-option-btn'),
    quizMatchName: document.getElementById('quiz-match-name'),
    quizMatchDesc: document.getElementById('quiz-match-desc'),
    quizAddBtn: document.getElementById('quiz-add-btn'),

    newsletterForm: document.getElementById('newsletter-form'),
    newsletterEmail: document.getElementById('newsletter-email'),
    toastContainer: document.getElementById('toast-container')
  };

  let activeQuickViewId = null;
  let activeQuizScentId = 'midnight-muse';

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */

  const showToast = (message, duration = 3500) => {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, duration);
  };

  /* ==========================================================================
     WEB AUDIO AMBIENT SOUND (Wood-Wick Crackle)
     ========================================================================== */

  const toggleAmbienceAudio = () => {
    if (STATE.isSoundPlaying) {
      if (STATE.audioCtx) STATE.audioCtx.suspend();
      STATE.isSoundPlaying = false;
      if (DOM.soundIconDisplay) DOM.soundIconDisplay.textContent = '🔈';
      showToast('Ambient candle sound paused');
    } else {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!STATE.audioCtx) {
          const ctx = new AudioContextClass();
          STATE.audioCtx = ctx;

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

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          whiteNoise.start(0);
        } else {
          STATE.audioCtx.resume();
        }

        STATE.isSoundPlaying = true;
        if (DOM.soundIconDisplay) DOM.soundIconDisplay.textContent = '🔊';
        showToast('🕯️ Wood wick crackle ambience playing');
      } catch (err) {
        console.warn('Audio not allowed without gesture', err);
      }
    }
  };

  /* ==========================================================================
     PRODUCT RENDERING (Matching Reference Image)
     ========================================================================== */

  const renderProductCards = () => {
    if (!DOM.mainProductGrid) return;
    DOM.mainProductGrid.innerHTML = PRODUCTS.map(prod => `
      <article class="minimal-card" data-product-id="${prod.id}">
        <div class="minimal-thumb-frame">
          <img src="${prod.image}" alt="${prod.name}" class="minimal-thumb-img" loading="lazy">
          ${prod.originalPrice ? `<span class="sale-tag-badge">Sale</span>` : ''}
        </div>
        <div class="minimal-info">
          <h3 class="minimal-title">${prod.name}</h3>
          <div class="minimal-scent-notes">${prod.subtitle}</div>
          <div class="minimal-price-row">
            ${prod.originalPrice ? `<span class="old-price">₹${prod.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            <span>₹${prod.price.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </article>
    `).join('');
  };

  /* ==========================================================================
     CART MANAGEMENT
     ========================================================================== */

  const addToCart = (productId, qty = 1) => {
    const existing = STATE.cart.find(i => i.id === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      STATE.cart.push({ id: productId, quantity: qty });
    }
    updateCartUI();
    openCart();
    const prod = PRODUCTS.find(p => p.id === productId);
    if (prod) showToast(`Added ${prod.name} to your bag`);
  };

  const updateCartQuantity = (productId, delta) => {
    const item = STATE.cart.find(i => i.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        STATE.cart = STATE.cart.filter(i => i.id !== productId);
      }
    }
    updateCartUI();
  };

  const updateCartUI = () => {
    const totalCount = STATE.cart.reduce((sum, i) => sum + i.quantity, 0);
    if (DOM.cartCount) DOM.cartCount.textContent = totalCount;
    if (DOM.cartHeaderCount) DOM.cartHeaderCount.textContent = `(${totalCount})`;

    if (DOM.cartItemsContainer) {
      if (STATE.cart.length === 0) {
        DOM.cartItemsContainer.innerHTML = `
          <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
            <p>Your bag is empty.</p>
          </div>
        `;
      } else {
        DOM.cartItemsContainer.innerHTML = STATE.cart.map(item => {
          const prod = PRODUCTS.find(p => p.id === item.id);
          if (!prod) return '';
          return `
            <div style="display: flex; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
              <img src="${prod.image}" alt="${prod.name}" style="width: 70px; height: 85px; object-fit: cover;">
              <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="font-family: var(--font-serif); font-size: 1.1rem;">${prod.name}</div>
                  <div style="font-size: 0.72rem; color: #8C827A;">₹${prod.price.toLocaleString('en-IN')}</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: inline-flex; border: 1px solid var(--border-subtle); background: #FFF;">
                    <button data-delta="-1" data-qty-id="${prod.id}" style="padding: 0.2rem 0.5rem; cursor:pointer;">-</button>
                    <span style="padding: 0.2rem 0.4rem; font-size: 0.78rem; font-weight: 600;">${item.quantity}</span>
                    <button data-delta="1" data-qty-id="${prod.id}" style="padding: 0.2rem 0.5rem; cursor:pointer;">+</button>
                  </div>
                  <span style="font-weight: 600; font-size: 0.88rem;">₹${(prod.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    const subtotal = STATE.cart.reduce((sum, item) => {
      const prod = PRODUCTS.find(p => p.id === item.id);
      return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);

    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (DOM.cartTotalVal) DOM.cartTotalVal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  };

  const openCart = () => {
    if (DOM.cartOverlay) {
      DOM.cartOverlay.classList.add('active');
      DOM.cartOverlay.setAttribute('aria-hidden', 'false');
    }
  };

  const closeCart = () => {
    if (DOM.cartOverlay) {
      DOM.cartOverlay.classList.remove('active');
      DOM.cartOverlay.setAttribute('aria-hidden', 'true');
    }
  };

  /* ==========================================================================
     QUICK VIEW & SEARCH
     ========================================================================== */

  const openQuickView = (productId) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;
    activeQuickViewId = productId;
    if (DOM.quickviewImg) DOM.quickviewImg.src = prod.image;
    if (DOM.quickviewFamily) DOM.quickviewFamily.textContent = prod.scentFamily;
    if (DOM.quickviewName) DOM.quickviewName.textContent = prod.name;
    if (DOM.quickviewPrice) DOM.quickviewPrice.textContent = `₹${prod.price.toLocaleString('en-IN')}`;
    if (DOM.quickviewDesc) DOM.quickviewDesc.textContent = prod.description;

    if (DOM.quickviewOverlay) {
      DOM.quickviewOverlay.classList.add('active');
      DOM.quickviewOverlay.setAttribute('aria-hidden', 'false');
    }
  };

  const closeQuickView = () => {
    if (DOM.quickviewOverlay) {
      DOM.quickviewOverlay.classList.remove('active');
      DOM.quickviewOverlay.setAttribute('aria-hidden', 'true');
    }
  };

  const openSearch = () => {
    if (DOM.searchOverlay) {
      DOM.searchOverlay.classList.add('active');
      DOM.searchOverlay.setAttribute('aria-hidden', 'false');
      if (DOM.siteSearchInput) {
        DOM.siteSearchInput.value = '';
        DOM.siteSearchInput.focus();
      }
    }
  };

  const closeSearch = () => {
    if (DOM.searchOverlay) {
      DOM.searchOverlay.classList.remove('active');
      DOM.searchOverlay.setAttribute('aria-hidden', 'true');
    }
  };

  /* ==========================================================================
     EVENT ATTACHMENTS
     ========================================================================== */

  const attachEvents = () => {
    // Ambience
    if (DOM.soundToggleBtn) DOM.soundToggleBtn.addEventListener('click', toggleAmbienceAudio);

    // Cart
    if (DOM.cartBtn) DOM.cartBtn.addEventListener('click', openCart);
    if (DOM.closeCartBtn) DOM.closeCartBtn.addEventListener('click', closeCart);
    if (DOM.cartOverlay) {
      DOM.cartOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.cartOverlay) closeCart();
      });
    }

    if (DOM.cartItemsContainer) {
      DOM.cartItemsContainer.addEventListener('click', (e) => {
        const deltaBtn = e.target.closest('[data-delta]');
        if (deltaBtn) {
          const pid = deltaBtn.getAttribute('data-qty-id');
          const delta = parseInt(deltaBtn.getAttribute('data-delta'), 10);
          updateCartQuantity(pid, delta);
        }
      });
    }

    if (DOM.proceedCheckoutBtn) {
      DOM.proceedCheckoutBtn.addEventListener('click', () => {
        showToast('Directing to secure checkout...');
        setTimeout(() => {
          showToast('Order secured! Thank you for melting with us.', 4000);
          STATE.cart = [];
          updateCartUI();
          closeCart();
        }, 1200);
      });
    }

    // Quick View
    if (DOM.closeQuickviewBtn) DOM.closeQuickviewBtn.addEventListener('click', closeQuickView);
    if (DOM.quickviewOverlay) {
      DOM.quickviewOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.quickviewOverlay) closeQuickView();
      });
    }
    if (DOM.quickviewAddBtn) {
      DOM.quickviewAddBtn.addEventListener('click', () => {
        if (activeQuickViewId) {
          addToCart(activeQuickViewId, 1);
          closeQuickView();
        }
      });
    }

    // Search
    if (DOM.searchBtn) DOM.searchBtn.addEventListener('click', openSearch);
    if (DOM.closeSearchBtn) DOM.closeSearchBtn.addEventListener('click', closeSearch);
    if (DOM.searchOverlay) {
      DOM.searchOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.searchOverlay) closeSearch();
      });
    }
    if (DOM.siteSearchInput && DOM.searchResultsArea) {
      DOM.siteSearchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) {
          DOM.searchResultsArea.innerHTML = '';
          return;
        }
        const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
        if (matches.length === 0) {
          DOM.searchResultsArea.innerHTML = '<p style="color: var(--text-secondary);">No fragrances found.</p>';
        } else {
          DOM.searchResultsArea.innerHTML = matches.map(m => `
            <div style="display: flex; gap: 1rem; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid var(--border-subtle); cursor: pointer;" data-search-pick="${m.id}">
              <img src="${m.image}" style="width: 40px; height: 50px; object-fit: cover;">
              <div>
                <div style="font-weight: 500;">${m.name}</div>
                <div style="font-size: 0.75rem; color: #8C827A;">₹${m.price.toLocaleString('en-IN')}</div>
              </div>
            </div>
          `).join('');
        }
      });

      DOM.searchResultsArea.addEventListener('click', (e) => {
        const pick = e.target.closest('[data-search-pick]');
        if (pick) {
          const pid = pick.getAttribute('data-search-pick');
          closeSearch();
          openQuickView(pid);
        }
      });
    }

    // Card Clicks
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.minimal-card');
      if (card && !e.target.closest('button')) {
        const pid = card.getAttribute('data-product-id');
        openQuickView(pid);
      }
    });

    // Scent Match Quiz
    DOM.quizOptionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.quizOptionBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const scentId = btn.getAttribute('data-quiz-scent');
        activeQuizScentId = scentId;
        const prod = PRODUCTS.find(p => p.id === scentId);
        if (prod) {
          if (DOM.quizMatchName) DOM.quizMatchName.textContent = `${prod.name} (${prod.scentFamily})`;
          if (DOM.quizMatchDesc) DOM.quizMatchDesc.textContent = prod.description;
          if (DOM.quizAddBtn) DOM.quizAddBtn.textContent = `+ ADD MATCH TO BAG (₹${prod.price.toLocaleString('en-IN')})`;
        }
      });
    });

    if (DOM.quizAddBtn) {
      DOM.quizAddBtn.addEventListener('click', () => {
        addToCart(activeQuizScentId, 1);
      });
    }

    // Newsletter
    if (DOM.newsletterForm) {
      DOM.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Welcome to the VIP Muse circle! Privilege code: FIRSTMUSE');
        DOM.newsletterForm.reset();
      });
    }
  };

  /* ==========================================================================
     INIT
     ========================================================================== */

  const init = () => {
    renderProductCards();
    updateCartUI();
    attachEvents();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
