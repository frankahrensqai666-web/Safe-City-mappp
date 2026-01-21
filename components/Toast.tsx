import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2800); // A bit shorter than App's timeout to allow for fade-out
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 border border-white/20 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      {message}
    </div>
  );
};