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
      name: 'Midnight Muse • Matte Noir',
      subtitle: 'Smoked Black Tea • Velvet Rose • Amber',
      category: 'candles',
      price: 1850,
      originalPrice: 2150,
      vesselColor: '#1A1715',
      scentFamily: 'Woody Oriental',
      burnTime: '55–60 Hours',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85',
      description: 'Our signature dark luxury candle. Opens with smoked black tea leaves and dark plum, melting into a heart of velvet black rose and smoldering cedar.'
    },
    {
      id: 'santal-whisper',
      name: 'Santal Whisper • Sage Mist',
      subtitle: 'Australian Sandalwood • Iris • Papyrus',
      category: 'candles',
      price: 1950,
      originalPrice: null,
      vesselColor: '#9CA797',
      scentFamily: 'Woody Aromatics',
      burnTime: '55–60 Hours',
      image: 'https://images.unsplash.com/photo-1608181831557-ca5bc41707eb?auto=format&fit=crop&w=800&q=85',
      description: 'An intoxicating harmony of Australian sandalwood, cardamom, and soft iris wrapped in milky fig and papyrus for effortless quiet luxury.'
    },
    {
      id: 'rose-blush',
      name: 'Rose & Cashmere • Blush Quartz',
      subtitle: 'Damask Rose • Pink Pepper • Tonka',
      category: 'candles',
      price: 1750,
      originalPrice: 1990,
      vesselColor: '#D8B7AF',
      scentFamily: 'Floral Amber',
      burnTime: '50–55 Hours',
      image: 'https://images.unsplash.com/photo-1595867818088-57d88c2a829e?auto=format&fit=crop&w=800&q=85',
      description: 'Sun-warmed Turkish rose water, pink peppercorns, and delicate cashmere woods poured into a hand-glazed soft rose quartz vessel.'
    },
    {
      id: 'vanilla-ember',
      name: 'Vanilla Ember • Forest Pine',
      subtitle: 'Bourbon Vanilla • Charred Oak • Tobacco',
      category: 'candles',
      price: 1850,
      originalPrice: null,
      vesselColor: '#39483F',
      scentFamily: 'Warm Gourmand',
      burnTime: '55–60 Hours',
      image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=85',
      description: 'Dark Bourbon vanilla orchid with charred oak, caramelized amber, and tobacco leaf for sophisticated smoldering sweetness.'
    },

    // Reed Diffusers
    {
      id: 'santal-diffuser',
      name: 'Santal Whisper Reed Diffuser',
      subtitle: 'Natural Rattan Reeds • 200ml Glass Decanter',
      category: 'diffusers',
      price: 2250,
      originalPrice: 2500,
      scentFamily: 'Woody Aromatics',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=85',
      description: 'Continuous room-filling fragrance without flame. Infused with pure essential oils of sandalwood, iris, and crisp cedar.'
    },
    {
      id: 'citrus-diffuser',
      name: 'Citrus Solstice Reed Diffuser',
      subtitle: 'Sicilian Orange • Yuzu • Bergamot',
      category: 'diffusers',
      price: 2150,
      originalPrice: null,
      scentFamily: 'Citrus Herbaceous',
      image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&w=800&q=85',
      description: 'Sun-drenched Sicilian blood orange and Japanese yuzu blended with crushed rosemary for an invigorating daily uplift.'
    },

    // Soap & Wax Melts
    {
      id: 'botanical-soap',
      name: 'French Clay & Lavender Soap Bar',
      subtitle: 'Cold-Processed Shea Butter & French Green Clay',
      category: 'soaps',
      price: 650,
      originalPrice: 750,
      scentFamily: 'Herbal Botanical',
      image: 'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&w=800&q=85',
      description: 'Artisanal cold-pressed nourishing soap bar enriched with cold-pressed olive oil, French clay, and calming lavender.'
    },
    {
      id: 'amber-wax-melts',
      name: 'Artisan Botanical Wax Melts (6-Pack)',
      subtitle: 'Pure Coconut Wax Infusions',
      category: 'soaps',
      price: 850,
      originalPrice: null,
      scentFamily: 'Warm Amber Resin',
      image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=800&q=85',
      description: 'Hand-cast botanical soy wax melts infused with amber resin and dried floral botanicals for flameless warmers.'
    }
  ];

  /* ==========================================================================
     APP STATE
     ========================================================================== */

  const STATE = {
    cart: [{ id: 'midnight-muse', quantity: 1 }],
    activeTab: 'candles',
    bundleSelection: ['midnight-muse', 'santal-whisper', 'vanilla-ember'],
    isSoundPlaying: false,
    audioCtx: null
  };

  const FREE_SHIPPING_THRESHOLD = 1499;

  /* ==========================================================================
     DOM REFS
     ========================================================================== */

  const DOM = {
    curatedProductGrid: document.getElementById('curated-product-grid'),
    collectionTabs: document.getElementById('collection-tabs'),
    cartBtn: document.getElementById('cart-btn'),
    cartCount: document.getElementById('cart-count'),
    cartHeaderCount: document.getElementById('cart-header-count'),
    cartOverlay: document.getElementById('cart-drawer-overlay'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartShippingVal: document.getElementById('cart-shipping-val'),
    cartTotalVal: document.getElementById('cart-total-val'),
    shippingProgressText: document.getElementById('shipping-progress-text'),
    shippingMeterFill: document.getElementById('shipping-meter-fill'),
    proceedCheckoutBtn: document.getElementById('proceed-checkout-btn'),

    bundleGridSelection: document.getElementById('bundle-selection-grid'),
    addBundleBtn: document.getElementById('add-bundle-btn'),

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

    newsletterForm: document.getElementById('newsletter-form'),
    newsletterEmail: document.getElementById('newsletter-email'),
    toastContainer: document.getElementById('toast-container')
  };

  let activeQuickViewId = null;

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */

  const showToast = (message, duration = 3500) => {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-bubble';
    toast.textContent = message;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, duration);
  };

  /* ==========================================================================
     WEB AUDIO AMBIENT SOUND (Wood-Wick Acoustic Synthesizer)
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
        console.warn('Audio gesture required', err);
      }
    }
  };

  /* ==========================================================================
     PRODUCT RENDERING WITH CATEGORY TABS
     ========================================================================== */

  const renderProducts = () => {
    if (!DOM.curatedProductGrid) return;
    const filtered = PRODUCTS.filter(p => p.category === STATE.activeTab);
    DOM.curatedProductGrid.innerHTML = filtered.map(prod => `
      <article class="product-showcase-card" data-product-id="${prod.id}">
        <div class="product-vessel-frame">
          <img src="${prod.image}" alt="${prod.name}" class="vessel-img" loading="lazy">
          ${prod.originalPrice ? `<span class="discount-pill">20% SALE</span>` : ''}
        </div>
        <h3 class="card-title">${prod.name}</h3>
        <div class="card-notes-preview">${prod.subtitle}</div>
        <div class="card-pricing-line">
          ${prod.originalPrice ? `<span class="price-strikethrough">₹${prod.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          <span>₹${prod.price.toLocaleString('en-IN')}</span>
        </div>
      </article>
    `).join('');
  };

  /* ==========================================================================
     CART OPERATIONS
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
          <div style="text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
            <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🕯️</div>
            <p style="font-family: var(--font-serif); font-size: 1.25rem;">Your bag is currently empty.</p>
          </div>
        `;
      } else {
        DOM.cartItemsContainer.innerHTML = STATE.cart.map(item => {
          if (item.id === 'muse-trio-bundle') {
            return `
              <div style="display: flex; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
                <img src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=85" style="width: 70px; height: 85px; object-fit: cover;">
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="font-family: var(--font-serif); font-size: 1.1rem;">Custom Muse Trio Keepsake Box</div>
                    <div style="font-size: 0.72rem; color: #8C827A;">Set of 3 Curated Candles + Matches</div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.8rem;">Qty: ${item.quantity}</span>
                    <span style="font-weight: 600;">₹${(4790 * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            `;
          }
          const prod = PRODUCTS.find(p => p.id === item.id);
          if (!prod) return '';
          return `
            <div style="display: flex; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
              <img src="${prod.image}" alt="${prod.name}" style="width: 70px; height: 85px; object-fit: cover;">
              <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="font-family: var(--font-serif); font-size: 1.05rem;">${prod.name}</div>
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
      if (item.id === 'muse-trio-bundle') return sum + 4790 * item.quantity;
      const prod = PRODUCTS.find(p => p.id === item.id);
      return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);

    const isFree = subtotal >= FREE_SHIPPING_THRESHOLD;
    const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (DOM.cartShippingVal) DOM.cartShippingVal.textContent = isFree ? 'COMPLIMENTARY' : '₹149';
    if (DOM.cartTotalVal) DOM.cartTotalVal.textContent = `₹${(subtotal + (isFree || subtotal === 0 ? 0 : 149)).toLocaleString('en-IN')}`;

    if (DOM.shippingMeterFill) DOM.shippingMeterFill.style.width = `${progress}%`;
    if (DOM.shippingProgressText) {
      DOM.shippingProgressText.textContent = isFree ? 'Complimentary shipping unlocked!' : `Add ₹${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} more for free delivery`;
    }
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
     EVENT BINDINGS
     ========================================================================== */

  const attachEvents = () => {
    // Ambience
    if (DOM.soundToggleBtn) DOM.soundToggleBtn.addEventListener('click', toggleAmbienceAudio);

    // Collection Tabs Switcher
    if (DOM.collectionTabs) {
      DOM.collectionTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-tab-btn');
        if (btn) {
          DOM.collectionTabs.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          STATE.activeTab = btn.getAttribute('data-tab');
          renderProducts();
        }
      });
    }

    // Bundle Builder Add
    if (DOM.addBundleBtn) {
      DOM.addBundleBtn.addEventListener('click', () => {
        addToCart('muse-trio-bundle', 1);
        showToast('Custom Muse Trio Gift Set added to your bag!');
      });
    }

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
        showToast('Directing to secure small-batch checkout...');
        setTimeout(() => {
          showToast('Order secured! Artisans are queuing your pour.', 4500);
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

    // Product Card Clicks
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.product-showcase-card');
      if (card && !e.target.closest('button')) {
        const pid = card.getAttribute('data-product-id');
        openQuickView(pid);
      }
    });

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
          DOM.searchResultsArea.innerHTML = '<p style="color: var(--text-secondary);">No fragrances found matching your query.</p>';
        } else {
          DOM.searchResultsArea.innerHTML = matches.map(m => `
            <div style="display: flex; gap: 1rem; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--border-subtle); cursor: pointer;" data-search-select="${m.id}">
              <img src="${m.image}" style="width: 45px; height: 55px; object-fit: cover;">
              <div>
                <div style="font-weight: 500; font-family: var(--font-serif); font-size: 1.1rem;">${m.name}</div>
                <div style="font-size: 0.75rem; color: #8C827A;">${m.scentFamily} • ₹${m.price.toLocaleString('en-IN')}</div>
              </div>
            </div>
          `).join('');
        }
      });

      DOM.searchResultsArea.addEventListener('click', (e) => {
        const item = e.target.closest('[data-search-select]');
        if (item) {
          const pid = item.getAttribute('data-search-select');
          closeSearch();
          openQuickView(pid);
        }
      });
    }

    // Newsletter
    if (DOM.newsletterForm) {
      DOM.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Welcome to the VIP Muse Circle! 10% privilege code: FIRSTMUSE');
        DOM.newsletterForm.reset();
      });
    }
  };

  /* ==========================================================================
     INIT
     ========================================================================== */

  const init = () => {
    renderProducts();
    updateCartUI();
    attachEvents();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
