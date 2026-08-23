import React, { createContext, useContext, useState, useEffect } from 'react';
import { brandConfig } from '../data/brandConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('melt_muse_cart');
      return saved ? JSON.parse(saved) : [
        // Realistic initial item to demonstrate luxury experience
        {
          id: 'midnight-muse',
          name: 'Midnight Muse',
          subtitle: 'Dark • Warm • Sensual',
          price: 1850,
          quantity: 1,
          size: '240g / 8.5 oz',
          wick: 'FSC Certified Wooden Wick',
          image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [selectedFreeSample, setSelectedFreeSample] = useState('santal-whisper');

  useEffect(() => {
    try {
      localStorage.setItem('melt_muse_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, options = {}) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.wick === (options.wick || product.wick));
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.wick === (options.wick || product.wick)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          subtitle: product.subtitle,
          price: product.price,
          quantity,
          size: options.size || product.size,
          wick: options.wick || product.wick,
          image: product.images ? product.images[0] : product.image
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedDiscount(null);
  };

  const applyPromo = code => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FIRSTMUSE' || clean === 'MUSE10') {
      setAppliedDiscount({ code: clean, percentage: 10, label: '10% Muse Welcome Privilege' });
      return { success: true, message: '10% discount applied to your order!' };
    }
    if (clean === 'BURNINGBRIGHT' || clean === 'MUSE20') {
      setAppliedDiscount({ code: clean, percentage: 20, label: '20% VIP Candle Connoisseur' });
      return { success: true, message: '20% VIP privilege applied!' };
    }
    return { success: false, message: 'Invalid or expired secret code.' };
  };

  const removePromo = () => {
    setAppliedDiscount(null);
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? Math.round((subtotal * appliedDiscount.percentage) / 100) : 0;
  const giftWrapFee = isGiftWrap ? 150 : 0;
  const isFreeShipping = subtotal >= brandConfig.shipping.freeThreshold;
  const shippingFee = subtotal === 0 ? 0 : (isFreeShipping ? 0 : brandConfig.shipping.standardFee);
  const total = Math.max(0, subtotal - discountAmount + giftWrapFee + shippingFee);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const freeShippingProgress = Math.min(100, (subtotal / brandConfig.shipping.freeThreshold) * 100);
  const amountToFreeShipping = Math.max(0, brandConfig.shipping.freeThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discountAmount,
        appliedDiscount,
        applyPromo,
        removePromo,
        promoCode,
        setPromoCode,
        isGiftWrap,
        setIsGiftWrap,
        giftNote,
        setGiftNote,
        selectedFreeSample,
        setSelectedFreeSample,
        shippingFee,
        isFreeShipping,
        freeShippingProgress,
        amountToFreeShipping,
        total,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
