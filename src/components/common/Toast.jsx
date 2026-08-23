import React from 'react';
import { Sparkles, Check, AlertCircle, Info, X } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const Toast = () => {
  const { toasts, removeToast } = useUI();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '380px'
      }}
    >
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            style={{
              backgroundColor: '#161412',
              color: '#FBF9F5',
              border: isSuccess ? '1px solid #C5A880' : isError ? '1px solid #A83232' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              padding: '0.85rem 1.15rem',
              boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              animation: 'slideUp 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {isSuccess ? (
                <Check size={16} color="#C5A880" style={{ flexShrink: 0 }} />
              ) : isError ? (
                <AlertCircle size={16} color="#E57373" style={{ flexShrink: 0 }} />
              ) : (
                <Sparkles size={16} color="#C5A880" style={{ flexShrink: 0 }} />
              )}
              <span style={{ fontSize: '0.78rem', letterSpacing: '0.04em', lineHeight: 1.4 }}>
                {toast.message}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(251, 249, 245, 0.6)',
                cursor: 'pointer',
                padding: '0.2rem'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
