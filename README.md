# Melt Muse — Luxury Candles & Home Fragrance

> **Tagline:** BURNING BRIGHT  
> **Aesthetic:** Minimalist Warm Luxury • Editorial Boutique • High-End Perfumery & Home Fragrance

A production-ready luxury e-commerce web application for artisanal home-fragrance brand **Melt Muse**. Built with semantic HTML5, pure modular Vanilla CSS, and modern encapsulated ES6+ JavaScript for zero-conflict instant deployment to **GitHub Pages**, **Vercel**, and **Netlify**.

---

## Live Features & Architecture

- **Visual Brand Identity**: Preserved Melt Muse typography and flame emblem with a luxury palette of Warm Ivory, Soft Cream, Pale Blush, Charcoal, and Champagne Gold.
- **Ambient Sound Synthesizer**: Web Audio API generated realistic wood-wick crackle fire acoustics with one-tap toggle.
- **Dynamic Product Catalog**: Curated botanical wax creations (*Midnight Muse*, *Santal Whisper*, *Fig & Cashmere*, *Vanilla Ember*, *Rose Noir & Oud*, *Citrus Solstice*, *Fleur de Lune*, *Matcha Ritual*).
- **Interactive Scent Notes Pyramid**: Interactive olfactory explorer (Top, Heart, and Base notes breakdown).
- **Slide-Out Cart Drawer**: Quantity management, free shipping progress bar (₹1,499 threshold), and promo voucher engine (`FIRSTMUSE` for 10% off, `BURNINGBRIGHT` for 20% off).
- **Quick View Modal & Live Search**: Instant preview, note exploration, and instant live filtering by scent, name, or fragrance family.
- **Simulated Checkout Flow**: Complete order creation modal with delivery address form, payment options, and order receipt.
- **Editorial Brand Story & Journal**: Storytelling narrative on botanical wax pouring, wooden wick acoustic therapy, and scent mapping.
- **Instagram Live-Look Grid**: 6-photo editorial visual gallery linked directly to [@meltmuse_](https://www.instagram.com/meltmuse_/?utm_source=chatgpt.com).

---

## File Structure

```text
melt-muse/
├── index.html       # Clean semantic HTML5 markup (zero inline JS/styles)
├── style.css        # Pure Vanilla CSS design system & responsive rules
├── script.js        # Modern encapsulated ES6+ interactive application logic
└── README.md        # Documentation and deployment instructions
```

---

## Deployment Instructions

### 1. GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` (or `master`) and `/ (root)`.
4. Click **Save**. Your website will be live in seconds.

### 2. Vercel

1. Run `npx vercel` in the project root or import the GitHub repository into your Vercel dashboard.
2. Framework Preset: **Other / Static**.
3. Output Directory: `./` (Root).
4. Click **Deploy**.

### 3. Netlify

1. Drag and drop the `melt-muse` folder onto [Netlify Drop](https://app.netlify.com/drop), or link your Git repository.
2. Build command: *(leave empty)*.
3. Publish directory: `./` (or `.`).
4. Click **Deploy Site**.

---

## Local Development

To run locally with any static web server:

```bash
# Using Python
python -m http.server 8000

# Or using Node / npx
npx serve .
```

Open [http://localhost:8000](http://localhost:8000) in your browser.
