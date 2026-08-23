/**
 * MELT MUSE — LUXURY CANDLES & HOME FRAGRANCE
 * Standalone Production JavaScript Logic (ES6+)
 */

(() => {
  'use strict';

  /* ==========================================================================
     AUTHENTIC PRODUCT CATALOG (FEATURING MELT MUSE REAL PHOTOGRAPHY)
     ========================================================================== */

  const PRODUCTS = [
    {
      id: 'rose-gold-dough-bowl',
      name: 'Rose & 24K Gold Wooden Dough Bowl',
      subtitle: 'Organic Damask Rose Petals • Gold Leaf • Dual Wick',
      category: 'candles',
      price: 2450,
      originalPrice: 2850,
      vesselColor: '#C49A45',
      scentFamily: 'Floral Amber',
      burnTime: '70–75 Hours',
      image: './assets/rose-gold-dough-bowl.jpg',
      description: 'Artisanal hand-carved natural wooden boat candle generously filled with pure coconut-soy wax, scattered dried crimson rose petals, and 24K gold foil flakes. Poured with dual clean-burning wicks.'
    },
    {
      id: 'spiced-orange-cinnamon-bowl',
      name: 'Chai Spices & Dried Citrus Wooden Bowl',
      subtitle: 'Ceylon Cinnamon • Star Anise • Sun-Dried Orange Slice',
      category: 'candles',
      price: 2650,
      originalPrice: null,
      vesselColor: '#8C5835',
      scentFamily: 'Warm Spiced Gourmand',
      burnTime: '70–75 Hours',
      image: './assets/spiced-orange-cinnamon-bowl.jpg',
      description: 'An evocative olfactory centerpiece. Carved from solid reclaimed mango wood, infused with real whole cinnamon barks, star anise blossoms, green cardamom pods, and sun-dried orange peel.'
    },
    {
      id: 'botanical-garden-flower-candle',
      name: 'Enchanted Flora Glass Garden Candle',
      subtitle: 'Sculpted Wax Blossoms • Crystal Gel Wax • Fresh Neroli',
      category: 'candles',
      price: 1850,
      originalPrice: 2100,
      vesselColor: '#E8A7A1',
      scentFamily: 'Fresh Botanical Floral',
      burnTime: '45–50 Hours',
      image: './assets/botanical-garden-flower-candle.jpg',
      description: 'A poetic visual masterpiece. Hand-sculpted wax flower blossoms suspended in sparkling crystal gel wax, releasing an intoxicating bouquet of white tuberose, jasmine tea, and dew-dappled neroli.'
    },
    {
      id: 'obsidian-noir-jar',
      name: 'Midnight Muse • Obsidian Noir Dual-Wick',
      subtitle: 'Smoked Black Tea • Bourbon Vanilla • Cedarwood',
      category: 'candles',
      price: 1950,
      originalPrice: null,
      vesselColor: '#1A1715',
      scentFamily: 'Woody Oriental',
      burnTime: '55–60 Hours',
      image: './assets/obsidian-noir-jar.jpg',
      description: 'Our iconic sleek matte obsidian cylinder with fitted travel lid and dual clean cotton wicks. Deep, sensual, and room-filling notes of charred oak and smoked black tea.'
    },

    // Reed Diffusers & Festive Sets
    {
      id: 'festive-peacock-diya-set',
      name: 'Royal Peacock & Sunflower Keepsake Diya Set',
      subtitle: 'Golden Peacock Sculptures • Sunflower Wax Diyas',
      category: 'diffusers',
      price: 2950,
      originalPrice: 3400,
      vesselColor: '#E2B038',
      scentFamily: 'Sacred Sandalwood & Marigold',
      image: './assets/festive-peacock-diya-set.jpg',
      description: 'Magnificent festive artisanal gift set featuring ornate golden peacock candelabras and sunflower embossed floating wax diyas infused with royal sandalwood and fresh marigold petals.'
    },
    {
      id: 'citrus-diffuser',
      name: 'Citrus Solstice Reed Diffuser',
      subtitle: 'Sicilian Orange • Yuzu • Bergamot',
      category: 'diffusers',
      price: 2150,
      originalPrice: null,
      vesselColor: '#D4924A',
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
      vesselColor: '#8C9878',
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
      vesselColor: '#C49454',
      scentFamily: 'Warm Amber Resin',
      image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=800&q=85',
      description: 'Hand-cast botanical soy wax melts infused with amber resin and dried floral botanicals for flameless warmers.'
    }
  ];

  /* ==========================================================================
     APP STATE
     ========================================================================== */

  const STATE = {
    cart: [{ id: 'rose-gold-dough-bowl', quantity: 1 }],
    activeTab: 'candles',
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
      showToast('Ambient flame crackle paused');
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
          ${prod.originalPrice ? `<span class="discount-pill">ARTISAN SPECIAL</span>` : ''}
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
          if (item.id === 'muse-artisan-trio') {
            return `
              <div style="display: flex; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
                <img src="./assets/rose-gold-dough-bowl.jpg" style="width: 70px; height: 85px; object-fit: cover;">
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="font-family: var(--font-serif); font-size: 1.1rem;">Artisan Botanical Dough Bowl Trio</div>
                    <div style="font-size: 0.72rem; color: #8C827A;">Rose Gold Bowl + Chai Spiced Bowl + Flora Jar</div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.8rem;">Qty: ${item.quantity}</span>
                    <span style="font-weight: 600;">₹${(5890 * item.quantity).toLocaleString('en-IN')}</span>
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
      if (item.id === 'muse-artisan-trio') return sum + 5890 * item.quantity;
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
        addToCart('muse-artisan-trio', 1);
        showToast('Artisan Dough Bowl & Floral Trio added to your bag!');
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
        showToast('Connecting to Melt Muse Artisan Atelier checkout...');
        setTimeout(() => {
          showToast('Order secured! Your handcrafted botanical candle is queued for pouring.', 4500);
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
